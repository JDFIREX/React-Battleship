import React, {useContext, useEffect, useReducer, useState} from "react"
import {reducer,Context} from "./../../useReducer"
import { client, q } from "./../../faunaDB"
import {
    useParams
} from "react-router-dom";
import "./user.css"
import MyShips from "./MyShips"
import GetShips from "./GetShips"
import MyShots from "./MyShots"


const UserGame = ({fauna,userID,getgameID}) => {

    console.log(fauna,"wer")

    const [state,dispatch] = useReducer(reducer,fauna)
    const user = state[`user${userID}`]

    useEffect(() => {
        dispatch({
            type : "CONNECT",
            user : `user${userID}`,
            gameID : getgameID
        })
    },[])
    console.log(state, "pokoj", userID, user )

    return (
        <div>
            Połączono się z pokojem
        </div>
    )

}

const User = () => {

    const [faunaState, setfaunaState] = useState()
    const [getgameID, setGetGameID] = useState("")
    // console.log(state)

    const {id} = useParams()
    // const user = state[`user${id}`]
    // let seconduser;
    // if(id === 1 || id === "1"){
    //     seconduser = state[`user2`]
    // }else {
    //     seconduser = state[`user1`]
    // }

    // useEffect(() => {
    //     console.log(id,user,seconduser)
    // })

    useEffect(() => {
        client.query(
            q.Get(
                q.Collection(`${getgameID}`)
            )
        ).then((r) => {
            if(r.data){
                setfaunaState({...r.data})
            }
        })
    },[getgameID])


    if(faunaState){
        console.log(faunaState, "przed pokojem")
        return (
            <UserGame fauna={faunaState} userID={id} getgameID={getgameID} />
        )
    }


    return (
        <div>
            Prosze Podaj ID gry: <br />
            <input type="text" value={getgameID} onChange={(e) => setGetGameID(e.target.value)} />
        </div>
    )

    // return (
    //     <div className={`user  user${id}`}>
    //     {
    //         user.play === false  ? (
    //             <>
    //                 <h1 className="userid">user{id}</h1>
    //                 <MyShips user={user} />
    //             </>
    //         ) : user.play === true && (
                
    //             seconduser.play === true ? (
    //                 <>
    //                 <h1 className="userid">user{id}</h1>
    //                 <GetShips user={user} />
    //                 <MyShots user={user} dispatch={dispatch} seconduser={seconduser} />
    //                 </>
    //             ) : (
    //                 <div 
    //                     style={{
    //                         marginTop: "1rem"
    //                     }}
    //                 >
    //                     Czekaj na drugiego użytkownika
    //                 </div>
    //             )
                
    //         )
    //     }
            
    //     </div>
    // )   
}



export default User;
