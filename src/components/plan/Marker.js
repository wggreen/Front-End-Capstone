import React, { useContext } from "react"
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

export default ({address}) => {
  const marker = address;
  return (
    <MarkerWithLabel
      key={marker.id}
      position={{ lat: marker.address.lat, lng: marker.address.lng }}
      labelAnchor={window.google.Point(-10, 15)}
      labelClass="marker-label"

      labelStyle={{
        width: '400px',
        backgroundColor: 'none',
      }}
    >
      <div style={{ clearFix: 'both' }}>
        <span className="marker-text">
          {marker.label}
        </span>
      </div>
    </MarkerWithLabel>
  );
};