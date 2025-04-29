import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
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
  console.log("🏨 All rooms passed to Booking component:", rooms); // <--- ADD THIS HERE

  const [mealErrorMsg, setMealErrorMsg] = useState("");

  const {
    dates,
    guestCount,
    selectedRooms,
    setSelectedRooms,
    selectedMeal,
    setSelectedMeal,
    totalPrices,
    setTotalPrices,
  } = useBooking();

  // Process check-in/check-out dates
  const checkInDate = dates.checkIn ? new Date(dates.checkIn) : null;
  const checkOutDate = dates.checkOut ? new Date(dates.checkOut) : null;
  const nights =
    checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate)
      : 0;

  const formattedCheckIn = checkInDate
    ? format(checkInDate, "dd MMM yyyy")
    : "";
  const formattedCheckOut = checkOutDate
    ? format(checkOutDate, "dd MMM yyyy")
    : "";

  // Fetch total prices for each room from the server using context state
  useEffect(() => {
    if (rooms && rooms.length > 0 && nights > 0) {
      console.log("🏨 All rooms passed to Booking component:", rooms);
  
      rooms.forEach((room) => {
        console.log("🔍 Room in fetch loop:", room);
  
        if (!room?.room_id) {
          console.warn("⚠️ Skipping fetch: room.id is undefined", room);
          return;
        }
  
        fetch(`http://localhost:5001/api/room-prices/${room.room_id}?nights=${nights}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`❌ Fetch failed for room ${room.room_id} with status ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log(`✅ Fetched price for room ${room.room_id}:`, data);
            setTotalPrices((prev) => ({
              ...prev,
              [room.room_id]: data,
            }));
          })
          .catch((err) => {
            console.error(`❌ Error fetching price for room ${room.room_id}:`, err.message);
          });
      });
    }
  }, [rooms, nights, setTotalPrices]);
  

  // Handler for meal selection
  const handleMealSelection = (meal) => {
    if (selectedMeal === "" || selectedMeal === meal) {
      setSelectedMeal(selectedMeal === meal ? "" : meal);
      setMealErrorMsg("");
    } else {
      setMealErrorMsg(
        "You cannot choose different meal options for different rooms."
      );
    }
  };

  // Increase room quantity (limit: 5 per room)
  const incrementQuantity = (roomId) => {
    setSelectedRooms((prev) => {
      const current = prev[roomId] || 0;
      if (current < 5) {
        return { ...prev, [roomId]: current + 1 };
      }
      return prev;
    });
  };

  // Decrease room quantity (minimum: 0)
  const decrementQuantity = (roomId) => {
    setSelectedRooms((prev) => {
      const current = prev[roomId] || 0;
      if (current > 0) {
        return { ...prev, [roomId]: current - 1 };
      }
      return prev;
    });
  };

  // Compute the total guest capacity based on selected rooms.
  const totalCapacity = rooms.reduce((acc, room) => {
    const quantity = selectedRooms[room.room_id] || 0;
    return acc + quantity * room.capacity;
  }, 0);

  // Ensure guestCount is a number.
  const guestNumber = parseInt(guestCount, 10) || 0;
  const canProceed = totalCapacity >= guestNumber;

  const navigate = useNavigate();

  // Handler for proceeding to the next step.
  const handleNextStep = () => {
    if (!canProceed) {
      alert("Please select enough rooms to accommodate all guests.");
      return;
    }
    navigate("/packages", {state: {rooms}});
  };

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="booking-date general-text">
          From <b>{formattedCheckIn}</b> to <b>{formattedCheckOut}</b> - <b>{guestCount} guests</b>
        </p>
      </div>

      {mealErrorMsg && <div className="error-message">{mealErrorMsg}</div>}

      <span className="go-back-link" onClick={() => navigate(-1)}>
        ← Go Back
      </span>

      <div>
        <h2 className="subheader">Select a Room</h2>
      </div>

      <div className="booking-room-container">
        {rooms.map((room) => {
          console.log("Rendering room:", room.room_id);
          console.log("   → Price object:", totalPrices[room.room_id]);
          const roomQuantity = selectedRooms[room.room_id] || 0;
          return (
            <div key={room.room_id} className="booking-room-card">
              <div className="booking-room-display">
                <div>
                  <img src={room.image_url} alt={room.room_name} />
                </div>
                <div className="booking-room-details general-text">
                  <h2>{room.room_name}</h2>
                  <p><People /> <strong>Guest Capacity:</strong> {room.capacity}</p>
                  <p><SingleBed /> <strong>Single Beds:</strong> {room.single_beds}</p>
                  <p><KingBed /> <strong>Double Beds:</strong> {room.double_beds}</p>
                  <p><AspectRatio /> <strong>Area Space:</strong> {room.area_space} m²</p>
                  <p><Landscape /> <strong>View:</strong> {room.room_type}</p>
                </div>
              

              <div className="room-quantity">
                <button
                  onClick={() => decrementQuantity(room.room_id)}
                  disabled={roomQuantity === 0}
                  className={roomQuantity === 0 ? "greyed-out" : ""}
                >-</button>
                <span>{roomQuantity}</span>
                <button
                  onClick={() => incrementQuantity(room.room_id)}
                  disabled={roomQuantity >= 5}
                  className={roomQuantity >= 5 ? "greyed-out" : ""}
                >+</button>
              </div>
              </div>

              <div className="room-food">
                <div className="meal-options">
                  <p className="meal-title subheader">
                    <strong>Breakfast:</strong>
                  </p>
                  <p className="price general-text">
                    Today's price for {nights}{" "}
                    {nights === 1 ? "night" : "nights"} <br />
                    <span className="euro">
                      {totalPrices[room.room_id]?.breakfast != null
                        ? `€${totalPrices[room.room_id].breakfast}`
                        : "Loading..."}
                    </span>
                  </p>
                  <button
                    className={`select-button ${
                      selectedMeal !== "" && selectedMeal !== "breakfast"
                        ? "greyed-out"
                        : ""
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
                    Today's price for {nights}{" "}
                    {nights === 1 ? "night" : "nights"} <br />
                    <span className="euro">
                      {totalPrices[room.room_id]?.halfBoard != null
                        ? `€${totalPrices[room.room_id].halfBoard}`
                        : "Loading..."}
                    </span>
                  </p>
                  <button
                    className={`select-button ${
                      selectedMeal !== "" && selectedMeal !== "halfBoard"
                        ? "greyed-out"
                        : ""
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
                    Today's price for {nights}{" "}
                    {nights === 1 ? "night" : "nights"} <br />
                    <span className="euro">
                      {totalPrices[room.room_id]?.fullBoard != null
                        ? `€${totalPrices[room.room_id].fullBoard}`
                        : "Loading..."}
                    </span>
                  </p>
                  <button
                    className={`select-button ${
                      selectedMeal !== "" && selectedMeal !== "fullBoard"
                        ? "greyed-out"
                        : ""
                    } ${selectedMeal === "fullBoard" ? "selected" : ""}`}
                    onClick={() => handleMealSelection("fullBoard")}
                  >
                    {selectedMeal === "fullBoard" ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {!canProceed && (
          <div className="error-message">
            Not enough room capacity selected for {guestCount} guests.
          </div>
        )}

        <div className="proceed">
          <button onClick={handleNextStep} disabled={!canProceed}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;