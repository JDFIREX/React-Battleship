import React, {useContext, useEffect, useState} from "react"
import {Context} from "./../../useReducer"
import "./user.css"
import {DragEnd,Rotate} from "./Poss"

const Box = ({a}) => <div className={`box  ${a.id}`}></div>

const Btns = ({selected,user,dispatch,setMess}) => {
    return(
        <div className="btns">
            {
                selected && (
                    <>
                    <button 
                        onClick={() => Rotate(
                            user.ships[selected],
                            user,
                            dispatch,
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
                            dispatch,
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

const SetShip = ({ship,user,onClick,selected}) => {

    const [element,setElement] = useState(0)
    const [state,dispatch] = useContext(Context)

    return (
        <div 
            className={`box ship ${ship.class}`}
            data-ship={ship.class}
            draggable
            onClick={onClick}
            onDragEnd={(e) => DragEnd(e,user,ship,element,dispatch)}
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
const SetShips = ({user,selected,setSelected}) => (
    <div className={`myships myships${user.user}`}>
            {
                user.shipsbox.map(a => {



                    return user.ships[a.class] ? (
                        <SetShip 
                            ship={user.ships[a.class]} 
                            a={a} 
                            key={a.class} 
                            user={user} 
                            selected={selected}
                            onClick={() => setSelected(a.class)} 
                        />
                    ) : (
                        <Box a={a} key={a.class} />
                    )
                })
            }
        </div>
)

const MyShips = ({user}) => {

    const [state,dispatch] = useContext(Context)
    const [selected,setSelected] = useState(null)
    const [mess,setMess] = useState("")

    return(
        <>
            <h1 className="header">Ułóż statki</h1>
            <SetShips user={user} selected={selected} setSelected={setSelected} />
            <Mess mess={mess} />
            <Btns selected={selected} user={user} dispatch={dispatch} setMess={setMess} />
            <button 
                className="confirm"
                onClick={() => dispatch({
                    type : "CONFIRM",
                    user : `user${user.user}`,
                })}
            >
                Potwierdz 
            </button>
        </>
    )
}

export default MyShips;