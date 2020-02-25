import React, { useContext } from "react"
import { TourContext } from "./TourProvider"
import { BookingContext } from "../book/BookingProvider"
import { BookingTourContext } from "../bookingTour/BookingTourProvider"
import { UserContext } from "../user/UserProvider"
import "./Tours.css"

export default (props) => {
    const { tours } = useContext(TourContext)
    const { bookings } = useContext(BookingContext)
    const { bookingsTours } = useContext(BookingTourContext)
    const { users } = useContext(UserContext)


    const activeUser = users.find(user => user.id === parseInt(localStorage.getItem("capstone_user"), 10)) || {}

    let filteredTours = []
    tours.map(tour => {
        if (tour.bandId === activeUser.id && tour.saved === true) {
            filteredTours.push(tour)
        }
    })

    let bookingsIds = []
    filteredTours.map(ft => {
        ft.bookingsTours.map(bt => {
            bookingsIds.push(bt.bookingId)
        })
        ft.bookings = []
    })

    filteredTours.map(ft => {
        ft.bookingsTours.map(bt => {
            bookings.map(booking => {
                if (booking.id === bt.bookingId) {
                    ft.bookings.push(booking)
                }
            })
        })
    })

    return (
        <section className="tours">
            <h2>Tours</h2>
            {filteredTours.map(ft => {
                return (
                    <>
                        <section className="individualTour">
                            <h3 className="tourName">{ft.name}</h3>
                            <ul className="bookingsList">
                                {ft.bookings.map(booking => {
                                    return (
                                        <>
                                            <li className="bookingListItem">{booking.name}</li>
                                        </>
                                    )
                                })}
                            </ul>
                        </section>
                    </>
                )
            })}
        </section>
    )

}