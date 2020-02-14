import React, { useContext } from "react"
import { UserContext } from "../user/UserProvider"

export default ({date, props, index, removeIndex}) => {
                      
    return (
    <>
    <div className="dateCard" key={date}>
        <h3>{date}</h3>
        {/* <button onClick={() => {
          debugger
            removeIndex(index)
        }}>Delete</button> */}
    </div>
    </>
  );
};