import React, { useState } from "react"
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
import { UserProvider } from "./user/UserProvider"
import { AddressProvider } from "./addresses/AddressProvider"


export default props => {

  const [tourCards, setTourCards] = useState([])
  const [polylinePath, setPolylinePath] = useState([])

  const removeIndex = (index) => {
    debugger
    let holdingArray = tourCards
    holdingArray.splice(index, 1)
    setTourCards(holdingArray)
  }

    return (
      <>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <>
                  <section className="landingPageContainer">
                      <div>
                          <p>Hello World</p>
                      </div>
                  </section>
                </>
              );
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
              <Route exact path="/plan" render={props => <Plan {...props} 
                setTourCards={setTourCards} 
                tourCards={tourCards} 
                polylinePath={polylinePath} 
                removeIndex={removeIndex}
                setPolylinePath={setPolylinePath}/>} />

              <Route exact path="/plan/:userId(\d+)" render={props => <BookVenue {...props} />} />
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