import React, { useContext, useState, useEffect } from "react"

export default props => {
    const { addProfile, profiles, updateProfile } = useContext(AnimalContext)
    const [profile, setProfile] = useState({})
    const [allAges, setAllAges]

    const editMode = props.match.params.hasOwnProperty("profileId")

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newProfile = Object.assign({}, profile)
        newProfile[event.target.name] = event.target.value
        setProfile(newProfile)
    }

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

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            } else {
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            }
        }
    }

    return (
        <form className="profileForm">
            <h2 className="profileForm__title">{editMode ? "Update Profile" : "Create Profile"}</h2>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="name">Venue name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder=""
                        onChange={handleControlledInputChange}
                        ref={venueName}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="capacity">Capacity: </label>
                    <input type="number" name="capacity" required className="form-control"
                        placeholder=""
                        onChange={handleControlledInputChange}
                        ref={venueCapacity}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <legend>All Ages?</legend>
                <div className="form-group">
                <label for="yes"> 
                    <input type="radio" name="yes" value="true"/>
                     Yes 
                </label>
                <label for="no"> 
                    <input type="radio" name="no" value="false"/>
                     Yes 
                </label>
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input type="text" name="address" required autoFocus className="form-control"
                        placeholder=""
                        onChange={handleControlledInputChange}
                        ref={venueAddress}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="addressLine2">Address line 2: </label>
                    <input type="text" name="addressLine2" required autoFocus className="form-control"
                        placeholder=""
                        onChange={handleControlledInputChange}
                        ref={venueAddressLine2}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city" required autoFocus className="form-control"
                        placeholder=""
                        onChange={handleControlledInputChange}
                        ref={venueCity}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <label for="state">State</label>
                <select id="state" name="state" ref={venueState}>
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
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="zip">Zip code: </label>
                    <input type="text" name="zip" required autoFocus className="form-control"
                        placeholder=""
                        onChange={handleControlledInputChange}
                        ref={venueCity}
                    />
                </div>
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