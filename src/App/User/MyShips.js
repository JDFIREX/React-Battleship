import React, {useContext, useEffect, useState} from "react"
import {Context} from "./../../useReducer"
import "./user.css"
import confirmPoss from "./Poss"

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
                    <p>{selected}</p>
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
const Rotate = (ship,user,dispatch,rotate,setMess) => {
    let sl = ship.cells;
    let nd;
    let top;
    let left;
    
    if(rotate === "left"){
        if(ship.direction === "row"){
            top = ship.poss.y1 - (sl - 1);
            left = ship.poss.x1; 
            nd = "column";
        }else {
            top  = ship.poss.y2 - 1;
            left = ship.poss.x1 - (sl - 1);
            nd = "row"
        }
    }else{
        if(ship.direction === "row"){
            top = ship.poss.y1 - (sl - 1);
            left = ship.poss.x2 - 1; 
            nd = "column";
        }else {
            top  = ship.poss.y2 - 1;
            left = ship.poss.x1;
            nd = "row"
        }
    }

    confirmPoss(top,left,sl,nd,0,user,ship,dispatch,setMess)

}
const SetShip = ({ship,user,onClick,selected}) => {

    const [element,setElement] = useState(0)
    const [state,dispatch] = useContext(Context)


    const DragEnd = (e) => {
        let coords = document.querySelector(`.myships${user.user}`).getBoundingClientRect();
        let top = Math.ceil((e.pageY - coords.top) / 36)
        let left = Math.ceil((e.pageX - coords.left) / 36)
        let slength = user.ships[e.target.dataset.ship].cells;
        let direction = user.ships[e.target.dataset.ship].direction;
        confirmPoss(top,left,slength,direction,element,user,ship,dispatch,false)

    }

    return (
        <div 
            className={`box ship ${ship.class}`}
            data-ship={ship.class}
            draggable
            onClick={onClick}
            onDragEnd={DragEnd}
            style={{
                display : "flex",
                flexDirection : ship.direction,
                gridArea : `${ship.poss.y1} / ${ship.poss.x1} / ${ship.poss.y2} / ${ship.poss.x2}`,
                border : selected === ship.class && "1px solid yellow"
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

const GetShips = () => {

}

const MyShips = ({user}) => {

    const [state,dispatch] = useContext(Context)
    const [selected,setSelected] = useState(null)
    const [mess,setMess] = useState("")

    return(
        <>
        {
            user.play ? (
                <GetShips />
            ) : (
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
        </>
    )
}

export default MyShips;