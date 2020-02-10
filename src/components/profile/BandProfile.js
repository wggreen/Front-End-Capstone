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

    let bandWebsite = ""
    let bandSpotify = ""
    let bandBandcamp = ""
    let bandYoutube = ""
    let bandFacebook = ""
    let bandInstagram
    let bandTwitter = ""

    if (profile.webPublic) {
        if (profile.website) {
            bandWebsite = <>
            <div className="band__website"> <a href={profile.website}> {profile.website} </a> </div>
            </>
        }
        if (profile.spotify) {
            bandSpotify = <>
            <div className="band__spotify"> <a href={profile.spotify}> {profile.spotify} </a> </div>
            </>
        }
        if (profile.bandcamp) {
            bandBandcamp = <>
            <div className="band__bandcamp"> <a href={profile.bandcamp}> {profile.bandcamp} </a> </div>
            </>
        }
        if (profile.bandcamp) {
            bandYoutube = <>
            <div className="band__youtube"> <a href={profile.youtube}> {profile.youtube} </a> </div>
            </>
        }
        if (profile.facebook) {
            bandFacebook = <>
            <div className="band__facebook"> <a href={profile.facebook}> {profile.facebook} </a> </div>
            </>
        }
        if (profile.instagram) {
            bandInstagram = <>
            <div className="band__instagram"> <a href={profile.instagram}> {profile.instagram} </a> </div>
            </>
        }
        if (profile.twitter) {
            bandTwitter = <>
            <div className="band__twitter"> <a href={profile.twitter}> {profile.twitter} </a> </div>
            </>
        }
    }

    let bandBlurb = ""

    if (profile.blurb && profile.blurbPublic) {
        bandBlurb = <>
        <div className="band__blurb"> { profile.blurb } </div>
        </>
    }

    return (
        <section className="bandProfile">
            <h3 className="band__name"> { profile.name } </h3>
            <div className="band__size"> Size: { profile.size } </div>
            <div className="band__fullAddress">
                <div className="band__city"> { profile.city } </div>
                <div className="band__state"> { profile.state } </div>
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
        </section>
    )

}