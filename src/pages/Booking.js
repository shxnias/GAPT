import React from "react";
import {
  KingBed,
  SingleBed,
  People,
  AspectRatio,
  Landscape,
} from "@mui/icons-material";

function Booking({ rooms }) {
  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="general-text">
          From <b>15th June 2025</b> to <b>21st June 2025</b> -{" "}
          <b>2 adults, 1 child</b>
        </p>
      </div>
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
                  <Landscape /> <strong>View:</strong> {room.view_type}
                </p>
              </div>
            </div>
            {/* Meal Options */}
            <div className="room-food">
              <div className="meal-options">               
                <p>
                  <strong>Breakfast:</strong>
                </p>
                <p className="price">
                  Today's price for x nights ${room.breakfast_ppd}
                </p>
              </div>
              <div className="meal-options">
                <p>
                  <strong>Half-Board:</strong>
                </p>
                <p className="price">
                  Today's price for x nights ${room.half_board_ppd}
                </p>
              </div>
              <div className="meal-options">
                <p>
                  <strong>Full-Board:</strong>
                </p>
                <p className="price">
                  Today's price for x nights ${room.full_board_ppd}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
