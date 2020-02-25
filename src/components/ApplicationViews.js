import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import BandProfile from "./profile/BandProfile"
import BandProfileForm from "./profile/BandProfileForm"
import VenueProfile from "./profile/VenueProfile"
import VenueProfileForm from "./profile/VenueProfileForm"
import NavBar from "./nav/NavBar"
import Plan from "./plan/Plan"
import BookVenue from "./book/BookVenue"
import Messages from "./message/Messages"
import MessageDetail from "./message/MessageDetail"
import Tours from "./tour/Tours"
import { UserProvider } from "./user/UserProvider"
import { AddressProvider } from "./addresses/AddressProvider"
import { BookingProvider } from "./book/BookingProvider"
import { BookingTourProvider } from "./bookingTour/BookingTourProvider"
import { TourProvider } from "./tour/TourProvider"
import { MessageProvider } from "./message/MessageProvider"
import { ConversationProvider } from "./conversations/ConversationProvider"
import { ConversationMessageProvider } from "./conversationMessage/ConversationMessageProvider"
import "./Capstone.css"


export default props => {

  const [tourCards, setTourCards] = useState([])
  const [currentTour, setCurrentTour] = useState({})
  const [currentBooking, setCurrentBooking] = useState({})
  const [currentBookingTour, setCurrentBookingTour] = useState({})
  const [tourNameEntered, setTourNameEntered] = useState(false)
  const [inboxView, setInboxView] = useState(true)

  return (
    <>
      <Route
        exact
        path="/"
        render={props => {
          if (localStorage.getItem("capstone_user") === null) {
            return (
              <>
                <section className="landingPageContainer">
                  <div>
                    <p>Hello World</p>
                  </div>
                </section>
              </>
            );
          }
          else {
            return (
              <>
                <section className="landingPageContainer">
                  <div>
                    <h1>Hit the road!</h1>
                  </div>
                </section>
              </>
            );
          }
        }}
      />
      <AddressProvider>
        <UserProvider>
          <Route render={props => <NavBar {...props} />} />
          <Route path="/bandProfiles/:userId(\d+)" render={
            props => <BandProfile {...props} />
          } />
          <Route path="/venueProfiles/:userId(\d+)" render={
            props => <VenueProfile {...props} />
          } />
          <Route path="/createBandProfile/:userId(\d+)" render={
            props => <BandProfileForm {...props} />
          } />
          <TourProvider>
            <BookingProvider>
              <BookingTourProvider>
                <Route exact path="/plan" render={props => <Plan {...props}
                  tourCards={tourCards}
                  setTourCards={setTourCards}
                  currentTour={currentTour}
                  setCurrentTour={setCurrentTour}
                  currentBooking={currentBooking}
                  setCurrentBooking={setCurrentBooking}
                  currentBookingTour={currentBookingTour}
                  setCurrentBookingTour={setCurrentBookingTour}
                  tourNameEntered={tourNameEntered}
                  setTourNameEntered={setTourNameEntered} />} />
                <Route exact path="/tours" render={props => <Tours {...props} />} />
              </BookingTourProvider>
            </BookingProvider>
          </TourProvider>
          <MessageProvider>
            <ConversationProvider>
              <ConversationMessageProvider>
                <Route exact path="/plan/:userId(\d+)" render={props => <BookVenue {...props}
                  tourCards={tourCards}
                  currentTour={currentTour}
                  currentBooking={currentBooking}
                  currentBookingTour={currentBookingTour}
                  tourNameEntered={tourNameEntered} />} />
                <Route exact path="/messages" render={props => <Messages {...props}
                  inboxView={inboxView}
                  setInboxView={setInboxView} />} />
                <Route exact path="/messages/:messageId(\d+)" render={props => <MessageDetail {...props}
                  inboxView={inboxView}
                  setInboxView={setInboxView} />} />
              </ConversationMessageProvider>
            </ConversationProvider>
          </MessageProvider>
          <Route path="/createVenueProfile/:userId(\d+)" render={
            props => <VenueProfileForm {...props} />
          } />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/register" render={props => <Register {...props} />} />
        </UserProvider>
      </AddressProvider>
    </>
  );
};