import React, { useContext } from "react"
import "./Message.css"
import { parseWithOptions } from "date-fns/fp";

export default ({ message, props }) => {

  let recipient = message.senderName

  if (message.senderId === parseInt(localStorage.getItem("capstone_user"), 10)) {
    recipient = "To: " + message.recipientName
  }

  let today = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }).split(",")[0]
  let messageDate = message.timestamp.split(", ")[0]
  if (today === messageDate) {
    messageDate = message.timestamp.split(", ")[1]
  }

  return (
    <>
      <div className="messagePreview" key={message} onClick={() => {
        props.history.push(`/messages/${message.id}`)
      }}>
        <div className="sender">{recipient}</div>
        <div className="messageDate">{messageDate}</div>
      </div>
    </>
  );
};