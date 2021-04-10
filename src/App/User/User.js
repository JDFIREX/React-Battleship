import React, {useEffect, useState} from "react"
import { client,q } from "./../../faunaDB"
import {
    useParams
} from "react-router-dom";
import "./user.css"
// import MyShips from "./MyShips"
// import GetShips from "./GetShips"
// import MyShots from "./MyShots"
function report(e,d) {
    console.log(e)
    if(e.action === "update"){
        console.log(e.document.data,"wer")
        d(e.document.data)
    }
}
const startStream = (f,s,d) => {
    let stream = client.stream.document(q.Ref(q.Collection(`${s}`), f))
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

const UserConnect = ({state,user,setData}) => {

    console.log(state,user)
    const enemy = user === "1" ? "user2" : "user1"

    useEffect(() => {
            let CONNECTREF;
            
            client.query(
                q.Paginate(
                    q.Documents(q.Collection(`${state.gameID}`))
                )
            ).then(r => {
                CONNECTREF = r.data[0].value.id
                startStream(CONNECTREF,state.gameID,setData)
                console.log(CONNECTREF)
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
    },[])

    return (
        <div>
            połączono   {user} {enemy}
            {
                state[enemy].connect === true ? "  połączony " : "  czekanie"
            }
        </div>
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

// const [state,dispatch] = useContext(Context)
//     const user = state[`user${id}`]
//     let seconduser;
//     if(id === 1 || id === "1"){
//         seconduser = state[`user2`]
//     }else {
//         seconduser = state[`user1`]
//     }



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
