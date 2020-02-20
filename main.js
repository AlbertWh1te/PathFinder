var canvas = e("#canvas")
var ctx = canvas.getContext("2d")
const mazeSize = canvas.width
const cellNumber = 40

const getTestMatrix = () => {
    let matrix = []
    for (let i = 0; i < cellNumber; i++) {
        let column = []
        for (let j = 0; j < cellNumber; j++) {
            column.push(randomInt(2))
        }
        matrix.push(column)
    }
    return matrix
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // empty origin canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let matrix = getTestMatrix()
    drawTable(matrix)
}

const drawTable = (matrix) => {
    const cellSize = mazeSize / cellNumber
    info(cellSize)
    for (let i = 0; i < matrix.length; i++) {
        const column = matrix[i];
        for (let j = 0; j < column.length; j++) {
            const cell = column[j];
            if (cell == 1) {
                ctx.fillStyle = "#FF0000";
            } else {
                ctx.fillStyle = "#228B22";
            }
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}



const main = () => {

    // set up loop, with 60 fps
    setInterval(draw, 1000 / 60);
    // draw()
}

main()