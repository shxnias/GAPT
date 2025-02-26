import React, { useEffect, useState } from "react";

function Booking({ rooms }) {
  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="generalText">
          From <b>15th June 2025</b> to <b>21st June 2025</b> -{" "}
          <b>2 adults, 1 child</b>
        </p>
      </div>
      <div>
        <h2 className="header center">Select a Room</h2>
      </div>
      <div className="room-container">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h2>{room.name}</h2>
            <p>
              <strong>Guests:</strong> {room.guests}
            </p>
            <p>
              <strong>Single Beds:</strong> {room.single_beds}
            </p>
            <p>
              <strong>Double Beds:</strong> {room.double_beds}
            </p>
            <p>
              <strong>Price per Night:</strong> €{room.price_per_night}
            </p>
            <p>
              <strong>Area Space:</strong> {room.area_space} m²
            </p>
            <p>
              <strong>View Type:</strong> {room.view_type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
