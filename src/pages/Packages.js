import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "./NavigateButton";
import "../packages.css";
import { useBooking } from "../BookingContext";
import { format } from "date-fns";

export default function Packages() {
  const navigate = useNavigate();
  const { dates, guestCount } = useBooking();

  // Format check-in and check-out dates from the context
  const checkInDate = dates.checkIn ? new Date(dates.checkIn) : null;
  const checkOutDate = dates.checkOut ? new Date(dates.checkOut) : null;
  const formattedCheckIn = checkInDate
    ? format(checkInDate, "dd MMM yyyy")
    : "";
  const formattedCheckOut = checkOutDate
    ? format(checkOutDate, "dd MMM yyyy")
    : "";

  // Create min and max dates for tour date inputs in YYYY-MM-DD format
  const minDate = checkInDate ? checkInDate.toISOString().split("T")[0] : "";
  const maxDate = checkOutDate ? checkOutDate.toISOString().split("T")[0] : "";

  const numGuests = parseInt(guestCount) || 1;

  // State for whether the special amenities package is selected
  const [specialAmenitiesSelected, setSpecialAmenitiesSelected] =
    useState(false);

  // Generic ToggleButton component
  function ToggleButton({ disabled = false }) {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <button
        disabled={disabled}
        className={`select-button padding ${isSelected ? "selected" : ""} ${
          disabled ? "greyed-out" : ""
        }`}
        onClick={() => {
          if (!disabled) {
            setIsSelected(!isSelected);
          }
        }}
      >
        {isSelected ? "Added" : "Add"}
      </button>
    );
  }

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="booking-date general-text">
          From <b>{formattedCheckIn}</b> to <b>{formattedCheckOut}</b> -{" "}
          <b>{guestCount}</b> guests
        </p>
      </div>

      <span className="go-back-link" onClick={() => navigate(-1)}>
        ← Go Back
      </span>

      <h2 className="subheader">Enhance your stay</h2>
      <h2 className="package-type subheader">Amenities</h2>
      <div className="amenities">
        {/* Gym Access */}
        <div className="amenities-card">
          <h2>24/7 Gym Access</h2>
          <img
            src="./amenities/gym.jpg"
            alt="Gym"
            className="amenities-image"
          />
          <p className="amenities-price">
            <b>€10.5</b> per day
          </p>
          <label htmlFor="gym-select">Select amount of people</label>
          <select id="gym-select" className="amenities-dropdown">
            {[...Array(numGuests).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Disabled when special package is selected */}
          <ToggleButton disabled={specialAmenitiesSelected} />
        </div>

        {/* Spa Access */}
        <div className="amenities-card">
          <h2>Spa Access</h2>
          <img
            src="./amenities/spa.jpg"
            alt="Spa"
            className="amenities-image"
          />
          <p className="amenities-price">
            <b>€10.5</b> per person per day
          </p>
          <label htmlFor="spa-select">Select amount of people</label>
          <select id="spa-select" className="amenities-dropdown">
            {[...Array(numGuests).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <ToggleButton disabled={specialAmenitiesSelected} />
        </div>

        {/* Parking */}
        <div className="amenities-card">
          <h2>Parking</h2>
          <img
            src="./amenities/parking.jpg"
            alt="Parking"
            className="amenities-image"
          />
          <p className="amenities-price">
            <b>€10.5</b> per person per day
          </p>
          <label htmlFor="parking-select">Select amount of cars</label>
          <select id="parking-select" className="amenities-dropdown">
            {[...Array(numGuests).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <ToggleButton disabled={specialAmenitiesSelected} />
        </div>
      </div>

      <h2 className="package-type">Tours</h2>
      <div className="amenities">
        {/* Imdina Tour */}
        <div className="amenities-card">
          <h2>Imdina Tour</h2>
          <img
            src="./tours/mdina.jpg"
            alt="Imdina"
            className="amenities-image"
          />
          <p className="amenities-price">
            <b>€10.5</b> per person
          </p>
          <label htmlFor="imdina-date">Select Date</label>
          <input
            type="date"
            id="imdina-date"
            className="amenities-date"
            min={minDate}
            max={maxDate}
          />
          <label htmlFor="imdina-select">Select amount of people</label>
          <select id="imdina-select" className="amenities-dropdown">
            {[...Array(numGuests).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Tour buttons remain enabled */}
          <ToggleButton />
        </div>

        {/* Valletta Tour */}
        <div className="amenities-card">
          <h2>Valletta Tour</h2>
          <img
            src="./tours/valletta.jpg"
            alt="Valletta"
            className="amenities-image"
          />
          <p className="amenities-price">
            <b>€10.5</b> per person
          </p>
          <label htmlFor="valletta-date">Select Date</label>
          <input
            type="date"
            id="valletta-date"
            className="amenities-date"
            min={minDate}
            max={maxDate}
          />
          <label htmlFor="valletta-select">Select amount of people</label>
          <select id="valletta-select" className="amenities-dropdown">
            {[...Array(numGuests).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <ToggleButton />
        </div>

        {/* Blue Grotto */}
        <div className="amenities-card">
          <h2>Blue Grotto</h2>
          <img
            src="./tours/bluegrotto.jpg"
            alt="Blue Grotto"
            className="amenities-image"
          />
          <p className="amenities-price">
            <b>€10.5</b> per person
          </p>
          <label htmlFor="bluegrotto-date">Select Date</label>
          <input
            type="date"
            id="bluegrotto-date"
            className="amenities-date"
            min={minDate}
            max={maxDate}
          />
          <label htmlFor="bluegrotto-select">Select amount of people</label>
          <select id="bluegrotto-select" className="amenities-dropdown">
            {[...Array(numGuests).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <ToggleButton />
        </div>
      </div>

      <h2 className="package-type">Packages</h2>
      <div className="amenities package">
        <div className="amenities-card package">
          <h2>Special Amenities Package</h2>
          <div>
            <img
              src="./amenities/packages.jpg"
              alt="Package"
              className="amenities-image-package"
            />
          </div>
          <div className="package-details">
            <p className="amenities-price">
              For an additional price of <b>€200</b> you can get a special deal
              of gym access for all guests, unlimited spa treatments, and free
              parking for one car.
            </p>
            {/* Special package toggle (not disabled by special selection) */}
            <button
              className={`select-button padding ${
                specialAmenitiesSelected ? "selected" : ""
              }`}
              onClick={() =>
                setSpecialAmenitiesSelected(!specialAmenitiesSelected)
              }
            >
              {specialAmenitiesSelected ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>

      <div className="proceed">
        <NavigateButton to="/guestdetails" label="Next Step" />
      </div>
    </div>
  );
}
