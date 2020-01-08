class Point {
    constructor(_x, _y) {
        this.X = _x;
        this.Y = _y;
    }
    set x(_x) {
        this.X = _x;
    }
    set y(_y) {
        this.Y = _y;
    }
    set p(_pt) {
        this.X = _pt.x;
        this.Y = _pt.y;
    }
    set a(_a) {
        this.X = _a[0];
        this.Y = _a[1];
    }
    get x() {
        return this.X;
    }
    get y() {
        return this.Y;
    }
    get a() {
        return [this.X, this.Y];
    }
    set addV(_v) {
        this.X += _v.cx;
        this.Y += _v.cy;
    }
    get toVector() {
        return new Vector(this.X, this.Y);
    }
}
