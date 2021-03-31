import React, {useContext} from "react"
import {Context} from "./../../useReducer"
import "./main.css"
import User from "./../User/User"

const Main = () => {

    const [state,dispatch] = useContext(Context)

    return(
        <>
            <User id={1} key={1} />
            <User id={2} key={2} />
        </>
    )
}


export default Main