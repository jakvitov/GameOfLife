const SQUARES_COUNT = 100;
const WIDTH = 700;
const HEIGHT = 700;
const CELL_SIZE=WIDTH/SQUARES_COUNT


const removeCell = (cell, context) => {
    context.clearRect(cell.x * SQUARES_COUNT, cell.y * SQUARES_COUNT, WIDTH/SQUARES_COUNT, HEIGHT/SQUARES_COUNT)
}

const drawCell = (cell, context) => {
    context.rect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, WIDTH/SQUARES_COUNT, HEIGHT/SQUARES_COUNT)
    context.fill();
}

const drawGrid = (context) => {
    context.beginPath();
    for (i = 0; i < HEIGHT; i += (HEIGHT / SQUARES_COUNT )){
        context.moveTo(0, i);
        context.lineTo(WIDTH, i);
    }

    for (i = 0; i < WIDTH; i += (HEIGHT / SQUARES_COUNT )){
        context.moveTo(i, 0);
        context.lineTo(i, WIDTH);
    }
    context.stroke();
}


const startGame = () => {
    console.log("Game starts!")
    const canvas = document.getElementById("drawBoard");
    const ctx = canvas.getContext("2d");
    drawGrid(ctx)
    drawCell({x: 0, y: 0}, ctx)
    drawCell({x: 1, y: 1}, ctx)
    removeCell({x: 0, y: 0}, ctx)
}

window.addEventListener("load", startGame);