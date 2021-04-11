
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
