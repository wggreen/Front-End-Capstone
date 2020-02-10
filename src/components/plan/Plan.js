import React, { useContext, useState } from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { AddressContext } from "../addresses/AddressProvider"
import { ProfileContext } from "../profile/ProfileProvider"

export default (props) => {
    
  const { addresses } = useContext(AddressContext)
  const { profiles } = useContext(ProfileContext)

  let tourCards =""

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
                      let foundProfile = profiles.find(profile => profile.name === address.name)
                      let foundProfileAddress = ""
                      if (foundProfile.hasOwnProperty("address") && foundProfile.hasOwnProperty("addressPublic") && foundProfile.addressPublic === true) {
                        foundProfileAddress = <>
                        <div className="tourCard__address">{foundProfile.address}</div>
                        </>
                      }
                      let foundProfileAddress2 = ""
                      if (foundProfile.hasOwnProperty("address2") && foundProfile.hasOwnProperty("address2Public") && foundProfile.address2Public === true) {
                        foundProfileAddress2 = <>
                        <div className="tourCard__address2">{foundProfile.address2}</div>
                        </>
                      }
                      let foundProfileZip = ""
                      if (foundProfile.hasOwnProperty("zip") && foundProfile.hasOwnProperty("zipPublic") && foundProfile.zipPublic === true) {
                        foundProfileZip = <>
                        <div className="tourCard__zip">{foundProfile.zip}</div>
                        </>
                      }
                      let foundProfileBlurb = ""
                      if (foundProfile.hasOwnProperty("blurb") && foundProfile.hasOwnProperty("blurbPublic") && foundProfile.blurbPublic === true) {
                        foundProfileBlurb = <>
                        <div className="tourCard__blurb">{foundProfile.blurb}</div>
                        </>
                      }
                      let socialMediaButtonClicked = false
                      let foundProfileWebsite = ""
                      let foundProfileFacebook = ""
                      let foundProfileInstagram = ""
                      let foundProfileTwitter = ""
                      let foundProfileSocialMedia = <>
                      <section className>
                        {foundProfileWebsite}
                        {foundProfileFacebook}
                        {foundProfileInstagram}
                        {foundProfileTwitter}
                      </section>
                      </>
                      if (foundProfile.webPublic === true) {
                        if (foundProfile.hasOwnProperty("website")) {
                          foundProfileWebsite = <>
                          <div className="tourCard__website">{foundProfile.website}</div>
                          </>
                        }
                        if (foundProfile.hasOwnProperty("facebook")) {
                          foundProfileFacebook = <>
                          <div className="tourCard__facebook">{foundProfile.facebook}</div>
                          </>
                        }
                        if (foundProfile.hasOwnProperty("instagram")) {
                          foundProfileInstagram = <>
                          <div className="tourCard__instagram">{foundProfile.instagram}</div>
                          </>
                        }
                        if (foundProfile.hasOwnProperty("twitter")) {
                          foundProfileInstagram = <>
                          <div className="tourCard__twitter">{foundProfile.twitter}</div>
                          </>
                        }
                      }
                      console.log("tourCards before: ", tourCards)
                      tourCards += <>
                      <div className="tourCard">
                          <h3 className="tourCard__header">{address.name}</h3>
                          <div className="tourCard__capacity">Capacity: {foundProfile.capacity}</div>
                          {foundProfileAddress}
                          {foundProfileAddress2}
                          <section className="tourCard__cityStateZip">
                            <div className="tourCard__city">{foundProfile.city}</div>
                            <div className="tourCard__state">{foundProfile.state}</div>
                            {foundProfileZip}
                          </section>
                          <h5 className="tourCard__blurbHeader">About Us</h5>
                          {foundProfileBlurb}
                          {socialMediaButtonClicked ? (
                            <>
                            {foundProfileSocialMedia}
                            </>
                          ) : (
                            <>
                            <button onClick={() => {
                              socialMediaButtonClicked = true
                            }}>Social media</button>
                            </>
                          )}
                      </div>
                      </>
                      console.log("tourCards after: ", tourCards)
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