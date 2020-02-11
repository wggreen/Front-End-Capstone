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

    let bandWebsite = ""
    let bandSpotify = ""
    let bandBandcamp = ""
    let bandYoutube = ""
    let bandFacebook = ""
    let bandInstagram
    let bandTwitter = ""

    if (user.webPublic) {
        if (user.website) {
            bandWebsite = <>
            <div className="band__website"> <a href={user.website}> {user.website} </a> </div>
            </>
        }
        if (user.spotify) {
            bandSpotify = <>
            <div className="band__spotify"> <a href={user.spotify}> {user.spotify} </a> </div>
            </>
        }
        if (user.bandcamp) {
            bandBandcamp = <>
            <div className="band__bandcamp"> <a href={user.bandcamp}> {user.bandcamp} </a> </div>
            </>
        }
        if (user.bandcamp) {
            bandYoutube = <>
            <div className="band__youtube"> <a href={user.youtube}> {user.youtube} </a> </div>
            </>
        }
        if (user.facebook) {
            bandFacebook = <>
            <div className="band__facebook"> <a href={user.facebook}> {user.facebook} </a> </div>
            </>
        }
        if (user.instagram) {
            bandInstagram = <>
            <div className="band__instagram"> <a href={user.instagram}> {user.instagram} </a> </div>
            </>
        }
        if (user.twitter) {
            bandTwitter = <>
            <div className="band__twitter"> <a href={user.twitter}> {user.twitter} </a> </div>
            </>
        }
    }

    let bandBlurb = ""

    if (user.blurb && user.blurbPublic) {
        bandBlurb = <>
        <div className="band__blurb"> { user.blurb } </div>
        </>
    }

    return (
        <section className="banduser">
            <h3 className="band__name"> { user.name } </h3>
            <div className="band__size"> Size: { user.size } </div>
            <div className="band__fullAddress">
                <div className="band__city"> { user.city } </div>
                <div className="band__state"> { user.state } </div>
            </div>
            <div className="band_web">
                {bandWebsite}
                {bandSpotify}
                {bandBandcamp}
                {bandFacebook}
                {bandInstagram}
                {bandTwitter}
                {bandYoutube}
            </div>
            {bandBlurb}
            <button onClick={() => {
                props.history.push(`/createBandProfile/${chosenUserId}`)
            }}>Edit Profile</button>
        </section>
    )

}