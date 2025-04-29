const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 10000,          // 10 seconds (reasonable idle timeout)
  connectionTimeoutMillis: 10000     // 10 seconds (allow enough time for connection)
});


pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.query('SELECT 1')
  .then(() => console.log('Connected to Neon PostgreSQL'))
  .catch((err) => console.error('Connection error', err));

  module.exports = pool;