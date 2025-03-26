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

app.post("/api/search", (req, res) => {
  const {checkIn, checkOut, guests} = req.body;

  if(!checkIn || !checkOut || !guests){
    return res.status(400).json({error: "All fields are required"})
  }

  const today = new Date().toISOString().split("T")[0];

  if(!checkIn || !checkOut){
    return res.status(400).json({error: "Check-in and Check-out dates are required"});
  }

  if(checkIn < today){
    return res.status(400).json({error: "Check-in date cannot be in the past"})
  }

  if(checkOut <= checkIn){
    return res.status(400).json({error: "Check-out date must be after Check-in date"});
  }

  if(guests < 1){
    return res.status(400).json({error: "At least one guest is required"});
  }

  res.status(200).json({message: "Search successful", checkIn, checkOut, guests});
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
