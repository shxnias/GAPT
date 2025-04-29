import React from "react";
import "../booking.css";
import {
  KingBed,
  SingleBed,
  People,
  AspectRatio,
  Landscape,
} from "@mui/icons-material";

function Rooms({ rooms }) {
  // ✅ Accept rooms as a prop
  return (
    <div className="main-content">
      <h1>Our Rooms</h1>
      <div className="bottom-padding">
        <div className="booking-room-container">
          {rooms.map((room) => (
            <div key={room.id} className="booking-room-card">
              
                <div>
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
                <div className="booking-room-description-box">
                  <p>{room.description}</p>
                </div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
