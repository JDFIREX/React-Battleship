import React, {useContext} from "react"
import {Context} from "./../../useReducer"


const EndGame = () => {

    const [state,dispatch] = useContext(Context)


    return(
        <div  className="EndGame">
            Wygrał {state.user1.win ? "user1" : "user2"} <br />
            Pozostało mu żyć : {state.user1.win ? state.user1.shipsPoints : state.user2.shipsPoints} <br />
            <button
                onClick={() => window.location.reload()}
            >
                Zagraj ponownie
            </button>
        </div>
    )
}

export default EndGame