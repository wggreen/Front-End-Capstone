import React, { useContext, useState, useEffect, useRef } from "react"
import { MessageContext } from "./MessageProvider"
import { UserContext } from "../user/UserProvider"
import { ConversationContext } from "../conversations/ConversationProvider"
import { ConversationMessageContext } from "../conversationMessage/ConversationMessageProvider"
import "./Message.css"

export default props => {
    const { messages, addMessage } = useContext(MessageContext)
    const { addConversation } = useContext(ConversationContext)
    const { addConversationMessage } = useContext(ConversationMessageContext)
    const [message, setMessage] = useState(false)
    const [replyClicked, setReplyClicked] = useState({})

    const reply = useRef("")

    const editMode = props.match.params.hasOwnProperty("messageId")

    const setDefaults = () => {
        if (editMode) {
            const messageId = parseInt(props.match.params.messageId)
            const selectedMessage = messages.find(message => message.id === messageId) || {}
            setMessage(selectedMessage)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [messages])

    const constructNewConversation = (message) => {
        let newConversation = {
            originalSenderBand: message.senderId,
            originalVenueRecipient: message.recipientId
        }
        addConversation(newConversation)
            .then((createdConversation) => createdConversation.json())
            .then((createdConversation) => {
                let newConversationMessage = {
                    messageId: message.id,
                    conversationId: createdConversation.id
                }
                addConversationMessage(newConversationMessage)
            })
    }
    const constructNewMessage = () => {
        let newMessage = {
            senderId: message.recipientId,
            recipientId: message.senderId,
            senderName: message.recipientName,
            recipientName: message.senderName,
            dates: "",
            message: reply.current.value,
            unformattedTimeStamp: new Date(),
            timestamp: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
            sender: "band"
        }
        addMessage(newMessage)
            .then((createdMessage) => createdMessage.json())
            .then((createdMessage) => {
                constructNewConversation(createdMessage)
            })
    }

    let messageDates = message.dates

    if (message.dates === undefined || message.dates === false || message.dates === "") {
        messageDates = message.dates
    } else {
        messageDates = message.dates.join(", ")
    }

    return (
        <>
            <section className="fullMessage">
                <section className="messageHeaders">
                    <div className="messageHeader__sender">{message.senderName}</div>
                    <div className="messageHeader__date">{message.timestamp}</div>
                </section>
                <section className="messageBody">
                    <div className="messageDates">Dates: <br/>{messageDates}</div>
                    <div className="messageText">Message: <br/>{message.message}</div>
                </section>
                {replyClicked ? (
                    <>
                        <form className="messageReplyForm">
                            <fieldset className="replyFieldset">
                                <div className="messageReplyFormGroup">
                                    <label htmlFor="reply">Reply: </label>
                                    <textarea className="form-control" name="reply" rows="7" cols="40" ref={reply} autoFocus></textarea>
                                </div>
                            </fieldset>
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    setReplyClicked(false)
                                    constructNewMessage()
                                }}
                                className="btn btn-primary">
                                {editMode ? "Send reply" : "Send Reply"}
                            </button>
                            <button onClick={() => {
                                setReplyClicked(false)
                            }}>Delete reply</button>
                        </form>
                    </>
                ) : (
                        <>
                            <button className="replyButton" onClick={() => {
                                setReplyClicked(true)
                            }}>Reply</button>
                        </>
                    )
                }
            </section>
        </>
    )
}