
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.msg');

let currentPlayer = 'X';
let isGameActive = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    message.textContent = `${currentPlayer}'s turn`
    isGameActive = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if(gameBoard[cellIndex] != "" || !isGameActive){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
}

function changeO(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    message.textContent =  `${currentPlayer}'s turn`
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){
        const condition = winningConditions[i]
        const cellA = gameBoard[condition[0]]
        const cellB = gameBoard[condition[1]]
        const cellC = gameBoard[condition[2]]

        if(cellA == "" || cellB == "" || cellC ==""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break
        }
    }

    if(roundWon){
        message.textContent = `${currentPlayer} wins`
        isGameActive = false
    }else if(!gameBoard.includes("")){
        message.textContent = "It's a draw!";
        isGameActive = false
    }else{
        changeO();
    }
}
