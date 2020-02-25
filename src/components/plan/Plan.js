import React, { useContext, useState, useRef, useEffect } from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps'
import { TourContext } from "../tour/TourProvider"
import { BookingContext } from "../book/BookingProvider"
import { BookingTourContext } from "../bookingTour/BookingTourProvider"
import { AddressContext } from "../addresses/AddressProvider"
import TourCard from "./TourCard"
import "./Plan.css"

export default (props) => {
  const { addresses } = useContext(AddressContext)
  const { tours, deleteTour, addTour, editTour, getTours } = useContext(TourContext) || {}
  const { bookings, deleteBooking, addBooking, getBookings } = useContext(BookingContext) || {}
  const { bookingsTours, deleteBookingTour, addBookingTour, getBookingsTours } = useContext(BookingTourContext) || {}

  const tourNameRef = useRef("")

  let lineSymbol = {
    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  }

  const makeTourCard = (address) => {
    console.log("**** makeTourCard SCOPE tourCards ******")
    console.log(props.tourCards)

    const index = props.tourCards.length
    return <TourCard
      key={index}
      address={address}
      history={props.history}
      removeIndex={removeIndex}
    />
  }

  const PlanMap = withGoogleMap(properties => (
    <GoogleMap google={window.google} defaultCenter={{ lat: 39.5, lng: -98.35 }}
      defaultZoom={3}>
      {
        addresses.map(address => {
          // let pathCoordinates = {
          //   lat: address.address.lat,
          //   lng: address.address.lng
          // }
          return (
            <>
              <Marker
                key={address.id}
                position={{
                  lat: address.address.lat,
                  lng: address.address.lng
                }}
              >
                <InfoWindow
                  key={address.id}>
                  <>
                    <span className="infoWindowHeader">{address.name}</span>
                    <div>
                      <button className="addTourButton" onClick={event => {
                        event.preventDefault()
                        if (props.tourNameEntered === true) {
                          let newTourCard = makeTourCard(address)
                          let newCardArray = props.tourCards.slice()
                          newCardArray.push(newTourCard)
                          props.setTourCards(newCardArray)
                          addBooking(constructNewBooking(address))

                            .then((createdBooking) => createdBooking.json())

                            .then(createdBooking => {
                              props.setCurrentBooking(createdBooking)
                              return createdBooking
                            })

                            .then((createdBooking) => {
                              addBookingTour(constructNewBookingTour(createdBooking))

                                .then((createdBookingTour) => {
                                  props.setCurrentBooking(createdBookingTour)
                                  return createdBookingTour
                                })

                              return createdBooking
                            })
                        } else {
                          window.alert("Please enter a tour name")
                        }

                      }}
                      >
                        Add to tour
                    </button>
                    </div>
                  </>
                </InfoWindow>
              </Marker>
              <Polyline
                path={props.polylinePath}
                geodesic={true}
                options={{
                  strokeColor: "#ff2527",
                  strokeOpacity: 0.75,
                  strokeWeight: 2,
                  icons: [
                    {
                      icon: lineSymbol,
                      offset: "0",
                      repeat: "20px"
                    }
                  ]
                }}
              />
            </>
          )
        })
      }
    </GoogleMap>
  ));

  const removeIndex = () => {
    let holdingArray = props.tourCards.slice()
    props.setTourCards(holdingArray)
    if (holdingArray.length > 0) {
      deleteBooking(props.currentBooking)
        .then(() => getBookings())
        .then(() => {
          let foundBookingTour = bookingsTours.find(bookingTour => bookingTour.bookingId === props.currentBooking.id)
          deleteBookingTour(foundBookingTour)
        })
    }
  }

  const constructNewTour = () => {
    let newTour =
    {
      bandId: parseInt(localStorage.getItem("capstone_user"), 10),
      name: tourNameRef.current.value,
      saved: false
    }
    addTour(newTour)
      .then((createdTour) => createdTour.json())
      .then((createdTour) => {
        props.setCurrentTour(createdTour)
        props.setTourNameEntered(true)
      })
  }

  const constructNewBooking = (address) => {
    let newBooking = {
      bandId: parseInt(localStorage.getItem("capstone_user"), 10),
      venueId: address.id,
      name: address.name
    }
    return newBooking
  }

  const constructNewBookingTour = (currentBooking) => {
    let newBookingTour = {
      bandId: parseInt(localStorage.getItem("capstone_user"), 10),
      venueId: currentBooking.venueId,
      bookingId: currentBooking.id,
      tourId: props.currentTour.id,
      bookingName: currentBooking.name,
      tourName: props.currentTour.name
    }
    return newBookingTour
  }

  const clearTour = () => {
    let foundTour = tours.find(tour => tour.name === props.currentTour.name)
    deleteTour(foundTour)
    let relatedBookingTours = []
    let relatedBookings = []
    bookingsTours.map(bookingTour => {
      if (bookingTour.tourId === foundTour.id) {
        relatedBookingTours.push(bookingTour)
      }
    })
    relatedBookingTours.map(relatedBookingTour => {
      bookings.map(booking => {
        if (booking.id === relatedBookingTour.bookingId) {
          relatedBookings.push(booking)
        }
      })
    })
    relatedBookingTours.map(relatedBookingTour => {
      deleteBookingTour(relatedBookingTour)
    })
    relatedBookings.map(relatedBooking => {
      deleteBooking(relatedBooking)
    })
  }

  return (
    <>
      <section className="planSection">
        <div className="mapSection">
          <PlanMap
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px`, width: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <section className="tourSection">
          {props.tourNameEntered ? (
            <>
              <h2>{props.currentTour.name}</h2>
              <section className="tourButtonSection">
                <button onClick={() => {
                  if (props.tourCards.length === 0) {
                    window.alert("Your tour is empty")
                  } else {
                    props.setTourCards("")
                    let currentTourEdited = props.currentTour
                    currentTourEdited.saved = true
                    editTour(currentTourEdited)
                      .then(() => {
                        props.setTourNameEntered(false)
                      })
                  }
                }}>
                  Save tour
              </button>
                <button onClick={() => {
                  if (props.tourCards.length === 0) {
                    window.alert("Your tour is empty")
                  } else {
                    clearTour()
                    props.setTourCards("")
                  }
                }}>Clear tour</button>
              </section>
              {props.tourCards}
            </>
          ) : (
              <>
                <form>
                  <fieldset>
                    <div>
                      <label htmlFor="tourName">Tour name: </label>
                      <input
                        type="text"
                        name="tourName"
                        ref={tourNameRef}
                        required
                        autoFocus />
                    </div>
                  </fieldset>
                  <section>
                    <button id="eventFormSubmitButton" type="submit"
                      onClick={evt => {
                        evt.preventDefault()
                        constructNewTour()
                      }}
                      className="btn btn-primary">
                      {/* {editMode ? "Save Edit" : "Save Event"} */}
                      Submit</button>
                  </section>
                </form>
              </>
            )}
        </section>
      </section>
    </>
  )

}