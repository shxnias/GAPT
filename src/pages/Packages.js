import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "./NavigateButton";

export default function Packages() {
  const navigate = useNavigate();

  function ToggleButton() {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <button
        className={`select-button padding ${isSelected ? "selected" : ""}`}
        onClick={() => setIsSelected(!isSelected)}
      >
        {isSelected ? "Added" : "Add"}
      </button>
    );
  }

  return (
    <div className="main-content">
      <div className="header-container">
        <h1 className="header">The Opulence Hotel</h1>
        <p className="general-text">
          From <b>15th June 2025</b> to <b>21st June 2025</b> -{" "}
          <b>2 adults, 1 child</b>
        </p>
      </div>

      <span className="go-back-link" onClick={() => navigate(-1)}>
        ← Go Back
      </span>

      <h2 className="subheader">Enhance your stay</h2>
      <h2 className="package-type subheader">Amenities</h2>
      <div className="amenities">
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
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>

          {/* Use ToggleButton */}
          <ToggleButton />
        </div>
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
          <label htmlFor="select">Select amount of people</label>
          <select id="spa-select" className="amenities-dropdown">
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Use ToggleButton */}
          <ToggleButton />
        </div>

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
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Use ToggleButton */}
          <ToggleButton />
        </div>
      </div>
      <h2 className="package-type">Tours</h2>
      <div className="amenities">
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
          <input type="date" id="imdina-date" className="amenities-date" />

          <label htmlFor="imdina-select">Select amount of people</label>
          <select id="imdina-select" className="amenities-dropdown">
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Use ToggleButton */}
          <ToggleButton />
        </div>

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
          <input type="date" id="valletta-date" className="amenities-date" />

          <label htmlFor="valletta-select">Select amount of people</label>
          <select id="valletta-select" className="amenities-dropdown">
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Use ToggleButton */}
          <ToggleButton />
        </div>

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
          <input type="date" id="bluegrotto-date" className="amenities-date" />

          <label htmlFor="bluegrotto-select">Select amount of people</label>
          <select id="bluegrotto-select" className="amenities-dropdown">
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {/* Use ToggleButton */}
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
              alt="Imdina"
              className="amenities-image-package"
            />
          </div>
          <div className="package-details">
            <p className="amenities-price">
              For the additional price of <b>€200</b> you can get a special deal
              of gym for all guests, unlimited spa treatments, and free parking
              for one car.
            </p>
            {/* Use ToggleButton */}
            <ToggleButton />
          </div>
        </div>
      </div>
      <div className="proceed">
        <NavigateButton to="/guestdetails" label="Next Step" />
      </div>
    </div>
  );
}
