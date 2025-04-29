const express = require("express");
const pool = require("./db");
const cors = require("cors");
const session = require("express-session");
const nodemailer = require("nodemailer");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

// Search for rooms 
app.post("/api/search", (req, res) => {
  const { checkIn, checkOut, guests } = req.body;

  if (!checkIn || !checkOut || !guests) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const today = new Date().toISOString().split("T")[0];

  if (!checkIn || !checkOut) {
    return res
      .status(400)
      .json({ error: "Check-in and Check-out dates are required" });
  }

  if (checkIn < today) {
    return res
      .status(400)
      .json({ error: "Check-in date cannot be in the past" });
  }

  if (checkOut <= checkIn) {
    return res
      .status(400)
      .json({ error: "Check-out date must be after Check-in date" });
  }

  if (guests < 1) {
    return res.status(400).json({ error: "At least one guest is required" });
  }

  res
    .status(200)
    .json({ message: "Search successful", checkIn, checkOut, guests });
});

// Fetch all rooms for the booking page
app.get("/api/rooms", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms ORDER BY room_id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Display room prices
app.get("/api/room-prices/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const nights = Number(req.query.nights) || 1;
    
    const queryText=`
      SELECT board_id, total_price
      FROM room_board_prices
      WHERE room_id = $1
    `;
    const {rows} = await pool.query(queryText, [roomId]);

    // If no result, send 404
    if (rows.length === 0) {
      return res.status(404).json({ error: "No price for this room" });
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
  } catch (error) {
    console.error("Error fetching room price:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
const { ADMIN_PASSWORD } = process.env;
const rateLimit = require("express-rate-limit");

// Limit login attempts to prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: "Too many login attempts. Try again later.",
});

// Defining the login logic separately
const loginHandler = (req, res) => {
  const { password } = req.body;

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ message: "Admin password not configured" });
  }

  if (password === ADMIN_PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
};

// Use limiter + handler
app.post("/api/login", loginLimiter, loginHandler);


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
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

// Booking Lookup
app.get("/api/booking", async (req, res) => {
  const { email, reference } = req.query;

  if (!email || !reference) {
    return res.status(400).json({ error: "Email and reference are required." });
  }

  try {
    const query = `
      SELECT 
        b.reference_number, 
        b.num_guests,
        TO_CHAR(b.start_date, 'YYYY-MM-DD') AS start_date,
        TO_CHAR(b.end_date, 'YYYY-MM-DD') AS end_date,
        g.email,
        g.name,
        g.surname,
        TO_CHAR(g.check_in_time, 'HH24:MI') AS check_in_time,
        ARRAY_AGG(r.room_name) AS room_names
      FROM booking b
      JOIN guest_details g ON b.booking_id = g.booking_id
      JOIN booking_rooms br ON b.booking_id = br.booking_id
      JOIN rooms r ON br.room_id = r.room_id
      WHERE g.email = $1 AND b.reference_number = $2
      GROUP BY 
        b.reference_number, b.num_guests, b.start_date, b.end_date, 
        g.email, g.name, g.surname, g.check_in_time
    `;

    const result = await pool.query(query, [email, reference]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/admin/dashboard-stats", async (req, res) => {
  try {
    const bookedRoomsQuery = `
      SELECT COUNT(DISTINCT br.room_id) AS booked_rooms
      FROM booking_rooms br
      JOIN booking b ON br.booking_id = b.booking_id
      WHERE CURRENT_DATE BETWEEN b.start_date AND b.end_date
    `;

    const availableRoomsQuery = `
      SELECT COUNT(*) - (
        SELECT COUNT(DISTINCT br.room_id)
        FROM booking_rooms br
        JOIN booking b ON br.booking_id = b.booking_id
        WHERE CURRENT_DATE BETWEEN b.start_date AND b.end_date
      ) AS available_rooms
      FROM rooms
    `;

    const upcomingCheckInsQuery = `
      SELECT COUNT(*) AS upcoming_checkins
      FROM guest_details
      WHERE check_in_time::date = CURRENT_DATE
    `;

    const upcomingCheckOutsQuery = `
      SELECT COUNT(*) AS upcoming_checkouts
      FROM booking
      WHERE end_date = CURRENT_DATE
    `;
    const bookedResult = await pool.query(bookedRoomsQuery);
    const availableResult = await pool.query(availableRoomsQuery);
    const checkInsResult = await pool.query(upcomingCheckInsQuery);
    const checkOutsResult = await pool.query(upcomingCheckOutsQuery);

    res.json({
      booked_rooms: bookedResult.rows[0].booked_rooms,
      available_rooms: availableResult.rows[0].available_rooms,
      upcoming_checkins: checkInsResult.rows[0].upcoming_checkins,
      upcoming_checkouts: checkOutsResult.rows[0].upcoming_checkouts,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

app.get("/api/admin/room-status-data", async (req, res) => {
  try {
    const query = `
      SELECT 
  ri.room_type AS name,
  ri.total_quantity,
  COUNT(b.booking_id) FILTER (
    WHERE CURRENT_DATE BETWEEN b.start_date AND b.end_date
  ) AS "Booked",
  (ri.total_quantity - COUNT(b.booking_id) FILTER (
    WHERE CURRENT_DATE BETWEEN b.start_date AND b.end_date
  )) AS "Available"
FROM room_inventory ri
LEFT JOIN rooms r ON r.room_name = ri.room_type
LEFT JOIN booking_rooms br ON r.room_id = br.room_id
LEFT JOIN booking b ON br.booking_id = b.booking_id
GROUP BY ri.room_type, ri.total_quantity
ORDER BY ri.room_type;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Room status chart error:", err);
    res.status(500).json({ error: "Failed to fetch room status chart" });
  }
});


app.post("/api/booking", async (req, res) => {
  const { cardholderName, email } = req.body;

  console.log("New booking received from:", email, cardholderName);

  // Generate a fake reference number
  const crypto = require("crypto");
  const reference = crypto.randomBytes(6).toString("hex").toUpperCase();

  //Nodemailer transporter with Gmail and App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,    
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  // Email content
  const mailOptions = {
    from: "theopulencehotel@gmail.com",            
    to: email,                              
    subject: "Booking Confirmation - The Opulence Hotel",
    text: 
    `Dear ${cardholderName},

    Thank you for your booking at The Opulence Hotel!

    Your booking reference number is: ${reference}

    Keep this reference to view or manage your booking through our website.

    We look forward to your stay!

    Warm regards,  
    The Opulence Hotel Team`,
      };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", email);
    res.status(200).json({
      success: true,
      reference: reference,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send confirmation email" });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
