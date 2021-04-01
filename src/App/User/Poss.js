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

const confirmPoss = (top,left,sl,nd,element,user,ship,dispatch,setMess) => {

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
            setMess("Nie mozna obrocic statku cos przeszkadza")
        }
        return;
    }else {
        if(setMess){
            setMess("")
        }
        dispatch({
            type : "CHANGEPOSS",
            user : `user${user.user}`,
            direction : nd,
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

export default confirmPoss