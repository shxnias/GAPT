import React, { useState } from "react";
import "../findBooking.css";

const FindBooking = () => {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooking = async () => {
    if (loading) return;

    setError("");
    setBooking(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5001/api/booking?email=${encodeURIComponent(
          email
        )}&reference=${encodeURIComponent(reference)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch booking");
      }

      setBooking(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="contact-header">
        <div className="line"></div>
        <h1>Find your Booking</h1>
        <div className="line"></div>
      </div>
      <div className="search-booking">
        <p>
          Enter your email and booking reference to retrieve your booking
          details.
        </p>
      </div>
      <div className="find-form">
        <div className="reference-input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter booking reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button
            className="navigate-button"
            onClick={fetchBooking}
            disabled={!email || !reference || loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}

        {booking ? (
          <div className="booking-details">
            <h3>Booking Details</h3>
            <p>
              <strong>Reference:</strong> {booking.reference_number}
            </p>
            <p>
              <strong>Name:</strong> {booking.name} {booking.surname}
            </p>
            <p>
              <strong>Number of Guests:</strong> {booking.num_guests}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Rooms:</strong> {booking.room_names.join(", ")}
            </p>
            <p>
              <strong>Check-in:</strong> {booking.start_date}
            </p>
            <p>
              <strong>Check-out:</strong> {booking.end_date}
            </p>
            <p>
              <strong>Check-In Time:</strong> {booking.check_in_time}
            </p>
            <p>
              <strong>Check-Out Time:</strong> From 9:00 to 15:00
            </p>
            <br></br>
            <p>
              Guests are required to show a photo identification and credit card
              upon check-in. You'll need to let the property know in advance
              what time you'll arrive.
            </p>
            <p>
              A damage deposit of € 150 is required on arrival. This will be
              collected by credit card. You should be reimbursed within 14 days
              of check-out. Your deposit will be refunded in full via credit
              card, subject to an inspection of the property.
            </p>
          </div>
        ) : (
          !loading && !error && <p>No booking found.</p>
        )}
      </div>
    </div>
  );
};

export default FindBooking;
