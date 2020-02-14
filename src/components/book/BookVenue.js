import React, { useState, useContext } from "react"
import InfiniteCalendar, { withMultipleDates, Calendar, defaultMultipleDateInterpolation } from 'react-infinite-calendar';
import FormattedDate from "./FormattedDate"
import { UserContext } from "../user/UserProvider"
import "./Book.css"
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


export default props => {

    const { users } = useContext(UserContext)

    let today = new Date()
    debugger

    let pathName = props.location.pathname
    
    let splitPathName = pathName.split("/")[2]

    let userId = parseInt(splitPathName, 10)

    let foundUser = users.find(user => user.id === pathName)

    let venueName = foundUser.name

    const [selectedDates, setSelectedDates] = useState([])
    const [formattedDates, setFormattedDates] = useState([])
    const [dateCards, setDateCards] = useState([])

    const addToSelectedDates = selectedDate => {
    if (!selectedDates.includes(selectedDate)) {
      let holdingArray = selectedDates
      holdingArray.push(selectedDate)
      setSelectedDates(selectedDates.concat(holdingArray))
      let year = selectedDate.getFullYear()
      let month = (1 + selectedDate.getMonth()).toString()
      month = month.length > 1 ? month : '0' + month
      let day = selectedDate.getDate().toString()
      day = day.length > 1 ? day : '0' + day
      let formattedDate = month + '/' + day + '/' + year;
      return formattedDate
    }}

    const removeIndex = (index) => {
      let holdingArray = formattedDates.slice()
      // holdingArray.splice(index, 1)
      setFormattedDates(holdingArray)
    }

    const createDateCard = (date) => {
      let index = formattedDates.length
      return [...formattedDates, 
      <FormattedDate
      key={date}
      date={date}
      index={index}
      removeIndex={removeIndex}/>]
    }
      
    return (
      <>
      <h2>Book {foundUser.name}</h2>
        <section className="calendarSection">
            <section>
            <InfiniteCalendar
            selected={today}
            minDate={today}
            onSelect={selectedDate => {
              let formattedDate = addToSelectedDates(selectedDate)
              let newDateCard = createDateCard(formattedDate)
              let newCardArray  = []
              newCardArray.push(newDateCard)
              setDateCards(dateCards.concat(newCardArray))                  
            }}
            />
            </section>
            <section className="potentialDates">
              <h2 className="potentialDates__header">Potential dates: </h2>
              {dateCards}
            </section>
        </section>
      </>
    );
  };