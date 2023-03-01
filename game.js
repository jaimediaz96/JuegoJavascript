const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPosition = [];

window.addEventListener("load", startgame);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = canvasSize / 10;
}

function startgame() {
  setCanvasSize();

  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if(!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  enemyPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if(col == "X") {
        enemyPosition.push({
          x: posX,
          y: posY
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;
  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPosition.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if(enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startgame();
}

function gameWin() {
  console.log("Terminaste el juego");
}

function levelFail(){
  lives--;
  if(lives <= 0) {
    level = 0;
    lives = 3;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startgame();
}

function gameOver() {

}

window.addEventListener("keydown", moveByKeys);
buttonUp.addEventListener("click", moveUp);
buttonLeft.addEventListener("click", moveLeft);
buttonRight.addEventListener("click", moveRight);
buttonDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

function moveUp() {
  if (!(playerPosition.y - elementSize < 0)) {
    playerPosition.y -= elementSize;
    startgame();
  }
}

function moveLeft() {
  if (!(playerPosition.x - elementSize < elementSize)) {
    playerPosition.x -= elementSize;
    startgame();
  }
}

function moveRight() {
  if (!(playerPosition.x + elementSize > canvasSize + elementSize)) {
    playerPosition.x += elementSize;
    startgame();
  }
}

function moveDown() {
  if (!(playerPosition.y + elementSize > canvasSize)) {
    playerPosition.y += elementSize;
    startgame();
  }
}
