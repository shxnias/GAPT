const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

pool.connect()
  .then(() => console.log("Connected to Neon PostgreSQL"))
  .catch(err => console.error("Connection error", err));

module.exports = pool;
