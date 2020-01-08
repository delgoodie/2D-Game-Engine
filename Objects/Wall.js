class Wall extends Polygon {
    constructor(_id, _pts, _op) {
        let _x = Physics.avg2D(_pts).x;
        let _y = Physics.avg2D(_pts).y;
        let _color = "brown";
        let _filled = true;
        super(_id, _x, _y, _op, _color, _filled, _pts);
    }
}