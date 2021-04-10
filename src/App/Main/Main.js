import React from "react"
import "./main.css"
import {
    Link
} from "react-router-dom";

const Main = ({gameID}) => {
    return(
        <>
        <h1>id gry : {gameID} </h1>
        <div className="main">
            <Link
                to="/user/1"
                target="_blank" >
                <button>
                    User 1
                </button>
            </Link>
            <Link to="/user/2" target="_blank">
                <button>
                    User 2
                </button>
            </Link>
        </div>
        </>
    )
}


export default Main