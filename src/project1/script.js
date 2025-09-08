// Простой скрипт, чтобы убедиться, что JS работает

$(document).ready(function() {
    // Настройки для наших регуляторов
    const knobSettings = {
        radius: 60,
        width: 16,
        handleSize: "+8",
        sliderType: "min-range",
        handleShape: "round",
        min: 1,
        max: 100
    };

    // Получаем доступ к холсту (canvas)
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Переменные для параметров волны
    let frequency = 20;
    let amplitude = 50;
    let complexity = 50;

    // --- Функция для рисования волны ---
    function drawWave() {
        // Очищаем холст перед каждым новым кадром
        ctx.clearRect(0, 0, width, height);

        // Начинаем рисовать
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00bcd4';

        const centerY = height / 2;
        
        // Проходим по всей ширине холста
        for (let x = 0; x < width; x++) {
            // Основная синусоида, управляемая Частотой и Амплитудой
            const mainWave = Math.sin(x * (frequency / 1000)) * (amplitude / 2);
            // Дополнительная волна для "Сложности"
            const complexWave = Math.sin(x * (complexity / 500)) * (amplitude / 4);

            const y = centerY + mainWave + complexWave;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        // Отображаем нарисованную линию
        ctx.stroke();
    }

    // --- Инициализация регуляторов ---
    $("#knob-frequency").roundSlider({
        ...knobSettings,
        value: frequency,
        drag: function (args) {
            frequency = args.value;
            drawWave(); // Перерисовываем волну при изменении
        }
    });

    $("#knob-amplitude").roundSlider({
        ...knobSettings,
        value: amplitude,
        drag: function (args) {
            amplitude = args.value;
            drawWave();
        }
    });

    $("#knob-complexity").roundSlider({
        ...knobSettings,
        value: complexity,
        drag: function (args) {
            complexity = args.value;
            drawWave();
        }
    });

    // Рисуем волну в первый раз при загрузке страницы
    drawWave();
});
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