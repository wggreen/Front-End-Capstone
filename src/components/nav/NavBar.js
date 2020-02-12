import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../user/UserProvider"

export default (props) => {

    const { users, deleteUser } = useContext(UserContext)

    let userId = parseInt(localStorage.getItem("capstone_user"), 10)
    const foundUser = users.find(user => user.id === userId) || {}

    // Not logged in home nav
    if (localStorage.getItem("capstone_user") === null && props.location.pathname == "/") {
        return (
            <ul className="navbar">
                <h1>Not logged in home nav</h1>
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
                <h1>Not logged in login nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
            </ul>
        )
    }

    // Band Home nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "band") {
        return (
            <ul className="navbar">
                <h1>Band Home nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/bandProfiles/${userId}`}>Profile</Link>
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
                                localStorage.removeItem("profile")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
            </ul>
        )
    }

    // Band Profile Form nav
    if (localStorage.getItem("capstone_user") != null && props.location.pathname == `/createBandProfile/${userId}` && localStorage.getItem("userType") === "band") {

        return (
            <ul className="navbar">
                <h1>Band Profile Form nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/" onClick={() => {
                        const confirm = window.confirm("Are you sure you want to leave? You'll have to re-register")
                        if (confirm === true) {
                            localStorage.removeItem("capstone_user")
                            localStorage.removeItem("userType")
                            localStorage.removeItem("profile")
                            deleteUser(foundUser)
                        }
                    }}>Home</Link>
                </li>
            </ul>
        )
    }

    // Band Profile Edit nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "band" && props.location.pathname == `/createBandProfile/${userId}`) {
        return (
            <ul className="navbar">
                <h1>Band Profile nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
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
                                localStorage.removeItem("profile")
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

    // Venue Home nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "venue" && props.location.pathname != `/createVenueProfile/${userId}`) {
        return (
            <ul className="navbar">
                <h1>Venue Home nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">Messages</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/venueProfiles/${userId}`}>Profile</Link>
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
                                localStorage.removeItem("profile")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
            </ul>
        )
    }

    // Venue Profile Edit nav
    if (localStorage.getItem("capstone_user") != null && localStorage.getItem("userType") === "venue" && localStorage.getItem("profile") === "set" && props.location.pathname == `/createVenueProfile/${userId}`) {
        return (
            <ul className="navbar">
                <h1>Venue Profile nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">Messages</Link>
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
                                localStorage.removeItem("profile")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
            </ul>
        )
    }

    // Venue Profile Form nav
    if (localStorage.getItem("capstone_user") != null && props.location.pathname == `/createVenueProfile/${userId}` && localStorage.getItem("userType") === "venue") {
        return (
            <ul className="navbar">
                <h1>Venue Profile Form nav</h1>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/" onClick={() => {
                        const confirm = window.confirm("Are you sure you want to leave? You'll have to re-register")
                        if (confirm === true) {
                            localStorage.removeItem("capstone_user")
                            localStorage.removeItem("userType")
                            localStorage.removeItem("profile")
                            deleteUser(foundUser)
                        }
                    }}>Home</Link>
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
                <Link className="navbar__link" to="/login">login</Link>
            </li>
        </ul>
    )

}