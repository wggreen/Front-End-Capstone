import React from "react"
import { Route } from "react-router-dom"
import InfiniteCalendar, { withRange, Calendar } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

export default props => {
    var today = new Date();
    return (
      <>
            <InfiniteCalendar
            onSelect={function(date) {
                alert('You selected: ' + format(date, 'ddd, MMM Do YYYY'))
             }}
            Component={withRange(Calendar)}
            width={400}
            height={600}
            selected={today}
            minDate={today}/>
      </>
    );
  };