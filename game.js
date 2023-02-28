const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");

let canvasSize;
let elementSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

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

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);

      if (col == "O" && !playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }

      game.fillText(emoji, posX, posY);
    });

    movePlayer();
  });
}

function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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
