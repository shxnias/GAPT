import React from "react";

function Rooms({ rooms }) {
  return (
    <div className="main-content">
      <h1>Our Rooms</h1>
      <div className="rooms-container">
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

export default Rooms;
