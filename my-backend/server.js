const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample Route to Fetch Data
app.get("/api/rooms", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
