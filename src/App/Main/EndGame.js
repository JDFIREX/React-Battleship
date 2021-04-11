import React from "react"
import {
    Link
} from "react-router-dom";

const EndGame = ({state}) => {



    return(
        <div  className="EndGame">
            Wygrał {state.user1.win ? "user1" : "user2"} <br />
            Pozostało mu żyć : {state.user1.win ? state.user1.shipsPoints : state.user2.shipsPoints} <br />
            <Link to="/" >
                <button>
                    Zagraj ponownie
                </button>
            </Link>
        </div>
    )
}

export default EndGame