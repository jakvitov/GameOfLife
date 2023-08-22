const SQUARES_COUNT : number = 100;
const WIDTH : number = 700;
const HEIGHT : number = 700;
const CELL_SIZE : number=WIDTH/SQUARES_COUNT

interface Cell {
    x : number
    y : number
}

const removeCell = (cell : Cell, context : any) => {
    context.clearRect(cell.x * SQUARES_COUNT, cell.y * SQUARES_COUNT, WIDTH/SQUARES_COUNT, HEIGHT/SQUARES_COUNT)
}

const drawCell = (cell : Cell, context : any) => {
    context.rect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, WIDTH/SQUARES_COUNT, HEIGHT/SQUARES_COUNT)
    context.fill();
}

const drawGrid = (context : any) => {
    context.beginPath();
    for (let i : number = 0; i < HEIGHT; i += (HEIGHT / SQUARES_COUNT )){
        context.moveTo(0, i);
        context.lineTo(WIDTH, i);
    }

    for (let i : number = 0; i < WIDTH; i += (HEIGHT / SQUARES_COUNT )){
        context.moveTo(i, 0);
        context.lineTo(i, WIDTH);
    }
    context.stroke();
}

//Generate ranodm coordinates for given anmount of cells
const generateRandomSeed = (cellCount : number) => {
    let state = new Set<Cell>; 
    for (let i : number = 0; i < cellCount; i++){
        let x : number = Math.floor(Math.random() * SQUARES_COUNT);
        let y : number = Math.floor(Math.random() * SQUARES_COUNT);
        state.add({x, y})
    }
    return state;
}

const startGame = () => {
    console.log("Game starts!")
    const canvas : any= document.getElementById("drawBoard");
    const ctx : any= canvas.getContext("2d");
    drawGrid(ctx);
    generateRandomSeed(400).forEach((cell) => drawCell(cell, ctx));
}

window.addEventListener("load", startGame);