const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Use environment port or 5000

app.use(cors());
app.use(express.json());

// PostgreSQL Pool Configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Root route (added this)
app.get('/', (req, res) => {
  res.send('Welcome to The Opulence API');
});

// Sample Route to Fetch Data from 'Rooms' Table
app.get('/api/rooms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Rooms'); // Fetching all rooms
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
