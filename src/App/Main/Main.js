import React, {useContext} from "react"
import {Context} from "./../../useReducer"
import "./main.css"
import User from "./../User/User"
import EndGame from "./EndGame"

const Main = () => {

    const [state,dispatch] = useContext(Context)
    let end = state.user1.end === false && state.user2.end === false;

    return(
        <>
        {
            end ? (
                <>
                <User id={1} key={1} />
                <User id={2} key={2} />
                </>
            ) : (
                <EndGame />
            )
        }
        </>
    )
}


export default Main