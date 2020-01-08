var gameCanvas = document.getElementById("canvas"); //drawing object
var c = gameCanvas.getContext("2d");
let height = window.innerHeight; //height in pixels of window
let width = window.innerWidth; //width in pixels of window
gameCanvas.height = height - 20; //sets canvas height in pixels
gameCanvas.width = width - 20; //sets canvas width in pixels
const pi = Math.PI; //pi constant
const dp = Math.PI * 2; //2pi constant
const hp = Math.PI / 2; //pi/2 constant
const qp = Math.PI / 4; //pi/4 constant
let fps = 1; //frames per second
let fpsCounter = 0; //variable used to calculate fps
let developerMode = true; //more controls and variable view
canvas.style.background = "grey"; //background color
//document.body.style.cursor = "none"; //cursor state
var mouse = new Vector(0, 0);
var key = 0;
let colB = true;
let click = false;
var frameStep = false;
const PLAYER = 0;
const GRAPPLE_GUN = 1;
const HOOK = 2;
const ROCK = 3;
const WALL = 4;
var devOpType = 0;
var devOpId = 0;
var mouseX = 0;
var mouseY = 0;

const game = new Game();
window.setInterval(() => {
  fps = fpsCounter * 10;
  fpsCounter = 0;
  colB = true;
}, 100); //FPS COUNTER
game.loop();
