import React, { useState, useEffect } from "react";

export const    ConversationMessageContext = React.createContext();

export const ConversationMessageProvider = props => {
  const [conversationsMessages, setConversationsMessages] = useState([]);

  const getConversationsMessages = () => {
    return fetch("http://localhost:8088/conversationsMessages")
          .then(res => res.json())
          .then(setConversationsMessages)
  }

  const deleteConversationMessage = conversationMessage => {
    return fetch(`http://localhost:8088/conversationsMessages/${conversationMessage.id}`, {
      method: "DELETE",
    })
      .then(getConversationsMessages)
  }

  const addConversationMessage = conversationMessage => {
    return fetch("http://localhost:8088/conversationsMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(conversationMessage)
    })
  }

  const editConversationMessage = conversationMessage => {
    return fetch(`http://localhost:8088/conversationsMessages/${conversationMessage.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(conversationMessage)
    })
    .then(getConversationsMessages)
  }

  useEffect(() => {
    getConversationsMessages();
  }, []);

  useEffect(() => {
    console.log("***CONVERSATIONSMESSAGES APP STATE CHANGED");
  }, [conversationsMessages]);

  return (
    <ConversationMessageContext.Provider
      value={{
        conversationsMessages,
        deleteConversationMessage,
        editConversationMessage,
        addConversationMessage,
        getConversationsMessages
      }}
    >
      {props.children}
    </ConversationMessageContext.Provider>
  );
};
