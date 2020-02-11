import React, { useState, useEffect } from "react";

export const AddressContext = React.createContext();

export const AddressProvider = props => {
  const [addresses, setAddresses] = useState([]);

  const getAddresses = () => {
    return fetch("http://localhost:8088/addresses")
          .then(res => res.json())
          .then(setAddresses)
  }

  const deleteAddress = address => {
    return fetch(`http://localhost:8088/addresses/${address.id}`, {
      method: "DELETE",
    })
      .then(getAddresses)
  }

  const addAddress = address => {
    return fetch("http://localhost:8088/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    })
    .then(getAddresses)
  }

  const editAddress = address => {
    return fetch(`http://localhost:8088/addresses/${address.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    })
    .then(getAddresses)
  }


  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    console.log("***ADDRESSES APP STATE CHANGED");
  }, [addresses]);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        editAddress,
        deleteAddress
      }}
    >
      {props.children}
    </AddressContext.Provider>
  );
};