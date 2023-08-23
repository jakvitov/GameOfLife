var WIDTH = 700;
var HEIGHT = 700;
var SQUARES_COUNT = 50;
var CELL_COUNT = 1250;
var RUNNING = false;
var cellToString = function (cell) {
    return cell.x + "_" + cell.y;
};
var stringToCell = function (cellStr) {
    var parsed = cellStr.split("_");
    return { x: parseInt(parsed[0]), y: parseInt(parsed[1]) };
};
var drawCell = function (cell, context) {
    var cellSize = WIDTH / SQUARES_COUNT;
    context.rect(cell.x * cellSize, cell.y * cellSize, WIDTH / SQUARES_COUNT, HEIGHT / SQUARES_COUNT);
    context.fill();
};
var drawGrid = function (context) {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    for (var i = 0; i < HEIGHT; i += (HEIGHT / SQUARES_COUNT)) {
        context.moveTo(0, i);
        context.lineTo(WIDTH, i);
    }
    for (var i = 0; i < WIDTH; i += (HEIGHT / SQUARES_COUNT)) {
        context.moveTo(i, 0);
        context.lineTo(i, WIDTH);
    }
    context.stroke();
};
//Generate ranodm coordinates for given anmount of cells
var generateRandomSeed = function (cellCount) {
    console.log(cellCount);
    var state = new Set;
    for (var i = 0; i < cellCount; i++) {
        var x = Math.floor(Math.random() * SQUARES_COUNT);
        var y = Math.floor(Math.random() * SQUARES_COUNT);
        state.add(cellToString({ x: x, y: y }));
    }
    return state;
};
var getNeighbourCells = function (cell) {
    var neighbours = new Set;
    neighbours.add(cellToString({ x: cell.x + 1, y: cell.y }));
    neighbours.add(cellToString({ x: cell.x + 1, y: Math.max(cell.y - 1, 0) }));
    neighbours.add(cellToString({ x: cell.x + 1, y: cell.y + 1 }));
    neighbours.add(cellToString({ x: cell.x, y: cell.y + 1 }));
    neighbours.add(cellToString({ x: cell.x, y: Math.max(cell.y - 1, 0) }));
    neighbours.add(cellToString({ x: Math.max(cell.x - 1, 0), y: cell.y + 1 }));
    neighbours.add(cellToString({ x: Math.max(cell.x - 1, 0), y: cell.y }));
    neighbours.add(cellToString({ x: Math.max(cell.x - 1, 0), y: Math.max(cell.y - 1, 0) }));
    return neighbours;
};
var nextGeneration = function (generation, liveCells, ctx) {
    var startTime = Date.now();
    //console.log("Starting generation " + generation + ". Live cells " + liveCells.size + ".");
    drawGrid(ctx);
    liveCells.forEach(function (cell) { return drawCell(stringToCell(cell), ctx); });
    var dyingCells = new Set;
    var cellsCommingToLife = new Set;
    //List of adepts who can come to life - neighbours of live cells
    var canComeToLife = new Set;
    liveCells.forEach(function (cell) {
        var neighbours = getNeighbourCells(stringToCell(cell));
        var liveNeighbours = 0;
        neighbours.forEach(function (neighbour) {
            liveCells.has(neighbour) ? liveNeighbours += 1 : false;
            canComeToLife.add(neighbour);
        });
        //The cell dies due to under or over population
        if (liveNeighbours !== 2 && liveNeighbours !== 3) {
            dyingCells.add(cell);
        }
    });
    canComeToLife.forEach(function (cell) {
        var neighbours = getNeighbourCells(stringToCell(cell));
        var liveNeighbours = 0;
        neighbours.forEach(function (neighbour) {
            liveCells.has(neighbour) ? liveNeighbours += 1 : false;
        });
        if (liveNeighbours === 3 && !liveCells.has(cell)) {
            cellsCommingToLife.add(cell);
        }
    });
    cellsCommingToLife.forEach(function (cell) {
        liveCells.add(cell);
    });
    dyingCells.forEach(function (cell) {
        liveCells.delete(cell);
    });
    var endTime = Date.now();
    document.getElementById("timePerGeneration").textContent = "".concat((endTime - startTime), "ms and running!");
    document.getElementById("generationNumber").textContent = " ".concat(generation, " generation. ");
};
var startGame = function () {
    if (RUNNING) {
        return;
    }
    RUNNING = true;
    var liveCells = generateRandomSeed(CELL_COUNT);
    var ctx = gameSetup();
    liveCells.forEach(function (cell) { return drawCell(stringToCell(cell), ctx); });
    var generation = 1;
    var int = setInterval(function () {
        if (RUNNING) {
            nextGeneration(generation++, liveCells, ctx);
        }
        else {
            clearInterval(int);
        }
    }, 300);
};
var gameSetup = function () {
    console.log("setup");
    var canvas = document.getElementById("drawBoard");
    var ctx = canvas.getContext("2d");
    drawGrid(ctx);
    return ctx;
};
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("stop").addEventListener("click", function () {
    RUNNING = false;
});
document.getElementById("size").addEventListener("input", function (ev) {
    var inputElement = ev.target;
    SQUARES_COUNT = parseInt(inputElement.value);
    gameSetup();
});
document.getElementById("cellCount").addEventListener("input", function (ev) {
    var inputElement = ev.target;
    CELL_COUNT = parseInt(inputElement.value);
    gameSetup();
});
