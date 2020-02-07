import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../profile/ProfileProvider"
import { UserContext } from "../user/UserProvider"

export default (props) => {

    const { users, deleteUser } = useContext(UserContext)
    const { profiles } = useContext(ProfileContext)

    // Not logged in home nav
    if (localStorage.getItem("capstone_user") === null && props.location.pathname == "/") {
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
    if (localStorage.getItem("capstone_user") === null && props.location.pathname == "/login") {
        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
            </ul>
        )
    }

    // Band Profile Form nav
    if (localStorage.getItem("capstone_user") != null && props.location.pathname == "/createBandProfile" && localStorage.getItem("userType") === "band") {
        let userId = parseInt(localStorage.getItem("capstone_user"), 10)
        const foundUser = users.find(user => user.id === userId) || {}

        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/" onClick={() => {
                        const confirm = window.confirm("Are you sure you want to leave? You'll have to re-register")
                        if (confirm === true) {
                            localStorage.removeItem("capstone_user")
                            localStorage.removeItem("userType")
                            deleteUser(foundUser)
                        }
                    }}>Home</Link>
                </li>
            </ul>
        )
    }

    // Venue Profile Form nav
    if (localStorage.getItem("capstone_user") != null && props.location.pathname == "/createVenueProfile" && localStorage.getItem("userType") === "venue") {
        let userId = parseInt(localStorage.getItem("capstone_user"), 10)
        const foundUser = users.find(user => user.id === userId) || {}

        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/" onClick={() => {
                        const confirm = window.confirm("Are you sure you want to leave? You'll have to re-register")
                        if (confirm === true) {
                            localStorage.removeItem("capstone_user")
                            localStorage.removeItem("userType")
                            deleteUser(foundUser)
                        }
                    }}>Home</Link>
                </li>
            </ul>
        )
    }

    // Venue nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "venue") {
        let userId = parseInt(localStorage.getItem("capstone_user"), 10)
        let chosenProfile = profiles.find(profile => profile.userId === userId) || {}
        let chosenProfileId = chosenProfile.userId
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
                {
                localStorage.getItem("capstone_user")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to=""
                            onClick={e => {
                                e.preventDefault()
                                localStorage.removeItem("capstone_user")
                                localStorage.removeItem("userType")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
            </ul>
        )
    }

    // Band nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "band") {
        let userId = parseInt(localStorage.getItem("capstone_user"), 10)
        let chosenProfile = profiles.find(profile => profile.userId === userId) || {}
        let chosenProfileId = chosenProfile.userId
        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/bandProfiles/${chosenProfileId}`}>Profile</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">Messages</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/plan">Plan</Link>
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
                                localStorage.removeItem("userType")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
            <p>This is the band nav</p>
            </ul>
        )
    }
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