const cellNumber = 30

var canvas = e("#canvas")
var ctx = canvas.getContext("2d")
const mazeSize = canvas.width

let mazeGenerateId = 0
let matrix = getTestMatrix()
let frontier = []
frontier = addFrontier(0, 0, 0, 0, frontier, matrix)


const mark = (x, y, frontier, matrix) => {
    frontier = addFrontier(x, y, x - 1, y, frontier, matrix)
    frontier = addFrontier(x, y, x + 1, y, frontier, matrix)
    frontier = addFrontier(x, y, x, y + 1, frontier, matrix)
    frontier = addFrontier(x, y, x, y - 1, frontier, matrix)
    return frontier
}



const generateMaze = (matrix) => {
    let startX = randomInt(cellNumber)
    let startY = randomInt(cellNumber)
    let frontier = []
    // frontier = addFrontier(startX, startY, startX, startY, frontier, matrix)
    frontier = addFrontier(0, 0, 0, 0, frontier, matrix)
    while (frontier.length > 0) {
        let cells = frontier.splice(randomInt(frontier.length), 1)[0]
        let toCellX = cells[2]
        let toCellY = cells[3]
        if (matrix[toCellY][toCellX] == 1) {
            matrix[toCellY][toCellX] = 0
            matrix[cells[0]][cells[1]] = 0
            // console.log(matrix, toCellY, toCellX, matrix[toCellX][toCellY])
            // frontier = mark(toCellX, toCellY, frontier, matrix)
            frontier = addFrontier(toCellX - 1, toCellY, toCellX - 2, toCellY, frontier, matrix)
            frontier = addFrontier(toCellX + 1, toCellY, toCellX + 2, toCellY, frontier, matrix)
            frontier = addFrontier(toCellX, toCellY - 1, toCellX, toCellY - 2, frontier, matrix)
            frontier = addFrontier(toCellX, toCellY + 1, toCellX, toCellY + 2, frontier, matrix)
        }
    }
    return matrix
}

const update = () => {
    if (frontier.length > 0) {
        let cells = frontier.splice(randomInt(frontier.length), 1)[0]
        let toCellX = cells[2]
        let toCellY = cells[3]
        if (matrix[toCellY][toCellX] == 1) {
            matrix[toCellY][toCellX] = 0
            matrix[cells[0]][cells[1]] = 0
            // console.log(matrix, toCellY, toCellX, matrix[toCellX][toCellY])
            // frontier = mark(toCellX, toCellY, frontier, matrix)
            frontier = addFrontier(toCellX - 1, toCellY, toCellX - 2, toCellY, frontier, matrix)
            frontier = addFrontier(toCellX + 1, toCellY, toCellX + 2, toCellY, frontier, matrix)
            frontier = addFrontier(toCellX, toCellY - 1, toCellX, toCellY - 2, frontier, matrix)
            frontier = addFrontier(toCellX, toCellY + 1, toCellX, toCellY + 2, frontier, matrix)
        }
    } else {
        stopMazeGenerateAnimation()
    }
}


// TODO:change name
const drawTable = (matrix) => {
    const cellSize = mazeSize / cellNumber
    for (let i = 0; i < matrix.length; i++) {
        const column = matrix[i];
        for (let j = 0; j < column.length; j++) {
            const cell = column[j];
            if (cell == 1) {
                ctx.fillStyle = "black"
                // ctx.fillStyle = "#FF0000";
            } else {
                ctx.fillStyle = "white"
                // ctx.fillStyle = "#228B22";
            }
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            if ((i == 0 && j == 0) || (j == (cellNumber - 2) && i == (cellNumber - 2))) {
                ctx.fillStyle = "red"
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

function stopMazeGenerateAnimation() {
    window.clearInterval(mazeGenerateId)
    mazeGenerateId = 0
    info("Maze Generation Finished")
}

const mazeGenerateLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update()
    drawTable(matrix)
}

const startMazeGenerate = () => {
    // Check Before Start
    if (mazeGenerateLoop != 0) {
        stopMazeGenerateAnimation()
    }
    mazeGenerateId = window.setInterval(mazeGenerateLoop, 1);
}

const findPathLoop = () => {

}

const main = () => {
    startMazeGenerate()
}

main()