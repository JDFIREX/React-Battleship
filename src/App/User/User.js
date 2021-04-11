import React, {useEffect, useState} from "react"
import { client,q } from "./../../faunaDB"
import {
    useParams
} from "react-router-dom";
import "./user.css"
import MyShips from "./MyShips"
import GetShips from "./GetShips"
import MyShots from "./MyShots"
import EndGame from "./../Main/EndGame"



export function report(e,d) {
    if(e.action === "update"){
        d(e.document.data)
    }
}


let stream;
export const startStream = (f,s,d) => {
    stream = client.stream.document(q.Ref(q.Collection(`${s}`), f))
    .on('snapshot', snapshot => {
      report(snapshot,d)
    })
    .on('version', version => {
      report(version,d)
    })
    .on('error', error => {
      console.log('Error:', error)
      stream.close()
      setTimeout(startStream, 1000)
    })
    .start()
  }


function updateFauna(user,state,setData,streamData = false) {
    let CONNECTREF;
            
    client.query(
        q.Paginate(
            q.Documents(q.Collection(`${state.gameID}`))
        )
    ).then(r => {
        CONNECTREF = r.data[0].value.id
        if(streamData){
            startStream(CONNECTREF,state.gameID,setData)
        }
        let newState = state
        newState[`user${user}`].connect = true
        client.query(
            q.Update(
                q.Ref(q.Collection(`${state.gameID}`), CONNECTREF),
                {
                    data : {...newState}
                }
            )
        ).then(r => {
            client.query(
                q.Get(
                    q.Documents(q.Collection(`${state.gameID}`))
                )
            ).then(r => {
                setData({...r.data})
            })
        })
    })
}

const UserConnect = ({state,user,setData}) => {

    let enemy = user === "1" ? state["user2"] : state["user1"];

    useEffect(() => {
            updateFauna(user,state,setData,true)
    },[])

    console.log(user.end)

    if(state[`user${user}`].end){
        return (
            <EndGame state={state} user={user} />
        )
    }

    return (
        <>
            {
                enemy.connect === false ? (
                        `połączono   ${user}|  user${enemy.user} czekanie`
                ) : (
                    <div className={`user  user${user}`}>
                    {
                        state[`user${user}`].play === false  ? (
                            <>
                                <h1 className="userid">user{user}</h1>
                                <MyShips gameID={state.gameID} user={state[`user${user}`]} state={state} setData={setData}/>
                            </>
                        ) : state[`user${user}`].play === true && (
                            
                            enemy.play === true ? (
                                <>
                                <h1 className="userid">user{user}</h1>
                                <GetShips user={state[`user${user}`]} />
                                <MyShots user={state[`user${user}`]} state={state} setData={setData} seconduser={enemy} />
                                </>
                            ) : (
                                <div 
                                    style={{
                                        marginTop: "1rem"
                                    }}
                                >
                                    Czekaj na drugiego użytkownika
                                </div>
                            )
                            
                        )
                    }
                    </div>
                )
            }
        </>
    )

}

const User = () => {

    const {id} = useParams()
    const [gameID, setGameID] = useState()
    const [data, setData] = useState()
    
    useEffect(() => {
        client.query(
            q.Get(
                q.Documents(
                    q.Collection(gameID)
                )
            )
        ).then(r => {
            if(r.data){
                setData({...r.data})
            }
        })
    },[gameID])

    useEffect(() => {
        console.log(data,"zmiana data")
    },[data])

    if(gameID && data){
        return (
            <UserConnect state={data} user={id} setData={setData} />
        )
    }


    return (
        <div>
            Podaj Kod Gry :
            <input type="text" value={gameID} onChange={(e) => setGameID(e.target.value)} />
        </div>
    )
  
}



export default User;
