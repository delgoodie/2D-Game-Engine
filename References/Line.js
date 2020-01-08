class Line {
    constructor(_a, _b, _c, _d) {
        if (arguments.length == 4) {
            this.X1 = _a;
            this.Y1 = _b;
            this.X2 = _c;
            this.Y2 = _d;
            this.swap();
            this.PT1 = new Point(this.X1, this.Y1);
            this.PT2 = new Point(this.X2, this.Y2);
            if (this.X2 == this.X1) { this.M = 10000; } else
                this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
            this.B = -this.M * this.X1 + this.Y1;
            this.LENGTH = Physics.dist(this.PT1, this.PT2);
        } else if (arguments.length == 2 && _a.constructor === Array) {
            this.X1 = _a[0];
            this.Y1 = _a[1];
            this.X2 = _b[0];
            this.Y2 = _b[1];
            this.swap();
            this.PT1 = new Point(this.X1, this.Y1);
            this.PT2 = new Point(this.X2, this.Y2);
            if (this.X2 == this.X1) { this.M = 10000; } else
                this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
            this.B = -this.M * this.X1 + this.Y1;
            this.LENGTH = Physics.dist(this.PT1, this.PT2);
        } else if (arguments.length == 2) {
            this.X1 = _a.x;
            this.Y1 = _a.y;
            this.X2 = _b.x;
            this.Y2 = _b.y;
            this.swap();
            this.PT1 = new Point(this.X1, this.Y1);
            this.PT2 = new Point(this.X2, this.Y2);
            if (this.X2 == this.X1) { this.M = 10000; } else
                this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
            this.B = -this.M * this.X1 + this.Y1;
            this.LENGTH = Physics.dist(this.PT1, this.PT2);
        }

    }
    swap() {
        if (this.X1 > this.X2) {
            let swapper = [this.X1, this.Y1];
            this.X1 = this.X2;
            this.Y1 = this.Y2;
            this.X2 = swapper[0];
            this.Y2 = swapper[1];
        }
    }
    update(_change) {
        switch (_change) {
            case "x1":
                this.swap();
                this.PT1.x(this.X1);
                if (this.X2 == this.X1) { this.M = 10000; } else
                    this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
                this.B = -this.M * this.X1 + this.Y1;
                this.LENGTH = Physics.dist(this.PT1, this.PT2);
                break;
            case "y1":
                this.PT1.y(this.Y1);
                if (this.X2 == this.X1) { this.M = 10000; } else
                    this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
                this.B = -this.M * this.X1 + this.Y1;
                this.LENGTH = Physics.dist(this.PT1, this.PT2);
                break;
            case "x2":
                this.swap();
                this.PT2.x(this.X2);
                if (this.X2 == this.X1) { this.M = 10000; } else
                    this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
                this.B = -this.M * this.X1 + this.Y1;
                this.LENGTH = Physics.dist(this.PT1, this.PT2);
                break;
            case "y2":
                this.PT2.y(this.Y2);
                if (this.X2 == this.X1) { this.M = 10000; } else

                    this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
                this.B = -this.M * this.X1 + this.Y1;
                this.LENGTH = Physics.dist(this.PT1, this.PT2);
                break;
            case "pt1":
                this.X1 = this.PT1.x;
                this.Y1 = this.PT1.y;
                if (this.X2 == this.X1) { this.M = 10000; } else
                    this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
                this.B = -this.M * this.X1 + this.Y1;
                this.LENGTH = Physics.dist(this.PT1, this.PT2);
                break;
            case "pt2":
                this.X2 = this.PT2.x;
                this.Y2 = this.PT2.y;
                if (this.X2 == this.X1) { this.M = 10000; } else
                    this.M = (this.Y2 - this.Y1) / (this.X2 - this.X1);
                this.B = -this.M * this.X1 + this.Y1;
                this.LENGTH = Physics.dist(this.PT1, this.PT2);
                break;
            case "m":
                alert("finish M");
                break;
            case "b":
                alert("finish B");
                break;
            default:
                alert("property of line does not exist");
        }
    }

    set x1(_x1) {
        this.X1 = _x1;
        this.update("x1");
    }
    set y1(_y1) {
        this.Y1 = _y1;
        this.update("y1");
    }
    set x2(_x2) {
        this.X2 = _x2;
        this.update("x2");
    }
    set y2(_y2) {
        this.Y2 = _y2;
        this.update("y2");
    }
    set pt1(_pt1) {
        this.PT1.p(_pt1);
        this.update("pt1");
    }
    set pt2(_pt2) {
        this.PT2.p(_pt2);
        this.update("pt2");
    }
    set m(_m) {
        this.M = _m;
        this.update("m");
    }
    set b(_b) {
        this.B = _b;
        this.update("b");
    }

    get x1() {
        return this.X1;
    }
    get y1() {
        return this.Y1;
    }
    get x2() {
        return this.X2;
    }
    get y2() {
        return this.Y2;
    }
    get pt1() {
        return this.PT1;
    }
    get pt2() {
        return this.PT2;
    }
    get m() {
        return this.M;
    }
    get b() {
        return this.B;
    }
    get length() {
        return this.LENGTH;
    }

    normal(_pt) {
        let v = this.toVector();
        v.pa = v.pa + hp;
        let initPt = new Point(_pt.x - v.cx, _pt.y - v.cy);
        v.pr = v.pr * 2;
        return v.toLine(initPt);
    }
    toVector(_startPoint) {
        if (arguments.length == 1) {
            if (_startPoint == this.PT1) return new Vector(this.X2 - this.X1, this.Y2 - this.Y1);
            else if (_startPoint == this.PT2) return new Vector(this.X1 - this.X2, this.Y1 - this.Y2);
            else if (_startPoint == 0) return new Vector(this.X2 - this.X1, this.Y2 - this.Y1);
            else if (_startPoint == 1) return new Vector(this.X1 - this.X2, this.Y1 - this.Y2);
            else alert("invalid argument(s) for Line.toVector()");
        } else return new Vector(this.X2 - this.X1, this.Y2 - this.Y1);
    }
}