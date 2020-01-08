/*
class Hook
This class extends Polygon and is a player object. It tethers
to the grappleGun of player and shoots to attach to rocks
or other game objects. Special functionality includes sensing a
grappleState and reacting accordingly to the player states.

*/

class Hook extends Polygon {
  constructor(_id, _x, _y, _op) {
    let _pt = [
      new Point(Math.cos(hp + pi) * 0.1, Math.sin(hp + pi) * 0.1),
      new Point(Math.cos(hp) * 0.1, Math.sin(hp) * 0.1),
      new Point((25 / 8) * 0.1, 0)
    ];
    let _color = "green";
    let _filled = true;
    super(_id, _x, _y, _op, _color, _filled, _pt);
    this.const = [1.6, 2];
    this.speed = 10;
    this.cam = this.op.cam;
    this.m = 0.2;
    this.lines = [];
    this.filter = ["GrappleGun", "Player"];
    this.state = "rest";
    this.rLock = true;
    this.aLock = true;
  }

  update() {
    this.speed = Math.abs(this.op.worker[PLAYER].object[0].v.pr) + 10;
    this.op.cam.show(this.state);
    if (click) this.changeState();
    this.render();
    this.ropeRender();
    this.updatePoint();
    if (this.v.pr != 0)
      this.op.cam.testLine(
        new Line(
          this.r.x,
          this.r.y,
          this.r.x + this.v.cx * this.m,
          this.r.y + this.v.cy * this.m
        ),
        "blue",
        0.02
      );
    if (this.f.pr != 0)
      this.op.cam.testLine(
        new Line(
          this.r.x,
          this.r.y,
          this.r.x + this.f.cx * this.m,
          this.r.y + this.f.cy * this.m
        )
      );
    if (this.f.pr > 0.5)
      this.lines.push(
        new Line(
          this.r.x,
          this.r.y,
          this.r.x + this.f.cx * this.m,
          this.r.y + this.f.cy * this.m
        ),
        "green",
        5
      );
    this.lines.forEach(line => {
      this.op.cam.testLine(line, "green", 0.01);
    });
    this.stateUpdate();
  }

  collisionCondition(_obj) {
    if (this.filter.includes(_obj.constructor.name)) return false;
    else {
      if (this.state == "casting") this.state = "struck";
      return true;
    }
  }

  stateUpdate() {
    switch (this.state) {
      case "rest":
        this.r = this.op.worker[GRAPPLE_GUN].object[0].tetherPoint;
        this.a = this.op.worker[GRAPPLE_GUN].object[0].a;
        this.v.c = [0, 0];
        break;
      case "casting":
        this.v.p = [this.speed, this.a];
        break;
      case "struck":
        this.v.c = [0, 0];
        let diff = Physics.dist(this.r, this.op.worker[PLAYER].object[0].r);
        this.op.worker[PLAYER].object[0].f.inc(
          (this.r.x - this.op.worker[PLAYER].object[0].r.x) * 0.01,
          (this.r.y - this.op.worker[PLAYER].object[0].r.y) * 0.01
        );
        if (diff < this.op.worker[PLAYER].object[0].radius * this.const[0]) {
          this.state = "rest";
        }
        break;
      case "returning":
        this.f.c = [0, 0];
        let dif = Physics.dist(
          this.r,
          this.op.worker[GRAPPLE_GUN].object[0].tetherPoint
        ); //dist from end to tether

        this.a = Physics.atan(
          this.r.x - this.op.worker[GRAPPLE_GUN].object[0].tetherPoint.x,
          this.r.y - this.op.worker[1].object[0].tetherPoint.y
        );

        this.v.c = [
          (-(this.r.x - this.op.worker[GRAPPLE_GUN].object[0].tetherPoint.x) *
            this.speed) /
            dif,
          (-(this.r.y - this.op.worker[1].object[0].tetherPoint.y) *
            this.speed) /
            dif
        ];

        if (dif < this.speed / 50) this.state = "rest";
        break;
      default:
    }
  }

  ropeRender() {
    if (this.state != "rest") {
      this.cam.drawLine(
        new Line(this.r, this.op.worker[GRAPPLE_GUN].object[0].tetherPoint),
        "black",
        0.07
      );
    }
  }

  changeState() {
    switch (this.state) {
      case "casting":
        this.state = "returning";
        break;
      case "rest":
        this.state = "casting";
        break;
      case "struck":
        this.state = "returning";
        break;
    }
  }
}
