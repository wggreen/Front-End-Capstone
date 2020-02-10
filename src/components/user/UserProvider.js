import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

export const UserProvider = props => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch("http://localhost:8088/users")
          .then(res => res.json())
          .then(setUsers)
  }

  const deleteUser = user => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "DELETE",
    })
      .then(getUsers)
  }

  const editUser = user => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(getUsers)
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("***USERS APP STATE CHANGED");
  }, [users]);

  return (
    <UserContext.Provider
      value={{
        users,
        deleteUser,
        editUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
