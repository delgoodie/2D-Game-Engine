/*
Rock
This class extends Polygon and will be instanciated several times as a non-player game object
to provide as a map element. It will undergo all physics and has a worker. It will not be
angle locked for physics motion and have a relatively high mass. Special features of this
class include the random polygon points which are generated and passed to the Polygon constructor
to create successful rendering from the center of mass which is assumed by point r.

Constructor requires an x and y coordinate as while as an operator which is game in this case.
The operater will only work with a Game instance or another object with similar methods and
properties.
*/

class Rock extends Polygon {
  //Rocks in game
  constructor(_id, _x, _y, _op) {
    let _pt = [];
    let sides = 3;
    let _color = "black";
    let _filled = true;
    for (let i = 0; i < sides; i++) {
      let randA = Math.random() * (dp / sides) + (dp / sides) * i;
      _pt.push(new Point(Math.cos(randA) * 3, Math.sin(randA) * 3));
    }
    super(_id, _x, _y, _op, _color, _filled, _pt);
    this.m = pi;
    this.clickState = "null";
    this.firstPoint;
    this.secondPoint;
    this.Ec = 1.5;
    this.filter = [GRAPPLE_GUN, HOOK];
    // this.rLock = true;
    // this.aLock = true;
  }

  addV() {
    if (click) {
      switch (this.clickState) {
        case "null":
          this.firstPt = new Point(
            this.op.cam.r.x + mouse.cx / this.op.cam.sC,
            this.op.cam.r.y + mouse.cy / this.op.cam.sC
          );
          this.clickState = "adding";
          break;
        case "adding":
          this.secondPt = new Point(
            this.op.cam.r.x + mouse.cx / this.op.cam.sC,
            this.op.cam.r.y + mouse.cy / this.op.cam.sC
          );
          this.clickState = "added";
          break;
        case "added":
          Physics.putF(
            this,
            new Vector(
              (this.secondPt.x - this.firstPt.x) * 10,
              (this.secondPt.y - this.firstPt.y) * 10
            ),
            this.firstPt
          );
          this.clickState = "null";
          this.firstPt = null;
          this.secondPt = null;
      }
    }
  }

  update() {
    //this.addV();
    this.updatePoint();
    this.render();
    this.showPtVelocity();

    if (this.firstPt != null && this.secondPt == null) {
      let ml = new Line(
        this.firstPt,
        new Point(
          this.op.cam.r.x + mouse.cx / this.op.cam.sC,
          this.op.cam.r.y + mouse.cy / this.op.cam.sC
        )
      );
      this.op.cam.testLine(ml, "blue", 0.04);
    } else if (this.firstPt != null && this.secondPt != null) {
      this.op.cam.testLine(new Line(this.firstPt, this.secondPt), "blue", 0.04);
    }
    this.drawNf();
  }
}
