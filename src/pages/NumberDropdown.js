import React, { useState } from 'react';

const NumberDropdown = () => {
  const [selectedNumber, setSelectedNumber] = useState(''); // Track selected value

  // Generate an array of numbers 1-10 dynamically
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="number-options">Choose a number:</label>
      <select className="select-option" id="number-options" value={selectedNumber} onChange={handleChange}>
        <option value="">Select a number</option>
        {numbers.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      {selectedNumber && <p className="selected-text">You selected: {selectedNumber}</p>}
    </div>
  );
};

export default NumberDropdown;
