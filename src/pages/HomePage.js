import React, {useState} from 'react';
import mainBanner from "../images/mainBanner.jpg";
import './Homepage.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 


function Home() {
  // Image slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Images
  const images = [
    "/homepage images/Gym.jpg",
    "/homepage images/Pool.jpg",
    "/homepage images/Spa.jpg"
  ];

  // Function to handle the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  //Function to hanfle the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex)=>
    prevIndex === 0 ? images.length -1 : prevIndex -1
    );
  };

  return (
    <div className="main-content">
      <div className="search-container">
        <div className="search-box">
          <div className="input-row">
            {/* Check-in Date Container */}
            <div className="field-container">
              <label>Check-in Date</label>
                <input
                  type="date"
                  className="date-input"
                  defaultValue="2025-03-16"
                />
                {/* <CalendarMonthIcon sx={{ fontSize: 18, color: '#402910' }} /> Use the icon */}
              </div>

            {/* Check-out Date Container */}
            <div className="field-container">
              <label>Check-out Date</label>
                <input
                  type="date"
                  className="date-input"
                />
                {/* <CalendarMonthIcon sx={{ fontSize: 18, color: '#402910' }} /> Use the icon */}
              </div>
          

            {/* No. of Guests Container */}
            <div className="field-container">
              <label>No. of Guests</label>
                <input type="number" min="1" defaultValue="2" />
            </div>

            {/* Search Button */}
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>

    {/* Main Banner Image */}
    <div className="mainBanner-container">
    <img src={mainBanner} alt = "Hotel View" className="main-img"/>
    <div className="banner-text">
      <h1>Experience Elegance,
          Indulge in Luxury
      </h1>
    </div>
    </div>

    {/* About Us Text*/}
    <div className="aboutUs-content">
      <h1 className="aboutUs-title">
        The Essence of Mediterranean Luxury
      </h1>
      <p className="aboutUs-text">
      Perched in the scenic coastal town of Mellieħa, The Opulence offers a refined escape where elegance meets tranquility. With breathtaking sea views, world-class amenities, and exclusive suites, it redefines luxury in Malta. Guests can unwind in beautifully designed accommodations, each offering a perfect blend of modern comfort and timeless elegance.
      <br />
      <br/>
      Just moments from Mellieħa Bay and historic landmarks, this five-star retreat is the perfect blend of comfort, sophistication, and authentic Maltese hospitality. A sanctuary of relaxation and indulgence, The Opulence provides an array of premium experiences, from rejuvenating spa treatments to exquisite dining options showcasing the finest Mediterranean cuisine.
      <br />
      <br />
        </p>
    </div>

    {/* Image Slideshow */}
    <div className="slider-container">
      <button className="left-arrow" onClick={prevSlide}>&lt;</button>
      <img src = {images[currentIndex]} alt="Facility" className="slide active" />
      <button className="right-arrow" onClick={nextSlide}>&gt;</button>
    </div>
    
    </div>
  );
}

export default Home;