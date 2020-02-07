import React from "react"
import { Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import { ProfileProvider } from "./profile/ProfileProvider"
import BandProfile from "./profile/BandProfile"
import BandProfileForm from "./profile/BandProfileForm"
import VenueProfile from "./profile/VenueProfile"
import VenueProfileForm from "./profile/VenueProfileForm"
import NavBar from "./nav/NavBar"
import { UserProvider } from "./user/UserProvider"

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
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/register" render={props => <Register {...props} />} />
          <ProfileProvider>
            <UserProvider>
                <Route render={props => <NavBar {...props} />} />
              </UserProvider>
            <Route path="/bandProfiles/:profileId(\d+)" render={
                    props => <BandProfile {...props} />
                } />
                <Route path="/venueProfiles/:profileId(\d+)" render={
                    props => <VenueProfile {...props} />
                } />
                <Route path="/createBandProfile" render={
                    props => <BandProfileForm {...props} />
                } />
                <Route path="/createVenueProfile" render={
                    props => <VenueProfileForm {...props} />
                } />
            </ProfileProvider>
      </>
    );
  };