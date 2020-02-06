import React, { useContext, useState, useEffect, useRef } from "react"
import { ProfileContext } from "./ProfileProvider"

export default props => {
    const { addProfile, profiles, editProfile } = useContext(ProfileContext)
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
    const [profile, setProfile] = useState({})
    const [webPublic, setWebPublic] = useState()
    const [blurbPublic, setBlurbPublic] = useState()

    const editMode = props.match.params.hasOwnProperty("profileId")

    // const handleControlledInputChange = (event) => {
    //     /*
    //         When changing a state object or array, always create a new one
    //         and change state instead of modifying current one
    //     */
    //     const newProfile = Object.assign({}, profile)
    //     newProfile[event.target.name] = event.target.value
    //     setProfile(newProfile)
    // }

    const setDefaults = () => {
        if (editMode) {
            const profileId = parseInt(props.match.params.profileId)
            const selectedProfile = profiles.find(p => p.id === profileId) ||{}
            setProfile(selectedProfile)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [profiles])

    const constructNewProfile = () => {
            if (editMode) {
                editProfile({
                    id: profile.id,
                    userId: parseInt(props.match.params.profileId, 10),
                    name: bandName.current.value,
                    size: bandSize.current.value,
                    city: bandCity.current.value,
                    state: bandState.current.value,
                    ... venueAddress.current.value && { address: venueAddress.current.value },
                    
                })
                    .then(() => props.history.push(`/venueProfiles/${profile.id}`))
            } else {
                addProfile({
                    id: profile.id,
                    userId: parseInt(props.match.params.profileId, 10),
                    name: venueName.current.value,
                    capacity: venueCapacity.current.value,
                    allAges: allAges,
                    ... venueAddress.current.value && { address: venueAddress.current.value },
                    ... venueAddress.current.value && { addressPublic: addressPublic },
                    city: venueCity.current.value,
                    state: venueState.current.value,
                    ... venueAddressLine2.current.value && { address2: venueAddressLine2.current.value },
                    ... venueAddressLine2.current.value && { address2Public: addressPublic2 },
                    ... venueZip.current.value && { zip: venueZip.current.value },
                    ... venueZip.current.value && { zipPublic: zipPublic },
                    ... venueWebsite.current.value && { website: venueWebsite.current.value},
                    ... venueWebsite.current.value && { webPublic: webPublic},
                    ... venueFacebook.current.value && { facebook: venueFacebook.current.value},
                    ... venueInstagram.current.value && { instagram: venueInstagram.current.value},
                    ... venueTwitter.current.value && { twitter: venueTwitter.current.value},
                    ... venueBlurb.current.value && { blurb: venueBlurb.current.value},
                    ... venueBlurb.current.value && { blurbPublic: blurbPublic}
                })
                    .then(() => props.history.push(`/venueProfiles/${profile.id}`))
            }
    }

    return (
        <form className="profileForm">
            <h2 className="profileForm__title">{editMode ? "Update Profile" : "Create Profile"}</h2>
            <fieldset className="bandProfileFieldset">
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandName}
                        defaultValue={profile.name}
                    />
                </div>
            </fieldset>
            <fieldset className="bandProfileFieldset">
                <div className="form-group">
                    <label htmlFor="size">Number of memebers: </label>
                    <input type="number" name="size" required className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandSize}
                        defaultValue={profile.size}
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
                        defaultValue={venue.city}
                    />
                </div>
            </fieldset>
            <fieldset className="bandProfileFieldset">
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
                <legend>Social media</legend>
                <div className="form-group">
                    <label htmlFor="website">Website: </label>
                    <input type="text" name="website" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandWebsite}
                    />
                    <label htmlFor="spotify">spotify: </label>
                    <input type="text" name="spotify" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandSpotify}
                    />
                    <label htmlFor="bandcamp">Bandcamp: </label>
                    <input type="text" name="bandcamp" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandBandcamp}
                    />
                    <label htmlFor="youtube">Youtube: </label>
                    <input type="text" name="youtube" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandYoutube}
                    />
                    <label htmlFor="facebook">facebook: </label>
                    <input type="text" name="facebook" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandFacebook}
                    />
                    <label htmlFor="twitter">Twitter: </label>
                    <input type="text" name="twitter" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandTwitter}
                    />
                    <label htmlFor="instagram">Instagram: </label>
                    <input type="text" name="instagram" autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={bandInstagram}
                    />
                </div>
                <fieldset className="bandProfileFieldset">
                    <div className="form-group">
                    <legend>Make it public?</legend>
                    <label for="yes"> 
                        <input type="radio" name="yes" value="true" onChange={() => {
                            let truth = true
                            setWebPublic(truth)
                        }}/>
                        Yes 
                    </label>
                    <label for="no"> 
                        <input type="radio" name="no" value="false" checked="true" onChange={() => {
                            let falseness = false
                            setWebPublic(falseness)
                        }}/>
                        No 
                    </label>
                    </div>
                </fieldset>
            </fieldset>
            <fieldset className="bandProfileFieldset">
                <div className="form-group">
                    <label htmlFor="blurb">About us: </label>
                    <textarea className="form-control" name="blurb" rows="10" cols="50" ref={bandBlurb} autofocus></textarea>
                </div>
                <fieldset className="bandProfileFieldset">
                        <div className="form-group">
                        <legend>Make it public?</legend>
                        <label for="yes"> 
                            <input type="radio" name="yes" value="true" onChange={() => {
                                let truth = true
                                setBlurbPublic(truth)
                            }}/>
                            Yes 
                        </label>
                        <label for="no"> 
                            <input type="radio" name="no" value="false" onChange={() => {
                                let falseness = false
                                setBlurbPublic(falseness)
                            }}/>
                            No 
                        </label>
                        </div>
                    </fieldset>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                {editMode ? "Save changes" : "Save profile"}
            </button>
        </form>
    )
}