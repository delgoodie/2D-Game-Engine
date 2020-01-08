/*
class Polygon
This class is never instanciated on its own, but acts as a template class for
game objects which are polygons. It extends the Obj class which gives in
the constructor passing all arguments but the specialized argument _pt.
The _pt argument must be an array of Point objects and sets r to center of
mass of the polygon. Then it creates a ptOffset array to allign with the pt
array. Each element contains a vector that points from the r coordinate to
the corresponding index in the pt array, thus allowing the object to be
rendered by passing the angle and position of the center of mass. This
is required because the object will rotate around its center of mass and
rendering from any other point will cause a difference in simulation
and rendering.
*/

class Polygon extends Obj {
  constructor(_id, _x, _y, _op, _color, _filled, _pt) {
    super(_id, _x, _y, _op, _color, _filled);
    this.pt = _pt;
    this.type = "polygon";
    this.ptOffset = new Array(this.pt.length);
    this.r.p = Physics.avg2D(this.pt);
    this.pt.forEach((pt, ptIndex) => {
      this.ptOffset[ptIndex] = new Vector(pt.x - this.r.x, pt.y - this.r.y);
    });
    this.r.a = [_x, _y];
  }

  update() {
    this.updatePoint();
    this.render();
  }

  updatePoint() {
    this.pt.forEach((pt, ptIndex) => {
      pt.a = [
        this.r.x +
          Math.cos(this.ptOffset[ptIndex].pa + this.a) *
            this.ptOffset[ptIndex].pr,
        this.r.y +
          Math.sin(this.ptOffset[ptIndex].pa + this.a) *
            this.ptOffset[ptIndex].pr
      ];
    });
    this.render();
    this.mouseSide();
    this.showPtVelocity();
  }
  drawNf() {
    this.pt.forEach((pt, ptIndex, ptArray) => {
      let side = new Line(pt, ptArray[(ptIndex + 1) % ptArray.length]);
      if (side.m * this.r.x + side.b > this.r.y) {
        let nLine = new Line(
          (side.x1 + side.x2) / 2,
          (side.y1 + side.y2) / 2,
          (side.x1 + side.x2) / 2 +
            Math.cos(side.toVector().pa + hp) * (this.m / this.op.cam.sC),
          (side.y1 + side.y2) / 2 +
            Math.sin(side.toVector().pa + hp) * (this.m / this.op.cam.sC)
        );
        this.op.cam.testLine(nLine, "green", 0.04);
      } else {
        let nLine = new Line(
          (side.x1 + side.x2) / 2,
          (side.y1 + side.y2) / 2,
          (side.x1 + side.x2) / 2 +
            Math.cos(side.toVector().pa + pi + hp) * (this.m / this.op.cam.sC),
          (side.y1 + side.y2) / 2 +
            Math.sin(side.toVector().pa + pi + hp) * (this.m / this.op.cam.sC)
        );
        this.op.cam.testLine(nLine, "green", 0.04);
      }
    });
  }

  showPtVelocity() {
    this.pt.forEach(pt => {
      let ptVel = new Line(
        pt,
        new Point(
          pt.x + Physics.getV(this, pt).cx,
          pt.y + Physics.getV(this, pt).cy
        )
      );
      this.op.cam.testLine(ptVel, "red", 0.04);
    });
  }

  mouseSide() {
    let sides = [];
    let dists = [];
    let mP = new Point(
      mouse.cx / game.cam.sC + game.cam.r.x,
      mouse.cy / game.cam.sC + game.cam.r.y
    );

    this.pt.forEach((pt, ptIndex, ptArray) => {
      sides.push(new Line(pt, ptArray[(ptIndex + 1) % ptArray.length]));
      dists.push(Physics.distFromLine(mP, sides[ptIndex]));
    });
    let min = Math.min(...dists);
    dists.forEach((dist, i) => {
      if (min == dist) this.op.cam.testLine(sides[i], "red", 0.1);
    });
  }

  render() {
    this.op.cam.drawPoly(this.pt, this.color, this.filled);
    this.op.cam.testPoint(this.r, "blue");
  }
}
