import React, { useState } from "react";
import mainBanner from "../images/mainBanner.jpg";
import "./Homepage.css";
import DateIcon from "@mui/icons-material/CalendarMonthOutlined";
import NavigateIconRight from "@mui/icons-material/NavigateNext";
import NavigateIconLeft from "@mui/icons-material/NavigateBefore";
import Person from "@mui/icons-material/PersonOutline";
import Bed from "@mui/icons-material/SingleBed";
import AC from "@mui/icons-material/AcUnit";
import AIChatIcon from "@mui/icons-material/ChatOutlined";
import NavigateButton from "./NavigateButton";

function Home() {
  // Image slider state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Images
  const images = [
    {
      src: "/homepage images/facilities/Gym.jpg",
      text: "Unleash your inner strength at our state-of-the-art gym, where cutting-edge equipment meets a motivating atmosphere. Push your limits in spacious, fully-equipped workout areas, or find your zen in our dedicated stretching and yoga zones. Whether you're lifting, running, or focusing on wellness, every moment here is designed to elevate your fitness journey in style and comfort.",
    },
    {
      src: "/homepage images/facilities/Pool.jpg",
      text: "Immerse yourself in pure relaxation at our stunning outdoor pool, where crystal-clear waters meet breathtaking surroundings. Bask in the sun on plush loungers or take a refreshing dip in an oasis of serenity and luxury.",
    },
    {
      src: "/homepage images/facilities/Spa.jpg",
      text: "Indulge in ultimate relaxation at our luxurious spa, where soothing treatments and serene surroundings create the perfect escape. Rejuvenate your body and mind with a range of therapeutic massages, facials, and wellness rituals, all designed to transport you to a state of pure tranquility. Let the calming ambiance and expert therapists restore your balance and leave you feeling refreshed, renewed, and revitalized.",
    },
  ];

  //Function to handle the previous image
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Function to handle the next image
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const rooms_home = [
    { id: "single", name: "Single Room" },
    { id: "double", name: "Double Room" },
    { id: "triple", name: "Triple Room" },
    { id: "family", name: "Family Room" },
  ];

  const [selectedRoom, setSelectedRoom] = useState("single");

  const [currentIndex2, setCurrentIndex2] = useState(0);
  const restaurant_images = [
    { src: "/homepage images/restaurant/Chef.jpg" },
    { src: "/homepage images/restaurant/food1.jpg" },
    { src: "/homepage images/restaurant/people.jpg" },
    { src: "/homepage images/restaurant/food2.jpg" },
  ];

  const goToPrev = () => {
    setCurrentIndex2((prevIndex2) =>
      prevIndex2 === 0 ? restaurant_images.length - 1 : prevIndex2 - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex2((prevIndex2) =>
      prevIndex2 === restaurant_images.length - 1 ? 0 : prevIndex2 + 1
    );
  };

  const [guestCount, setGuestCount] = useState(2); // Default: 2 guests

  // Function to increase guest count
  const increaseGuests = () => {
    setGuestCount((prev) => prev + 1);
  };

  // Function to decrease guest count (min 1)
  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const faqs = [
    {
      question: "What time is check-in and check-out?",
      answer:
        "Check-in is from 3:00 PM, and check-out is by 11:00 AM. Early check-in and late check-outs are available upon request, subject to availability.",
    },
    {
      question: "Are pets allowed at the hotel?",
      answer:
        "We welcome small, well-behaved pets in select rooms. Kindly inforn us in advance to ensure we can accomcodate your furry companion.",
    },
    {
      question: "Is there a spa and wellness centre?",
      answer:
        "Yes, our luxorious spa offers a range of treatments, from rejuvenating massages to personalised facials. We also have a fully equipped fitness centre and sauna.",
    },
    {
      question: "Does the hotel have a pool?",
      answer:
        "Yes, out stunning outdoor infinity pool offers breathtaking views, luxurious sun loungers, and poolside service for drinks and light bites.",
    },
  ];

  return (
    <div className="main-content">
      <button className="ai-chat-button">
        <AIChatIcon className="ai-chat-icon" />
      </button>

      <div className="search-container">
        <div className="search-box">
          <div className="input-row">
            {/* Check-in Date Container */}
            <div className="field-container">
              <div className="icon-container">
                <DateIcon className="search-icons" />
              </div>
              <div className="search-text-container">
                <span className="label">Check-In Date:</span>
                <input
                  type="date"
                  className="date-picker"
                  defaultValue="2025-03-16"
                />
              </div>
            </div>

            {/* Check-out Date Container */}
            <div className="field-container">
              <div className="icon-container">
                <DateIcon className="search-icons" />
              </div>
              <div className="search-text-container">
                <span className="label">Check-out Date:</span>
                <input type="date" className="date-picker" />
              </div>
            </div>

            {/* No. of Guests Container */}
            <div className="field-container">
              <div className="icon-container">
                <Person className="search-icons" />
              </div>
              <div className="search-text-container">
                <span className="label">No. of Guests:</span>
                <div className="guest-stepper">
                  <button className="stepper-button" onClick={decreaseGuests}>
                    -
                  </button>
                  <span>{guestCount}</span>
                  <button className="stepper-button" onClick={increaseGuests}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <NavigateButton to="/booking" label="Search" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Banner Image */}
      <div className="mainBanner-container">
        <img src={mainBanner} alt="Hotel View" className="main-img" />
        <div className="banner-text">
          <h1>
            Experience Elegance,<br></br>Indulge in Luxury
          </h1>
        </div>
      </div>

      {/* About Us Text */}
      <div className="aboutUs-content">
        <h1 className="aboutUs-title">The Essence of Mediterranean Luxury</h1>
        <p className="aboutUs-text">
          Perched in the scenic coastal town of Mellieħa, The Opulence offers a
          refined escape where elegance meets tranquility. With breathtaking sea
          views, world-class amenities, and exclusive suites, it redefines
          luxury in Malta. Guests can unwind in beautifully designed
          accommodations, each offering a perfect blend of modern comfort and
          timeless elegance.
          <br />
          <br />
          Just moments from Mellieħa Bay and historic landmarks, this five-star
          retreat is the perfect blend of comfort, sophistication, and authentic
          Maltese hospitality. A sanctuary of relaxation and indulgence, The
          Opulence provides an array of premium experiences, from rejuvenating
          spa treatments to exquisite dining options showcasing the finest
          Mediterranean cuisine.
          <br />
          <br />
        </p>
      </div>

      {/* Facilities Section */}
      <div className="facilities-container">
        <div className="facilities-header">
          <h1>Our Facilities</h1>
          <button className="facilities-button">Explore More</button>
        </div>
      </div>
      {/* Image Slideshow */}
      <div className="slider-container">
        <button className="left-arrow" onClick={prevSlide}>
          <NavigateIconLeft style={{ fontSize: 40 }} />
        </button>

        {/* Image Slider */}
        <div className="slider-wrapper">
          {images.map((img, index) => {
            // Determine class based on position
            let position = "nextSlide";
            if (index === currentIndex) position = "activeSlide";
            else if (
              index ===
              (currentIndex - 1 + images.length) % images.length
            )
              position = "prevSlide";

            return (
              <div key={index} className={`slide-container ${position}`}>
                <img src={img.src} alt={`Slide ${index}`} className="slide" />
                <div className="overlay">
                  <p className="text">{img.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="right-arrow" onClick={nextSlide}>
          <NavigateIconRight style={{ fontSize: 40 }} />
        </button>
      </div>

      {/* Hotel Rooms */}
      <div className="home-rooms-container">
        <div className="home-rooms-header">
          <h1>Explore Our Rooms</h1>
          <p>
            Each room is designed for both elegance and comfort, offering a
            perfect retreat whether you're in Malta for a long stay or a quick
            getaway.
          </p>
          <div className="room-tabs">
            {rooms_home.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`room-tab ${
                  selectedRoom === room.id ? "active" : ""
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="home-room-container">
        {/* Room Image */}
        <div className="home-room-image">
          <img src="/homepage images/Single Room.jpg" alt="Single Room" />
        </div>

        {/* Room Details */}
        <div className="home-room-details">
          <h2> Single Room</h2>

          {/* Room Features */}
          <ul className="home-room-features">
            <li>
              <Person /> Max 1 Guest
            </li>
            <li>
              <Bed /> x1 Single Bed
            </li>
            <li>
              <AC></AC> Air Conditioning
            </li>
          </ul>
          {/* Room Description */}
          <p>
            Experience refined comfort in our Single Room. This elegantly
            designed space features a plush single bed and modern amenities,
            ensuring a relaxing and seamless stay in pure tranquility.
          </p>
        </div>
      </div>
      <div className="view-all-container">
        <button className="view-all-rooms-button"> View All Rooms</button>
      </div>

      {/* Restaurant Slideshow */}
      <div className="restaurant-slideshow-container">
        <div className="slideshow-text">
          <h1>Dine With Us</h1>
          <p>The Garden Buffet Restaurant</p>
        </div>
        <div className="restaurant-slideshow">
          <img
            src={restaurant_images[currentIndex2].src}
            alt={`Slide ${currentIndex2}`}
          />
        </div>
        <button className="left-arrow" onClick={goToPrev}>
          <NavigateIconLeft style={{ fontSize: 40 }} />
        </button>
        <button className="right-arrow" onClick={goToNext}>
          <NavigateIconRight style={{ fontSize: 40 }} />
        </button>
      </div>

      {/* FAQs */}
      <div className="faqs-wrapper">
        <div className="faqs-container">
          <h1 className="faqs-title">FAQs</h1>
          <h2 className="faqs-subtitle">Get Informed</h2>

          <div className="faqs-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <p className="faq-question">
                  {index + 1}. <strong>{faq.question}</strong>
                </p>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>

          <button className="see-more-button">See More</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
