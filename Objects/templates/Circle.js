class Circle extends Obj {
    constructor(_id, _x, _y, _op, _color, _filled, _radius) {
        super(_id, _x, _y, _op, _color, _filled);
        this.radius = _radius;
        this.type = "circle";
    }
    render() {
        this.op.cam.drawCircle(this.r, this.radius, this.color, this.filled);
        this.op.cam.testPoint(new Point(this.r.x + Math.cos(this.a)*this.radius, this.r.y + Math.sin(this.a)*this.radius), "blue");
    }
}