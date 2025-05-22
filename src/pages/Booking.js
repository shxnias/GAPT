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

  /* date helpers */
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

  /* ROOM AVAILABILITY */
  const [availabilityOk, setAvailabilityOk] = useState(true);
  const [message, setMessage] = useState(null);

  /* fetch total prices */
  useEffect(() => {
    if (rooms && rooms.length > 0 && nights > 0) {
      console.log("All rooms passed to Booking component:", rooms);

      rooms.forEach((room) => {
        console.log("Room in fetch loop:", room);

        if (!room?.room_id) {
          console.warn("⚠️ Skipping fetch: room.id is undefined", room);
          return;
        }

        fetch(
          `http://localhost:5001/api/room-prices/${room.room_id}?nights=${nights}`
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error(
                `Fetch failed for room ${room.room_id} with status ${res.status}`
              );
            }
            return res.json();
          })
          .then((data) => {
            console.log(`Fetched price for room ${room.room_id}:`, data);
            setTotalPrices((prev) => ({
              ...prev,
              [room.room_id]: data,
            }));
          })
          .catch((err) => {
            console.error(
              `Error fetching price for room ${room.room_id}:`,
              err.message
            );
          });
      });
    }
  }, [rooms, nights, setTotalPrices]);

  // Handler for meal selection
  const handleMealSelection = (meal) => {
    if (selectedMeal === "" || selectedMeal === meal) {
      setSelectedMeal(selectedMeal === meal ? "" : meal);
    }
  };

  const incrementQuantity = async (roomId) => {
    const currentQty = selectedRooms[roomId] || 0;
    const requestedQuantity = currentQty + 1;
  
    try {
      const response = await fetch("http://localhost:5001/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: roomId,
          start_date: dates.checkIn,
          end_date: dates.checkOut,
          quantity: requestedQuantity,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.available) {
        setAvailabilityOk(false);
        setMessage(data.message || "Not enough rooms available.");
        return;
      }
  
      setAvailabilityOk(true);
      setMessage(null);
  
      setSelectedRooms((prev) => ({
        ...prev,
        [roomId]: requestedQuantity,
      }));
  
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailabilityOk(false);
      setMessage("Something went wrong checking room availability.");
    }
  };
  
  

  const decrementQuantity = (roomId) =>
    setSelectedRooms((prev) => {
      const qty = prev[roomId] || 0;
      return qty > 0 ? { ...prev, [roomId]: qty - 1 } : prev;
    });

  /* ────────── validation ────────── */
  const totalCapacity = rooms.reduce((acc, r) => {
    const qty = selectedRooms[r.room_id] || 0;
    return acc + qty * r.capacity;
  }, 0);

  const guestNumber = +guestCount || 0;
  const capacityOk = totalCapacity >= guestNumber;
  const mealSelected = selectedMeal !== "";
  const canProceed = capacityOk && mealSelected && availabilityOk;

  const navigate = useNavigate();

  // Handler for proceeding to the next step.
  const handleNextStep = () => {
    if (!canProceed) {
      alert("Please select enough rooms to accommodate all guests.");
      return;
    }
    navigate("/packages", { state: { rooms } });
  };

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="booking-date general-text">
          From <b>{formattedCheckIn}</b> to <b>{formattedCheckOut}</b> -{" "}
          <b>{guestCount} guests</b>
        </p>
      </div>

      <span className="go-back-link" onClick={() => navigate(-1)}>
        ← Go Back
      </span>

      <h2 className="subheader">Select a Room</h2>

      {/* ============================================================= */}
      <div className="booking-room-container">
        {rooms.map((room) => {
          const roomQuantity = selectedRooms[room.room_id] || 0;
          return (
            <div key={room.room_id} className="booking-room-card">
              {/* ─────── image + specs + counter ─────── */}
              <div className="booking-room-display">
                <div class="book-img">
                  <img src={room.image_url} alt={room.room_name} />
                </div>

                <div className="booking-room-details general-text">
                  <h2>{room.room_name}</h2>
                  <p>
                    <People /> <strong>Guest Capacity:</strong> {room.capacity}
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
                    <Landscape /> <strong>View:</strong> {room.room_type}
                  </p>
                </div>

                <div className="room-quantity">
                  <button
                    onClick={() => decrementQuantity(room.room_id)}
                    disabled={roomQuantity === 0}
                    className={roomQuantity === 0 ? "greyed-out" : ""}
                  >
                    -
                  </button>
                  <span>{roomQuantity}</span>
                  <button
                    onClick={() => incrementQuantity(room.room_id)}
                    disabled={roomQuantity >= 15}
                    className={roomQuantity >= 15 ? "greyed-out" : ""}
                  >
                    +
                  </button>
                </div>
              </div>

    

              {/* ─────── meal options ─────── */}
              <div className="room-food">
                {["breakfast", "halfBoard", "fullBoard"].map((plan) => (
                  <div key={plan} className="meal-options">
                    <p className="meal-title subheader">
                      <strong>
                        {plan === "breakfast"
                          ? "Breakfast"
                          : plan === "halfBoard"
                          ? "Half-Board"
                          : "Full-Board"}
                        :
                      </strong>
                    </p>
                    <p className="price general-text">
                      Today's price for {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                      <br />
                      <span className="euro">
                        {totalPrices[room.room_id]?.[plan] != null
                          ? `€${totalPrices[room.room_id][plan]}`
                          : "Loading..."}
                      </span>
                    </p>
                    <button
                      className={`select-button ${
                        selectedMeal && selectedMeal !== plan && "greyed-out"
                      } ${selectedMeal === plan && "selected"}`}
                      onClick={() => handleMealSelection(plan)}
                    >
                      {selectedMeal === plan ? "Selected" : "Select"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* ────────── inline errors ────────── */}
        {!capacityOk && (
          <div className="error-message">
            Not enough room capacity selected for {guestCount} guests.
          </div>
        )}
        {!availabilityOk && (
          <div className="error-message">
            Not enough availability for one or more selected rooms on the chosen
            dates.
          </div>
        )}

        {!mealSelected && (
          <div className="error-message above-button">
            Please choose a meal plan before continuing.
          </div>
        )}

        {/* ────────── proceed button ────────── */}
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
