import React, { useState, useContext, useRef } from "react"
import InfiniteCalendar, { withMultipleDates, Calendar, defaultMultipleDateInterpolation } from 'react-infinite-calendar';
import FormattedDate from "./FormattedDate"
import { UserContext } from "../user/UserProvider"
import { MessageContext } from "../message/MessageProvider"
import "./Book.css"
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


export default (props) => {

  const { users } = useContext(UserContext)
  const { addMessage } = useContext(MessageContext)

  console.log(users)

  let today = new Date()
  let pathName = props.location.pathname
  let splitPathName = pathName.split("/")[2]
  let userId = parseInt(splitPathName, 10)
  let foundVenue = users.find(user => user.id === userId)
  let foundBand = users.find(user => user.id === parseInt(localStorage.getItem("capstone_user"), 10))

  const [selectedDates, setSelectedDates] = useState([])
  const [formattedDates, setFormattedDates] = useState([])
  const [formattedDatesArray, setFormattedDatesArray] = useState([])
  const [dateCards, setDateCards] = useState([])
  const [saveDatesButtonEntered, setSaveDatesButtonEntered] = useState(false)

  const message = useRef("")

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
    }
  }

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
      removeIndex={removeIndex} />]
  }

  return (
    <>
      <h2 className="calendarHeader">Book {foundVenue.name}</h2>
      <section className="calendarSection">
        <section>
          <InfiniteCalendar
            selected={today}
            minDate={today}
            onSelect={selectedDate => {
              let formattedDate = addToSelectedDates(selectedDate)
              let holdingArray = formattedDatesArray.slice()
              holdingArray.push(formattedDate)
              holdingArray.sort((a,b) => a-b)
              setFormattedDatesArray(holdingArray)
              let newDateCard = createDateCard(formattedDate)
              let newCardArray = []
              newCardArray.push(newDateCard)
              setDateCards(dateCards.concat(newCardArray))
            }}
          />
        </section>
        <section className="potentialDates">
          <h2 className="potentialDates__header">Potential dates: </h2>
          {dateCards}
          {dateCards.length ? (
            <>
              <button onClick={() => {
                setSaveDatesButtonEntered(true)
              }}>Save dates and prepare message</button>
            </>
          ) : ("")}
          {saveDatesButtonEntered ? (
            <>
              <form>
                <fieldset>
                  <div>
                    Band: {foundBand.name}
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    Venue: {foundVenue.name}
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    Dates: {formattedDatesArray.join(", ")}
                  </div>
                </fieldset>
                <fielset>
                  <label htmlFor="message"> Message (optional): </label>
                  <textarea name="message" rows="7" cols="40" autoFocus className="form-control"
                    placeholder=""
                    ref={message}
                  />
                </fielset>
                <button type="submit"
                  onClick={evt => {
                    evt.preventDefault()
                    let newMessage = {
                      bandSenderId: foundBand.id,
                      venueRecipientId: foundVenue.id,
                      dates: formattedDatesArray,
                      message: message.current.value
                    }
                    addMessage(newMessage)
                    .then(() => {
                      setSaveDatesButtonEntered(false)
                      setDateCards([])
                      setFormattedDates([])
                      setFormattedDatesArray([])
                      setSelectedDates([])
                    })
                  }}
                  className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </>
          ) : ("")}
        </section>
      </section>
    </>
  );
};