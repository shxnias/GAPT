import React, {useState} from 'react';
import mainBanner from "../images/mainBanner.jpg";
import './Homepage.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 


function Home() {
  // Image slider state
  const [currentIndex, setCurrentIndex] = useState(1);
  
  // Images
  const images = [
    {src: "/homepage images/Gym.jpg", text: "Unleash your inner strength at our state-of-the-art gym, where cutting-edge equipment meets a motivating atmosphere. Push your limits in spacious, fully-equipped workout areas, or find your zen in our dedicated stretching and yoga zones. Whether you're lifting, running, or focusing on wellness, every moment here is designed to elevate your fitness journey in style and comfort."},
    {src: "/homepage images/Pool.jpg", text: "Immerse yourself in pure relaxation at our stunning outdoor pool, where crystal-clear waters meet breathtaking surroundings. Bask in the sun on plush loungers or take a refreshing dip in an oasis of serenity and luxury."},
    {src: "/homepage images/Spa.jpg", text: "Indulge in ultimate relaxation at our luxurious spa, where soothing treatments and serene surroundings create the perfect escape. Rejuvenate your body and mind with a range of therapeutic massages, facials, and wellness rituals, all designed to transport you to a state of pure tranquility. Let the calming ambiance and expert therapists restore your balance and leave you feeling refreshed, renewed, and revitalized."}
  ];

  //Function to handle the previous image
  const prevSlide = () => {
    setCurrentIndex((prev)=>
    (prev === 0 ? images.length -1 : prev -1)
    );
  };

  // Function to handle the next image
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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

    {/* About Us Text */}
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

      <div 
        className="slider-wrapper"
        // style={{
        //   transform: `translateX(${-currentIndex * 70}%)`, // Moves images dynamically
        // }}
        >
      
        {images.map((img, index) =>(
          <div key={index} className={`slide-container ${index === currentIndex ? 'active' : ''}`}>
          <img
            src={img.src}
            alt={`Slide ${index}`}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          />
          <div className="overlay">
            <p className="text">{img.text}</p> 
          </div>
        </div>
      ))}
    </div>

      <button className="right-arrow" onClick={nextSlide}>&gt;</button>
    </div>
    
    </div>
  );
}

export default Home;