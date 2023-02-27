const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementSize;

window.addEventListener("load", startgame);
window.addEventListener("resize", setCanvasSize);

function startgame() {
  setCanvasSize();

  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
        game.fillText(emojis[mapRowCols[row-1][col-1]], elementSize * col, elementSize * row);
    }
  }
}

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
