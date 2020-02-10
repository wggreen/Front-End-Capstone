import React from "react"
import { Route } from "react-router-dom"
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

export default props => {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return (
      <>
          <Route exact path="/calendar" render={props => 
            <InfiniteCalendar
            width={400}
            height={600}
            selected={today}
            disabledDays={[0,6]}
            minDate={lastWeek}/>}  />
      </>
    );
  };