import React, {useReducer, useState, useEffect} from  "react"
import ReactDOM  from "react-dom"
import Main  from "./App/Main/Main"
import User from "./App/User/User"
import {initalState} from "./useReducer"
import { client, q } from "./faunaDB"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "./index.css"


let id = new Date().getTime()


const Root = () => {

    useEffect(() => {
        client.query(
            q.CreateCollection({ name: `${id}` }),
        ).then(r => {
            console.log(r)
            client.query(
                q.Create(
                    q.Collection(`${id}`),
                    {
                        ref : {
                            id : `${id}`
                        },
                        data : initalState
                    }
                )
            ).then(r => console.log(r))
            console.log(r,"2")
        })
    },[])

    
    // const [state,dispatch] = useReducer(reducer,{faunaState})
    

    return (
        <React.StrictMode>
            {/* <Context.Provider value={[state,dispatch]}> */}
                <Router>
                    <>
                        <Switch>
                        <Route path="/user/:id">
                            <User />
                        </Route>
                        <Route path="/">
                            <Main gameID={`${id}`} />
                        </Route>
                        <Route path="*">
                            <Main gameID={`${id}`} />
                        </Route>
                        </Switch>
                    </>
                </Router>
            {/* </Context.Provider> */}
        </React.StrictMode>
    )
}

ReactDOM.render(<Root /> , document.querySelector(".root"))