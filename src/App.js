import React, { useState, useEffect } from "react";
import "./App.css";
import "./Shania.css";
import "./packages.css";
import "./booking.css";
import "./guestdetails.css";
import "./success.css";
import "./findBooking.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

// Import your components or pages
import Booking from "./pages/Booking";
import GuestDetails from "./pages/GuestDetails";
import Packages from "./pages/Packages";
import Payment from "./pages/PaymentDetails";
import Success from "./pages/Success";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Rooms from "./pages/RoomsPage";
import Facilities from "./pages/FacilitiesPage";
import FAQs from "./pages/FAQsPage";
import FindBooking from "./pages/FindBooking";
import Contact from "./pages/ContactPage";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rooms, setRooms] = useState([]); // Add rooms state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch rooms data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms") // Update to match your endpoint
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []); // Empty dependency array to fetch once on mount

  return (
    <Router>
      <div className="app-container">
        {/* Top Nav Bar */}
        <nav className="top-nav">
          {/* Hamburger Icon */}
          <button className="hamburger-icon" onClick={toggleMenu}>
            ☰
          </button>

          {/* Centered Logo */}
          <img src="/logos/Logo-Transparent.png" alt="Logo" className="logo" />
        </nav>

        {/* Side Menu */}
        <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleMenu}>
            ×
          </button>
          <ul>
            <li>
              <Link className="links" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="links" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="links" to="/rooms">
                Rooms
              </Link>
            </li>
            <li>
              <Link className="links" to="/facilities">
                Facilities
              </Link>
            </li>
            <li>
              <Link className="links" to="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="links" to="/faqs">
                FAQs
              </Link>
            </li>
            <li>
              <Link className="links" to="/findbooking">
                Find Your Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}

        <Routes>
          <Route path="/booking" element={<Booking rooms={rooms} />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/guestdetails" element={<GuestDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms rooms={rooms} />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/findbooking" element={<FindBooking />} />
        </Routes>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          {/* Left: Logo */}
          <img src="/logos/Logo-Transparent.png" alt="Logo" className="logo" />

          {/* Center: Contact Us */}
          <a href="#contact" className="nav-item">
            <span className="title">Contact Us</span>
            <br />
            <span className="info">info@theopulence.com</span>
            <br />
            <span className="info">+356 2784 3647</span>
          </a>

          {/* Right: Location */}
          <a href="#locate" className="nav-item">
            <span className="title">Location</span>
            <br />
            <span className="info">57, Seaview Street, Mellieħa</span>
            <br />
            <span className="info">Malta</span>
          </a>
        </nav>
      </div>
    </Router>
  );
}

export default App;
