import "../index2.css";

function Contact() {
  return (
    <div className="main-content">
      {/* Contact Header */}
      <div className="contact-header">
        <div className="line"></div>
        <h1>Contact Us</h1>
        <div className="line"></div>
      </div>

      {/* Contact Image */}
      <div>
      <img src="/miscellaneous/contactUs.jpg" alt="AboutUs" className="full-page-img" />
      </div>

      {/* Brown Box Section */}
      <div className="brown-box-container">
        <div className="brown-box-content">
          <div className="map-container">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15746.954682072845!2d14.331494371271692!3d35.98504832008722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4c6efdbc9b07%3A0x390775b8080bc908!2sRamla%20Bay%20Resort!5e0!3m2!1sen!2smt!4v1740926495004!5m2!1sen!2smt"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="brown-box-text">
            <p>
              Thank you for visiting The Opulence website.
              <br />
              <br />
              For any additional information about our luxury hotel in Mellieha,
              Malta, we are happy to assist. Located in one of Malta's most
              picturesque coastal areas. The Opulence offers breathtaking views
              and world-class hospitality.
              <br />
              <br />
              Our team is here to help before and during your stay. Reach out
              via phone or email, and we look forward to welcoming you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="details-section">
        <h2 className="details-header">Details</h2>
        <hr className="details-line" />
        <div className="details-content">
          <p>
            <span className="details-label">Phone</span>{" "}
            <span className="details-text">+356 2784 3647</span>
          </p>
          <p>
            <span className="details-label">Email Address</span>{" "}
            <span className="details-text">info@thepolulence.com.mt</span>
          </p>
          <p>
            <span className="details-label">Location</span>{" "}
            <span className="details-text">
              57, Seaview Street, Mellieha, Malta
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
