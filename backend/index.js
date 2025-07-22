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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});