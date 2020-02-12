import React, {useContext, useState} from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { AddressContext } from "../addresses/AddressProvider"
import { UserContext } from "../user/UserProvider"
import "./Plan.css"

export default (props) => {
    
  const { addresses } = useContext(AddressContext)
  const { users } = useContext(UserContext)
  const [tourCards, setTourCards] = useState([])
  const [socialMediaButtonClicked, setSocialMediaButtonClicked] = useState(false)

  const PlanMap = withGoogleMap(properties => (
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
                      debugger
                      let foundVenue = users.find(user => user.name === address.name)
                      let foundVenueAddress = ""
                      if (foundVenue.hasOwnProperty("address") && foundVenue.hasOwnProperty("addressPublic") && foundVenue.addressPublic === true) {
                        foundVenueAddress = <>
                        <div className="tourCard__address">{foundVenue.address}</div>
                        </>
                      }
                      let foundVenueAddress2 = ""
                      if (foundVenue.hasOwnProperty("address2") && foundVenue.hasOwnProperty("address2Public") && foundVenue.address2Public === true) {
                        foundVenueAddress2 = <>
                        <div className="tourCard__address2">{foundVenue.address2}</div>
                        </>
                      }
                      let foundVenueZip = ""
                      if (foundVenue.hasOwnProperty("zip") && foundVenue.hasOwnProperty("zipPublic") && foundVenue.zipPublic === true) {
                        foundVenueZip = <>
                        <div className="tourCard__zip">{foundVenue.zip}</div>
                        </>
                      }
                      let foundVenueBlurb = ""
                      if (foundVenue.hasOwnProperty("blurb") && foundVenue.hasOwnProperty("blurbPublic") && foundVenue.blurbPublic === true) {
                        foundVenueBlurb = <>
                        <h5 className="tourCard__blurbHeader">About Us</h5>
                        <div className="tourCard__blurb">{foundVenue.blurb}</div>
                        </>
                      }
                      let foundVenueWebsite = ""
                      let foundVenueFacebook = ""
                      let foundVenueInstagram = ""
                      let foundVenueTwitter = ""
                      if (foundVenue.webPublic === true) {
                        if (foundVenue.hasOwnProperty("website")) {
                          foundVenueWebsite = <>
                          <div className="tourCard__website">{foundVenue.website}</div>
                          </>
                        }
                        if (foundVenue.hasOwnProperty("facebook")) {
                          foundVenueFacebook = <>
                          <div className="tourCard__facebook">{foundVenue.facebook}</div>
                          </>
                        }
                        if (foundVenue.hasOwnProperty("instagram")) {
                          foundVenueInstagram = <>
                          <div className="tourCard__instagram">{foundVenue.instagram}</div>
                          </>
                        }
                        if (foundVenue.hasOwnProperty("twitter")) {
                          foundVenueInstagram = <>
                          <div className="tourCard__twitter">{foundVenue.twitter}</div>
                          </>
                        }
                      }
                      let tourCard = 
                        <div className="tourCard" key={address.name}>
                          <h3 className="tourCard__header">{address.name}</h3>
                          <div className="tourCard__capacity">Capacity: {foundVenue.capacity}</div>
                          {foundVenueAddress}
                          {foundVenueAddress2}
                          <section className="tourCard__cityStateZip">
                            <div className="tourCard__city">{foundVenue.city}</div>
                            <div className="tourCard__state">{foundVenue.state}</div>
                            {foundVenueZip}
                          </section>
                          {foundVenueBlurb}
                          {foundVenueWebsite}
                          {foundVenueFacebook}
                          {foundVenueInstagram}
                          {foundVenueTwitter}
                          <button onClick={() =>{
                            props.history.push(`/plan/${foundVenue.id}`)
                          }}>Book here</button>
                        </div>
                      setTourCards(cards => [...cards, tourCard])
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
          <section className="planSection">
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
          </section>
            </>
        )

}