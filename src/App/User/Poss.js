import { client,q } from "./../../faunaDB"

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



function CHANGEPOSS(state,user,direction,cell,y1,x1,y2,x2,setData,gameID) {

    let d = {...state};
    d = {
        ...d,
        [user] :{
            ...d[user],
            ships : {
                ...d[user].ships,
                [cell] : {
                    ...d[user].ships[cell],
                    direction : direction,
                    poss : {
                        y1,
                        x1,
                        y2,
                        x2
                    }
                }
            }
        }
    }
    setData(d)

    client.query(
        q.Paginate(
            q.Documents(q.Collection(`${gameID}`))
        )
    ).then(r => {
        let CONNECTREF = r.data[0].value.id
        client.query(
            q.Update(
                q.Ref(q.Collection(`${gameID}`), CONNECTREF),
                {
                    data : {...d}
                }
            )
        )
    })

}

const confirmPoss = (top,left,sl,nd,element,user,ship,setData,setMess,gameID,state,x) => {

    let newPoss = SetPoss(top,left,sl,nd,element)
    let PossCoords = SetCoords(newPoss,nd)
    let OtherCoords = SetOtherCoords(user,ship)
    let WrongCoords = PossCoords.some(a => OtherCoords.includes(a))
    
    if(
        WrongCoords || 
        newPoss[1] >= 11 || 
        newPoss[2] >= 12 || 
        newPoss[3] >= 12 || 
        newPoss[0] >= 11 || 
        newPoss[0] <= 0 || 
        newPoss[1] <= 0
    ){
        if(setMess){
            x === "drag" ? setMess("Nie mozna przeniesc statku cos przeszkadza") : setMess("Nie mozna obrocic statku cos przeszkadza")
        }
        return;
    }else {
        setMess("")
        CHANGEPOSS(state,`user${user.user}`,nd,ship.class,newPoss[0],newPoss[1],newPoss[2],newPoss[3],setData,gameID)
    }

}
export const Rotate = (ship,user,setData,gameID,state,rotate,setMess) => {
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

    confirmPoss(top,left,sl,nd,0,user,ship,setData,setMess,gameID,state,"rotate")

}

export const DragEnd = (e,user,ship,element,setData,gameID,state,setMess) => {
    console.log(state,"dragend")
    let coords = document.querySelector(`.myships${user.user}`).getBoundingClientRect();
    let top = Math.ceil( ( (e.pageY - coords.top)  ) / 36) - Math.floor(window.scrollY / 36) 
    let left = Math.ceil((e.pageX - coords.left) / 36)
    let slength = user.ships[e.target.dataset.ship].cells;
    let direction = user.ships[e.target.dataset.ship].direction;
    confirmPoss(top,left,slength,direction,element,user,ship,setData,setMess,gameID,state,"drag")
}
