import React, { useState } from "react";
import NavigateButton from "./NavigateButton";
import { useNavigate } from "react-router-dom";
import {format} from 'date-fns';
import {
  KingBed,
  SingleBed,
  People,
  AspectRatio,
  Landscape,
} from "@mui/icons-material";
import "../booking.css";
import { useBooking } from "../BookingContext";

function Booking({ rooms }) {
  // State to track selected meal options for each room
  const [selectedMeal, setSelectedMeal] = useState({
    breakfast: false,
    halfBoard: false,
    fullBoard: false,
  });

  // Extract dates and guest count from context
  const{dates, guestCount} = useBooking();
  console.log("Context Dates:", dates);
  console.log("Guest Count:", guestCount);


  const handleMealSelection = (meal) => {
    setSelectedMeal((prevState) => ({
      ...prevState,
      [meal]: !prevState[meal],
    }));
  };
  const navigate = useNavigate();
  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="booking-date general-text">
        From <b>{dates.checkIn}</b> to <b>{dates.checkOut}</b> -{" "}
          <b>{guestCount} guests</b>
        </p>
        
    
      </div>
      <span className="go-back-link" onClick={() => navigate(-1)}>
        ← Go Back
      </span>
      <div>
        <h2 className="subheader">Select a Room</h2>
      </div>
      <div className="booking-room-container">
        {rooms.map((room) => (
          <div key={room.id} className="booking-room-card">
            <div className="booking-room-display">
              <div>
                <img src={room.image_url} alt={room.room_name} />
              </div>
              <div className="booking-room-details general-text">
                <h2>{room.room_name}</h2>
                <p>
                  <People /> <strong>Guest Capacity:</strong> {room.capacity}
                </p>
                <p>
                  <SingleBed /> <strong>Single Beds:</strong> {room.single_beds}
                </p>
                <p>
                  <KingBed /> <strong>Double Beds:</strong> {room.double_beds}
                </p>
                <p>
                  <AspectRatio /> <strong>Area Space:</strong> {room.area_space}{" "}
                  m²
                </p>
                <p>
                  <Landscape /> <strong>View:</strong> {room.room_type}
                </p>
              </div>
            </div>

            {/* Meal Options */}
            <div className="room-food">
              <div className="meal-options">
                <p className="meal-title subheader">
                  <strong>Breakfast:</strong>
                </p>
                <p className="price general-text">
                  Today's price for x nights <br/>
                  <span className='euro'>€100{room.breakfast_ppd}</span>
                </p>
                <button
                  className={`select-button ${
                    selectedMeal.breakfast ? "selected" : ""
                  }`}
                  onClick={() => handleMealSelection("breakfast")}
                >
                  {selectedMeal.breakfast ? "Selected" : "Select"}
                </button>
              </div>

              <div className="meal-options">
                <p className="meal-title subheader">
                  <strong>Half-Board:</strong>
                </p>
                <p className="price general-text">
                  Today's price for x nights <br />
                  <span className='euro'>€100{room.half_board_ppd}</span>
                </p>
                <button
                  className={`select-button ${
                    selectedMeal.halfBoard ? "selected" : ""
                  }`}
                  onClick={() => handleMealSelection("halfBoard")}
                >
                  {selectedMeal.halfBoard ? "Selected" : "Select"}
                </button>
              </div>

              <div className="meal-options">
                <p className="meal-title subheader">
                  <strong>Full-Board:</strong>
                </p>
                <p className="price general-text">
                  Today's price for x nights <br />
                  <span className='euro'>€100{room.full_board_ppd}</span>
                </p>
                <button
                  className={`select-button ${
                    selectedMeal.fullBoard ? "selected" : ""
                  }`}
                  onClick={() => handleMealSelection("fullBoard")}
                >
                  {selectedMeal.fullBoard ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="proceed">
          <NavigateButton to="/packages" label="Next Step" />
        </div>
      </div>
    </div>
  );
}

export default Booking;
