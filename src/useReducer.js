import React from "react"
import { client,q } from "./faunaDB"

// const shipsBox = 
let shipsbox = [];
let i = 0;
while(i < 88){

    shipsbox.push({
        id : i,
        class : `cell${i}`
    })
    i++
}

let ships = {
    cell1 : {
        class : "cell1",
        direction : "column",
        cells : 5,
        cellsMap : [1,2,3,4,5],
        poss : {
            y1 : 1,
            x1 : 3,
            y2 : 6,
            x2 : 3
        }
    },
    cell2 : {
        class : "cell2",
        direction : "column",
        cells : 4,
        cellsMap : [1,2,3,4],
        poss : {
            y1 : 5,
            x1 : 6,
            y2 : 9,
            x2 : 6
        }
    },
    cell3 : {
        class : "cell3",
        direction : "row",
        cells : 3,
        cellsMap : [1,2,3],
        poss : {
            y1 : 1,
            x1 : 5,
            y2 : 1,
            x2 : 8
        }
    },
    cell4 : {
        class : "cell4",
        direction : "column",
        cells : 3,
        cellsMap : [1,2,3],
        poss : {
            y1 : 4,
            x1 : 8,
            y2 : 7,
            x2 : 8
        }
    },
    cell5 : {
        class : "cell5",
        direction : "row",
        cells : 2,
        cellsMap : [1,2],
        poss : {
            y1 : 10,
            x1 : 2,
            y2 : 10,
            x2 : 4
        }
    }
}

// y/x

export const initalState = {
    user1 : {
        user : 1,
        myTurn : true,
        connect : false,
        play : false,
        win : false,
        end : false,
        shipsPoints : 17,
        shots : [],
        hit : [],
        shipsPoss : [],
        shipsbox,
        ships
    },
    user2 : {
        user : 2,
        myTurn : false,
        connect : false,
        play : false,
        win : false,
        end : false,
        shipsPoints : 17,
        shots : [],
        hit : [],
        shipsPoss : [],
        shipsbox,
        ships
    }
}

export const reducer = (state,action) => {
    switch(action.type){


        case "CONNECT" :

            let CONNECTREF;
            let c;
            client.query(
                q.Paginate(
                    q.Documents(q.Collection(`${action.gameID}`))
                )
            ).then(r => {
                CONNECTREF = r.data[0].value.id
                console.log(CONNECTREF)
                client.query(
                    q.Update(
                        q.Ref(q.Collection(`${action.gameID}`), CONNECTREF),
                        {
                            data : {
                                ...state,
                                [action.user] : {
                                    ...state[action.user],
                                    connect : true
                                }
                            }
                        }
                    )
                ).then(r => {
                    client.query(
                        q.Get(
                            q.Documents(q.Collection(`${action.gameID}`))
                        )
                    ).then(r => {
                        reducer({
                            type : "CONFIRMFAUNA",
                            state : r.data
                        })
                    })
                })
            })



        return;

        case "CONFIRMFAUNA" :

            console.log(action.state)

            return {...action.state}

        case "CHANGEPOSS" :
        
        return {
            ...state,
            [action.user] : {
                ...state[action.user],
                ships : {
                    ...state[action.user].ships,
                    [action.cell] : {
                        ...state[action.user].ships[action.cell],
                        direction : action.direction,
                        poss : action.poss
                    }
                }
            }
        }

        case "CONFIRM" :

        let newshipsbox = []
        for(let i = 0 ; i < 100; i++){
            newshipsbox.push({
                id : i,
                class : `cell${i}`
            })
        }
        let shipsPossConfirm = []
        Object.keys(state[action.user].ships).forEach(a => {
            a = state[action.user].ships[a]
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

        return {
            ...state,
            [action.user] : {
                ...state[action.user],
                play : true,
                shipsPoss : shipsPossConfirm,
                shipsbox : newshipsbox
            }
        }

        case "SHOT" : 

        let enemypoints = state[action.enemy].shipsPoints
        let mshots = state[action.cuser].shots
        mshots.push(action.shot)
        let enemyHits = state[action.enemy].hit;
        enemyHits.push(action.shot)
        let win = false;
        let end = false;
        if(state[action.enemy].shipsPoss.includes(action.shot)){
            enemypoints =  enemypoints - 1;
        }
        if(enemypoints === 0){
            win = true;
            end = true;
        }

        return {
            ...state,
            [action.cuser] : {
                ...state[action.cuser],
                win,
                end,
                myTurn : false,
                shots : mshots
            },
            [action.enemy] : {
                ...state[action.enemy],
                end,
                myTurn : true,
                hit : enemyHits,
                shipsPoints : enemypoints
            }
        }


        default : return ;
    }
}

export const Context = React.createContext(initalState)