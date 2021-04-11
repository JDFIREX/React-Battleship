import React from "react"
import { client,q } from "./../../faunaDB"


const Hit = ({a,s}) => (
    <div 
        className={`cell ${a.class} notAllowed`}
        style={{
            backgroundColor : s
        }}
    >

    </div>
)

const Cell = ({a,user,state,setData,seconduser}) => {

    let s;
    let c;
    if(user.shots.includes(a.class)){
        if(seconduser.shipsPoss.includes(a.class)){
            s = "#c1549c"
        }else {
            s = "#4699c2"
        }
        c = "myShot"
    }

    const HandleClick = () => {
        let enemy = user.user === 1 ? state["user2"] : state["user1"]
        let shot = a.class


        let enemypoints = enemy.shipsPoints
        let mshots = user.shots
        mshots.push(shot)
        let enemyHits = enemy.hit;
        enemyHits.push(shot)
        let win = false;
        let end = false;
        if(enemy.shipsPoss.includes(shot)){
            enemypoints =  enemypoints - 1;
        }
        if(enemypoints === 0){
            win = true;
            end = true;
        }

        let newState = {
            ...state,
            [`user${user.user}`] : {
                ...state[`user${user.user}`],
                win,
                end,
                myTurn : false,
                shots : mshots
            },
            [`user${enemy.user}`] : {
                ...state[`user${enemy.user}`],
                end,
                myTurn : true,
                hit : enemyHits,
                shipsPoints : enemypoints
            }
        }
        setData(newState)

        client.query(
            q.Paginate(
                q.Documents(q.Collection(`${state.gameID}`))
            )
        ).then(r => {
            let ref = r.data[0].value.id;

            client.query(
                q.Update(
                    q.Ref(q.Collection(`${state.gameID}`), ref),
                    {
                        data : newState
                    }
                )
            ).then(r => {
                client.query(
                    q.Get(
                        q.Documents(q.Collection(`${state.gameID}`))
                    )
                )

            })
        })

    }

    return (
        <>
        {
            !user.shots.includes(a.class) && user.myTurn === true ? (
                <div 
                    className={`cell ${a.class} ${c}`}
                    style={{
                        backgroundColor : s
                    }}
                    onClick={HandleClick}
                >

                </div>
            ) : (
                <Hit a={a} s={s} />
            )
        }
        </>
        
    )
}

const MyShots = ({user,state,setData,seconduser}) => {


    return (
        <>
        <h1 className="header">Do Ataku</h1>
        {
            user.myTurn ? (
                <h1>Twoja tura </h1>

            ) : (
                <h1>Tura user{user.user === 1 ? "2" : "1"}</h1>
            )
        }
        <h1 className="header">żyć {user.shipsPoints}</h1>
        <div className="my-shots">
            {
                user.shipsbox.map(a => {
                    return <Cell key={`shot-${a.class}`} a={a} user={user} state={state} setData={setData} seconduser={seconduser} />
                })
            }
        </div>
        </>
    )
}


export default MyShots;