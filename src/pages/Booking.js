import React, { useState } from "react";
import NavigateButton from "./NavigateButton";
import {
  KingBed,
  SingleBed,
  People,
  AspectRatio,
  Landscape,
} from "@mui/icons-material";

function Booking({ rooms }) {
  // State to track selected meal options for each room
  const [selectedMeal, setSelectedMeal] = useState({
    breakfast: false,
    halfBoard: false,
    fullBoard: false,
  });

  const handleMealSelection = (meal) => {
    setSelectedMeal((prevState) => ({
      ...prevState,
      [meal]: !prevState[meal],
    }));
  };

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="general-text">
          From <b>15th June 2025</b> to <b>21st June 2025</b> -{" "}
          <b>2 adults, 1 child</b>
        </p>
        <div>
          <h2 className="subheader">Select a Room</h2>
        </div>
        <div className="room-container">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-display">
                <div className="room-image">
                  <img src={room.image_url} alt={room.name} />
                </div>
                <div className="room-details">
                  <h2>{room.name}</h2>
                  <p>
                    <People /> <strong>Guests:</strong> {room.guests}
                  </p>
                  <p>
                    <SingleBed /> <strong>Single Beds:</strong>{" "}
                    {room.single_beds}
                  </p>
                  <p>
                    <KingBed /> <strong>Double Beds:</strong> {room.double_beds}
                  </p>
                  <p>
                    <AspectRatio /> <strong>Area Space:</strong>{" "}
                    {room.area_space} m²
                  </p>
                  <p>
                    <Landscape /> <strong>View:</strong> {room.view_type}
                  </p>
                </div>
              </div>

              {/* Meal Options */}
              <div className="room-food">
                <div className="meal-options">
                  <p className="meal-title">
                    <strong>Breakfast:</strong>
                  </p>
                  <p className="price">
                    Today's price for x nights <br />${room.breakfast_ppd}
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
                  <p className="meal-title">
                    <strong>Half-Board:</strong>
                  </p>
                  <p className="price">
                    Today's price for x nights <br />${room.half_board_ppd}
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
                  <p className="meal-title">
                    <strong>Full-Board:</strong>
                  </p>
                  <p className="price">
                    Today's price for x nights <br />${room.full_board_ppd}
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
    </div>
  );
}

export default Booking;
