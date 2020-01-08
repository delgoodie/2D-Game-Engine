/*
class Obj
This class is the highest tier game object class.
All game objects extend it and it gives them
operator: Game op
color: String color
position: Point r
velocity: Vector v
force: Vector f
angle: number a
angular velocity: number w
torque: number t
mass: number m
elastic coefficient: number Ec
type: string type
It then creates an update function that calls an
empty render function.

*/

class Obj {
  constructor(_id, _x, _y, _op, _color, _filled) {
    this.id = _id;
    this.op = _op;
    this.color = _color;
    this.filled = _filled;
    this.r = new Point(_x, _y);
    this.v = new Vector(0, 0);
    this.f = new Vector(0, 0);
    this.a = 0;
    this.w = 0;
    this.t = 0;
    this.m = 1;
    this.Ec = 1;
    this.type = "obj";
    this.aLock = false;
    this.rLock = false;
    this.collisions = [];
    this.altered = true;
    this.filter = [];
    this.lines = [];
  }

  devLines() {
    if (this.v.pr != 0)
      this.op.cam.testLine(
        new Line(
          this.r.x,
          this.r.y,
          this.r.x + this.v.cx * this.m,
          this.r.y + this.v.cy * this.m
        ),
        "blue",
        0.04
      );
    if (this.f.pr != 0)
      this.op.cam.testLine(
        new Line(
          this.r.x,
          this.r.y,
          this.r.x + this.f.cx * this.m,
          this.r.y + this.f.cy * this.m
        ),
        "red",
        0.06
      );
    if (this.f.pr > 0.5)
      this.lines.push(
        new Line(
          this.r.x,
          this.r.y,
          this.r.x + this.f.cx * this.m,
          this.r.y + this.f.cy * this.m
        )
      );
    this.lines.forEach(line => {
      this.op.cam.testLine(line, "red", 0.06);
    });
  }

  update() {
    this.render();
  }
  render() {}
  collisionCondition(_obj) {
    if (this.filter.includes(_obj.constructor.name)) {
      //alert(this.constructor.name + "  " + _obj.constructor.name);
      return false;
    } else return true;
  }
}
