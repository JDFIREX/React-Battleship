import React, {useContext} from "react"
import {Context} from "./../../useReducer"
import "./user.css"
import MyShips from "./MyShips"
import GetShips from "./GetShips"
import MyShots from "./MyShots"

const User = ({id}) => {

    const [state,dispatch] = useContext(Context)
    const user = state[`user${id}`]
    let seconduser;
    if(id === 1 || id === "1"){
        seconduser = state[`user2`]
    }else {
        seconduser = state[`user1`]
    }


    return (
        <div className={`user  user${id}`}>
        {
            user.play === false  ? (
                <>
                    <h1 className="userid">user{id}</h1>
                    <MyShips user={user} />
                </>
            ) : user.play === true && (
                
                seconduser.play === true ? (
                    <>
                    <h1 className="userid">user{id}</h1>
                    <GetShips user={user} />
                    <MyShots user={user} dispatch={dispatch} seconduser={seconduser} />
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



export default User;
