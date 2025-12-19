const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const TILE = 32;
const WORLD_WIDTH = 25;
const WORLD_HEIGHT = 18;

let player = {
  x: 5,
  y: 5,
  hp: 100
};

let monsters = [];

let world = Array.from({ length: WORLD_HEIGHT }, () =>
  Array.from({ length: WORLD_WIDTH }, () => "grass")
);

function spawnMonster() {
  monsters.push({
    x: Math.floor(Math.random() * WORLD_WIDTH),
    y: 0,
    hp: 20
  });
}

function update() {
  monsters.forEach(m => {
    if (m.x < player.x) m.x++;
    if (m.x > player.x) m.x--;
    if (m.y < player.y) m.y++;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // world
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      ctx.fillStyle = world[y][x] === "grass" ? "#3a5" : "#777";
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    }
  }

  // player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x * TILE, player.y * TILE, TILE, TILE);

  // monsters
  ctx.fillStyle = "red";
  monsters.forEach(m =>
    ctx.fillRect(m.x * TILE, m.y * TILE, TILE, TILE)
  );
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

setInterval(spawnMonster, 3000);
loop();
