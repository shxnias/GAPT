import React, { useState } from "react";
import NavigateButton from "./NavigateButton";

function Payment() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
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
      <h2 className="subheader">Input your payment details</h2>
      
        <div className="payment-details-form">
          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="form-row">
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

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="Enter your card number..."
                  required
                />
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
              </div>
            </div>

            {/* Row 3 */}
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
              </div>
            </div>

            <div className="proceed">
              <NavigateButton to="/success" label="Next Step" />
            </div>
          </form>
        </div>
      
    </div>
  );
}

export default Payment;
