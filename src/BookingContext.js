import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const today = new Date().toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [dates, setDates] = useState({ checkIn: today, checkOut: tomorrowStr });
  const [guestCount, setGuestCount] = useState(1); // Default guest count
  const [selectedRooms, setSelectedRooms] = useState({});
  const [selectedMeal, setSelectedMeal] = useState("");
  const [totalPrices, setTotalPrices] = useState({})

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

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingContext;
