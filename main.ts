// Set up canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let paddleX = (canvas.width - 75) / 2;
const paddleHeight = 10;
const paddleWidth = 75;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

// Set up brick variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Set up key listeners for paddle movement
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 39) { // right arrow
        rightPressed = true;
    } else if (event.keyCode === 37) { // left arrow
        leftPressed = true;
    }
});
document.addEventListener('keyup', function (event) {
    if (event.keyCode === 39) { // right arrow
        rightPressed = false;
    } else if (event.keyCode === 37) { // left arrow
        leftPressed = false;
    }
});

// Set up collision detection function
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert('You win!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Set up draw functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brick 