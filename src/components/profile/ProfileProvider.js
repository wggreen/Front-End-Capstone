import React, { useState, useEffect } from "react";

export const ProfileContext = React.createContext();

export const ProfileProvider = props => {
  const [profiles, setProfiles] = useState([]);

  const getProfiles = () => {
    return fetch("http://localhost:8088/profiles")
          .then(res => res.json())
          .then(setProfiles)
  }

  const addProfile = profile => {
    return fetch("http://localhost:8088/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    }).then(getProfiles);
  };

  const editProfile = profile => {
    return fetch(`http://localhost:8088/profiles/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    }).then(getProfiles);
  };


  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    console.log("***PROFILES APP STATE CHANGED");
  }, [profiles]);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        addProfile,
        editProfile
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
