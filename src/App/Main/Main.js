import React from "react"
import "./main.css"
import {
    Link
} from "react-router-dom";

const Main = ({gameID}) => {
    return(
        <>
            <h1>
                Kod Gry : {gameID} 
            </h1>  
            <div>
                <Link to="user/1" target="_blank" >
                    User 1
                </Link>
                <Link to="user/2" target="_blank">
                    User 2
                </Link>
            </div>
        </>
    )
}


export default Main