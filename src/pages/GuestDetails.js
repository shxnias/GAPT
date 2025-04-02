import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import countryCodes from "./CountryCodes"; // For country code and country select options
import "../guestdetails.css";

function GuestDetails() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    surname: "",
    email: "",
    verifyEmail: "",
    phoneCode: "",
    mobile: "",
    country: "",
    checkInTime: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Clear error for the changed field when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phoneRegex = /^[0-9\s-]+$/; // Allow numbers, spaces, and dashes

    if (!formData.title) {
      newErrors.title = "Please select a title.";
    }

    if (!formData.name) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "Name can only include letters, spaces, apostrophes or hyphens.";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters.";
    }

    if (!formData.surname) {
      newErrors.surname = "Surname is required.";
    } else if (!nameRegex.test(formData.surname)) {
      newErrors.surname =
        "Surname can only include letters, spaces, apostrophes or hyphens.";
    } else if (formData.surname.length > 50) {
      newErrors.surname = "Surname must be less than 50 characters.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.verifyEmail) {
      newErrors.verifyEmail = "Please re-enter your email.";
    } else if (formData.verifyEmail !== formData.email) {
      newErrors.verifyEmail = "Email addresses do not match.";
    }

    if (!formData.phoneCode) {
      newErrors.phoneCode = "Please select your country code.";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile =
        "Mobile number can only include numbers, spaces, or dashes.";
    } else if (formData.mobile.replace(/\D/g, "").length < 7) {
      newErrors.mobile = "Mobile number seems too short.";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country of residence.";
    }

    if (!formData.checkInTime) {
      newErrors.checkInTime = "Please select a check-in time.";
    }

    if (formData.specialRequests && formData.specialRequests.length > 500) {
      newErrors.specialRequests =
        "Special requests must be less than 500 characters.";
    }

    return newErrors;
  };

  // Compute form validity each render
  const isFormValid = Object.keys(validate()).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form Submitted:", formData);
    navigate("/payment");
  };

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
      </div>

      <span className="go-back-link" onClick={() => navigate(-1)}>
        ← Go Back
      </span>
      <h2 className="subheader">Input your details</h2>
      <div className="guest-details">
        <div className="guest-details-form">
          <form onSubmit={handleSubmit} noValidate>
            <div className="booking-form">
              <div className="form-grid">
                {/* First Row (Title & Name on the same line) */}
                <div className="form-group">
                  <label>Name</label>
                  <div className="input-group">
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name..."
                      required
                    />
                  </div>
                  {errors.title && <div className="error">{errors.title}</div>}
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>

                {/* Surname */}
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
                  {errors.surname && (
                    <div className="error">{errors.surname}</div>
                  )}
                </div>

                {/* Email & Verify Email */}
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
                  {errors.email && <div className="error">{errors.email}</div>}
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
                  {errors.verifyEmail && (
                    <div className="error">{errors.verifyEmail}</div>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="input-group">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Country Code</option>
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} ({country.name})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number..."
                      required
                    />
                  </div>
                  {errors.phoneCode && (
                    <div className="error">{errors.phoneCode}</div>
                  )}
                  {errors.mobile && (
                    <div className="error">{errors.mobile}</div>
                  )}
                </div>

                {/* Country of Residence */}
                <div className="form-group">
                  <label>Country of Residence</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your country</option>
                    {countryCodes.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <div className="error">{errors.country}</div>
                  )}
                </div>

                {/* Check-in Time */}
                <div className="form-group">
                  <label>Check-in Time</label>
                  <input
                    type="time"
                    name="checkInTime"
                    value={formData.checkInTime}
                    onChange={handleChange}
                    required
                  />
                  {errors.checkInTime && (
                    <div className="error">{errors.checkInTime}</div>
                  )}
                </div>

                {/* Special Requests */}
                <div className="form-group">
                  <label>Special Requests</label>
                  <input
                    type="text"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Enter any special requests..."
                  />
                  {errors.specialRequests && (
                    <div className="error">{errors.specialRequests}</div>
                  )}
                </div>
              </div>
            </div>
            {/* Next Step button without disabled attribute */}
            <button type="submit">Next Step</button>
          </form>
        </div>

        <div className="guest-details-display">
          <h3 className="subheader">Your Choices</h3>
          <div className="booking-details">
            <div className="booking-info">
              <hr />
              <p>
                From 15th June 2025 to 21st June 2025,
                <br />
                check-out 11:00am
                <br />2 adults, 1 child
              </p>
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
              <p>Total Price: €1200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestDetails;
