import React from "react";
import NavigateButton from "./NavigateButton";

function FindBooking() {
  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">Find your Booking</h1>
      </div>
      <div className="search-booking">
        <p>
          Type in your email and the reference number of your booking to find
          booking details.
        </p>
        <div className="reference-input">
          <input
            type="text"
            placeholder="Reference Number"
            className="input-booking"
          />
          <input type="email" placeholder="Email" className="input-booking" />
        </div>
        <div>
          <NavigateButton
            className="proceed"
            to="/packages"
            label="Next Step"
          />
        </div>
      </div>
    </div>
  );
}

export default FindBooking;
