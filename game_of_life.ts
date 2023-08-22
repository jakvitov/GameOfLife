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

//Convert any string to set of coordinates
const seedToInitialState = (seed : string) => {

}


const startGame = () => {
    console.log("Game starts!")
    const canvas : any= document.getElementById("drawBoard");
    const ctx : any= canvas.getContext("2d");
    drawGrid(ctx)
    drawCell({x: 0, y: 0}, ctx)
    drawCell({x: 1, y: 1}, ctx)
}

window.addEventListener("load", startGame);