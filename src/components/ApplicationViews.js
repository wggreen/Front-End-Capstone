import React from "react"
import { Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"


export default props => {
    return (
      <>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <>
                  <section className="landingPageContainer">
                      <div>
                          <p>Hello World</p>
                      </div>
                  </section>
                </>
              );
            }}
          />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/register" render={props => <Register {...props} />} />
      </>
    );
  };