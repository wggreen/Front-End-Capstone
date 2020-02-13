import React, {useContext } from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps'
import { AddressContext } from "../addresses/AddressProvider"
import TourCard from "./TourCard"
import "./Plan.css"

export default (props) => {
  const { addresses } = useContext(AddressContext)

  

  // const removePathIndex = (index) => {
  //   let holdingArray = props.polylinePath
  //   holdingArray.splice(index, 1)
  //   props.setPolylinePath(holdingArray)
  // }

  let lineSymbol = {
    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };

  let holdingArray = []

  const PlanMap = withGoogleMap(properties => (
    <GoogleMap google={window.google} defaultCenter = { { lat: 39.5, lng:  -98.35 } }
    defaultZoom = { 4 }>
          {
            addresses.map(address => {
              let pathCoordinates = {
                lat: address.address.lat,
                lng: address.address.lng
              }
              return (
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
                      props.setTourCards(cards => {
                        const virtualId = cards.length
                        console.log(virtualId)
                        let polylinePathCopy = props.polylinePath
                        polylinePathCopy.push(pathCoordinates)
                        props.setPolylinePath(polylinePathCopy)
                        return [...cards, 
                        <TourCard
                        props={props}
                        key={address.id}
                        address={address}
                        history={props.history}
                        virtualId={virtualId}
                        removeIndex={props.removeIndex}
                        tourCards={props.tourCards}
                        setTourCards={props.setTourCards}/>]
                      })
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
            )})
          }
          </GoogleMap>
  ));

  props.setTourCards(props.tourCards)

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
              <button onClick={() => {
                props.setTourCards("")
              }}>Clear tour</button>
              {props.tourCards} 
            </section>
          </section>
            </>
        )

}