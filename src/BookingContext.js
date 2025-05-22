import React, { createContext, useContext, useState } from "react";

// Booking context is created
const BookingContext = createContext();

// Custom hook to access the booking content
export const useBooking = () => {
  return useContext(BookingContext);
};

// Booking provider component
export const BookingProvider = ({ children }) => {
  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // Calculates tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // State for booking dates
  const [dates, setDates] = useState({ checkIn: today, checkOut: tomorrowStr });
  // State for number of guests
  const [guestCount, setGuestCount] = useState(1);

  // State for selected rooms and quantity
  const [selectedRooms, setSelectedRooms] = useState({});

  // State for selected meal plan
  const [selectedMeal, setSelectedMeal] = useState("");

  // State for total prices per room per meal
  const [totalPrices, setTotalPrices] = useState({})

  // Values made available through the context
  const value = {
    dates,
    setDates,
    guestCount,
    setGuestCount,
    selectedRooms,
    setSelectedRooms,
    selectedMeal,
    setSelectedMeal,
    totalPrices,
    setTotalPrices,
  };

  // Context is provided to children files
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingContext;
