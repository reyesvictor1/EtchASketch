let color = "black";
let activeDrawing = false;
let input = document.querySelector("input");

const btnBlack = document.querySelector("#btn-black");
const btnErasor = document.querySelector("#btn-erasor");
const btnRandom = document.querySelector("#btn-random");
const btnReset = document.querySelector("#btn-reset");
const drawingStatus = document.querySelector("#drawing-status");
const board = document.querySelector("#board");

input.setAttribute("onChange", "populateBoard(input.value)");
btnBlack.setAttribute("onClick", "changeColor('black')");
btnErasor.setAttribute("onClick", "changeColor('white')");
btnRandom.setAttribute("onClick", "changeColor('random')");
btnReset.setAttribute("onClick", "reset()");
board.style.width = `${board.offsetHeight}px`;

populateBoard(input.value);
setDrawingStatus();

//============================= functions =============================

function populateBoard(size) {
    let squares = board.querySelectorAll("div");
    squares.forEach((div) => {div.remove()});
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // create n columns
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`; // create n rows

    for (let i = 0; i < (size * size); i++) {
        let square = document.createElement("div");
        square.style.background = "white";
        square.style.border = "0.5px solid lightgray"
        square.addEventListener("mouseover", colorSquare);
        square.addEventListener("click", () => {
            activeDrawing = !activeDrawing;
            setDrawingStatus();
        });
        board.appendChild(square);
    }
}

function colorSquare() {

    if (!activeDrawing) return;

    if (color == "random") {
        const R = getRandInt();
        const G = getRandInt();
        const B = getRandInt();
        this.style.background = `rgb(${R},${G},${B})`;
        return;
    }
    
    this.style.background = color;
}

function getRandInt(limit = 256) {
    const randInt = Math.floor(Math.random() * limit);
    return randInt;
}

function changeColor(newColor) {
    color = newColor;
}

function setDrawingStatus() {
    drawingStatus.textContent = `${activeDrawing ? 'ENABLED' : 'DISABLED'}`;
    drawingStatus.style.color = `${activeDrawing ? 'green' : 'red'}`;
}

function reset() {
    let board = document.querySelector("#board");
    let squares = board.querySelectorAll("div");
    squares.forEach((div) => {div.style.background = "white"});
    activeDrawing = false;
    setDrawingStatus();
}