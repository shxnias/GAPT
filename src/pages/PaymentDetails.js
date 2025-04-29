import React, { useState } from "react";
import NavigateButton from "./NavigateButton";
import { useNavigate } from "react-router-dom";
import "../guestdetails.css";

function Payment() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    // Validate cardholder name: required, only letters and spaces, at least 2 characters
    if (!formData.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.cardholderName)) {
      errors.cardholderName =
        "Cardholder name can only contain letters and spaces";
    } else if (formData.cardholderName.trim().length < 2) {
      errors.cardholderName = "Cardholder name must be at least 2 characters";
    }

    // Validate card number: must be 16 digits (ignoring spaces) and only digits
    const cardNum = formData.cardNumber.replace(/\s+/g, "");
    if (!/^\d+$/.test(cardNum)) {
      errors.cardNumber = "Card number must contain only digits";
    } else if (cardNum.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits";
    }

    // Validate CVV: must be 3 or 4 digits and only digits
    if (!/^\d+$/.test(formData.cvv)) {
      errors.cvv = "CVV must contain only digits";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }

    // Validate expiry date: must not be in the past
    if (formData.expiryDate) {
      const [year, month] = formData.expiryDate.split("-").map(Number);
      const today = new Date();
      // Check if the expiry year is less than the current year
      // Or if it is the same year and the expiry month is before the current month
      if (
        year < today.getFullYear() ||
        (year === today.getFullYear() && month < today.getMonth() + 1)
      ) {
        errors.expiryDate = "Expiry date cannot be in the past";
      }
    } else {
      errors.expiryDate = "Expiry date is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch("http://localhost:5001/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        navigate("/success", { state: { reference: data.reference } });
      } catch (err) {
        console.error("Booking error:", err.message);
      }
    }
  };

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <span className="go-back-link" onClick={() => navigate(-1)}>
          ← Go Back
        </span>
      </div>
      <h2 className="subheader">Input your payment details</h2>

      <div className="payment-details-form">
        <form className="booking-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <h2 className="payment-amount">Payment Amount: 12345 </h2>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
                placeholder="Enter cardholder's name..."
                required
              />
            </div>
          </div>

          {/* Card Number and CVV */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter your card number..."
                required
              />
              {errors.cardNumber && (
                <span className="error">{errors.cardNumber}</span>
              )}
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="Enter CVV..."
                required
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}
            </div>
          </div>

          {/* Expiry Date */}
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="month"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
              {errors.expiryDate && (
                <span className="error">{errors.expiryDate}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Email (to send booking details)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="proceed">
            <button type="submit">Next Step</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
