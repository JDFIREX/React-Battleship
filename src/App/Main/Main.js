import React, {useContext} from "react"
import {Context} from "./../../useReducer"
import {Link} from "react-router-dom"
import "./main.css"

const Main = () => {

    const [state,dispatch] = useContext(Context)

    return(
        <>
            <div className="userBtn">
                <Link  to="./User/1" target="_blank" >
                    <h1>User1</h1>
                </Link>
            </div>
            <div className="userBtn">
                <Link  to="./User/2" target="_blank" >
                    <h1>User2</h1>
                </Link>
            </div>
        </>
    )
}


export default Main