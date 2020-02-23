const info = console.log.bind(console)
const e = selector => document.querySelector(selector)

const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const initMatrix = () => {
    let matrix = []
    for (let i = 0; i < cellNumber; i++) {
        let column = []
        for (let j = 0; j < cellNumber; j++) {
            // column.push(randomInt(2))
            column.push(1)
        }
        matrix.push(column)
    }
    return matrix
}

// reset matrix for find path again
const resetMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        const column = matrix[i];
        for (let j = 0; j < column.length; j++) {
            const cell = column[j];
            if (cell == 3 || cell == 4) {
                matrix[i][j] = 0
            }
        }
    }
    return matrix
}

// add Path to Matrix
const addPathToMatrix = (matrix, stack) => {
    for (let index = 0; index < stack.length; index++) {
        const element = stack[index]
        if (matrix[element[1]][element[0]] == 3) {
            matrix[element[1]][element[0]] = 4
        }
    }
    return matrix
}


const addFrontier = (x1, y1, x2, y2, frontier, matrix) => {
    if (x1 >= 0 && y1 >= 0 && x1 < cellNumber && y1 < cellNumber && x2 >= 0 && y2 >= 0 && x2 < cellNumber && y2 < cellNumber && (matrix[y2][x2] == 1 || matrix[y1][x1] == 1)) {
        frontier.push([x1, y1, x2, y2])
    }
    return frontier
}

