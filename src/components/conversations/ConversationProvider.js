import React, { useState, useEffect } from "react";

export const ConversationContext = React.createContext();

export const ConversationProvider = props => {
  const [conversations, setConversations] = useState([]);

  const getConversations = () => {
    return fetch("http://localhost:8088/conversations")
          .then(res => res.json())
          .then(setConversations)
  }

  const deleteConversation = conversation => {
    return fetch(`http://localhost:8088/conversations/${conversation.id}`, {
      method: "DELETE",
    })
      .then(getConversations)
  }

  const addConversation = conversation => {
    return fetch("http://localhost:8088/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(conversation)
    })
  }

  const editConversation = conversation => {
    return fetch(`http://localhost:8088/conversations/${conversation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(conversation)
    })
    .then(getConversations)
  }

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    console.log("***CONVERSATIONS APP STATE CHANGED");
  }, [conversations]);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        deleteConversation,
        editConversation,
        addConversation,
        getConversations
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};
