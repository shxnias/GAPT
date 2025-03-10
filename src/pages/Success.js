import React from "react";
import NavigateButton from "./NavigateButton";

function Success() {
  return (
    <div className="thank-you-container">
      <div className="content-pane">
        <h1>Thank you for your booking!</h1>
        <div className="divider">
          <p>Booking details will be sent through email.</p>
          <p>Reference Number:</p>
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
