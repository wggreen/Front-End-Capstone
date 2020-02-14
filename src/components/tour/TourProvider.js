import React, { useState, useEffect } from "react";

export const TourContext = React.createContext();

export const TourProvider = props => {
  const [tours, setTours] = useState([]);

  const getTours = () => {
    return fetch("http://localhost:8088/tours")
          .then(res => res.json())
          .then(setTours)
  }

  const deleteTour = tour => {
    return fetch(`http://localhost:8088/tours/${tour.id}`, {
      method: "DELETE",
    })
      .then(getTours)
  }

  const addTour = tour => {
    return fetch("http://localhost:8088/tours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tour)
    })
    .then(getTours)
  }

  const editTour = tour => {
    return fetch(`http://localhost:8088/tours/${tour.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tour)
    })
    .then(getTours)
  }

  useEffect(() => {
    getTours();
  }, []);

  useEffect(() => {
    console.log("***TOURS APP STATE CHANGED");
  }, [tours]);

  return (
    <TourContext.Provider
      value={{
        tours,
        deleteTour,
        editTour,
        addTour,
        getTours
      }}
    >
      {props.children}
    </TourContext.Provider>
  );
};
