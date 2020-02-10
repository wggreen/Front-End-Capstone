import React from "react"
import { Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import BandProfile from "./profile/BandProfile"
import BandProfileForm from "./profile/BandProfileForm"
import VenueProfile from "./profile/VenueProfile"
import VenueProfileForm from "./profile/VenueProfileForm"
import NavBar from "./nav/NavBar"
import Plan from "./plan/Plan"
import MarkerList from "./plan/MarkerList"
import { UserProvider } from "./user/UserProvider"
import { ProfileProvider } from "./profile/ProfileProvider"
import { AddressProvider } from "./addresses/AddressProvider"


export default props => {
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
          <ProfileProvider>
            <AddressProvider>
              <UserProvider>
                <Route render={props => <NavBar {...props} />} />
                <Route path="/bandProfiles/:profileId(\d+)" render={
                  props => <BandProfile {...props} />
                } />
                <Route path="/venueProfiles/:profileId(\d+)" render={
                  props => <VenueProfile {...props} />
                } />
                <Route path="/createBandProfile" render={
                  props => <BandProfileForm {...props} />
                } />
                <Route exact path="/plan" render={props => <Plan {...props} />} />
                <Route path="/createVenueProfile" render={
                  props => <VenueProfileForm {...props} />
                } />
                </UserProvider>
              </AddressProvider>
            </ProfileProvider>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/register" render={props => <Register {...props} />} />
      </>
    );
  };