import React, { useContext } from "react"
import { ProfileContext } from "./ProfileProvider"

export default (props) => {
    const { profiles } = useContext(ProfileContext)

    /*
        This line of code will be explained in the next
        section of the chapter.
    */
    const chosenProfileId = parseInt(props.match.params.profileId, 10)

    const profile = profiles.find(profile => profile.id === chosenProfileId) || {}

    let allAges = ""

    switch (profile.allAges) {
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

    if (profile.allAges === "yes") {
        allAges = "allAges"
    }

    let venueAddress = ""
    if (profile.address && profile.addressPublic) {
        venueAddress = <>
            <div className="venue__address"> { profile.address } </div>
            </>
    }

    let venueAddress2 = ""
    if (profile.address2 && profile.address2Public) {
        venueAddress2 = <>
            <div className="venue__address2"> { profile.address2 } </div>
            </>
    }

    let venueZip =""
    if (profile.zip && profile.zipPublic) {
        venueZip = <>
            <div className="venue__zip"> { profile.zip } </div>
            </>
    }

    let venueWebsite = ""
    let venueFacebook = ""
    let venueInstagram = ""
    let venueTwitter = ""

    if (profile.webPublic) {
        if (profile.website) {
            venueWebsite = <>
            <div className="venue__website"> <a href="{profile.websute}"> {profile.website} </a> </div>
            </>
        }
        if (profile.facebook) {
            venueFacebook = <>
            <div className="venue__facebook"> <a href="{profile.facebook}"> {profile.facebook} </a> </div>
            </>
        }
        if (profile.instagram) {
            venueInstagram = <>
            <div className="venue__instagram"> <a href="{profile.instagram}"> {profile.instagram} </a> </div>
            </>
        }
        if (profile.twitter) {
            venueTwitter = <>
            <div className="venue__twitter"> <a href="{profile.twitter}"> {profile.twitter} </a> </div>
            </>
        }
    }

    let venueBlurb = ""

    if (profile.blurb && profile.blurbPublic) {
        venueBlurb = <>
        <div className="venue__blurb"> { profile.blurb } </div>
        </>
    }

    return (
        <section className="venueProfile">
            <h3 className="venue__name"> { profile.name } </h3>
            <div className="venue__capacity"> Capacity: { profile.capacity } </div>
            <div className="venue__allAges"> {allAges} </div>
            <div className="venue__fullAddress">
                {venueAddress}
                {venueAddress2}
                <div className="venue__city"> { profile.city } </div>
                <div className="venue__state"> { profile.state } </div>
                {venueZip}
            </div>
            <div className="venue_web">
                {venueWebsite}
                {venueFacebook}
                {venueInstagram}
                {venueTwitter}
            </div>
            {venueBlurb}
        </section>
    )

}