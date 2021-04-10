import React, {useEffect, useReducer} from  "react"
import ReactDOM  from "react-dom"
import {reducer, initalState,Context} from "./useReducer.js"
import { client , q } from "./faunaDB"
import Main  from "./App/Main/Main"
import User from "./App/User/User"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "./index.css"

const id = new Date().getTime()



client.query(
    q.CreateCollection({name : `${id}`})
).then(r => {

    console.log(r)
    
    client.query(
        q.Create(
            q.Collection(r.name),
            {
                data : {gameID : id, ...initalState}
            }
        )
    ).then(r => console.log(r))



    client.query(
        q.Paginate(
            q.Collections()
        )
    ).then(r => {
        r.data = r.data.reverse()
        r.data.shift()
        r.data.shift()
        r.data.shift()
        r.data.shift()
        r.data.shift()
        r.data.forEach(a => {
            client.query(
                q.Get(
                    q.Collection(a.id)
                )
            ).then(x => {
                client.query(
                    q.Delete(
                        q.Collection(`${x.name}`)
                    )
                )
            })
        })
    })
})


const Root = () => {



    return (
        <React.StrictMode>
                <Router>
                    <>
                        <Switch>
                        <Route path="/user/:id">
                            <User />
                        </Route>
                        <Route path="/">
                            <Main gameID={id} />
                        </Route>
                        <Route path="*">
                            <Main gameID={id} />
                        </Route>
                        </Switch>
                    </>
                </Router>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root /> , document.querySelector(".root"))