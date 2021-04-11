import React, {useState} from "react"
import "./user.css"
import {DragEnd,Rotate} from "./Poss"
import {startStream} from "./User"
import { client,q } from "./../../faunaDB"

const Box = ({a}) => <div className={`box  ${a.id}`}></div>

const Btns = ({selected,user,setMess,setData,state,gameID}) => {
    return(
        <div className="btns">
            {
                selected && (
                    <>
                    <button 
                        onClick={() => Rotate(
                            user.ships[selected],
                            user,
                            setData,
                            gameID,
                            state,
                            "left",
                            setMess
                        )}
                    >Rotate Left</button>
                    <p>{
                        selected === "cell1" ? "statek 1" :
                        selected === "cell2" ? "statek 2" :
                        selected === "cell3" ? "statek 3" :
                        selected === "cell4" ? "statek 4" : "statek 5" 
                        }</p>
                    <button
                        onClick={() => Rotate(
                            user.ships[selected],
                            user,
                            setData,
                            gameID,
                            state,
                            "right",
                            setMess
                        )}
                    >Rotate Right</button>
                    </>
                )
            }
        </div>
    )
}
const Mess = ({mess}) => (
    <div className="mess">
        <p>Kliknij na statek by go przekręcić</p>
        {
            mess && (
                <p style={{
                    color : "red"
                }}>{mess}</p>
            )
        }
    </div>
) 

const SetShip = ({ship,user,onClick,selected,setData,gameID,state,setMess}) => {

    const [element,setElement] = useState(0)
    console.log(state,"setShip")

    return (
        <div 
            className={`box ship ${ship.class}`}
            data-ship={ship.class}
            draggable
            onClick={onClick}
            onDragEnd={(e) => DragEnd(e,user,ship,element,setData,gameID,state,setMess)}
            style={{
                display : "flex",
                flexDirection : ship.direction,
                gridArea : `${ship.poss.y1} / ${ship.poss.x1} / ${ship.poss.y2} / ${ship.poss.x2}`,
                border : selected === ship.class && "1px solid #ef484c",
                backgroundColor : selected === ship.class && "#263f66"
            }}
        >
            {
                ship.cellsMap.map((a,b) => (
                    <div 
                        key={b}
                        onMouseOver={() => setElement(b)}
                    >

                    </div>
                ))
            }
        </div>
    )
}
const SetShips = ({user,selected,setSelected,setData,gameID,state,setMess}) => (
    <div className={`myships myships${user.user}`}>
            {
                user.shipsbox.map(a => {
                    return user.ships[a.class] ? (
                        <SetShip 
                            ship={user.ships[a.class]} 
                            a={a} 
                            key={a.class} 
                            setData={setData}
                            state={state}
                            user={user} 
                            setMess={setMess}
                            selected={selected}
                            gameID={gameID}
                            onClick={() => setSelected(a.class)} 
                        />
                    ) : (
                        <Box a={a} key={a.class} />
                    )
                })
            }
        </div>
)

const MyShips = ({user,setData,state,gameID}) => {

    console.log(gameID)

    const [selected,setSelected] = useState(null)
    const [mess,setMess] = useState("")


    const handleClick = () => {

        let Stateuser = {...user};

        let newshipsbox = []
        for(let i = 0 ; i < 100; i++){
            newshipsbox.push({
                id : i,
                class : `cell${i}`
            })
        }
        let shipsPossConfirm = []
        Object.keys(user.ships).forEach(a => {
            a = user.ships[a]
            if(a.direction === "row"){

                let si = ((a.poss.y1 * 10) - 10) + a.poss.x1  - 1;
                let ei = si + a.cells;
                for(let i = si; i < ei; i++){
                    shipsPossConfirm.push(`cell${i}`)
                }
            }else {
                let si = ((a.poss.y1 * 10) - 10) + a.poss.x1 - 1;
                let ei = ((a.poss.y2 * 10) - 10) + a.poss.x1 - 1;
                for(let i = si; i < ei; i += 10){
                    shipsPossConfirm.push(`cell${i}`)
                }
            }
        })

        Stateuser = {
            ...Stateuser,
            play : true,
            shipsPoss : shipsPossConfirm,
            shipsbox : newshipsbox
        }

        client.query(
            q.Paginate(
                q.Documents(q.Collection(`${state.gameID}`))
            )
        ).then(r => {
            let ref = r.data[0].value.id;

            startStream(ref,state.gameID,setData)

            client.query(
                q.Update(
                    q.Ref(q.Collection(`${state.gameID}`), ref),
                    {
                        data : {
                            ...state,
                            [`user${user.user}`] : Stateuser
                        }
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

    return(
        <>
            <h1 className="header">Ułóż statki</h1>
            <SetShips state={state} gameID={gameID} user={user} selected={selected} setSelected={setSelected} setData={setData} setMess={setMess} />
            <Mess mess={mess} />
            <Btns selected={selected} user={user} setMess={setMess} setData={setData} state={state} gameID={gameID} />
            <button 
                className="confirm"
                onClick={handleClick}
            >
                Potwierdz 
            </button>
        </>
    )
}

export default MyShips;