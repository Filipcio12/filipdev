// Formula that demystifies 3D graphics.
// (x, y, z)
// x' = x / z
// y' = y / z

const canvas = document.getElementById("homeCanvas");
const ctx = canvas.getContext("2d");

const pointSize = 5;

ctx.clearRect(0, 0, canvas.width, canvas.height);

const _3D_to_2D = ({ x, y, z }) => {
  // x = x * 2 / canvas.width;
  // y = y * 2 / canvas.height;
  x = (x * canvas.height) / canvas.width;

  return {
    x: x / z,
    y: y / z,
  };
};

const screen = ({ x, y }) => {
  return {
    x: ((x + 1) / 2) * canvas.width,
    y: (1 - (y + 1) / 2) * canvas.height,
  };
};

const point = ({ x, y }) => {
  ctx.fillRect(x, y, pointSize, pointSize);
};

const drawFaceFrame = (points) => {
  for (const [i, p] of points.entries()) {
    let next = points[(i + 1) % points.length];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
  }
};

// const rotateY = ({ x, y, z }, angle) => {
//   return {
//     x: x * Math.cos(angle) - z * Math.sin(angle),
//     y: y,
//     z: x * Math.sin(angle) + z * Math.cos(angle),
//   };
// };

const rotateY = ({ x, y, z }, angle) => {
  const cx = 0,
    cz = 1.5;
  const dx = x - cx;
  const dz = z - cz;
  return {
    x: dx * Math.cos(angle) - dz * Math.sin(angle) + cx,
    y: y,
    z: dx * Math.sin(angle) + dz * Math.cos(angle) + cz,
  };
};

// point(screen({x: 0, y: 0}));
// Cube
// Start from bottom left corner, counterclockwise
const bottomFace = [
  { x: -0.5, y: -0.5, z: 2 },
  { x: 0.5, y: -0.5, z: 2 },
  { x: 0.5, y: -0.5, z: 1 },
  { x: -0.5, y: -0.5, z: 1 },
];

const topFace = [
  { x: -0.5, y: 0.5, z: 2 },
  { x: 0.5, y: 0.5, z: 2 },
  { x: 0.5, y: 0.5, z: 1 },
  { x: -0.5, y: 0.5, z: 1 },
];

const leftFace = [
  { x: -0.5, y: -0.5, z: 1 },
  { x: -0.5, y: -0.5, z: 2 },
  { x: -0.5, y: 0.5, z: 2 },
  { x: -0.5, y: 0.5, z: 1 },
];

const rightFace = [
  { x: 0.5, y: -0.5, z: 1 },
  { x: 0.5, y: -0.5, z: 2 },
  { x: 0.5, y: 0.5, z: 2 },
  { x: 0.5, y: 0.5, z: 1 },
];

const drawCube = (angle) => {
  drawFaceFrame(
    bottomFace.map((p) => {
      return screen(_3D_to_2D(rotateY(p, angle)));
    }),
  );

  drawFaceFrame(
    topFace.map((p) => {
      return screen(_3D_to_2D(rotateY(p, angle)));
    }),
  );

  drawFaceFrame(
    leftFace.map((p) => {
      return screen(_3D_to_2D(rotateY(p, angle)));
    }),
  );

  drawFaceFrame(
    rightFace.map((p) => {
      return screen(_3D_to_2D(rotateY(p, angle)));
    }),
  );
};

const angleStep = 0.1;
let angle = 0;

let lastUpdateTime = 0;
const updateInterval = 60;

let isAnimating = true;

const toggleAnimation = () => {
  isAnimating = !isAnimating;
};

canvas.addEventListener("click", toggleAnimation);

canvas.width = window.innerWidth < 768 ? 300 : 585;

const update = (timestamp) => {
  if (isAnimating) {
    if (!lastUpdateTime) lastUpdateTime = timestamp;

    if (timestamp - lastUpdateTime >= updateInterval) {
      lastUpdateTime = timestamp;
      angle = (angle + angleStep) % (2 * Math.PI);
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.strokeStyle = "green";
  ctx.lineWidth = 1;
  drawCube(angle);

  requestAnimationFrame(update);
};

requestAnimationFrame(update);
