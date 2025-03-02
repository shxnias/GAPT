import React, { useState } from "react";
import NavigateButton from "./NavigateButton";

function GuestDetails() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    verifyEmail: "",
    mobile: "",
    country: "",
    checkInTime: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="general-text">Go back to modify booking details</p>
      </div>
      <h2 className="subheader">Input your details</h2>
      <div className="guest-details">
        <div className="guest-details-form">
          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Enter your surname..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Verify Email</label>
                <input
                  type="email"
                  name="verifyEmail"
                  value={formData.verifyEmail}
                  onChange={handleChange}
                  placeholder="Re-enter your email..."
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Country of Residence</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Check-in Time</label>
                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <input
                  type="text"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Enter any special requests..."
                />
              </div>
            </div>
            <div className="proceed">
              <NavigateButton to="/payment" label="Next Step" />
            </div>
          </form>
        </div>

        <div className="guest-details-display">
          <h3 className="subheader">Your Choices</h3>
          <hr />

          <div className="booking-details">
            <p>
              From 15th June 2025 to 21st June 2025,
              <br />
              check-out 11:00am
              <br />2 adults, 1 child
            </p>

            <div className="booking-info">
              <hr />

              <p>Room: Standard Triple Room</p>
              <ul className="amenities-list">
                <li>
                  <span>5 nights</span> <span className="price">€15</span>
                </li>
              </ul>

              <hr />
              <p>Amenities:</p>
              <ul className="amenities-list">
                <li>
                  <span>24/7 Gym</span> <span className="price">€0</span>
                </li>
                <li>
                  <span>Unlimited Spa</span> <span className="price">€20</span>
                </li>
                <li>
                  <span>Parking</span> <span className="price">€15</span>
                </li>
              </ul>
              <hr />

              <p>Packages:</p>
              <ul className="amenities-list">
                <li>
                  <span>Full Package</span> <span className="price">€50</span>
                </li>
              </ul>
              <hr />

              <p>Tours:</p>
              <ul className="amenities-list">
                <li>
                  <span>Imdina Tour</span> <span className="price">€30</span>
                </li>
                <li>
                  <span>Valletta Tour</span> <span className="price">€40</span>
                </li>
                <li>
                  <span>Blue Grotto Tour</span>{" "}
                  <span className="price">€40</span>
                </li>
              </ul>
              <hr />
            </div>

            <p>Total Price: €1200</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestDetails;
