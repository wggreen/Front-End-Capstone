import React, {useContext, useState} from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { AddressContext } from "../addresses/AddressProvider"
import { UserContext } from "../user/UserProvider"
import { render } from '@testing-library/react'

export default (props) => {
    
  const { addresses } = useContext(AddressContext)
  const { users } = useContext(UserContext)

  let tourCards = []

  const PlanMap = withGoogleMap(props => (
    <GoogleMap google={window.google} defaultCenter = { { lat: 39.5, lng:  -98.35 } }
    defaultZoom = { 4 }>
          {
            addresses.map(address => 
              <>
              <Marker
                key={address.id}
                position={{
                  lat: address.address.lat,
                  lng: address.address.lng
                }}
                label={{
                  text: "Hello World!",
                  fontFamily: "Arial",
                  fontSize: "14px",
                }}
              >
                <InfoWindow
                  key={address.id}>
                    <>
                  <span>{address.name}</span>
                  <div>
                    <button onClick={() => {
                      let foundUser = users.find(user => user.name === address.name)
                      let foundUserAddress = ""
                      if (foundUser.hasOwnProperty("address") && foundUser.hasOwnProperty("addressPublic") && foundUser.addressPublic === true) {
                        foundUserAddress = <>
                        <div className="tourCard__address">{foundUser.address}</div>
                        </>
                      }
                      let foundUserAddress2 = ""
                      if (foundUser.hasOwnProperty("address2") && foundUser.hasOwnProperty("address2Public") && foundUser.address2Public === true) {
                        foundUserAddress2 = <>
                        <div className="tourCard__address2">{foundUser.address2}</div>
                        </>
                      }
                      let foundUserZip = ""
                      if (foundUser.hasOwnProperty("zip") && foundUser.hasOwnProperty("zipPublic") && foundUser.zipPublic === true) {
                        foundUserZip = <>
                        <div className="tourCard__zip">{foundUser.zip}</div>
                        </>
                      }
                      let foundUserBlurb = ""
                      if (foundUser.hasOwnProperty("blurb") && foundUser.hasOwnProperty("blurbPublic") && foundUser.blurbPublic === true) {
                        foundUserBlurb = <>
                        <div className="tourCard__blurb">{foundUser.blurb}</div>
                        </>
                      }
                      let socialMediaButtonClicked = false
                      let foundUserWebsite = ""
                      let foundUserFacebook = ""
                      let foundUserInstagram = ""
                      let foundUserTwitter = ""
                      let foundUserSocialMedia = <>
                      <section className>
                        {foundUserWebsite}
                        {foundUserFacebook}
                        {foundUserInstagram}
                        {foundUserTwitter}
                      </section>
                      </>
                      if (foundUser.webPublic === true) {
                        if (foundUser.hasOwnProperty("website")) {
                          foundUserWebsite = <>
                          <div className="tourCard__website">{foundUser.website}</div>
                          </>
                        }
                        if (foundUser.hasOwnProperty("facebook")) {
                          foundUserFacebook = <>
                          <div className="tourCard__facebook">{foundUser.facebook}</div>
                          </>
                        }
                        if (foundUser.hasOwnProperty("instagram")) {
                          foundUserInstagram = <>
                          <div className="tourCard__instagram">{foundUser.instagram}</div>
                          </>
                        }
                        if (foundUser.hasOwnProperty("twitter")) {
                          foundUserInstagram = <>
                          <div className="tourCard__twitter">{foundUser.twitter}</div>
                          </>
                        }
                      }
                      tourCards.push(
                        <div className="tourCard" key={address.name}>
                          <h3 className="tourCard__header">{address.name}</h3>
                          <div className="tourCard__capacity">Capacity: {foundUser.capacity}</div>
                          {foundUserAddress}
                          {foundUserAddress2}
                          <section className="tourCard__cityStateZip">
                            <div className="tourCard__city">{foundUser.city}</div>
                            <div className="tourCard__state">{foundUser.state}</div>
                            {foundUserZip}
                          </section>
                          <h5 className="tourCard__blurbHeader">About Us</h5>
                          {foundUserBlurb}
                          {socialMediaButtonClicked ? (
                            <>
                            {foundUserSocialMedia}
                            </>
                          ) : (
                            <>
                            <button onClick={() => {
                              socialMediaButtonClicked = true
                            }}>Social media</button>
                            </>
                          )}
                        </div>
                  )
                  console.log(tourCards)
                  debugger
                    }}
                    >
                      Add to tour
                    </button>
                  </div>
                  </>
                </InfoWindow>
              </Marker>
              </>
            )
          }
          </GoogleMap>
  ));

    return (
      <>
        <div>
          <PlanMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px`, width: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <section className="tourSection">
          {tourCards} 
        </section>
        
        </>
    )

}