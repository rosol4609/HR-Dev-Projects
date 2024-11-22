const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let score = 0;
let lives = 3;
const playerY = canvasHeight - 30;
const playerX = canvasWidth / 2;
const playerWidth = 60;
const playerHeight = 20;
let playerSpeed = 5;
let currentPlayerSpeed = playerSpeed;
const maxPlayerSpeed = 10;

let player = {
  x: playerX,
  y: playerY,
  width: playerWidth,
  height: playerHeight,
};

let ball = {
  x: canvasWidth / 2,
  y: canvasHeight - 40,
  radius: 10,
  speed: 5,
  dx: 4,
  dy: -4,
};

let obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 20;
const obstacleSpeed = 2;

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.roundRect(player.x, player.y, player.width, player.height, 5);
  ctx.fill();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.roundRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 5);
    ctx.fill();
  });
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Lives: " + lives, canvasWidth - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawPlayer();
  drawBall();
  drawObstacles();
  drawScore();
  drawLives();
}

function movePlayer() {
  if (rightPressed && player.x < canvasWidth - player.width) {
    if (currentPlayerSpeed < maxPlayerSpeed) {
      currentPlayerSpeed += 0.1;
    }
    player.x += currentPlayerSpeed;
  } else if (leftPressed && player.x > 0) {
    if (currentPlayerSpeed < maxPlayerSpeed) {
      currentPlayerSpeed += 0.1;
    }
    player.x -= currentPlayerSpeed;
  } else {
    currentPlayerSpeed = playerSpeed;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (Math.abs(ball.dx) < 0.5) ball.dx = ball.dx > 0 ? 0.5 : -0.5;
  if (Math.abs(ball.dy) < 0.5) ball.dy = ball.dy > 0 ? 0.5 : -0.5;
}

function moveObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.y += obstacleSpeed;
  });
}

function collisionDetection() {
  if (
    ball.x > player.x &&
    ball.x < player.x + player.width &&
    ball.y + ball.radius > player.y &&
    ball.y - ball.radius < player.y + player.height
  ) {
    if (ball.dy > 0) {
      ball.dy = -ball.dy;
    }
    ball.dy *= 1.01;
    ball.dx *= 1.01;
  }
}

function collisionDetectionObstacles() {
  obstacles.forEach((obstacle, index) => {
    if (
      ball.x > obstacle.x &&
      ball.x < obstacle.x + obstacle.width &&
      ball.y + ball.radius > obstacle.y &&
      ball.y - ball.radius < obstacle.y + obstacle.height
    ) {
      obstacles.splice(index, 1);
      ball.dy = -ball.dy;
      score++;
      ball.dy *= 1.01;
      ball.dx *= 1.01;
    }
  });
}

function collisionDetectionCanvas() {
  if (ball.x + ball.radius > canvasWidth || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
  if (ball.y + ball.radius > canvasHeight) {
    lives--;
    if (!lives) {
      alert("GAME OVER\nYour score: " + score);
      document.location.reload();
    } else {
      ball.x = player.x + player.width / 2;
      ball.y = player.y - ball.radius - 5;
      ball.dx = 4;
      ball.dy = -4;
    }
  }
}

function collisionDetectionObstaclesCanvas() {
  obstacles.forEach((obstacle, index) => {
    if (obstacle.y + obstacle.height > canvasHeight) {
      obstacles.splice(index, 1);
    }
  });
}

function generateObstacles() {
  if (Math.random() < 0.01) {
    const x = Math.random() * (canvasWidth - obstacleWidth);
    const y = 0;
    obstacles.push({ x, y, width: obstacleWidth, height: obstacleHeight });
  }
}

function move() {
  movePlayer();
  moveBall();
  moveObstacles();
  collisionDetection();
  collisionDetectionObstacles();
  collisionDetectionCanvas();
  collisionDetectionObstaclesCanvas();
  generateObstacles();
}

function update() {
  draw();
  move();
  requestAnimationFrame(update);
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

update();




