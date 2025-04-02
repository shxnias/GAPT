const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

pool.connect()
  .then(() => console.log("Connected to Neon PostgreSQL"))
  .catch(err => console.error("Connection error", err));

module.exports = pool;

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

