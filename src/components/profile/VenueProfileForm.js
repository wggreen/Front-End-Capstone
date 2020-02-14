import React, { useContext, useState, useEffect, useRef } from "react"
import { AddressContext } from "../addresses/AddressProvider"
import { UserContext } from "../user/UserProvider"
import "./Profile.css"

export default props => {
    const { editUser, users } = useContext(UserContext)
    const { addAddress, editAddress } = useContext(AddressContext)
    const venueName = useRef()
    const venueCapacity = useRef()
    const venueAddress = useRef()
    const venueAddressLine2 = useRef()
    const venueCity = useRef()
    const venueState = useRef()
    const venueZip = useRef()
    const venueWebsite = useRef()
    const venueFacebook = useRef()
    const venueInstagram = useRef()
    const venueTwitter = useRef()
    const venueBlurb = useRef()
    const [user, setUser] = useState({})
    const [allAges, setAllAges] = useState()
    const [addressPublic, setAddressPublic] = useState()
    const [addressPublic2, setAddressPublic2] = useState()
    const [zipPublic, setZipPublic] = useState()
    const [webPublic, setWebPublic] = useState()
    const [blurbPublic, setBlurbPublic] = useState()
    
    const editMode = props.match.params.hasOwnProperty("userId")

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
            const userId = parseInt(props.match.params.userId)
            const seletedUser = users.find(user => user.id === userId) ||{}
            
            setUser(seletedUser)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [users])

    const constructNewProfile = () => {
            if (editMode && localStorage.getItem("profile") === "set") {
                
                editUser({
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    userType: user.userType,
                    id: user.id,
                    name: venueName.current.value,
                    capacity: venueCapacity.current.value,
                    allAges: allAges,
                    address: venueAddress.current.value,
                    addressPublic: addressPublic,
                    city: venueCity.current.value,
                    state: venueState.current.value,
                    address2: venueAddressLine2.current.value,
                    address2Public: addressPublic2,
                    zip: venueZip.current.value,
                    zipPublic: zipPublic,
                    webPublic: webPublic,
                    website: venueWebsite.current.value,
                    facebook: venueFacebook.current.value,
                    instagram: venueInstagram.current.value,
                    twitter: venueTwitter.current.value,
                    blurb: venueBlurb.current.value,
                    blurbPublic: blurbPublic,
                    size: "",
                    bandcamp: "",
                    youtube: "",
                    spotify: ""
                })
                    .then(() => {
                        let address = {
                            address: venueAddress.current.value,
                            addressPublic: addressPublic,
                            city: venueCity.current.value,
                            state: venueState.current.value,
                            address2: venueAddressLine2.current.value,
                            address2Public: addressPublic2,
                            zip: venueZip.current.value,
                            zipPublic: zipPublic,
                            userId: parseInt(localStorage.getItem("capstone_user"), 10)
                        }
                        let addressString = ""

                        for (const property in address) {
                            if (property != "userId") {
                                addressString = addressString + " " + address[property] + " "
                            }
                        }

                        let geocoder = new window.google.maps.Geocoder();
                        geocoder.geocode( { 'address': addressString}, function(results, status) {
                                    if (status == 'OK') {
                                        let addressObject = {
                                            userId: parseInt(localStorage.getItem("capstone_user"), 10),
                                            name: venueName.current.value,
                                            address: results[0].geometry.location,
                                            id: parseInt(localStorage.getItem("capstone_user"), 10)
                                        }
                                        let userId = parseInt(localStorage.getItem("capstone_user"), 10)
                                        editAddress(addressObject)
                                        .then(() => {
                                            props.history.push(`/venueProfiles/${userId}`)
                                        })
                                    } 
                        });
                    })
                }
             if (editMode && localStorage.getItem("profile") != "set") {
                 
                editUser({
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    userType: user.userType,
                    id: user.id,
                    name: venueName.current.value,
                    capacity: venueCapacity.current.value,
                    allAges: allAges,
                    address: venueAddress.current.value,
                    addressPublic: addressPublic,
                    city: venueCity.current.value,
                    state: venueState.current.value,
                    address2: venueAddressLine2.current.value,
                    address2Public: addressPublic2,
                    zip: venueZip.current.value,
                    zipPublic: zipPublic,
                    webPublic: webPublic,
                    website: venueWebsite.current.value,
                    facebook: venueFacebook.current.value,
                    instagram: venueInstagram.current.value,
                    twitter: venueTwitter.current.value,
                    blurb: venueBlurb.current.value,
                    blurbPublic: blurbPublic,
                    size: "",
                    bandcamp: "",
                    youtube: "",
                    spotify: ""
                })
                .then(() => {
                    let address = {
                        address: venueAddress.current.value,
                        addressPublic: addressPublic,
                        city: venueCity.current.value,
                        state: venueState.current.value,
                        address2: venueAddressLine2.current.value,
                        address2Public: addressPublic2,
                        zip: venueZip.current.value,
                        zipPublic: zipPublic
                    }
                    let addressString = ""

                    for (const property in address) {
                        addressString = addressString + " " + address[property] + " "
                    }
                    let geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode( {address: addressString}, function(results, status) {
                                if (status == 'OK') {
                                    let addressObject = {
                                        userId: parseInt(localStorage.getItem("capstone_user"), 10),
                                        name: venueName.current.value,
                                        address: results[0].geometry.location,
                                        id: parseInt(localStorage.getItem("capstone_user"), 10)
                                    }
                                    let userId = parseInt(localStorage.getItem("capstone_user"), 10)
                                    addAddress(addressObject)
                                    .then(() => {
                                        localStorage.setItem("profile", "set")
                                        props.history.push(`/venueProfiles/${userId}`)
                                    })
                                } 
                    });
                })
                
            }
    }

    return (
        <form className="venueProfileForm">
            <h2 className="profileForm__title">{editMode ? "Update Profile" : "Create Venue Profile"}</h2>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="name">Venue name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={venueName}
                        defaultValue={user.name}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="capacity">Capacity: </label>
                    <input type="number" name="capacity" required className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={venueCapacity}
                        defaultValue={user.capacity}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="allAgesDiv">
                    <legend>All Ages?</legend>
                    <div className="form-group">
                    <label for="yes"> 
                        <input type="radio" name="allAges" value="true" checked="checked" onChange={() => {
                            let yes = "yes"
                            setAllAges(yes)
                        }}/>
                        Yes 
                    </label>
                    <label for="eighteen"> 
                        <input type="radio" name="allAges" value="18+" onChange={() => {
                            let eighteenPlus = "18+"
                            setAllAges(eighteenPlus)
                        }}/>
                        18+
                    </label>
                    <label for="twentyOne"> 
                        <input type="radio" name="allAges" value="18+" onChange={() => {
                            let twentyOnePlus = "21+"
                            setAllAges(twentyOnePlus)
                        }}/>
                        21+ 
                    </label>
                    </div>
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group" id="venueAddress">
                    <div className="venueAddressDiv">
                        <label htmlFor="address">Address: </label>
                        <input type="text" name="address" autoFocus className="form-control"
                            placeholder=""
                            // onChange={handleControlledInputChange}
                            ref={venueAddress}
                            defaultValue={user.address}
                        />
                    </div>
                    <fieldset className="venueProfileFieldset">
                        <div className="form-group">
                        <legend>Make it public?</legend>
                        <label for="yes"> 
                            <input type="radio" name="venueAddress" value="true" onChange={() => {
                                let truth = true
                                setAddressPublic(truth)
                            }}/>
                            Yes 
                        </label>
                        <label for="no"> 
                            <input type="radio" name="venueAddress" value="false" checked="checked" onChange={() => {
                                let falseness = false
                                setAddressPublic(falseness)
                            }}/>
                            No 
                        </label>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group" id="venueAddress2">
                    <div className="venueAddress2Div">
                        <label htmlFor="addressLine2">Address line 2: </label>
                        <input type="text" name="addressLine2" autoFocus className="form-control"
                            placeholder=""
                            // onChange={handleControlledInputChange}
                            ref={venueAddressLine2}
                            defaultValue={user.address2}
                        />
                    </div>
                    <fieldset className="venueProfileFieldset">
                        <div className="form-group">
                        <legend>Make it public?</legend>
                        <label for="yes"> 
                            <input type="radio" name="venueAddress2" value="true" onChange={() => {
                                let truth = true
                                setAddressPublic2(truth)
                            }}/>
                            Yes 
                        </label>
                        <label for="no"> 
                            <input type="radio" name="venueAddress2" value="false" checked="checked" onChange={() => {
                                let falseness = false
                                setAddressPublic2(falseness)
                            }}/>
                            No 
                        </label>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city" required autoFocus className="form-control"
                        placeholder=""
                        // onChange={handleControlledInputChange}
                        ref={venueCity}
                        defaultValue={user.city}
                    />
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <label for="state">State</label>
                <select id="state" name="state" ref={venueState} required autoFocus value={user.state}>
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
                <div id="venueZipField">
                    <div className="form-group" id="venueZip">
                        <label htmlFor="zip">Zip code: </label>
                        <input type="text" name="zip" autoFocus className="form-control"
                            placeholder=""
                            // onChange={handleControlledInputChange}
                            ref={venueZip}
                            defaultValue={user.zip}
                        />
                    </div>
                    <fieldset className="venueProfileFieldset">
                        <div className="form-group">
                        <legend>Make it public?</legend>
                        <label for="yes"> 
                            <input type="radio" name="zip" value="true" onChange={() => {
                                let truth = true
                                setZipPublic(truth)
                            }}/>
                            Yes 
                        </label>
                        <label for="no"> 
                            <input type="radio" name="zip" value="false" checked="checked" onChange={() => {
                                let falseness = false
                                setZipPublic(falseness)
                            }}/>
                            No 
                        </label>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div id="venueSocialMediaFieldset">
                    <legend>Social media</legend>
                    <div className="form-group" id="venueSocialMedia">
                        <label htmlFor="website">Website: </label>
                        <input type="text" name="website" autoFocus className="form-control"
                            placeholder=""
                            defaultValue={user.website}
                            // onChange={handleControlledInputChange}
                            ref={venueWebsite}
                        />
                        <label htmlFor="facebook">Facebook: </label>
                        <input type="text" name="facebook" autoFocus className="form-control"
                            placeholder=""
                            defaultValue={user.facebook}
                            // onChange={handleControlledInputChange}
                            ref={venueFacebook}
                        />
                        <label htmlFor="instagram">Instagram: </label>
                        <input type="text" name="instagram" autoFocus className="form-control"
                            placeholder=""
                            defaultValue={user.instagram}
                            // onChange={handleControlledInputChange}
                            ref={venueInstagram}
                        />
                        <label htmlFor="twitter">Twitter: </label>
                        <input type="text" name="twitter" autoFocus className="form-control"
                            placeholder=""
                            defaultValue={user.twitter}
                            // onChange={handleControlledInputChange}
                            ref={venueTwitter}
                        />
                    </div>
                    <fieldset className="venueProfileFieldset">
                    <div className="form-group">
                    <legend>Make it public?</legend>
                    <label for="yes"> 
                        <input type="radio" name="venueSocialMedia" value="true" onChange={() => {
                            let truth = true
                            setWebPublic(truth)
                        }}/>
                        Yes 
                    </label>
                    <label for="no"> 
                        <input type="radio" name="venueSocialMedia" value="false" checked="checked" onChange={() => {
                            let falseness = false
                            setWebPublic(falseness)
                        }}/>
                        No 
                    </label>
                    </div>
                </fieldset>
                </div>
            </fieldset>
            <fieldset className="venueProfileFieldset">
                <div id="venueBlurbDiv">
                    <div className="form-group" id="venueBlurb">
                        <label htmlFor="blurb">About us: </label>
                        <textarea className="form-control" name="blurb" rows="10" cols="50" ref={venueBlurb} autofocus></textarea>
                    </div>
                    <fieldset className="venueProfileFieldset">
                        <div className="form-group">
                        <legend>Make it public?</legend>
                        <label for="yes"> 
                            <input type="radio" name="venueBlurb" value="true" onChange={() => {
                                let truth = true
                                setBlurbPublic(truth)
                            }}/>
                            Yes 
                        </label>
                        <label for="no"> 
                            <input type="radio" name="venueBlurb" value="false" checked="checked" onChange={() => {
                                let falseness = false
                                setBlurbPublic(falseness)
                            }}/>
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