import React from "react"
import { Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import { ProfileProvider } from "./profile/ProfileProvider"
import BandProfile from "./profile/BandProfile"
import VenueProfile from "./profile/VenueProfile"


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
            <Route path="/bandProfiles/:profileId(\d+)" render={
                props => <BandProfile {...props} />
            } />
            <Route path="/venueProfiles/:profileId(\d+)" render={
                props => <VenueProfile {...props} />
            } />
          </ProfileProvider>
      </>
    );
  };