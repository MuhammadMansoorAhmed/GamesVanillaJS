document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let doodlerLeftSpace = 50;
  let score = 0;
  let doodlerBottomSpace = 150;
  let gravity = 0.9;
  let speed = 3;
  let isJumping = true;
  let isGoingLeft = false;
  let idGoingRight = false;
  let leftTimerID;
  let rightTimerID;
  let upTimerID;
  let downTimerID;

  //platform class
  class Platform {
    constructor(newPlatBottom) {
      this.left = Math.random() * 310;
      this.bottom = newPlatBottom;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;
      grid.appendChild(visual);
    }
  }
  //function to add platforms
  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platformGap;
      let newPlatForm = new Platform(newPlatBottom);
      platforms.push(newPlatForm);
      // console.log(platforms);
    }
  }

  function movePlatforms() {
    // console.log(doodlerBottomSpace);
    if (doodlerBottomSpace < 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = `${platform.bottom}px`;

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          score++;
          let newPlatForm = new Platform(600);
          platforms.push(newPlatForm);
        }
      });
    }
  }

  // adding doodler
  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
    // console.log(doodlerBottomSpace);
  }

  function fallDoodler() {
    isJumping = false;
    clearTimeout(upTimerID);
    downTimerID = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace <= 0) {
        clearTimeout(downTimerID);
      }
    });
  }

  //GameOver
  function gameOver() {}

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
    }
  }
  start();
  setInterval(movePlatforms, 30);
});
