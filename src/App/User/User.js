import React, {useContext, useEffect, useState} from "react"
import {Context} from "./../../useReducer"
import "./user.css"
import MyShips from "./MyShips"

const User = ({id}) => {

    console.log(id)
    const [state,dispatch] = useContext(Context)
    const user = state[`user${id}`]
    console.log(id,user)


    return (
        <div className={`user  user${id}`}>
            <MyShips user={user} />
            {/* <MyShots /> */}
        </div>
    )   
}



export default User;
