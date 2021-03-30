import React, {useReducer} from  "react"
import ReactDOM  from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {reducer, initalState,Context} from "./useReducer.js"
import Main  from "./App/Main/Main"
import User  from "./App/User/User"
import "./index.css"

const Root = () => {

    const [state,dispatch] = useReducer(reducer,initalState)

    return (
        <React.StrictMode>
            <Context.Provider value={[state,dispatch]}>

            <Router>
                <>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/User/:id" component={User} />
                    </Switch>
                </>
                </Router>
            </Context.Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root /> , document.querySelector(".root"))