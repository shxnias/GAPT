import React from "react";
import "../booking.css";
import "../App.css";
import {
  KingBed,
  SingleBed,
  People,
  AspectRatio,
  Landscape,
} from "@mui/icons-material";

function Rooms({ rooms }) {
  return (
    <div className="main-content">
      <div className="contact-header">
        <div className="line"></div>
        <h1>Our Rooms</h1>
        <div className="line"></div>
      </div>
      <div className="bottom-padding">
        <div className="booking-room-con">
          {rooms.map((room) => (
            <div key={room.id} className="booking-room-car">
              <div className="room-image-container">
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
