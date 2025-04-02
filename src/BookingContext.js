import React, { createContext, useContext, useState } from "react";

// Create the context
const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [guestCount, setGuestCount] = useState(1); // Default guest count

  // You can update the state as needed (e.g., set dates or guest count)
  const value = { dates, setDates, guestCount, setGuestCount };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
