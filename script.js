const puzzle = document.getElementById('puzzle');
const moveCountElem = document.getElementById('move-count');
const timerElem = document.getElementById('timer');
const shuffleButton = document.getElementById('shuffle');
const resetButton = document.getElementById('reset');

let grid = [];
let emptyIndex = 15;
let moves = 0;
let timer;
let seconds = 0;

function initPuzzle() {
    puzzle.innerHTML = '';
    grid = [...Array(16).keys()];
    grid.sort(() => Math.random() - 0.5);
    
    grid.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        if (number === 0) {
            tile.classList.add('empty');
            tile.textContent = '';
        } else {
            tile.textContent = number;
        }
        tile.dataset.index = index;
        tile.addEventListener('click', () => moveTile(index));
        puzzle.appendChild(tile);
    });

    emptyIndex = grid.indexOf(0);
    moves = 0;
    moveCountElem.textContent = moves;
    seconds = 0;
    timerElem.textContent = seconds;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function moveTile(index) {
    const tileIndex = parseInt(index);
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    const tileRow = Math.floor(tileIndex / 4);
    const tileCol = tileIndex % 4;
    
    const isAdjacent = (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
                       (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow);

    if (isAdjacent) {
        [grid[tileIndex], grid[emptyIndex]] = [grid[emptyIndex], grid[tileIndex]];
        emptyIndex = tileIndex;
        moves++;
        moveCountElem.textContent = moves;
        renderPuzzle();
        checkWin();
    }
}

function renderPuzzle() {
    Array.from(puzzle.children).forEach((tile, index) => {
        const number = grid[index];
        if (number === 0) {
            tile.classList.add('empty');
            tile.textContent = '';
        } else {
            tile.classList.remove('empty');
            tile.textContent = number;
        }
    });
}

function checkWin() {
    if (grid.slice(0, 15).every((number, index) => number === index + 1)) {
        clearInterval(timer);
        alert(`You win! Moves: ${moves}, Time: ${seconds} seconds`);
    }
}

function updateTimer() {
    seconds++;
    timerElem.textContent = seconds;
}

shuffleButton.addEventListener('click', initPuzzle);
resetButton.addEventListener('click', () => {
    clearInterval(timer);
    initPuzzle();
});

initPuzzle();
