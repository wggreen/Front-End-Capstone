import React, { useContext } from "react"
import { UserContext } from "../user/UserProvider"

export default (props) => {
    const { users } = useContext(UserContext)

    /*
        This line of code will be explained in the next
        section of the chapter.
    */
    const chosenUserId = parseInt(props.match.params.userId, 10)

    const user = users.find(user => user.id === chosenUserId) || {}

    let allAges = ""

    switch (user.allAges) {
        case "yes":
            allAges = "All ages";
            break;
        case "18+":
            allAges = "18+";
            break;
        case "21+":
            allAges = "21+";    
            break;
    }

    if (user.allAges === "yes") {
        allAges = "allAges"
    }

    let venueAddress = ""
    if (user.address && user.addressPublic) {
        venueAddress = <>
            <div className="venue__address"> { user.address } </div>
            </>
    }

    let venueAddress2 = ""
    if (user.address2 && user.address2Public) {
        venueAddress2 = <>
            <div className="venue__address2"> { user.address2 } </div>
            </>
    }

    let venueZip =""
    if (user.zip && user.zipPublic) {
        venueZip = <>
            <div className="venue__zip"> { user.zip } </div>
            </>
    }

    let venueWebsite = ""
    let venueFacebook = ""
    let venueInstagram = ""
    let venueTwitter = ""

    if (user.webPublic) {
        if (user.website) {
            venueWebsite = <>
            <div className="venue__website"> <a href={user.website}> {user.website} </a> </div>
            </>
        }
        if (user.facebook) {
            venueFacebook = <>
            <div className="venue__facebook"> <a href={user.facebook}> {user.facebook} </a> </div>
            </>
        }
        if (user.instagram) {
            venueInstagram = <>
            <div className="venue__instagram"> <a href={user.instagram}> {user.instagram} </a> </div>
            </>
        }
        if (user.twitter) {
            venueTwitter = <>
            <div className="venue__twitter"> <a href={user.twitter}> {user.twitter} </a> </div>
            </>
        }
    }

    let venueBlurb = ""

    if (user.blurb && user.blurbPublic) {
        venueBlurb = <>
        <div className="venue__blurb"> { user.blurb } </div>
        </>
    }

    return (
        <section className="venueuser">
            <h3 className="venue__name"> { user.name } </h3>
            <div className="venue__capacity"> Capacity: { user.capacity } </div>
            <div className="venue__allAges"> {allAges} </div>
            <div className="venue__fullAddress">
                {venueAddress}
                {venueAddress2}
                <div className="venue__city"> { user.city },  </div>
                <div className="venue__state">  { user.state } </div>
                {venueZip}
            </div>
            <div className="venue_web">
                {venueWebsite}
                {venueFacebook}
                {venueInstagram}
                {venueTwitter}
            </div>
            {venueBlurb}
            <button onClick={() => {
                props.history.push(`/createVenueProfile/${chosenUserId}`)
            }}>Edit Profile</button>
        </section>
    )

}