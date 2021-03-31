import React, {useContext, useEffect, useState} from "react"
import {Context} from "./../../useReducer"
import "./user.css"


const SetPoss = (top,left,sl,d,e) => {
    let topEnd;
    let leftEnd;
    if(d === "column"){
        top = top - e;
        topEnd = top + sl;
        leftEnd = left; 
    }else {
        left = left - e;
        topEnd = top;
        leftEnd = left + sl;
    }

    return [top,left,topEnd,leftEnd]
}

const SetCoords = (n,d) => {
    let coords = [];
    if(d === "column"){
        for(let i = n[0]; i < n[2]; i++){
            coords.push(i)
        }
        coords = coords.map(a => {
            return `${a}/${n[1]}`
        })
    }else {
        for(let i = n[1]; i < n[3]; i++){
            coords.push(i)
        }
        coords = coords.map(a => {
            return `${n[0]}/${a}`
        })
    }
    return coords;
}
const SetOtherCoords = (u,s) => {
    let coords = [];
    Object.keys(u.ships).forEach(a => {
        a = u.ships[a]
        if(a.class !== s.class){
            let c = [];
            if(a.direction === "column"){
                for(let i = a.poss.y1 - 1; i < a.poss.y2 + 1; i++ ){
                    c.push(i)
                }
                c = c.forEach(b => {
                    coords.push(`${b}/${a.poss.x1}`)
                    coords.push(`${b}/${a.poss.x1 - 1}`)
                    coords.push(`${b}/${a.poss.x1 + 1}`)
                })
            }else {
                for(let i = a.poss.x1 - 1; i < a.poss.x2 + 1; i++ ){
                    c.push(i)
                }
                c = c.forEach(b => {
                    coords.push(`${a.poss.y1}/${b}`)
                    coords.push(`${a.poss.y1 - 1}/${b}`)
                    coords.push(`${a.poss.y1 + 1}/${b}`)
                })
            }
        }
    })
    return coords;
}

const Ship = ({ship,user}) => {

    const [element,setElement] = useState(0)
    const [state,dispatch] = useContext(Context)


    const DragEnd = (e) => {
        // y / x | top / left
        let coords = document.querySelector(`.myships${user.user}`).getBoundingClientRect();
        let top = Math.ceil((e.pageY - coords.top) / 18)
        let left = Math.ceil((e.pageX - coords.left) / 18)
        let slength = user.ships[e.target.dataset.ship].cells;
        let direction = user.ships[e.target.dataset.ship].direction;
        let newPoss = SetPoss(top,left,slength,direction,element)
        let PossCoords = SetCoords(newPoss,direction)
        let OtherCoords = SetOtherCoords(user,ship)
        let WrongCoords = PossCoords.some(a => OtherCoords.includes(a))

        console.log(WrongCoords)
        if(
            WrongCoords || 
            newPoss[1] >= 11 || 
            newPoss[2] >= 12 || 
            newPoss[0] >= 11 || 
            newPoss[0] <= 0 || 
            newPoss[1] <= 0
        ){
            return;
        }else {
            dispatch({
                type : "CHANGEPOSS",
                user : `user${user.user}`,
                cell : `${ship.class}`,
                poss : {
                    y1 : newPoss[0],
                    x1 : newPoss[1],
                    y2 : newPoss[2],
                    x2 : newPoss[3]
                }
            })
        }

    }

    return (
        <div 
            className={`box ship ${ship.class}`}
            data-ship={ship.class}
            draggable
            onDragEnd={DragEnd}
            style={{
                display : "flex",
                flexDirection : ship.direction,
                gridArea : `${ship.poss.y1} / ${ship.poss.x1} / ${ship.poss.y2} / ${ship.poss.x2}` 
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

const Box = ({a}) => <div className={`box  ${a.id}`}></div>


const MyShips = ({user}) => {

    const [state,dispatch] = useContext(Context)


    return(
        <div className={`myships myships${user.user}`}>
            {
                user.shipsbox.map(a => {
                    return user.ships[a.class] ? (
                        <Ship ship={user.ships[a.class]} a={a} key={a.class} user={user} />
                    ) : (
                        <Box a={a} key={a.class} />
                    )
                })
            }
        </div>
    )
}

export default MyShips;