import React, { useState, useEffect } from "react";

export const BookingTourContext = React.createContext();

export const BookingTourProvider = props => {
  const [bookingsTours, setBookingsTours] = useState([]);

  const getBookingsTours = () => {
    return fetch("http://localhost:8088/bookingsTours")
          .then(res => res.json())
          .then(setBookingsTours)
  }

  const deleteBookingTour = bookingTour => {
    return fetch(`http://localhost:8088/bookingsTours/${bookingTour.id}`, {
      method: "DELETE",
    })
      .then(getBookingsTours)
  }

  const addBookingTour = bookingTour => {
    return fetch("http://localhost:8088/bookingsTours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingTour)
    })
    .then(getBookingsTours)
  }

  const editBookingTour = bookingTour => {
    return fetch(`http://localhost:8088/bookingsTours/${bookingTour.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingTour)
    })
    .then(getBookingsTours)
  }

  useEffect(() => {
    getBookingsTours();
  }, []);

  useEffect(() => {
    console.log("***BOOKINGSTOURS APP STATE CHANGED");
  }, [bookingsTours]);

  return (
    <BookingTourContext.Provider
      value={{
        bookingsTours,
        deleteBookingTour,
        editBookingTour,
        addBookingTour,
        getBookingsTours
      }}
    >
      {props.children}
    </BookingTourContext.Provider>
  );
};
