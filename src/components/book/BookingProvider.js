import React, { useState, useEffect } from "react";

export const BookingContext = React.createContext();

export const BookingProvider = props => {
  const [bookings, setBookings] = useState([]);

  const getBookings = () => {
    return fetch("http://localhost:8088/bookings")
          .then(res => res.json())
          .then(setBookings)
  }

  const deleteBooking = booking => {
    return fetch(`http://localhost:8088/bookings/${booking.id}`, {
      method: "DELETE",
    })
      .then(getBookings)
  }

  const addBooking = booking => {
    return fetch("http://localhost:8088/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    })
    .then(getBookings)
  }

  const editBooking = Booking => {
    return fetch(`http://localhost:8088/bookings/${booking.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    })
    .then(getBookings)
  }

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    console.log("***BookingS APP STATE CHANGED");
  }, [bookings]);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        deleteBooking,
        editBooking,
        addBooking,
        getBookings
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};
