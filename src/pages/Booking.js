import React, { useState, useEffect } from "react";
import NavigateButton from "./NavigateButton";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  KingBed,
  SingleBed,
  People,
  AspectRatio,
  Landscape,
} from "@mui/icons-material";
import "../booking.css";
import { useBooking } from "../BookingContext";
import { differenceInDays } from "date-fns";

function Booking({ rooms }) {
  // Global meal selection state and error message state
  const [selectedMeal, setSelectedMeal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Store prices for each room ID
  const [totalPrices, setTotalPrices] = useState({});

  const { dates, guestCount } = useBooking();

  const checkInDate = dates.checkIn ? new Date(dates.checkIn) : null;
  const checkOutDate = dates.checkOut ? new Date(dates.checkOut) : null;
  const nights = (checkInDate && checkOutDate)
    ? differenceInDays(checkOutDate, checkInDate)
    : 0;

  const formattedCheckIn = checkInDate ? format(checkInDate, "dd MMM yyyy") : "";
  const formattedCheckOut = checkOutDate ? format(checkOutDate, "dd MMM yyyy") : "";

  useEffect(() => {
    if (rooms && rooms.length > 0 && nights > 0) {
      rooms.forEach((room) => {
        fetch(`http://localhost:5001/api/room-prices/${room.id}?nights=${nights}`)
          .then((res) => res.json())
          .then((data) => {
            setTotalPrices((prev) => ({
              ...prev,
              [room.id]: data,
            }));
          })
          .catch((err) =>
            console.error(`Error fetching price for room ${room.id}:`, err)
          );
      });
    }
  }, [rooms, nights]);

  // Handler for meal selection.
  const handleMealSelection = (meal) => {
    if (selectedMeal === "" || selectedMeal === meal) {
      // Toggle the selection on or off
      setSelectedMeal(selectedMeal === meal ? "" : meal);
      setErrorMsg("");
    } else {
      // If a meal is already selected and the user tries to select a different one,
      // show an error message.
      setErrorMsg("You cannot choose different meal options for different rooms.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="booking-date general-text">
          From <b>{formattedCheckIn}</b> to <b>{formattedCheckOut}</b> - <b>{guestCount} guests</b>
        </p>
      </div>

      {/* Display error message if present */}
      {errorMsg && <div className="error-message">{errorMsg}</div>}

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
                  <AspectRatio /> <strong>Area Space:</strong> {room.area_space} m²
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
                  Today's price for {nights} {nights === 1 ? "night" : "nights"} <br />
                  <span className="euro">
                    {totalPrices[room.id]?.breakfast != null
                      ? `€${totalPrices[room.id].breakfast}`
                      : "Loading..."}
                  </span>
                </p>
                <button
                  className={`select-button ${
                    selectedMeal !== "" && selectedMeal !== "breakfast" ? "greyed-out" : ""
                  } ${selectedMeal === "breakfast" ? "selected" : ""}`}
                  onClick={() => handleMealSelection("breakfast")}
                >
                  {selectedMeal === "breakfast" ? "Selected" : "Select"}
                </button>
              </div>

              <div className="meal-options">
                <p className="meal-title subheader">
                  <strong>Half-Board:</strong>
                </p>
                <p className="price general-text">
                  Today's price for {nights} {nights === 1 ? "night" : "nights"} <br />
                  <span className="euro">
                    {totalPrices[room.id]?.halfBoard != null
                      ? `€${totalPrices[room.id].halfBoard}`
                      : "Loading..."}
                  </span>
                </p>
                <button
                  className={`select-button ${
                    selectedMeal !== "" && selectedMeal !== "halfBoard" ? "greyed-out" : ""
                  } ${selectedMeal === "halfBoard" ? "selected" : ""}`}
                  onClick={() => handleMealSelection("halfBoard")}
                >
                  {selectedMeal === "halfBoard" ? "Selected" : "Select"}
                </button>
              </div>

              <div className="meal-options">
                <p className="meal-title subheader">
                  <strong>Full-Board:</strong>
                </p>
                <p className="price general-text">
                  Today's price for {nights} {nights === 1 ? "night" : "nights"} <br />
                  <span className="euro">
                    {totalPrices[room.id]?.fullBoard != null
                      ? `€${totalPrices[room.id].fullBoard}`
                      : "Loading..."}
                  </span>
                </p>
                <button
                  className={`select-button ${
                    selectedMeal !== "" && selectedMeal !== "fullBoard" ? "greyed-out" : ""
                  } ${selectedMeal === "fullBoard" ? "selected" : ""}`}
                  onClick={() => handleMealSelection("fullBoard")}
                >
                  {selectedMeal === "fullBoard" ? "Selected" : "Select"}
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
