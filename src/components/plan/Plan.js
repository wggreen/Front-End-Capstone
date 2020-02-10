import React, { useContext, useState } from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { AddressContext } from "../addresses/AddressProvider"

export default (props) => {
    
  const { addresses } = useContext(AddressContext)

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
                  <span>{address.name}</span>
                </InfoWindow>
              </Marker>
              </>
            )
          }
          </GoogleMap>
  ));

    return (
        <div>
          <PlanMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
    )

}