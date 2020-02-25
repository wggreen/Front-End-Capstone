import React, { useState, useEffect } from "react";

export const MessageContext = React.createContext();

export const MessageProvider = props => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    return fetch("http://localhost:8088/messages")
          .then(res => res.json())
          .then(setMessages)
  }

  const deleteMessage = message => {
    return fetch(`http://localhost:8088/messages/${message.id}`, {
      method: "DELETE",
    })
      .then(getMessages)
  }

  const addMessage = message => {
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
  }

  const editMessage = message => {
    return fetch(`http://localhost:8088/messages/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
    .then(getMessages)
  }

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    console.log("***MESSAGES APP STATE CHANGED");
  }, [messages]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        deleteMessage,
        editMessage,
        addMessage,
        getMessages
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
