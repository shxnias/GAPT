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

{/* Gym Facility*/}
<div className="spa-container">
      <div className="spa-content">
        <img src={"/homepage images/facilities/Gym.jpg"} alt="Gym" className="spa-image" />
        <div className="spa-text-box">
          <h2 className="spa-title">Fitness Center</h2>
          <div className="spa-description">
            <p>
            Stay active during your stay at our modern gym,
            fully equipped with the latest cardio machines, free weights, and strength-training equipment. 
            </p>
            <p> Open 24/7.</p>
            <p>It caters to all fitness levels, with personal trainers available upon request.</p>
            
          </div>
        </div>
      </div>
    </div>

{/* Pool Facility*/}
<div className="spa-container">
      <div className="spa-content">
        <img src={"/homepage images/facilities/Pool.jpg"} alt="Pool" className="spa-image" />
        <div className="spa-text-box">
          <h2 className="spa-title">Heated Indoor & Outdoor Pools</h2>
          <div className="spa-description">
            <p>
            Take a dip in our pristine pools, open year-round. Whether you prefer a refreshing swim under the sun or a cozy evening dip indoors, 
            our pools offer the perfect setting. Comfortable loungers, poolside service, and a dedicated kids' area ensure a relaxing time for all.
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
