/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

app.get('/api/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({err: 'Internal Server Error'});
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
    const query = `
      SELECT items FROM comenzi_temporare 
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

app.delete('/api/comenzi_temporare', async (req, res) => {
  const {session_id, user_id, item_name} = req.body

  if (!item_name || (!session_id && !user_id)) {
    return res.status(400).json({error: 'Lipseste item_name si identificator (user_id sau session_id)'})
  }

  const client = await pool.connect()
  const identifierColumn = user_id ? 'user_id' : 'session_id'
  const identifierValue = user_id || session_id

  try {
    const {rows} = await client.query(`
      SELECT ctid FROM comenzi_temporare
      WHERE ${identifierColumn} = $1 AND items->>'name' = $2
      LIMIT 1
    `, [identifierValue, item_name])

    if(rows.length === 0) {
      return res.status(404).json({error: 'Comanda nu a fost gasita'})
    }

    const ctid = rows[0].ctid
    
    await client.query(`
      DELETE FROM comenzi_temporare WHERE ctid = $1  
    `, [ctid])
    res.json({success: true})
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
        secure: false,
        sameSite: 'lax',
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
      secure: false, // setează `true` în producție cu HTTPS
      sameSite: 'lax',
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
      SELECT prenume, nume, email, telefon FROM utilizatori WHERE id = $1
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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});