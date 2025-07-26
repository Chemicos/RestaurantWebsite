import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});