import React from "react"

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

// y/x

export const initalState = {
    user1 : {
        play : false,
        shipsbox,
        ships : {
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
    },
    user2 : {
        play : false,
        shipsbox,
    }
}

export const reducer = (state,action) => {
    switch(action.type){
        case "CHANGEPOSS" :
            let user = action.user

        return {
            ...state,
            [user] : {
                ...state[user],
                ships : {
                    ...state[user].ships,
                    [action.class] : {
                        ...state[user].ships[action.class],
                        poss : {
                            y1 : action.newy1,
                            x1 : action.newx1,
                            y2 : action.newy2,
                            x2 : action.newx2
                        }
                    }
                }
            }
        }


        default : return ;
    }
}

export const Context = React.createContext(initalState)