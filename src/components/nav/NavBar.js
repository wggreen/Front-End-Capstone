import React from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../profile/ProfileProvider"

export default (props) => {

    const { profiles } = useContext(ProfileContext)

    let userId = parseInt(localStorage.getItem("capstone_user"), 10)

    let chosenProfile = profiles.find(profile => profile.userId === userId) || {}

    let chosenProfileId = chosenProfile.userId
    
    `/venueProfiles/${profile.id}`


    // Not logged in home nav
    if (localStorage.getItem("capstone_user") === null && props.location.pathname == "/") {
        console.log(props)
        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/login">login</Link>
                </li>
            </ul>
        )
    }

    // Not logged in login nav
    console.log(props)
    if (localStorage.getItem("capstone_user") === null && props.location.pathname == "/login") {
        console.log("yes")
        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
            </ul>
        )
    }

    // Venue nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "venue") {
        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">Messages</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/venueProfiles/${chosenProfileId}`}>Profile</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/" onClick={e => {
                        e.preventDefault()
                        localStorage.removeItem("capstone_user")
                        props.history.push("/")
                    }}>Logout
                    </Link>
                </li>
            </ul>
        )
    }

    // Band nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "band") {
        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/plan">Plan</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">Messages</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/tours">Tours</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/bandProfiles/${chosenProfileId}`}>Profile</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/" onClick={e => {
                        e.preventDefault()
                        localStorage.removeItem("capstone_user")
                        props.history.push("/")
                    }}>Logout
                    </Link>
                </li>
            </ul>
        )
    }

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/plan">Plan</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/messages">Messages</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tours">Tours</Link>
            </li>
            {
                localStorage.getItem("capstone_user")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to=""
                            onClick={e => {
                                e.preventDefault()
                                localStorage.removeItem("capstone_user")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}