const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasSize = 400;
const cellSize = 20;

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [
    {x: 5 * cellSize, y: 5 * cellSize},
    {x: 4 * cellSize, y: 5 * cellSize},
    {x: 3 * cellSize, y: 5 * cellSize}
];

let direction = 'RIGHT';
let food = {x: 10 * cellSize, y: 10 * cellSize};
let score = 0;

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, cellSize, cellSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

function updateSnake() {
    const head = { ...snake[0]};

    switch (direction) {
        case 'UP':
            head.y -= cellSize;
            break;
        case 'DOWN':
            head.y += cellSize;
            break;
        case 'LEFT':
            head.x -= cellSize;
            break;
        case 'RIGHT':
            head.x += cellSize;
            break;
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y) {
       score++;
       placeFood();
    } else {
       snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize;
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
}

function gameLoop() {
    updateSnake();
    draw();
    checkCollision();
}

function checkCollision() {
    const head = snake[0];

    if(head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
       alert('Game Over! Sua pontuação foi '+ score);
       document.location.reload();
    }

    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x === head.x && snake[i].y === head.y) {
           alert('Game Over! Sua pontuação foi '+score);
           document.location.reload(); 
        }
    }
}

// Controle da direção da cobra
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
    }
});

setInterval(gameLoop, 100);

//RECORDE: 46 pontos;