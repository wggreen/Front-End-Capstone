import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import CalendarView from "./CalendarView"

export default () => (
    <>
        <Route render={props => <ApplicationViews {...props} />} />
        <Route render={props => <CalendarView {...props} />} />
    </>
)