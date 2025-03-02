import React from 'react';
import questionImage from "../images/FAQ.jpg";

function FAQs() {
  return (
    <div className="main-content">
      {/* FAQS Header */}
      <div className="contact-header">
        <div className="line"></div>
        <h1>Frequently Asked Questions FAQ'S</h1>
        <div className="line"></div>
      </div>

      {/* FAQS Image */}
      <div>
        <img src={questionImage} alt="FAQS" className="full-page-img" />
      </div>

      {/* FAQ Box Section */}
      <div className="faq-box-container">
        
        {/* Hotel FAQS */}
        <div className="faq-box">
          <h2 className="faq-subheader">Questions Asked About the Hotel</h2>

          <div className="faq-item">
            <h3 className="faq-question">1. What time is check-in and check-out?</h3>
            <p className="faq-answer">
              Check-in is from 3:00 PM, and check-out is by 11:00 AM. Early check-in and late check-out are available upon request, subject to availability.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">2. Are pets allowed at the hotel?</h3>
            <p className="faq-answer">
              We welcome small, well-behaved pets in select rooms. Kindly inform us in advance to ensure we can accommodate your furry companion.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">3. Is there a spa and wellness centre?</h3>
            <p className="faq-answer">
              Yes, our luxurious spa offers a range of treatments, from rejuvenating massages to personalized facials. We also have a fully equipped fitness centre and sauna.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">4. Does the hotel have a pool?</h3>
            <p className="faq-answer">
              Yes, our stunning outdoor infinity pool offers breathtaking views, luxurious sun loungers, and poolside service for drinks and light bites.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">5. Is there free Wi-Fi available at the hotel?</h3>
            <p className="faq-answer">
              Yes, we provide complimentary high-speed Wi-Fi throughout the hotel, including guest rooms, the lobby, and all common areas.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">6. Does the hotel offer room service?</h3>
            <p className="faq-answer">
              Yes, our 24/7 room service allows guests to enjoy delicious meals, snacks, and beverages in the comfort of their rooms.
            </p>
          </div>
        </div>

        {/* Transport FAQS */}
        <div className="faq-box">
          <h2 className="faq-subheader">Questions Asked About Transport</h2>

          <div className="faq-item">
            <h3 className="faq-question">1. Are there public buses near the hotel?</h3>
            <p className="faq-answer">
              Yes, our hotel is conveniently located near several bus stops, providing easy access to public transport. Malta’s bus network connects Mellieħa to major destinations, including Valletta, Sliema, and Mdina.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">2. How far is the hotel from the airport?</h3>
            <p className="faq-answer">
              The hotel is approximately 25 km from Malta International Airport, which is about a 40 to 50-minute drive depending on traffic.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">3. Is taxi service available near the hotel?</h3>
            <p className="faq-answer">
              Yes, taxis are readily available near the hotel, and we can also arrange a private taxi for you. Ride-hailing apps like Bolt and eCabs are also widely used in Malta for convenient transportation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
