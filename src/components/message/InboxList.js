import React, { useState } from "react"
import MessagePreview from "./MessagePreview"

export default ({messages, activeUser, props}) => {

    let inbox = []
    messages.map(message => {
        if (message.recipientId === activeUser.id) {
            inbox.push(message)
        }
    })

    return (
        <section className="messageView">
            {
                inbox.map(message => {
                    return <MessagePreview
                        key={message}
                        message={message}
                        props={props}
                    />
                })
            }
        </section>
    )
}