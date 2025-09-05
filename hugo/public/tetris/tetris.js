import pieceTypes from "./types.js";
import { ITYPE, JTYPE, LTYPE, OTYPE, STYPE, TTYPE, ZTYPE } from "./types.js";

const canvas = document.getElementById("tetris-canvas");
const gameOverText = document.getElementById("tetris-game-over");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

const pieceLandedSound = new Audio("/tetris/piece_landed.wav");
const movePieceSound = new Audio("/tetris/move_piece.wav");
const lineClearSound = new Audio("/tetris/line_clear.wav");
const gameOverSound = new Audio("/tetris/game_over.wav");
const startGameSound = new Audio("/tetris/start_game.wav");

const COLS = 10;
const ROWS = 20;

const SQUARE_WIDTH = canvas.height / ROWS;

const AREA_WIDTH = SQUARE_WIDTH * COLS;
const AREA_X = canvas.width / 2 - AREA_WIDTH;

const EMPTY = 0;
const TAKEN = 1;
let area = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));

// BORDERS
const drawBorders = () => {
  ctx.strokeStyle = "white";

  // ctx.beginPath();
  // ctx.moveTo(canvas.width / 2 - AREA_WIDTH / 2, 0);
  // ctx.lineTo(canvas.width / 2 - AREA_WIDTH / 2, canvas.height);
  // ctx.stroke();

  let x = AREA_X;
  for (let i = 0; i <= COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();

    x += SQUARE_WIDTH;
  }

  let y = 0;
  for (let i = 0; i <= ROWS; i++) {
    ctx.beginPath();
    ctx.moveTo(AREA_X, y);
    ctx.lineTo(AREA_X + AREA_WIDTH, y);
    ctx.stroke();

    y += SQUARE_WIDTH;
  }

  // ctx.beginPath();
  // ctx.moveTo(canvas.width / 2 + AREA_WIDTH / 2, 0);
  // ctx.lineTo(canvas.width / 2 + AREA_WIDTH / 2, canvas.height);
  // ctx.stroke();
};

const drawBoard = () => {
  const point = {
    x: AREA_X,
    y: 0,
  };

  area.forEach((row) => {
    row.forEach((element) => {
      if (element !== EMPTY) {
        ctx.fillStyle = element;
        ctx.fillRect(point.x, point.y, SQUARE_WIDTH, SQUARE_WIDTH);
      }
      point.x += SQUARE_WIDTH;
    });
    point.x = AREA_X;
    point.y += SQUARE_WIDTH;
  });
};

class Piece {
  constructor(typePtr) {
    this.type = pieceTypes[typePtr];
    this.rotationPtr = 0;

    switch (typePtr) {
      case ITYPE:
        this.center = {
          x: AREA_X + AREA_WIDTH / 2,
          y: SQUARE_WIDTH * 2,
        };
        break;
      default:
        this.center = {
          x: AREA_X + AREA_WIDTH / 2 - SQUARE_WIDTH / 2,
          y: (SQUARE_WIDTH * 3) / 2,
        };
    }
  }

  draw() {
    const rotations = this.type.rotations;
    const rotationPtr = this.rotationPtr;
    const rotation = rotations[rotationPtr];

    const color = this.type.color;
    ctx.fillStyle = color;

    const center = this.center;

    const rotation_length = rotation.length * SQUARE_WIDTH;
    const point = {
      x: center.x - rotation_length / 2,
      y: center.y - rotation_length / 2,
    };

    ctx.beginPath();
    rotation.forEach((row) => {
      row.forEach((element) => {
        if (element === TAKEN) {
          ctx.fillRect(point.x, point.y, SQUARE_WIDTH, SQUARE_WIDTH);
        }
        point.x += SQUARE_WIDTH;
      });
      point.x = center.x - rotation_length / 2;
      point.y += SQUARE_WIDTH;
    });
  }

  intersects() {
    const center = this.center;
    const rotationPtr = this.rotationPtr;
    const rotation = this.type.rotations[rotationPtr];
    const rotation_length = rotation.length * SQUARE_WIDTH;

    const point = {
      x: center.x - rotation_length / 2,
      y: center.y - rotation_length / 2,
    };

    for (let i = 0; i < rotation.length; i++) {
      for (let j = 0; j < rotation.length; j++) {
        const element = rotation[i][j];
        if (element === TAKEN) {
          const rowPtr = point.y / SQUARE_WIDTH;
          const colPtr = (point.x - AREA_X) / SQUARE_WIDTH;

          if (rowPtr >= ROWS || rowPtr < 0 || colPtr >= COLS || colPtr < 0) {
            return true;
          }

          try {
            const space = area[rowPtr][colPtr];
            if (space !== EMPTY) {
              return true;
            }
          } catch (error) {
            return true;
          }
        }
        point.x += SQUARE_WIDTH;
      }
      point.x = center.x - rotation_length / 2;
      point.y += SQUARE_WIDTH;
    }

    return false;
  }

  place() {
    pieceLandedSound.play();

    const color = this.type.color;
    const center = this.center;
    const rotationPtr = this.rotationPtr;
    const rotation = this.type.rotations[rotationPtr];
    const rotation_length = rotation.length * SQUARE_WIDTH;

    const point = {
      x: center.x - rotation_length / 2,
      y: center.y - rotation_length / 2,
    };

    rotation.forEach((row) => {
      row.forEach((element) => {
        if (element === TAKEN) {
          const rowPtr = point.y / SQUARE_WIDTH;
          const colPtr = (point.x - AREA_X) / SQUARE_WIDTH;
          area[rowPtr][colPtr] = color;
        }
        point.x += SQUARE_WIDTH;
      });
      point.x = center.x - rotation_length / 2;
      point.y += SQUARE_WIDTH;
    });
  }

  moveLeft() {
    this.center.x -= SQUARE_WIDTH;
    if (this.intersects()) {
      this.center.x += SQUARE_WIDTH;
      return;
    }
    movePieceSound.play();
  }

  moveRight() {
    this.center.x += SQUARE_WIDTH;
    if (this.intersects()) {
      this.center.x -= SQUARE_WIDTH;
      return;
    }
    movePieceSound.play();
  }

  rotate() {
    const rotationsNum = this.type.rotations.length;
    this.rotationPtr = (this.rotationPtr + 1) % rotationsNum;
    if (this.intersects()) {
      this.rotationPtr = (this.rotationPtr + rotationsNum - 1) % rotationsNum;
      return;
    }
    movePieceSound.play();
  }

  drop() {
    while (!this.intersects()) {
      this.center.y += SQUARE_WIDTH;
    }
    this.center.y -= SQUARE_WIDTH;
    this.place();
    checkRows();
    const piece = new Piece(pieceQ.shift());
    this.type = piece.type;
    this.center = piece.center;
    this.rotationPtr = piece.rotationPtr;
    pieceQ.push(Math.floor(Math.random() * pieceTypes.length));
  }

  drawShadow() {
    const originalCenter = {
      x: this.center.x,
      y: this.center.y,
    };
    while (!this.intersects()) {
      this.center.y += SQUARE_WIDTH;
    }
    this.center.y -= SQUARE_WIDTH;

    // Draw
    const color = this.type.color;
    const center = this.center;
    const rotationPtr = this.rotationPtr;
    const rotation = this.type.rotations[rotationPtr];
    const rotation_length = rotation.length * SQUARE_WIDTH;

    const point = {
      x: center.x - rotation_length / 2,
      y: center.y - rotation_length / 2,
    };

    rotation.forEach((row) => {
      row.forEach((element) => {
        if (element === TAKEN) {
          ctx.strokeStyle = color;
          ctx.strokeRect(point.x, point.y, SQUARE_WIDTH, SQUARE_WIDTH);
        }
        point.x += SQUARE_WIDTH;
      });
      point.x = center.x - rotation_length / 2;
      point.y += SQUARE_WIDTH;
    });

    this.center.x = originalCenter.x;
    this.center.y = originalCenter.y;
  }
}

const clearRow = (rowPtr) => {
  lineClearSound.currentTime = 0.7;
  lineClearSound.play();

  const row = area[rowPtr];
  row.forEach((element) => {
    element = EMPTY;
  });
  for (let i = rowPtr; i > 0; i--) {
    for (let j = 0; j < COLS; j++) {
      area[i][j] = area[i - 1][j];
    }
  }
};

const checkRows = () => {
  let rowsCleared = 0;
  area.forEach((row, rowPtr) => {
    let isRowFull = true;
    row.forEach((element) => {
      if (element === EMPTY) {
        isRowFull = false;
        return;
      }
    });
    if (isRowFull) {
      clearRow(rowPtr);
      rowsCleared++;
    }
  });
  score += scoreTable[rowsCleared];
};

const isGameOver = () => {
  let res = false;
  const row = area[0];
  row.forEach((element) => {
    if (element !== EMPTY) {
      res = true;
      return;
    }
  });
  return res;
};

const drawPreview = (pieceQ) => {
  const x = AREA_X + (AREA_WIDTH * 3) / 2 - SQUARE_WIDTH * 2;
  let y = (SQUARE_WIDTH * 3) / 2;
  ctx.fillStyle = "white";
  ctx.fillText("NEXT", x, y);
  y += SQUARE_WIDTH * 2;
  pieceQ.forEach((type) => {
    const preview = new Piece(type);
    preview.center = {
      x: AREA_X + (AREA_WIDTH * 3) / 2,
      y: y,
    };
    y += preview.type.rotations[0].length * SQUARE_WIDTH;
    preview.draw();
  });
  y = (SQUARE_WIDTH * 3) / 2 + SQUARE_WIDTH * 12;
  ctx.fillStyle = "white";
  ctx.fillText("SCORE", x, y);
  y += SQUARE_WIDTH;
  ctx.fillText(score, x, y);
};

let lastUpdateTime = 0;
const updateInterval = 500;

const update = (timestamp) => {
  if (!lastUpdateTime) lastUpdateTime = timestamp;

  if (timestamp - lastUpdateTime >= updateInterval) {
    lastUpdateTime = timestamp;
    piece.center.y += SQUARE_WIDTH;

    if (piece.intersects()) {
      piece.center.y -= SQUARE_WIDTH;
      piece.place();
      checkRows();
      piece = new Piece(pieceQ.shift());
      pieceQ.push(Math.floor(Math.random() * pieceTypes.length));
    }

    if (isGameOver()) {
      gameOverSound.play();

      gameOverText.innerText = `Game over!\nYour score was: ${score}`;
      gameOverText.style.display = "block";
      startButton.innerText = "Play again?";
      startButton.style.display = "block";
      canvas.style.display = "none";
      return;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBorders();
  drawBoard();
  piece.draw();
  piece.drawShadow();
  drawPreview(pieceQ);

  requestAnimationFrame(update);
};

let score = 0;
const scoreTable = [0, 40, 100, 300, 1200];

const pieceQ = Array.from({ length: 3 }, () =>
  Math.floor(Math.random() * pieceTypes.length),
);
let piece = new Piece(pieceQ.shift());

pieceQ.push(Math.floor(Math.random() * pieceTypes.length));

const startButton = document.getElementById("tetris-start-button");
startButton.addEventListener("click", () => {
  startGameSound.currentTime = 0.2;
  startGameSound.play();

  area = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
  score = 0;
  piece = new Piece(pieceQ.shift());
  pieceQ.push(Math.floor(Math.random() * pieceTypes.length));

  gameOverText.style.display = "none";
  startButton.style.display = "none";
  canvas.style.display = "block";
  requestAnimationFrame(update);
});

// setInterval(update, 500);
// requestAnimationFrame(update);

window.addEventListener("keydown", (event) => {
  event.preventDefault();

  switch (event.key) {
    case "ArrowLeft":
      piece.moveLeft();
      break;
    case "ArrowRight":
      piece.moveRight();
      break;
    case "ArrowUp":
      piece.rotate();
      break;
    case " ":
      piece.drop();
      break;
  }
});

// Mobile input
let startX, startY;

window.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

window.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false },
);

window.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // Swipe right
      piece.moveRight();
    } else {
      // Swipe left
      piece.moveLeft();
    }
  } else {
    if (deltaY > 0) {
      // Swipe down
      piece.drop();
    } else {
      // Swipe up
      piece.rotate();
    }
  }
});
