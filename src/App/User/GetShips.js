import React from "react"


const GetCell = ({a,user}) => {

    let s;
    let c;
    let d;
    if(user.shipsPoss.includes(a.class)){
        s = `blue`
        c = "myship"
    }
    if(user.hit.includes(a.class)){
        s = "red"
        if(user.shipsPoss.includes(a.class)){
            s = "yellow"
        }
    }

    return (
        <div 
            className={`cell ${a.class}  ${c}  ${d}`}
            style={{
                backgroundColor : s
            }}
        >

        </div>
    )
}

const GetShips = ({user}) => {
    return (
        <>
        <h1 className="header">Twoje ustawienie</h1>
        <div className="my-ships-setup">
            {
                user.shipsbox.map(a => {
                    return <GetCell key={a.class} a={a} user={user} />
                })
            }
        </div>
        </>
    )
}


export default GetShips;