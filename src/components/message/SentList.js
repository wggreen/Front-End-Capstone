import React, { useState } from "react"
import MessagePreview from "./MessagePreview"

export default ({messages, activeUser, props}) => {

    let sent = []
    messages.map(message => {
        if (message.senderId === activeUser.id) {
            sent.push(message)
        }
    })

    return (
        <section className="messageView">
            {
                sent.map(message => {
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