import React, {useContext, useEffect, useState} from "react"
import {Context} from "./../../useReducer"
import "./user.css"
import MyShips from "./MyShips"

const User = ({id}) => {

    const [state,dispatch] = useContext(Context)
    const user = state[`user${id}`]
    let seconduser;
    if(id === 1 || id === "1"){
        seconduser = state[`user2`]
    }else {
        seconduser = state[`user1`]
    }
    console.log(state)


    return (
        <div className={`user  user${id}`}>
        {
            [!user.play] ? (
                <>
                    <h1 className="userid">user{id}</h1>
                    <MyShips user={user} />
                </>
            ) : (user.play && state[seconduser].play) ? (
                <>
                {/* <MyShips user={user} /> */}
                {/* <MyShots /> */}
                </>
            ) : (
                <div>
                    Czekaj na drugiego użytkownika
                </div>
            )
        }
            
        </div>
    )   
}



export default User;
