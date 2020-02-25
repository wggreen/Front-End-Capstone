import React, { useContext, useState, useEffect, useRef } from "react"
import { UserContext } from "../user/UserProvider"
import "./Profile.css"

export default props => {
    const { users, addUser, editUser } = useContext(UserContext)
    const bandName = useRef()
    const bandSize = useRef()
    const bandCity = useRef()
    const bandState = useRef()
    const bandWebsite = useRef()
    const bandBandcamp = useRef()
    const bandYoutube = useRef()
    const bandFacebook = useRef()
    const bandInstagram = useRef()
    const bandTwitter = useRef()
    const bandSpotify = useRef()
    const bandBlurb = useRef()
    const [user, setUser] = useState({})
    const [webPublic, setWebPublic] = useState()
    const [blurbPublic, setBlurbPublic] = useState()

    const editMode = props.match.params.hasOwnProperty("userId")

    const setDefaults = () => {
        if (editMode) {
            const userId = parseInt(props.match.params.userId)
            const seletedUser = users.find(user => user.id === userId) || {}
            setUser(seletedUser)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [users])

    const constructNewProfile = () => {
        if (editMode) {
            editUser({
                email: user.email,
                password: user.password,
                username: user.username,
                userType: user.userType,
                id: user.id,
                name: bandName.current.value,
                size: bandSize.current.value,
                city: bandCity.current.value,
                state: bandState.current.value,
                website: bandWebsite.current.value,
                bandcamp: bandBandcamp.current.value,
                youtube: bandYoutube.current.value,
                facebook: bandFacebook.current.value,
                instagram: bandInstagram.current.value,
                twitter: bandTwitter.current.value,
                spotify: bandSpotify.current.value,
                webPublic: webPublic,
                blurb: bandBlurb.current.value,
                blurbPublic: blurbPublic,
                address2: "",
                address2Public: "",
                zip: "",
                zipPublic: "",
                facebook: "",
                instagram: "",
                capacity: "",
                allAges: "",
                address: "",
                addressPublic: ""

            })
                .then(() => {
                    let userId = parseInt(localStorage.getItem("capstone_user"), 10)
                    props.history.push(`/bandProfiles/${userId}`)
                })
        } else {
            editUser({
                email: user.email,
                password: user.password,
                username: user.username,
                userType: user.userType,
                name: bandName.current.value,
                size: bandSize.current.value,
                city: bandCity.current.value,
                state: bandState.current.value,
                website: bandWebsite.current.value,
                bandcamp: bandBandcamp.current.value,
                youtube: bandYoutube.current.value,
                facebook: bandFacebook.current.value,
                instagram: bandInstagram.current.value,
                twitter: bandTwitter.current.value,
                spotify: bandSpotify.current.value,
                webPublic: webPublic,
                blurb: bandBlurb.current.value,
                blurbPublic: blurbPublic,
                address2: "",
                address2Public: "",
                zip: "",
                zipPublic: "",
                facebook: "",
                instagram: "",
                capacity: "",
                allAges: "",
                address: "",
                addressPublic: ""
            })
                .then(() => {
                    let userId = parseInt(localStorage.getItem("capstone_user"), 10)
                    localStorage.setItem("profile", "set")
                    props.history.push(`/bandProfiles/${userId}`)
                })
        }
    }



    return (
        <form className="bandProfileForm">
            <h2 className="profileForm__title">{editMode ? "Update Profile" : "Create Band Profile"}</h2>
            <fieldset className="bandProfileFieldset">
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandName}
                        defaultValue={user.name}
                    />
                </div>
            </fieldset>
            <fieldset className="bandProfileFieldset">
                <div className="form-group">
                    <label htmlFor="size">Number of members: </label>
                    <input type="number" name="size" required className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandSize}
                        defaultValue={user.size}
                    />
                </div>
            </fieldset>
            <fieldset className="bandProfileFieldset">
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city" required autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandCity}
                        defaultValue={user.city}
                    />
                </div>
                <label for="state">State</label>
                <select id="state" name="state" ref={bandState} required autoFocus>
                    <option value="0">Please select a state...</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District of Columbia">District of Columbia</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Guam">Guam</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option><option value="Kansas">Kansas</option><option value="Kentucky">Kentucky</option><option value="Louisiana">Louisiana</option><option value="Maine">Maine</option><option value="Maryland">Maryland</option><option value="Massachusetts">Massachusetts</option><option value="Michigan">Michigan</option><option value="Minnesota">Minnesota</option><option value="Mississippi">Mississippi</option><option value="Missouri">Missouri</option><option value="Montana">Montana</option><option value="Nebraska">Nebraska</option><option value="Nevada">Nevada</option><option value="New Hampshire">New Hampshire</option><option value="New Jersey">New Jersey</option><option value="New Mexico">New Mexico</option><option value="New York">New York</option><option value="North Carolina">North Carolina</option><option value="North Dakota">North Dakota</option><option value="Northern Marianas Islands">Northern Marianas Islands</option><option value="Ohio">Ohio</option><option value="Oklahoma">Oklahoma</option><option value="Oregon">Oregon</option><option value="Pennsylvania">Pennsylvania</option><option value="Puerto Rico">Puerto Rico</option><option value="Rhode Island">Rhode Island</option><option value="South Carolina">South Carolina</option><option value="South Dakota">South Dakota</option><option value="Tennessee">Tennessee</option><option value="Texas">Texas</option><option value="Utah">Utah</option><option value="Vermont">Vermont</option><option value="Virginia">Virginia</option><option value="Virgin Islands">Virgin Islands</option><option value="Washington">Washington</option><option value="West Virginia">West Virginia</option><option value="Wisconsin">Wisconsin</option><option value="Wyoming">Wyoming</option></select>
            </fieldset>
            <fieldset className="bandProfileFieldset">
                <div className="form-group" id="bandSocialMedia">
                    <legend>Social media</legend>
                    <br></br>
                    <label htmlFor="website">Website: </label>
                    <input type="text" name="website" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandWebsite}
                        defaultValue={user.city}
                    />
                    <label htmlFor="spotify"> Spotify: </label>
                    <input type="text" name="spotify" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandSpotify}
                        defaultValue={user.spotify}
                    />
                    <label htmlFor="bandcamp"> Bandcamp: </label>
                    <input type="text" name="bandcamp" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandBandcamp}
                        defaultValue={user.bandcamp}
                    />
                    <label htmlFor="youtube"> Youtube: </label>
                    <input type="text" name="youtube" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandYoutube}
                        defaultValue={user.youtube}
                    />
                    <label htmlFor="facebook"> Facebook: </label>
                    <input type="text" name="facebook" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandFacebook}
                        defaultValue={user.facebook}
                    />
                    <label htmlFor="twitter"> Twitter: </label>
                    <input type="text" name="twitter" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandTwitter}
                        defaultValue={user.twitter}
                    />
                    <label htmlFor="instagram"> Instagram: </label>
                    <input type="text" name="instagram" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandInstagram}
                        defaultValue={user.instagram}
                    />
                </div>
                <fieldset className="bandProfileFieldset">
                    <div className="form-group">
                        <legend>Make it public?</legend>
                        <label for="yes">
                            <input type="radio" name="yes" value="true" onChange={() => {
                                let truth = true
                                setWebPublic(truth)
                            }} />
                            Yes
                    </label>
                        <label for="no">
                            <input type="radio" name="no" value="false" checked={true} onChange={() => {
                                let falseness = false
                                setWebPublic(falseness)
                            }} />
                            No
                    </label>
                    </div>
                </fieldset>
            </fieldset>
            <fieldset className="bandProfileFieldset">
                <div id="bandBlurb">
                    <div className="form-group" id="bandBlurbInnerDiv">
                        <label htmlFor="blurb">About us: </label>
                        <textarea className="form-control" name="blurb" rows="7" cols="40" ref={bandBlurb} autoFocus defaultValue={user.blurb}></textarea>
                    </div>
                    <fieldset className="bandProfileFieldset">
                        <div className="form-group">
                            <legend>Make it public?</legend>
                            <label for="yes">
                                <input type="radio" name="blurbPublic" value="true" onChange={() => {
                                    let truth = true
                                    setBlurbPublic(truth)
                                }} />
                                Yes
                            </label>
                            <label for="no">
                                <input type="radio" name="blurbPublic" value="false" checked={true} onChange={() => {
                                    let falseness = false
                                    setBlurbPublic(falseness)
                                }} />
                                No
                            </label>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewProfile()
                }}
                className="btn btn-primary">
                {editMode ? "Save changes" : "Save profile"}
            </button>
        </form>
    )
}