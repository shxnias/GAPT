import React from "react";
import NavigateButton from "./NavigateButton";
import "../success.css";
import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation(); 
  const reference = location.state?.reference || "Unavailable";
  
  return (
    <div className="thank-you-container">
      <div className="content-pane">
        <h1>Thank you for your booking!</h1>
        <div className="divider">
          <p>Booking details will be sent through email.</p>
          <p>Reference Number:<strong>{reference}</strong></p>
          <div>
            <NavigateButton to="/" label="Go to Home" />
          </div>
        </div>
      </div>
      <img
        className="background"
        src="/hotel-pics/background.jpg"
        alt="hotel"
      />
    </div>
  );
}

export default Success;
