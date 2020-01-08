class GrappleGun extends Polygon {
  constructor(_id, _x, _y, _op) {
    let _color = "red";
    let _filled = true;
    let _pt = [
      new Point(Math.cos(qp) * 0.2, Math.sin(qp) * 0.2),
      new Point(Math.cos(hp + qp) * 0.2, Math.sin(hp + qp) * 0.2),
      new Point(Math.cos(pi + qp) * 0.2, Math.sin(pi + qp) * 0.2),
      new Point(Math.cos(dp - qp) * 0.2, Math.sin(dp - qp) * 0.2)
    ];
    super(_id, _x, _y, _op, _color, _filled, _pt);
    this.const = [0.1, 0.3];
    this.m = 1;
    this.filter = ["Player", "Hook", "Wall"];
    this.rLock = true;
    this.aLock = true;
  }
  get tetherPoint() {
    return new Point(
      this.op.worker[PLAYER].object[0].grappleGunPoint.x +
        Math.cos(this.a) * this.const[1],
      this.op.worker[0].object[0].grappleGunPoint.y +
        Math.sin(this.a) * this.const[1]
    );
  }
  update() {
    this.render();
    this.updatePoint();
    this.r.p = this.op.worker[PLAYER].object[0].grappleGunPoint;
    this.a = this.op.worker[PLAYER].object[0].a;
  }
}
