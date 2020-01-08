document.addEventListener("keydown", event => {
  //gets keyboard values
  let moveConst = 1.5;
  let rotConst = 0.1;

  switch (event.which) {
    case 87: //W
      key = "w";
      game.worker[devOpType].object[devOpId].f.cy =
        game.worker[devOpType].object[devOpId].f.cy +
        moveConst * game.worker[devOpType].object[devOpId].m;
      break;
    case 65: //A
      key = "a";
      game.worker[devOpType].object[devOpId].f.cx =
        game.worker[devOpType].object[devOpId].f.cx -
        moveConst * game.worker[devOpType].object[devOpId].m;
      break;
    case 83: //S
      key = "s";
      game.worker[devOpType].object[devOpId].f.cy =
        game.worker[devOpType].object[devOpId].f.cy -
        moveConst * game.worker[devOpType].object[devOpId].m;
      break;
    case 68: //D
      key = "d";
      game.worker[devOpType].object[devOpId].f.cx =
        game.worker[devOpType].object[devOpId].f.cx +
        moveConst * game.worker[devOpType].object[devOpId].m;
      break;
    case 38: //UP
      key = "up";
      frameStep = !frameStep;
      break;
    case 37: //LEFT
      key = "left";
      game.worker[devOpType].object[devOpId].w +=
        rotConst / game.worker[devOpType].object[devOpId].m;
      break;
    case 40: //DOWN
      key = "down";
      break;
    case 39: //RIGHT
      key = "right";
      game.worker[devOpType].object[devOpId].w -=
        rotConst / game.worker[devOpType].object[devOpId].m;
      break;
    case 32: //SPACE
      key = "space";
      break;
  }
});

document.addEventListener("keyup", event => {
  key = 0;
});

document.addEventListener("mousemove", event => {
  //mouse position
  mouse.cx = event.clientX - width / 2;
  mouse.cy = height / 2 - event.clientY;
  mouseX = event.clientX;
  mouseY = event.clientY;
});

document.addEventListener("click", () => {
  click = true;
});

window.addEventListener("mousewheel", event => {
  game.cam.sC +=
    event.deltaY > 0
      ? Math.sqrt(Math.sqrt(game.cam.sC + 5))
      : -Math.sqrt(Math.sqrt(game.cam.sC + 5));
});
