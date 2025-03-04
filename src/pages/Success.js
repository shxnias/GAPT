import React from 'react';

function Success() {
    return (
        <div className="thank-you-container">
        <div className="content-pane">
          <h1>Thank you for your booking!</h1>
          <div className="divider">
          <p>Booking details will be sent through email.</p>
          <p>Reference Number:</p>
          </div>
        </div>
        <img className="background" src="/hotel-pics/background.jpg" alt="hotel" />
      </div>
      
      );
    
}

export default Success;
