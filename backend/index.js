import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
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
  const {session_id} = req.query
  if (!session_id) return res.status(400).json({ error: "Lipseste session_id" })

  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT items FROM comenzi_temporare WHERE session_id = $1
    `, [session_id])

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Eroare DB"})
  } finally {
    client.release()
  }
})

app.post('/api/comenzi_temporare', async (req, res) => {
  const { session_id, menu } = req.body
  if(!session_id || !menu) return res.status(400).json({error: 'Date incomplete'})

  const client = await pool.connect()
  try {
    await client.query(`
      INSERT INTO comenzi_temporare (session_id, items, total_partial)
      VALUES ($1, $2, $3)
      `, [
        session_id,
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

app.post('/api/register', async (req, res) => {
  const {nume, prenume, email, telefon, parola, tip_persoana, acceptat_termeni} = req.body

  if (!nume || !prenume || !email || !parola || !tip_persoana) {
    return res.status(400).json({error: 'Datele sunt incomplete'})
  }

  const client = await pool.connect()

  try {
    const hashedPassword = await bcrypt.hash(parola, 10)

    const insertResult = await client.query(`
        INSERT INTO utilizatori (nume, prenume, email, telefon, parola, tip_persoana, acceptat_termeni)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, prenume
      `, [nume, prenume, email, telefon, hashedPassword, tip_persoana, acceptat_termeni])

      const newUser = insertResult.rows[0]

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
  const {email, parola} = req.body

  if(!email || !parola) {
    return res.status(400).json({error: 'Email si parola sunt necesare'})
  }

  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT id, prenume, parola FROM utilizatori WHERE email = $1 
    `, [email])

    if(result.rows.length === 0) {
      return res.status(401).json({error: 'Credentiale invalide'})
    }

    const user = result.rows[0]
    const parolaMatch = await bcrypt.compare(parola, user.parola)

    if(!parolaMatch) {
      return res.status(401).json({error: 'Credentiale invalide'})
    }

    res.json({
      success: true, 
      user: {id: user.id, prenume: user.prenume}
    })
  } catch (error) {
    console.error('Eroare la autentificare:', error)
    res.status(500).json({ error: 'Eroare interna DB' })
  } finally {
    client.release()
  }
})

app.delete('/api/comenzi_temporare', async (req, res) => {
  const {session_id, item_name} = req.body

  if (!session_id || !item_name) {
    return res.status(400).json({error: 'session_id si item_name sunt necesare'})
  }

  const client = await pool.connect()

  try {
    const {rows} = await client.query(`
      SELECT ctid FROM comenzi_temporare
      WHERE session_id = $1 AND items->>'name' = $2
      LIMIT 1
    `, [session_id, item_name])

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});