import React, { useContext } from "react"
import { AddressContext } from "../addresses/AddressProvider"
import Marker from "./Marker"

export default () => {
    const { addresses } = useContext(AddressContext)
    console.log(addresses)

    return (
        <article className="markersList">
            {
                addresses.map(address => {
                    return (
                        <Marker
                        key={address.id}
                        address={address}
                        />
                    )
                })
            }
        </article>
    )
};