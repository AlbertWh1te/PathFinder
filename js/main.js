// const cellNumber = 9
const cellNumber = 21
var canvas = e("#canvas")
var ctx = canvas.getContext("2d")
const mazeSize = canvas.width

// set up maze related
let mazeGenerateId = 0
let findPathId = 0
let matrix = initMatrix()
let frontier = []

// set up find path related
let found = false
let stack = []
let trace = []



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
const drawTable = () => {
    const cellSize = mazeSize / cellNumber
    for (let i = 0; i < matrix.length; i++) {
        const column = matrix[i];
        for (let j = 0; j < column.length; j++) {
            const cell = column[j];
            if (cell == 1) {
                ctx.fillStyle = "black"
                // ctx.fillStyle = "#FF0000";
            } else if (cell == 0) {
                ctx.fillStyle = "white"
                // ctx.fillStyle = "#228B22";
            } else if (cell == 3) {
                ctx.fillStyle = "blue"
            } else if (cell == 4) {
                ctx.fillStyle = "green"
            }
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            if ((i == 0 && j == 0) || (j == (cellNumber - 1) && i == (cellNumber - 1))) {
                ctx.fillStyle = "red"
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

const stopMazeGenerateAnimation = () => {
    window.clearInterval(mazeGenerateId)
    mazeGenerateId = 0
    info("Maze Generation Animation Finished")
}

const stopFindPathAnimation = () => {
    window.clearInterval(findPathId)
    findPathId = 0
    info("Path find Animation Finished")

}


const mazeGenerateLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update()
    drawTable()
}


const startMazeGenerate = () => {
    // Check Before Start
    if (mazeGenerateId != 0) {
        stopMazeGenerateAnimation()
    }
    info("Start Maze Generarion")
    matrix = initMatrix()
    frontier = []
    frontier = addFrontier(0, 0, 0, 0, frontier, matrix)
    mazeGenerateId = window.setInterval(mazeGenerateLoop, 1);
}

const pushToStack = (x, y) => {
    if (x >= 0 && y >= 0 && x < cellNumber && y < cellNumber) {
        if (matrix[y][x] == 0) {
            stack.push([x, y])
            trace.push([x, y])
        }
    }
}

const updatePath = () => {
    if (found) {
        stopFindPathAnimation()
        return
    }
    let currentPosition = stack.pop()
    trace.pop()
    let x = currentPosition[0]
    let y = currentPosition[1]
    if (matrix[y][x] != 3) {
        if (x == (cellNumber - 1) && y == (cellNumber - 1)) {
            matrix = addPathToMatrix(matrix, trace)
            found = true
        } else {
            pushToStack(x, y)
            matrix[y][x] = 3
            pushToStack(x - 1, y)
            pushToStack(x + 1, y)
            pushToStack(x, y + 1)
            pushToStack(x, y - 1)
        }
    }
}


const findPathLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePath()
    drawTable()
}

const startFindPath = () => {
    info("Start Find Path")
    // Check Before Start
    if (findPathId != 0) {
        stopFindPathAnimation()
    }
    if (found) {
        matrix = resetMatrix(matrix)
        stack = []
    }
    found = false
    stack = []
    trace = []
    pushToStack(0, 0)
    findPathId = window.setInterval(findPathLoop, 1000 / 60);
}

const addControl = () => {
    let generateMaze = e(".generate-maze")
    generateMaze.addEventListener(
        "click", () => {
            startMazeGenerate()
        }
    )
    let findPath = e(".find-path")
    findPath.addEventListener(
        "click", () => {
            startFindPath()
        }
    )
}

const main = () => {
    addControl()
    startMazeGenerate()
}

main()