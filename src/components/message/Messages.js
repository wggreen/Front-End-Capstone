import React, { useContext, useState } from "react"
import InboxList from "./InboxList"
import SentList from "./SentList"
import { UserContext } from "../user/UserProvider"
import { MessageContext } from "./MessageProvider"
import { ConversationContext } from "../conversations/ConversationProvider"
import "./Message.css"

export default (props) => {
    const { users } = useContext(UserContext)
    const { messages, addMessage } = useContext(MessageContext)

    const activeUserId = parseInt(localStorage.getItem("capstone_user"), 10)

    const activeUser = users.find(user => user.id === activeUserId)

    return (
        <>
            <section className="fullMessages">
                <h1>Messages</h1>
                <section className="messageSection">
                    <section className="messageSection__buttons">
                        <section className="inboxButton">
                            <img src="https://www.gstatic.com/images/icons/material/system/2x/inbox_black_20dp.png" className="inbox_img"></img>
                            <button onClick={() => {
                                props.setInboxView(true)
                            }} className="messageSection_button">Inbox</button>
                        </section>
                        <section className="sentButton">
                            <img src="https://www.gstatic.com/images/icons/material/system/2x/send_black_20dp.png" className="sent_img"></img>
                            <button onClick={() => {
                                props.setInboxView(false)
                            }} className="messageSection_button">Sent</button>
                        </section>
                    </section>
                    <section className="conversationsList"></section>
                    <section className="messagePreviewList">
                        {props.inboxView ? (
                            <>
                                <InboxList
                                    messages={messages}
                                    activeUser={activeUser}
                                    props={props} />
                            </>
                        ) : (
                                <>
                                    <SentList
                                        messages={messages}
                                        activeUser={activeUser}
                                        props={props} />
                                </>
                            )}
                    </section>
                </section>
            </section>
        </>
    )
}