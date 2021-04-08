import React from "react"


const GetCell = ({a,user}) => {

    let s;
    let c;
    if(user.shipsPoss.includes(a.class)){
        s = `#3d619b`
        c = "myship"
    }
    if(user.hit.includes(a.class)){
        s = "#ef484C"
        if(user.shipsPoss.includes(a.class)){
            s = "#c1549c"
        }
    }

    return (
        <div 
            className={`cell ${a.class}  ${c} `}
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