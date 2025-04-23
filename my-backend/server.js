const express = require("express");
const pool = require("./db");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' ,
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'superSecretKey123',
  resave: false,
  saveUninitialized: true,
}));

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

app.get("/api/room-prices/:roomId", async (req, res) => {
  try{
    const {roomId} = req.params;
    const nights = Number(req.query.nights) || 1;
    
    const queryText=`
      SELECT board_id, total_price
      FROM room_board_prices
      WHERE room_id = $1
    `;
    const {rows} = await pool.query(queryText, [roomId]);

    // If no result, send 404
    if (rows.length === 0){
      return res.status(404).json({error: "No price for this room"});
    }

    const boardIdMap = {
     1: "breakfast",
     2: "halfBoard",
     3: "fullBoard"
    };

    const priceMap = {};
    rows.forEach(row => {
      const boardType = boardIdMap[row.board_id];
      priceMap[boardType] = row.total_price * nights;
    });

    return res.json(priceMap);
  } catch (error){
    console.error("Error fetching room price:", error);
    return res.status(500).json({error: "Server error"});
  }
});

// Login route
const ADMIN_PASSWORD = 'pizzadog'; //password

app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

//authentication
app.get("/api/check-auth", (req, res) => {
  if (req.session.authenticated) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

//log out
app.post("/api/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); 
    res.json({ message: "Logged out" });
  });
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
