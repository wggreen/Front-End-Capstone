import React, { useContext } from "react"
import { UserContext } from "../user/UserProvider"

export default ({address, history, removeIndex}) => {
    const { users } = useContext(UserContext)

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
                      
    return (
    <>
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
        <button onClick={() => {
            removeIndex()
        }}>Delete</button>
        <button onClick={() =>{
            history.push(`/plan/${foundVenue.id}`)
        }}>Book here</button>
    </div>
    </>
  );
};