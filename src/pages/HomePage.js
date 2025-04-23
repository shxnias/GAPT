import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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
import { useBooking } from "../BookingContext";
import { useNavigate } from "react-router-dom";
import People from "@mui/icons-material/People";
import SingleBed from "@mui/icons-material/SingleBed";
import KingBed from "@mui/icons-material/KingBed";
import AspectRatio from "@mui/icons-material/AspectRatio";
import Landscape from "@mui/icons-material/Landscape";


function Home() {
  const navigate = useNavigate();

  // const {dates, setDates} = useBooking();
  const today = new Date().toISOString().split("T")[0];
  const { dates, setDates, guestCount, setGuestCount } = useBooking();
  const [checkIn, setCheckIn] = useState(dates.checkIn || today);
  const [checkOut, setCheckOut] = useState(dates.checkOut || "");
  // const [guestCount, setGuestCount] = useState(1);
  const [error, setError] = useState("");

  // useEffect(() =>{
  //   if(!dates.checkIn){
  //     setDates((prev) => ({...prev, checkIn}));
  //   }
  //   if (!dates.checkOut) {
  //     setDates((prev) => ({ ...prev, checkOut }));
  //   }
  // }, [dates, checkIn, checkOut, setDates]);

  const handleCheckInChange = (e) => {
    const selectedDate = e.target.value;
    setCheckIn(selectedDate);
    setDates((prev) => ({ ...prev, checkIn: selectedDate }));

    if (checkOut && selectedDate > checkOut) {
      setError("Check-in date cannot be after the check-out date");
    } else {
      setError("");
    }
  };

  const handleCheckOutChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate >= checkIn) {
      setCheckOut(selectedDate);
      setDates((prev) => ({ ...prev, checkOut: selectedDate }));
      setError("");
    } else {
      setError("Check-out date must be after check-in date");
    }
  };

  // Function to increase guest count
  const increaseGuests = () => {
    setGuestCount((prev) => Math.min(30, prev + 1));
  };

  // Function to decrease guest count (min 1)
  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => Math.max(1, prev - 1));
    }
  };

  const handleSearch = async () => {
    setError("");
    if (!checkIn || !checkOut || guestCount < 1) {
      setError("Please fill in all fields before searching");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn, checkOut, guests: guestCount }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        console.log("Search successful: ", data);
        navigate("/booking");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // // Image slider state
  const [activeIndex, setActiveIndex] = useState(0);

  // // Images
  const images = [
    {
      src: "/homepage images/facilities/Gym.jpg",
      title: "Gym",
      text: "Energize your body and mind in our state-of-the-art gym, designed for peak performance and ultimate comfort. Train with top-of-the-line equipment, push your limits in a dynamic environment, and stay motivated with panoramic views that inspire every workout. Whether you're lifting, running, or stretching, every session brings you closer to your fitness goals in a space built for excellence.",
    },
    {
      src: "/homepage images/facilities/Pool.jpg",
      title: "Pool Area",
      text: "Refresh your body and mind in our stunning outdoor pool, where crystal-clear waters invite you to unwind and recharge. Swim under the open sky, bask in the sun on plush loungers, or take a refreshing dip in an oasis of serenity and luxury. Whether you're floating peacefully or making a splash, every moment spent here is pure relaxation in a space designed for indulgence.",
    },
    {
      src: "/homepage images/facilities/Spa.jpg",
      title: "Spa",
      text: "Immerse yourself in the ultimate luxury at our stunning spa, where tranquility and indulgence blend seamlessly. Rejuvenate your senses in serene surroundings, with soothing treatments designed to pamper and refresh. Unwind in plush lounges, enjoy calming aromas, and surrender to the peaceful ambiance, making each moment feel like a true escape.",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const rooms_home = [
    { id: "single", name: "Single Room" },
    { id: "double", name: "Double Room" },
    { id: "triple", name: "Triple Room" },
    { id: "family", name: "Family Room" },
  ];

  const [selectedRoom, setSelectedRoom] = useState("single");
  const [roomsData, setRoomsData] = useState([]);
  const selectedRoomData = roomsData.find((room) =>
    room.room_name.toLowerCase().startsWith(selectedRoom)
  );

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/rooms");
        const data = await response.json();
        setRoomsData(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    fetchRooms();
  }, []);

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
                  min={today}
                  value={checkIn}
                  onChange={handleCheckInChange}
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
                <input
                  type="date"
                  className="date-picker"
                  min={checkIn}
                  value={checkOut}
                  onChange={handleCheckOutChange}
                />
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
                  <button
                    className="stepper-button"
                    onClick={decreaseGuests}
                    disabled={guestCount === 1}
                  >
                    -
                  </button>
                  <span>{guestCount}</span>
                  <button
                    className="stepper-button"
                    onClick={increaseGuests}
                    disabled={guestCount === 30}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="search-button">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        {/* Error Message */}
        {error && <div className="error-message-search">{error}</div>}
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
          <button className="facilities-button"
          onClick={()=> { window.scrollTo(0, 0);
          navigate("/facilities")}}>Explore More</button>
        </div>
      </div>

      {/* Image Slideshow */}
      {/* <button className="left-arrow" onClick={prevSlide}>
        <NavigateIconLeft style={{ fontSize: 40}}/>
      </button> */}
      <div className="carousel-container">
        <button className="left-arrow" onClick={prevSlide}>
          <NavigateIconLeft style={{ fontSize: 40 }} />
        </button>
        <button className="right-arrow" onClick={nextSlide}>
          <NavigateIconRight style={{ fontSize: 40 }} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={190}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{
            prevEl: ".left-arrow",
            nextEl: ".right-arrow",
          }}
          className="carousel"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`carousel-item ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
                <div className="overlay">
                  <h1 className="overlay-title">{item.title}</h1>
                  <div className="overlay-line"></div>
                  <p className="overlay-text">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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

      {selectedRoomData && (
        <>
          <div className="home-room-container">
            <div className="home-room-image">
              <img
                src={selectedRoomData.image_url}
                alt={selectedRoomData.room_name}
              />
            </div>

            <div className="home-room-details">
              <h2>{selectedRoomData.room_name}</h2>

              <ul className="home-room-features">
                <li>
                  <People /> Max {selectedRoomData.capacity} Guest
                  {selectedRoomData.capacity > 1 ? "s" : ""}
                </li>
                {selectedRoomData.single_beds > 0 && (
                  <li>
                    <SingleBed /> x{selectedRoomData.single_beds} Single Bed
                  </li>
                )}
                {selectedRoomData.double_beds > 0 && (
                  <li>
                    <KingBed /> x{selectedRoomData.double_beds} Double Bed
                  </li>
                )}
                <li>
                  <AC /> Air Conditioning
                </li>
              </ul>

              <p>
                {selectedRoomData.description || "No description available."}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="view-all-container">
        <button className="view-all-rooms-button"
        onClick={() => { window.scrollTo(0, 0);
        navigate("/rooms")}}> View All Rooms</button>
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

          <button className="see-more-button"
          onClick={() => { window.scrollTo(0, 0); 
          navigate("/faqs")}}>See More</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
