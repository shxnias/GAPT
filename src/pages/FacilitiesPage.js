import React from 'react';

function Facilities() {
  return (
    <div className="main-content">

       {/* Facilities Header */}
       <div className="contact-header">
        <div className="line"></div> 
        <h1>Our Facilities</h1>
        <div className="line"></div> 

{/* Spa Facility*/}
        <div className="spa-container">
      <div className="spa-content">
        <img src={"/homepage images/facilities/Spa.jpg"} alt="Spa Massage" className="spa-image" />
        <div className="spa-text-box">
          <h2 className="spa-title">Spa & Wellness Center</h2>
          <div className="spa-description">
            <p>
              Step into tranquility at our full-service spa, where serenity meets luxury. 
              Enjoy a wide range of treatments, from relaxing massages and revitalizing facials to 
              holistic therapies and beauty treatments.
            </p>
            <p>
              Our expert therapists ensure a personalized experience, helping you 
              unwind and recharge in a peaceful ambiance.
            </p>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>
  );
}

export default Facilities;
