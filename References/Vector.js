
class Vector {
    constructor(_a, _b, _isPolar) {
        if (_isPolar) {
            this.CX = Math.cos(_b) * _a;
            this.CY = Math.sin(_b) * _a;
            this.PR = _a;
            this.PA = _b;
            this.C = [Math.cos(_b) * _a, Math.sin(_b) * _a];
            this.P = [_a, _b];
        }
        else {
            this.CX = _a;
            this.CY = _b;
            this.PR = Physics.mag(_a, _b);
            this.PA = Physics.atan(_a, _b);
            this.C = [_a, _b];
            this.P = [Physics.mag(_a, _b), Physics.atan(_a, _b)];
        }
    }
    update(_change) {
        switch (_change) {
            case "cx":
                this.PR = Physics.mag(this.CX, this.CY);
                this.PA = Physics.atan(this.cx, this.CY);
                this.C = [this.CX, this.CY];
                this.P = [this.PR, this.PA];
                break;
            case "cy":
                this.PR = Physics.mag(this.CX, this.CY);
                this.PA = Physics.atan(this.CX, this.CY);
                this.C = [this.CX, this.CY];
                this.P = [this.PR, this.PA];
                break;
            case "pr":
                this.CX = Math.cos(this.PA) * this.PR;
                this.CY = Math.sin(this.PA) * this.PR;
                this.C = [this.CX, this.CY];
                this.P = [this.PR, this.PA];
                break;
            case "pa":
                this.CX = Math.cos(this.PA) * this.PR;
                this.CY = Math.sin(this.PA) * this.PR;
                this.C = [this.CX, this.CY];
                this.P = [this.PR, this.PA];
                break;
            case "c":
                this.CX = this.C[0];
                this.CY = this.C[1];
                this.PR = Physics.mag(this.CX, this.CY);
                this.PA = Physics.atan(this.CX, this.CY);
                this.P = [this.PR, this.PA];
                break;
            case "p":
                this.PR = this.P[0];
                this.PA = this.P[1];
                this.CX = Math.cos(this.PA) * this.PR;
                this.CY = Math.sin(this.PA) * this.PR;
                this.C = [this.CX, this.CY];
                break;
        }
    }

    set cx(_x) {
        this.CX = _x;
        this.update("cx");
    }

    set cy(_y) {
        this.CY = _y;
        this.update("cy");
    }

    set pr(_r) {
        this.PR = _r;
        this.update("pr");
    }

    set pa(_a) {
        this.PA = _a;
        this.update("pa");
    }

    set c(_c) {
        this.C = _c;
        this.update("c");
    }

    set p(_p) {
        this.P = _p;
        this.update("p");
    }


    get cx() {
        return this.CX;
    }

    get cy() {
        return this.CY;
    }

    get pr() {
        return this.PR;
    }

    get pa() {
        return this.PA;
    }

    get c() {
        return this.C;
    }

    get p() {
        return this.P;
    }

    get opposite() {
        return new Vector(-this.CX, -this.CY);
    }

    inc(_x, _y) {
        if (arguments.length == 2) {
            this.C[0] += _x;
            this.C[1] += _y;
        } else if (arguments.length == 1 && _x.constructor.name == "Vector") {
            this.C[0] += _x.cx;
            this.C[1] += _x.cy;
        }
        this.update("c");
    }

    hat() {
        return new Vector(1, this.PA, true);
    }
    toPoint(_pt) {
        return new Point(_pt.x + this.CX, _pt.y + this.CY);
    }
    toLine(_pt1) {
        return new Line(_pt1.x, _pt1.y, _pt1.x + this.CX, _pt1.y + this.CY);
    }
}
