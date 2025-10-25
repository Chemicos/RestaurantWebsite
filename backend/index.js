/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import cron from 'node-cron';

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cookieParser())
const allowedOrigins = [
  'http://localhost:5173',
  'https://restaurant-website-three-orcin.vercel.app'
];

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: {rejectUnauthorized: false}
});

cron.schedule("0 3 * * *", async () => {
  console.log("Running daily cleanup job for expired users...")
  try {
    await pool.query("SELECT delete_expired_users()")
    console.log("Expired users cleaned up successfully.")
  } catch (error) {
    console.error("Error during cleanup job:", error.message)
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.get('/api/cleanup', async (req, res) => {
  try {
    await pool.query('SELECT delete_expired_users()')
    console.log('Cleanup triggered via external request.')
    res.json({ success: true, message: 'Expired users deleted successfully.' })
  } catch (error) {
    console.error('Error during external cleanup:', error.message)
    res.status(500).json({error: error.message})
  }
})

app.post('/api/stripe/checkout', async (req, res) => {
  try {
    const { amount, metadata } = req.body
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Suma lipseste sau este invalida' })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: { name: 'Comanda restaurant' },
            unit_amount: amount
          },
          quantity: 1
        }
      ],

      success_url: `${CLIENT_URL}/meniuri?plata=success`,
      cancel_url: `${CLIENT_URL}/finalizare?plata=cancel`,
      metadata: metadata || {}
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    res.status(500).json({ error: 'Eroare Stripe' })
  }
})

app.get('/api/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu')
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({err: 'Internal Server Error'})
  }
});

app.get('/api/garnituri', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM garnituri');
    res.json(result.rows)
  } catch (err) {
    console.log('Error fetching garnituri:', err);
    res.status(500).json({err: 'Internal Server Error'});
  }
});

app.get('/api/salate', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM salate');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching salate:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.get('/api/bauturi', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bauturi');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bauturi:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.get('/api/sosuri', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sosuri');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sosuri:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

app.get('/api/comenzi_temporare', async (req, res) => {
  let {session_id, user_id} = req.query

  if (user_id === 'undefined') user_id = null
  if (session_id === 'undefined') session_id = null

  if (!session_id && !user_id) {
    return res.status(400).json({ error: "Lipseste session_id sau user_id" })
  } 

  const client = await pool.connect()
  try {
    // const query = `
    //   SELECT items FROM comenzi_temporare 
    //   WHERE ${user_id ? 'user_id = $1' : 'session_id = $1'}
    // `

    const query = `
      SELECT id, items, total_partial FROM comenzi_temporare
      WHERE ${user_id ? 'user_id = $1' : 'session_id = $1'}
    `
    const value = user_id || session_id

    const result = await client.query(query, [value])
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Eroare DB"})
  } finally {
    client.release()
  }
})

app.post('/api/comenzi_temporare', async (req, res) => {
  const { session_id, user_id, menu } = req.body

  if(!user_id && !session_id) return res.status(400).json({error: 'Trebuie session_id sau user_id'})
  if(!menu) return res.status(400).json({error: 'Date incomplete'})

  const client = await pool.connect()
  try {
    await client.query(`
      INSERT INTO comenzi_temporare (session_id, user_id, items, total_partial)
      VALUES ($1, $2, $3, $4)
      `, [
        session_id,
        user_id || null,
        JSON.stringify(menu),
        menu.price
      ])
      
      res.status(201).json({succes: true})
  } catch (error) {
    console.error('Eroare DB:', error)
    res.status(500).json({error: "Eroare DB"})
  } finally {
    client.release()
  }
})

app.patch('/api/comenzi_temporare/:id', async (req, res) => {
  const {id} = req.params
  const {session_id, user_id, menu} = req.body

  if(!menu || (!user_id && !session_id)) {
    return res.status(400).json({error: 'Date incomplete'})
  }

  const client = await pool.connect()

  try {
    const identifierColumn = user_id ? 'user_id' : 'session_id'
    const identifierValue = user_id || session_id

    const found  = await client.query(
      `SELECT 1 FROM comenzi_temporare WHERE id = $1 AND ${identifierColumn} = $2`,
      [id, identifierValue]
    )

    if(found.rowCount === 0) {
      return res(404).json({error: 'Element inexistent sau nu apartine utilizatorului.'})
    }

    await client.query(
      `UPDATE comenzi_temporare
       SET items = $1, total_partial = $2, last_updated = now()
       WHERE id = $3
      `,
      [JSON.stringify(menu), menu.price, id]
    )

    res.json({succes: true})
  } catch (error) {
    console.error('Eroare PATCH:', error)
    res.status(500).json({error: 'Eroare DB'})
  } finally {
    client.release()
  }
})

app.delete('/api/comenzi_temporare/:id', async (req, res) => {
  const {id} = req.params
  const {session_id, user_id} = req.body

  if (!id || (!session_id && !user_id)) {
    return res.status(400).json({error: 'Lipseste id si identificator (user_id sau session_id)'})
  }

  const client = await pool.connect()

  try {
    const identifierColumn = user_id ? 'user_id' : 'session_id'
    const identifierValue = user_id || session_id

    const del = await client.query(
      `DELETE FROM comenzi_temporare 
       WHERE id = $1 AND ${identifierColumn} = $2`,
      [id, identifierValue]
    )

    if (del.rowCount === 0) {
      return res.status(404).json({error: 'Item inexistent sau nu apartine utilizatorului.'})
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Eroare la stergere:', error)
    res.status(500).json({error: 'Eroare DB la stergere'})
  } finally {
    client.release()
  }
})

app.post('/api/orders', async (req, res) => {
  const token = req.cookies.auth_token
  let userFromToken = null;
  try {
    if (token) userFromToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (_) {}

  const {
    session_id,
    customer,
    delivery,
    payment_method,
    note
  } = req.body

  if(!customer?.nume || !customer?.prenume || !customer?.email || !customer?.telefon) {
    return res.status(400).json({error: 'Date client incomplete'})
  }
  if(!['Card', 'Numerar'].includes(payment_method)) {
    return res.status(400).json({error: 'Metoda de plata invalida'})
  }
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const identifier =  userFromToken?.id ? {col: 'user_id', val: userFromToken.id} : {col: 'session_id', val: session_id}

    if(!identifier.val) {
      await client.query('ROLLBACK')
      return res.status(400).json({error: 'Lipseste user_id sau session_id'})
    }

    const tmp = await client.query(
      `SELECT id, items, total_partial FROM comenzi_temporare 
      WHERE ${identifier.col} = $1 FOR UPDATE`, 
      [identifier.val]
    )

    if(tmp.rows.length === 0) {
      await client.query('ROLLBACK')
      return res.status(400).json({error: 'Cosul este gol'})
    }

    const subtotal = tmp.rows.reduce((s, r) => s + Number(r.total_partial || 0), 0)

    const deliveryFee = delivery?.localitate ? (subtotal < 50 ? 8 : 0) : 0
    const total = subtotal + deliveryFee

    const insertOrder = await client.query(
      `INSERT INTO comenzi (
        user_id, session_id,
        customer_nume, customer_prenume, customer_email, customer_telefon,
        delivery_localitate, delivery_strada, delivery_cod_postal,
        payment_method, total, note
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
       [
        userFromToken?.id || null, userFromToken?.id ? null : session_id, 
        customer.nume, customer.prenume, customer.email, customer.telefon,
        delivery?.localitate || null, delivery?.strada || null, delivery?.codPostal || null,
        payment_method, total, note || null
      ]
    )

    const orderId = insertOrder.rows[0].id

    for(const row of tmp.rows) {
      const item = typeof row.items === 'string' ? JSON.parse(row.items) : row.items

      const quantity = Number(item.quantity || 1)
      const lineTotal = Number(item.price || 0)
      const unitPrice = quantity > 0 ? lineTotal / quantity : lineTotal

      await client.query(
        `INSERT INTO comenzi_items (
          order_id, menu_id, name, quantity, unit_price, line_total, options
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
         [
          orderId, item.menu_id || null,
          item.name, quantity, unitPrice, lineTotal,
          JSON.stringify({
            garnitura: item.garnitura ?? null,
            salate: item.salate ?? [],
            bauturi: item.bauturi ?? [],
            sosuri: item.sosuri ?? []
          })
         ]
      )
    }

    await client.query(
      `DELETE FROM comenzi_temporare WHERE ${identifier.col} = $1`,
      [identifier.val]
    )

    await client.query('COMMIT')
    res.json({success: true, order_id: orderId, total})
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Finalize order error:', error)
    res.status(500).json({error: 'Eroare la salvarea comenzii'})
  } finally {
    client.release()
  }
})

app.post('/api/register', async (req, res) => {
  const {nume, prenume, email, telefon, parola, tip_persoana, session_id} = req.body

  if (!nume || !prenume || !email || !parola || !tip_persoana) {
    return res.status(400).json({error: 'Datele sunt incomplete'})
  }

  const client = await pool.connect()

  try {
    const hashedPassword = await bcrypt.hash(parola, 10)

    const insertResult = await client.query(`
        INSERT INTO utilizatori (nume, prenume, email, telefon, parola, tip_persoana)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, prenume
      `, [nume, prenume, email, telefon, hashedPassword, tip_persoana])

      const newUser = insertResult.rows[0]

      if(session_id) {
        await client.query(`
          UPDATE comenzi_temporare
          SET user_id = $1, session_id = NULL
          WHERE session_id = $2
        `, [newUser.id, session_id])
      }

      const token = jwt.sign(
        { id: newUser.id, prenume: newUser.prenume },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000
      })

      res.status(201).json({ success: true, user: {id: newUser.id, prenume: newUser.prenume} })
  } catch (error) {
    console.error('Eroare la inregistrare:', error)
    if(error.code === '23505') {
      res.status(409).json({error: 'Email deja inregistrat'})
    } else {
      res.status(500).json({error: 'Eroare interna DB'})
    }
  } finally {
    client.release()
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password, session_id } = req.body
  const client = await pool.connect()

  try {
    const result = await client.query(`
      SELECT id, prenume, parola FROM utilizatori WHERE email = $1
    `, [email])

    if (result.rows.length === 0) return res.status(401).json({ error: 'Credentiale invalide' })

    const user = result.rows[0]
    const parolaMatch = await bcrypt.compare(password, user.parola)
    if (!parolaMatch) return res.status(401).json({ error: 'Credentiale invalide' })

    if (session_id) {
      await client.query(`
        UPDATE comenzi_temporare
        SET user_id = $1, session_id = NULL
        WHERE session_id = $2
      `, [user.id, session_id]);
    }

    const token = jwt.sign(
      { id: user.id, prenume: user.prenume },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true, // setează `true` în producție cu HTTPS
      sameSite: 'none',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Eroare la autentificare:', error)
    res.status(500).json({ error: 'Eroare interna' })
  } finally {
    client.release()
  }
})

app.get('/api/me', (req, res) => {
  const token = req.cookies.auth_token

  if (!token) return res.status(401).json({ error: 'Neautentificat' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ user: decoded })
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(403).json({ error: 'Token invalid sau expirat' })
  }
})

app.post('/api/logout', (req, res) => {
  res.clearCookie('auth_token')
  res.json({ success: true })
})

app.get('/api/utilizatori/:id', async (req, res) => {
  const {id} = req.params

  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT prenume, nume, email, telefon, localitate, strada, cod_postal 
      FROM utilizatori WHERE id = $1
    `, [id])

    if(result.rows.length === 0) {
      return res.status(404).json({error: 'Utilizatorul nu a fost gasit'})
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Eroare la fetch utilizatori', error)
    res.status(500).json({error: 'Eroare DB'})
  } finally {
    client.release()
  }
})

app.patch('/api/utilizatori/:id', async (req, res) => {
  const {id} = req.params
  const token = req.cookies.auth_token

  if(!token) return res.status(401).json({error: 'Neautentificate'})
  let decoded
  try {

    decoded = jwt.verify(token, process.env.JWT_SECRET)
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return res.status(403).json({error: 'Token invalid sau expirat'})
  }

  if(String(decoded.id) !== String(id)) {
    return res.status(403).json({error: 'Nu ai voie sa modifici acest profil'})
  }

  const {
    nume, prenume, telefon, email,
    localitate, strada, codPostal
  } = req.body

  const fields = {
     ...(nume !== undefined && { nume }),
    ...(prenume !== undefined && { prenume }),
    ...(telefon !== undefined && { telefon }),
    ...(email !== undefined && { email }),
    ...(localitate !== undefined && { localitate }),
    ...(strada !== undefined && { strada }),
    ...(codPostal !== undefined && { cod_postal: codPostal })
  }

  const keys = Object.keys(fields)
  if (keys.length === 0) {
    return res.status(400).json({ error: 'Nimic de actualizat' })
  }

  const setClauses = keys.map((k, i) => `${k} = $${i + 1}`).join(', ')
  const values = keys.map(k => fields[k])

  const client = await pool.connect()

  try {
    const q = `
      UPDATE utilizatori
      SET ${setClauses}
      WHERE id = $${values.length + 1}
      RETURNING id, nume, prenume, email, telefon, localitate, strada, cod_postal
    `

    const result = await client.query(q, [...values, id])
    res.json({success: true, user: result.rows[0]})
  } catch (error) {
     console.error('Eroare PATCH utilizatori:', error)

     res.status(500).json({error: 'Eroare DB'})
  } finally {
    client.release()
  }
})

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Website backend is alive',
    timestamp: new Date().toISOString()
  })
})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});