import React, { useRef } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Login.css"

const Login = props => {
    const username = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                console.log("exists:")
                console.log(exists)
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("capstone_user", exists.id)
                    if (exists.userTypeId === 1) {
                        localStorage.setItem("userType", "band")
                    }
                    if (exists.userTypeId === 2) {
                        localStorage.setItem("userType", "venue")
                    }
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                    window.alert("The username/password combination is not found in our system")
                }
            })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <fieldset className="fieldset--login">
                    <label className="label--login" htmlFor="username">Username: </label>
                    <input ref={username} type="text"
                        name="username"
                        className="form-control"
                        placeholder=""
                        required autoFocus />
                </fieldset>
                <fieldset className="fieldset--login">
                    <label className="label--login" htmlFor="password">Password: </label>
                    <input ref={password} type="password"
                        id="loginPassword"
                        className="form-control"
                        placeholder=""
                        required />
                </fieldset>
                <button type="submit">
                    Sign in
                </button>
                <div>Don't have an account? <Link to="/register">Create one</Link></div>
            </form>
        </main>
    )
}

export default Login