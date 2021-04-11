import React from "react"
import "./main.css"
import {
    Link
} from "react-router-dom";

const Main = ({gameID}) => {
    return(
        <div className="main">
            <div>
                <h1>
                    Kod Gry : {gameID} 
                </h1>  
            </div>
            <br />
            <br />
            <div>
                <Link to="user/1" target="_blank" >
                    User 1
                </Link>
                <Link to="user/2" target="_blank">
                    User 2
                </Link>
            </div>
        </div>
    )
}


export default Main