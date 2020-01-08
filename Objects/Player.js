/*
class Player
This class extends Circle and is the player object of game. It calls the
super to create a circle object with special property radius. Super calls
its super to give Player a position and Physics variables. Its special
features include a getAccessPt1 function which returns the coords of
where the grappleGun should be on the player. It will also handle the
state of the player in the game, being the main player object.
*/

class Player extends Circle {
  //my Player
  constructor(_id, _x, _y, _op) {
    let _color = "orange";
    let _filled = true;
    let _radius = 0.5;
    super(_id, _x, _y, _op, _color, _filled, _radius);
    this.accPtConst = [1.5];
    this.aLock = true;
    this.m = 2;
    this.firstPt;
    this.secondPt;
    this.clickState = "null";
    this.lines = [];
    this.Ec = 0.5;
    this.filter = ["GrappleGun", "Hook"];
  }

  update() {
    this.a = mouse.pa;
    this.render();
    if (this.firstPt != null && this.secondPt == null) {
      let ml = new Line(
        this.firstPt,
        new Point(
          this.op.cam.r.x + mouse.cx / this.op.cam.sC,
          this.op.cam.r.y + mouse.cy / this.op.cam.sC
        )
      );
      this.op.cam.testLine(ml, "blue", 0.03);
    } else if (this.firstPt != null && this.secondPt != null) {
      this.op.cam.testLine(new Line(this.firstPt, this.secondPt), "blue", 0.04);
    }
  }

  get grappleGunPoint() {
    return new Point(
      this.r.x + Math.cos(this.a + hp) * this.radius * this.accPtConst[0],
      this.r.y + Math.sin(this.a + hp) * this.radius * this.accPtConst[0]
    );
  }
}
