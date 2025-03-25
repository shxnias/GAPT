import React from "react";
import aboutImage from "../images/aboutUs.jpg";
import storyImage from "../images/storyImage.jpg";
import ourTeam from "../images/ourTeam.jpg";
import NavigateButton from "./NavigateButton";

function About() {
  return (
    <div className="main-content">
      {/* About Us Header */}
      <div className="contact-header">
        <div className="line"></div>
        <h1>About Us</h1>
        <div className="line"></div>
      </div>

      {/* About Us Image */}
      <div>
      <img src={aboutImage} alt="AboutUs" className="full-page-img" />
        <div className="main-image-text">
          <h1>55 Years of Excellence</h1>
        </div>
      </div>
        
     

      {/* Legacy of Excellence Section */}
      <div className="text-box-container">
        <h2 className="legacy-title">Legacy of Excellence</h2>
        <div className="legacy-text-container">
          <p className="legacy-text">
            At The Opulence Luxury Hotel, we pride ourselves on delivering
            exceptional experiences. From the moment you step through our doors,
            you are greeted with warm smiles and personalized service.
          </p>
          <p className="legacy-text">
            Our beautifully designed interiors, state-of-the-art facilities, and
            commitment to excellence make us a premier choice for travelers from
            around the world.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="story-section">
        <div className="story-text" style={{ textAlign: "left" }}>
          <h2 className="legacy-title" style={{ textAlign: "left" }}>
            The Story of The Opulence
          </h2>

          <div
            className="legacy-text-container"
            style={{ alignItems: "flex-start", textAlign: "left" }}
          >
            <p className="legacy-text">
              Since 1988, The Opulence has stood as a haven of elegance and
              tranquility in Mellieha. Once a secluded coastal retreat, it soon
              became a sought-after destination for those seeking refined
              comfort by the Mediterranean.
            </p>
            <p className="legacy-text">
              With its timeless architecture and impeccable service, The
              Opulence blends tradition with modern luxury, ensuring every guest
              enjoys an unforgettable stay.
            </p>
          </div>
        </div>

        <div className="story-image">
          <img
            src={storyImage}
            alt="The Opulence Hotel"
            className="full-page-img"
          />
        </div>
      </div>

      {/* Our Team Section*/}
      <div className="story-section">
        <div className="story-image">
          <img src={ourTeam} alt="The Team" className="full-page-img" />
        </div>

        <div className="story-text" style={{ textAlign: "right" }}>
          <h2 className="legacy-title" style={{ textAlign: "right" }}>
            Our Team
          </h2>

          <div
            className="legacy-text-container"
            style={{ alignItems: "flex-start", textAlign: "right" }}
          >
            <p className="legacy-text">
              At The Opulence, our staff is the heart of our hospitality. With
              warmth, discretion, and attention to detail, we ensure every stay
              is seamless and unforgettable.
            </p>
            <p className="legacy-text">
              Our chefs craft exquisite dishes inspired by Malta and the
              Mediterranean. Our concierge team curates personalized experiences
              with effortless grace.
            </p>
            <p className="legacy-text">
              Our housekeeping team upholds the highest standards of comfort and
              elegance. Excellence is not just a promise. It is who we are.
            </p>
          </div>
        </div>
      </div>

      {/* Reserve Section */}
      <div className="reserve-container">
        <p className="reserve-text">
          Indulge in an unforgettable stay at The Opulence
          <br />
          Reserve your exquisite retreat today.
        </p>
        <div className="proceed">
          <NavigateButton to="/" label="Book Now" />
        </div>
      </div>
    </div>
  );
}

export default About;
