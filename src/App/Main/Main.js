import React, {useContext} from "react"
import {Context} from "./../../useReducer"
import "./main.css"
import User from "./../User/User"
import EndGame from "./EndGame"
import {
    Link
} from "react-router-dom";

const Main = () => {

    const [state,dispatch] = useContext(Context)
    // let end = state.user1.end === false && state.user2.end === false;

    // return(
    //     <>
    //     {
    //         end ? (
    //             <>
    //             <User id={1} key={1} />
    //             <User id={2} key={2} />
    //             </>
    //         ) : (
    //             <EndGame />
    //         )
    //     }
    //     </>
    // )

    return(
        <>
            <Link to="user/1" target="_blank" >
                User 1
            </Link>
            <Link to="user/2" target="_blank">
                User 2
            </Link>
        </>
    )
}


export default Main