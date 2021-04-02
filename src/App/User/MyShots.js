import React from "react"

const Hit = ({a,s}) => (
    <div 
        className={`cell ${a.class} notAllowed`}
        style={{
            backgroundColor : s
        }}
    >

    </div>
)

const Cell = ({a,user,dispatch,seconduser}) => {

    let s;
    let c;
    if(user.shots.includes(a.class)){
        if(seconduser.shipsPoss.includes(a.class)){
            s = "blue"
        }else {
            s = "red"
        }
        c = "myShot"
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
                    onClick={() => dispatch({
                            type : "SHOT",
                            cuser : `user${user.user}`,
                            enemy : user.user === 1 ? "user2" : "user1",
                            shot : a.class
                        })
                    }
                >

                </div>
            ) : (
                <Hit a={a} s={s} />
            )
        }
        </>
        
    )
}

const MyShots = ({user,dispatch,seconduser}) => {


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
                    return <Cell key={`shot-${a.class}`} a={a} user={user} dispatch={dispatch} seconduser={seconduser} />
                })
            }
        </div>
        </>
    )
}


export default MyShots;