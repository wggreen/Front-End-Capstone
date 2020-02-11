import React, { useRef, useState, useContext } from "react"
import { UserContext } from "../user/UserProvider"
import "./Login.css"

const Register = props => {
    const username = useRef()
    const email = useRef()
    const verifyEmail = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    const [verifyEmailResult, setVerifyEmailResult] = useState(false)
    const [userType, setUserType] = useState()

    const { users, addUser } = useContext(UserContext) 

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const existingEmailCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    window.alert("That username is already in use")
                } else {
                    if (email.current.value === verifyEmail.current.value) {
                        existingEmailCheck()
                            .then(results => {
                                if (results) {
                                    let truth = true
                                    setVerifyEmailResult(truth)
                                    window.alert("That email address is already in use")
                                } else {
                                    if (password.current.value === verifyPassword.current.value) {
                                        fetch("http://localhost:8088/users", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                email: email.current.value,
                                                password: password.current.value,
                                                username: username.current.value,
                                                userType: userType
                                            })
                                        })
                                            .then(_ => _.json())
                                            .then(createdUser => {
                                                if (createdUser.hasOwnProperty("id")) {
                                                    localStorage.setItem("capstone_user", createdUser.id)
                                                    if (createdUser.userType === "band") {
                                                        localStorage.setItem("userType", "band")
                                                        props.history.push(`/createBandProfile/${createdUser.id}`)
                                                    }
                                                    if (createdUser.userType === "venue") {
                                                        localStorage.setItem("userType", "venue")
                                                        props.history.push(`/createVenueProfile/${createdUser.id}`)
                                                    }
                                                }
                                                }
                                            )}
                                    else {
                                        window.alert("The passwords don't match")
                                    }
                                }
                            })
                        }
                        else {
                            window.alert("The email addresses don't match")
                        }
                    }
                })
            }

                                        
                                    


    return (
        <main>
            <form className="form--login" id="registerContainer" onSubmit={handleRegister}>
                <div id="registerFormContainer">
                    <h1 className="h3 mb-3 font-weight-normal registerHeader">Register</h1>
                    <fieldset className="registerUserContainer registerFieldset">
                        <label htmlFor="username">Username </label>
                        <input ref={username} type="text"
                            name="username"
                            className="form-control registerUser"
                            placeholder=""
                            required autoFocus />
                    </fieldset>
                    <fieldset className="registerEmailContainer registerFieldset">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            name="inputEmail"
                            className="form-control registerEmail"
                            placeholder=""
                            required />
                    </fieldset>
                    <fieldset className="registerEmailContainer registerFieldset">
                        <label htmlFor="verifyEmail">Confirm email address </label>
                        <input ref={verifyEmail} type="email"
                            name="verifyEmail"
                            className="form-control registerEmail"
                            placeholder=""
                            required />
                    </fieldset>
                    {verifyEmailResult ? (
                        <>
                        <div className="registerError">
                            That email address is already in use
                        </div>
                        </>
                    ) : (
                        ""
                    )}
                    <fieldset className="registerPassContainer registerFieldset">
                        <div id="registerPassword">
                            <label htmlFor="password"> Password </label>
                            <div>
                                Your password must have at least:
                                <ul>
                                    <li>
                                        8 characters
                                    </li>
                                    <li>
                                        1 upper case letter
                                    </li>
                                    <li>
                                        1 lower case letter
                                    </li>
                                    <li>
                                        1 number and
                                    </li>
                                    <li>
                                        1 special character
                                    </li>

                                </ul>
                            </div>
                            <input ref={password} type="password"
                                name="password"
                                className="form-control registerPass"
                                placeholder=""
                                required />
                        </div>
                    </fieldset>
                    <fieldset className="confirmPassContainer registerFieldset">
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <input ref={verifyPassword} type="password"
                            name="verifyPassword"
                            className="form-control confirmPass"
                            placeholder=""
                            required />
                    </fieldset>
                    <fieldset className="venueProfileFieldset">
                        <div id="registerAccountType">
                            <legend>What type of account do you need?</legend>
                            <div className="form-group">
                            <label for="band"> 
                                <input type="radio" name="band" value="band" onChange={() => {
                                    setUserType("band")
                                }}/>
                                Band 
                            </label>
                            <label for="venue"> 
                                <input type="radio" name="band" value="venue" onChange={() => {
                                    let venue = 2
                                    setUserType("venue")
                                }}/>
                                Venue 
                            </label>
                            </div>

                        </div>
                    </fieldset>
                    <fieldset className="registerFieldset">
                        <button className="btn btn-primary registerButton" type="submit">
                            Register
                        </button>
                    </fieldset>
                </div>
            </form>
        </main>
    )
}

export default Register