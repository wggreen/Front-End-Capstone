import React, { useState } from "react"
import { Route } from "react-router-dom"
import InfiniteCalendar, { withMultipleDates, Calendar, defaultMultipleDateInterpolation } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


export default props => {
  const [selectedDates, setSelectedDates] = useState([new Date()])
    let onCalendarSelect = () => {
        console.log("hello world")
    }

    let selectedDate = ""
    console.log(selectedDates)

    const MultipleDatesCalendar = withMultipleDates(Calendar)
      
    return (
      <>
            <section>
            <InfiniteCalendar
            Component={withMultipleDates(Calendar)}
            interpolateSelection={defaultMultipleDateInterpolation}
            selected={selectedDates}
            minDate={selectedDates}
            onSelect={(selectedDate) => defaultMultipleDateInterpolation(selectedDate, selectedDates)}
            />
            {selectedDate}
            </section>
            <MultipleDatesCalendar
            selected={selectedDates}
            minDate={selectedDates}
            onSelect={(selectedDate) => defaultMultipleDateInterpolation(selectedDate, selectedDates)}
            />
      </>
    );
  };