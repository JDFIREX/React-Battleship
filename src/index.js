import React, {useReducer} from  "react"
import ReactDOM  from "react-dom"
import {reducer, initalState,Context} from "./useReducer.js"
import Main  from "./App/Main/Main"
import "./index.css"

const Root = () => {

    const [state,dispatch] = useReducer(reducer,initalState)

    return (
        <React.StrictMode>
            <Context.Provider value={[state,dispatch]}>
                <Main />
            </Context.Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root /> , document.querySelector(".root"))