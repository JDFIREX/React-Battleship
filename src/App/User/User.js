import React, {useContext, useEffect, useState} from "react"
import {Context} from "./../../useReducer"
import { useParams } from "react-router-dom";
// import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
// import GridLayout from 'react-grid-layout';
import "./user.css"
// import "/node_modules/react-grid-layout/css/styles.css"
// import "/node_modules/react-resizable/css/styles.css"


const User = () => {

    const [state,dispatch] = useContext(Context)
    const {id} = useParams()
    const user = state[`user${id}`]
    const [shipsCoords, setShipsCoords] = useState("")
    const [ElementDrag,setElementDrag] = useState(0)


    useEffect(() => {
        setShipsCoords(document.querySelector(".Ships").getBoundingClientRect())
    },[])

    const DragStart = (result) => {
        // console.log("start",result)
    }
    const DragEnd = (result) => {
        let shipborders = []; 
        Object.keys(user.ships).forEach(a => {
            if(user.ships[a].class !== result.target.dataset.class){
                let p = user.ships[a].poss;
                if(user.ships[a].direction === "column"){
                    let x = []
                    for(let i = p.y1 - 1; i <= p.y2 ;i++){
                        x.push(i)
                    }
                    x.forEach(a => {
                        shipborders.push(`${a}/${p.x1}`)
                        shipborders.push(`${a}/${p.x1 + 1}`)
                        shipborders.push(`${a}/${p.x1 - 1}`)
                    })
                }else {
                    let x = []
                    for(let i = p.x1 - 1; i <= p.x2 ;i++){
                        x.push(i)
                    }
                    x.forEach(a => {
                        shipborders.push(`${p.y1}/${a}`)
                        shipborders.push(`${p.y1 + 1}/${a}`)
                        shipborders.push(`${p.y1 - 1}/${a}`)
                    })
                }
            }
        })
        let direction = result.target.dataset.direction;
        let top;
        let left;
        let topEnd;
        let leftEnd;
        let myShipBorders = []
        let myToptoTopend = []
        if(direction === "row"){
            left = Math.ceil((result.pageX - shipsCoords.left) / 18)  - ElementDrag;
            top =  Math.ceil((result.pageY - shipsCoords.top) / 18);
            topEnd = top;
            leftEnd = left + Number(result.target.dataset.cells)
            for(let i = left; i < leftEnd; i++){
                myToptoTopend.push(i)
            }
            myToptoTopend.forEach(a => {
                myShipBorders.push(`${top}/${a}`)
            })
        }else {
            left = Math.ceil((result.pageX - shipsCoords.left) / 18);
            top =  Math.ceil((result.pageY - shipsCoords.top) / 18)   - ElementDrag;
            topEnd = top + Number(result.target.dataset.cells);
            leftEnd = left;
            for(let i = top; i < topEnd; i++){
                myToptoTopend.push(i)
            }
            myToptoTopend.forEach(a => {
                myShipBorders.push(`${a}/${left}`)
            })
        }
        let borders = [top,left,topEnd,leftEnd].some(a => a >= 12 || a <= 0);
        let shipbordersCheck = myShipBorders.some(a => shipborders.includes(a))
        console.log(top,left,topEnd,leftEnd,direction,result.target.dataset.class)
        if(borders || shipbordersCheck || top >= 11 || left >= 11){
            return;
        }else{
            dispatch({
                type : "CHANGEPOSS", 
                user : `user${id}`,
                class : result.target.dataset.class, 
                newy1 : top, 
                newx1 : left, 
                newy2 : topEnd, 
                newx2 : leftEnd})
        }
        
    }

    return (
        <div className="user">
            <div className="header">
                User {id}
            </div>
            <div className="Ships">
                {
                    user.shipsbox && user.shipsbox.map( (a,b) => {
                        if(user.ships[a.class]){
                            let ship = user.ships[a.class];
                            return(
                                <div 
                                    className={`${a.class} ship`} 
                                    data-id={a.id} 
                                    data-direction={ship.direction}
                                    data-class={ship.class}
                                    data-cells={ship.cells}
                                    onDragStart={DragStart}
                                    onDragEnd={DragEnd}
                                    draggable
                                    style={{
                                        gridArea : `${ship.poss.y1}/${ship.poss.x1} / ${ship.poss.y2}/${ship.poss.x2}`
                                    }}
                                >
                                    {
                                        ship.cellsMap.map((a,b) => {
                                            return (
                                                <div
                                                    onMouseOver={() => setElementDrag(b)}
                                                    // data-element={b}
                                                    style={{
                                                        width: "1rem",
                                                        height: "1rem",
                                                        border : "1px solid black"
                                                    }}
                                                ></div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }

                         return  <div className={`rect  ${a.class}`} data-id={a.id} data-class={a.class} key={b}></div>

                    })
                }
            </div>
        </div>
    )   
}



export default User;
