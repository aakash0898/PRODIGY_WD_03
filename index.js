const playerTypeSelect = document.getElementById("playerType");
const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");
const playerScoreDisplay = document.getElementById("playerScore");
const aiScoreDisplay = document.getElementById("aiScore");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let aiPlayer = "O";
let playerScore = 0;
let aiScore = 0;

function startGame() {
  const playerType = playerTypeSelect.value;
  if (playerType === "ai") {
    aiPlayer = currentPlayer === "X" ? "O" : "X";
  }

  gameActive = true;
  message.innerText = `${currentPlayer}'s turn`;
  createGameBoard();
}

function handleClick(cellIndex) {
  if (!gameActive || gameState[cellIndex] !== "") return;

  gameState[cellIndex] = currentPlayer;
  gameBoard.children[cellIndex].innerText = currentPlayer;

  if (checkWin(currentPlayer)) {
    message.innerText = `${currentPlayer} wins!`;
    updateScore(currentPlayer);
    if (playerScore === 3 || aiScore === 3) {
      handleGameEnd();
      return;
    } else {
      resetBoard();
    }
    return;
  }

  if (!gameState.includes("")) {
    message.innerText = "It's a draw!";
    resetBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.innerText = `${currentPlayer}'s turn`;

  if (aiPlayer === currentPlayer && playerTypeSelect.value === "ai") {
    makeAiMove();
  }
}

function createGameBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    gameBoard.appendChild(cell);
  }
}

function checkWin(player) {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  return winningConditions.some((combination) => {
    return combination.every((index) => {
      return gameState[index] === player;
    });
  });
}

function makeAiMove() {
  const emptyCells = gameState.reduce(
    (acc, val, idx) => (val === "" ? acc.concat(idx) : acc),
    []
  );
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const aiMove = emptyCells[randomIndex];

  gameState[aiMove] = aiPlayer;
  gameBoard.children[aiMove].innerText = aiPlayer;

  if (checkWin(aiPlayer)) {
    message.innerText = `${aiPlayer} wins!`;
    updateScore(aiPlayer);
    if (playerScore === 3 || aiScore === 3) {
      handleGameEnd();
      return;
    } else {
      resetBoard();
    }
    return;
  }

  if (!gameState.includes("")) {
    message.innerText = "It's a draw!";
    resetBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.innerText = `${currentPlayer}'s turn`;
}

function resetBoard() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
}

function updateBoard() {
  gameBoard.querySelectorAll(".cell").forEach((cell, index) => {
    cell.innerText = gameState[index];
  });
}

function updateScore(winner) {
  if (winner === "X") {
    playerScore++;
    playerScoreDisplay.innerText = `Player Score: ${playerScore}`;
  } else if (winner === "O") {
    aiScore++;
    aiScoreDisplay.innerText = `AI Score: ${aiScore}`;
  }
}

function handleGameEnd() {
  if (playerScore === 3) {
    message.innerText = "Congratulations! Player wins the match!";
  } else if (aiScore === 3) {
    message.innerText = "AI wins the match!";
  }
  playerScore = 0;
  aiScore = 0;
  playerScoreDisplay.innerText = `Player Score: ${playerScore}`;
  aiScoreDisplay.innerText = `AI Score: ${aiScore}`;
  gameActive = false;
  resetBoard();
}

function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  playerScore = 0;
  aiScore = 0;
  playerScoreDisplay.innerText = `Player Score: ${playerScore}`;
  aiScoreDisplay.innerText = `AI Score: ${aiScore}`;
  gameActive = false;
  resetBoard();
}