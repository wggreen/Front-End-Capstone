import React, { useContext, useState, useRef } from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps'
import { AddressContext } from "../addresses/AddressProvider"
import TourCard from "./TourCard"
import "./Plan.css"

export default (props) => {
  const { addresses } = useContext(AddressContext)
  // const { tours, addTour } = useContext(TourContext)
  const [currentTour, setCurrentTour] = useState({})
  const tourNameRef = useRef("")

  let tourName = "abc"

  let lineSymbol = {
    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  }

  console.log("**** COMPONENT SCOPE  ******")
  console.log(props.tourCards)
  
  const makeTourCard = (address) => {
    console.log("**** makeTourCard SCOPE  ******")
    console.log(props.tourCards)


    const index = props.tourCards.length
    // let polylinePathCopy = props.polylinePath
    // polylinePathCopy.push(pathCoordinates)
    // props.setPolylinePath(polylinePathCopy)
    return <TourCard
        key={index}
        address={address}
        history={props.history}
        removeIndex={removeIndex}
        index={index}
        tourCards={props.tourCards || []}
      />
  }


  const PlanMap = withGoogleMap(properties => (
    <GoogleMap google={window.google} defaultCenter={{ lat: 39.5, lng: -98.35 }}
      defaultZoom={4}>
      {
        addresses.map(address => {
          // let pathCoordinates = {
          //   lat: address.address.lat,
          //   lng: address.address.lng
          // }
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
                        let newTourCard = makeTourCard(address)
                        let newCardArray = props.tourCards.slice()
                        newCardArray.push(newTourCard)
                        props.setTourCards(newCardArray)
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
          )
        })
      }
    </GoogleMap>
  ));

  const removeIndex = (index) => {
    let holdingArray = props.tourCards.slice()
    // holdingArray.splice(index, 1)
    props.setTourCards(holdingArray)
  }



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
          {tourName ? ("") : (
          <>
            <form>
              <fieldset>
                <div>
                  <label htmlFor="tourName">Tour name: </label>
                  <input 
                      type="text" 
                      name="tourName"
                      ref={tourNameRef}
                      required 
                      autoFocus/>
                </div>
              </fieldset>
              <section>
              <button id="eventFormSubmitButton" type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        // constructNewTour()
                    }}
                    className="btn btn-primary">
                    {/* {editMode ? "Save Edit" : "Save Event"} */}
                </button>
              </section>
            </form>
            </>
            )}
          <button onClick={() => {
            props.setTourCards("")
          }}>Clear tour</button>
          {props.tourCards}
        </section>
      </section>
    </>
  )

}