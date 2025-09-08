// Простой скрипт, чтобы убедиться, что JS работает


document.addEventListener('DOMContentLoaded', () => {
    const statusDisplay = document.getElementById('status');
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""]; // Состояние доски

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const messagePlayerTurn = () => `Ход: ${currentPlayer}`;
    const messageWin = () => `Игрок ${currentPlayer} выиграл!`;
    const messageDraw = () => `Ничья!`;

    statusDisplay.innerHTML = messagePlayerTurn();

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer); // Добавляем класс для стилей X/O
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = messagePlayerTurn();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = messageWin();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = messageDraw();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = messagePlayerTurn();
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('X', 'O'); // Удаляем классы
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);

    const button = document.getElementById('myButton');
    
    button.addEventListener('click', () => {
        alert('JavaScript для Проекта 1 работает!');
    });
});