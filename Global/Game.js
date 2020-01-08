class Game {
  constructor() {
    this.cam = new Camera(0, 0, 50);
    let initRocks = [];
    let initPlayers = [];
    for (let i = 0; i < 2; i++) initRocks.push(new Rock(i, (Math.random() - 0.5) * width / this.cam.sC, (Math.random() - 0.5) * width / this.cam.sC, this));
    for (let i = 0; i < 2; i++) {
      initPlayers.push(new Player(i, 0, i * 22, this));
    }
    let walls = [
      new Wall(0, [new Point(-10, -10), new Point(-20, -10), new Point(-20, 200), new Point(-10, 200)], this),
      new Wall(1, [new Point(-11, -11), new Point(-11, -21), new Point(200, -21), new Point(200, -11)], this),
    ];
    this.worker = [
      new Work(initPlayers, 0, this),
      new Work([new GrappleGun(0, 5, 0, this)], 1, this),
      new Work([new Hook(0, 7, 0, this)], 2, this),
      new Work(initRocks, 3, this),
      new Work(walls, 4, this)
    ];
    this.worker[3].object[0].r.a = [5, 5];
    //this.worker[0].object[0].radius = 2;
  }

  mouseVector() { //Draws Mouse Vector
    c.lineWidth = 10;
    c.strokeStyle = "red";
    c.beginPath();
    c.moveTo(Math.sin(mouse.pa - (qp / 6) + hp % dp) * (mouse.pr - 10) + width / 2, Math.cos(mouse.pa - (qp / 6) + hp % dp) * (mouse.pr - 10) + height / 2);
    c.lineTo(Math.sin(mouse.pa + hp % dp) * mouse.pr + width / 2, Math.cos(mouse.pa + hp % dp) * mouse.pr + height / 2);
    c.lineTo(Math.sin(mouse.pa + (qp / 6) + hp % dp) * (mouse.pr - 10) + width / 2, Math.cos(mouse.pa + (qp / 6) + hp % dp) * (mouse.pr - 10) + height / 2);
    c.stroke();
  }


  prep() { //non game related rendering
    c.fillText(fps, width - width / 20, height / 20);
    //this.mouseVector();
    fpsCounter++;
    this.cam.show("Mouse a = " + Math.round(mouse.pa * (180 / pi)) + ", r = " + Math.round(mouse.pr / this.cam.sC));
  }

  loop() { //runs main loop
    window.requestAnimationFrame(() => this.loop());
    c.clearRect(0, 0, width, height);
    this.prep();
    this.worker.forEach((wkr) => { wkr.update(); });
    this.cam.targetR.p = this.worker[devOpType].object[devOpId].r;
    this.cam.renderInfo();
    click = false;
    //for(let i = 0; i < 1000000; i++) c.fillRect(50,50,50,50);
    this.cam.update();
  }


}
