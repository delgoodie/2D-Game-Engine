class Camera {
  //Camera object deals with view
  constructor(_x, _y, _sC) {
    this.r = new Point(_x, _y);
    this.targetR = new Point(_x, _y);
    this.v = new Vector(0, 0);
    this.a = new Vector(0, 0);
    this.sC = _sC;
    this.infoStack = [];
    this.infoObjStack = [];
    this.motion = false;
    this.motionConst = 0.05;
  }
  update() {
    this.v.inc(this.a);
    this.r.addV = this.v;
    if (this.motion) {
      this.v.c = [
        (this.targetR.x - this.r.x) * this.motionConst,
        (this.targetR.y - this.r.y) * this.motionConst
      ];
    } else {
      this.r.p = this.targetR;
    }
  }
  trans(_val, _type) {
    //translate game coords into pixel coords
    return _type == "x"
      ? (_val - this.r.x) * this.sC + width / 2
      : -(_val - this.r.y) * this.sC + height / 2;
  }
  drawPoly(_pt, _color, _fill) {
    if (!_fill) c.strokeStyle = _color;
    else c.fillStyle = _color;
    c.beginPath();
    c.moveTo(
      this.trans(_pt[_pt.length - 1].x, "x"),
      this.trans(_pt[_pt.length - 1].y, "y")
    );

    _pt.forEach(val => {
      c.lineTo(this.trans(val.x, "x"), this.trans(val.y, "y"));
    });
    _fill ? c.fill() : c.stroke();
  }
  drawCircle(_pt, _radius, _color, _fill, _lineWidth) {
    if (!_fill) {
      c.strokeStyle = _color;
      c.lineWidth = _lineWidth * sC;
    } else {
      c.fillStyle = _color;
    }
    c.beginPath();
    c.arc(
      this.trans(_pt.x, "x"),
      this.trans(_pt.y, "y"),
      _radius * this.sC,
      0,
      dp,
      false
    );
    _fill ? c.fill() : c.stroke();
  }
  drawLine(_line, _color, _lineWidth) {
    c.strokeStyle = _color;
    c.lineWidth = _lineWidth * this.sC;
    c.beginPath();
    c.moveTo(this.trans(_line.x1, "x"), this.trans(_line.y1, "y"));
    c.lineTo(this.trans(_line.x2, "x"), this.trans(_line.y2, "y"));
    c.stroke();
  }
  drawPoint(_pt, _color) {
    c.fillStyle = _color;
    c.beginPath();
    c.arc(
      this.trans(_pt.x, "x"),
      this.trans(_pt.y, "y"),
      0.03 * this.sC,
      0,
      dp
    );
    c.fill();
  }
  testPoly(_pt, _color, _fill) {
    c.lineWidth = 0.1 * this.sC;
    if (!developerMode) return false;
    if (!_fill) c.strokeStyle = _color;
    else c.fillStyle = _color;
    c.beginPath();
    c.moveTo(
      this.trans(_pt[_pt.length - 1].x, "x"),
      this.trans(_pt[_pt.length - 1].y, "y")
    );
    _pt.forEach(val => {
      c.lineTo(this.trans(val.x, "x"), this.trans(val.y, "y"));
    });
    _fill ? c.fill() : c.stroke();
  }
  testCircle(_pt, _radius, _color, _fill, _lineWidth) {
    if (!developerMode) return false;
    if (!_fill) {
      c.strokeStyle = _color;
      c.lineWidth = _lineWidth;
    } else {
      c.fillStyle = _color;
    }
    c.beginPath();
    c.arc(
      this.trans(_pt.x, "x"),
      this.trans(_pt.y, "y"),
      _radius * this.sC,
      0,
      dp,
      false
    );
    _fill ? c.fill() : c.stroke();
  }
  testLine(_line, _color, _lineWidth) {
    if (!developerMode) return false;
    c.strokeStyle = _color;
    c.lineWidth = _lineWidth * this.sC;
    c.beginPath();
    c.moveTo(this.trans(_line.x1, "x"), this.trans(_line.y1, "y"));
    c.lineTo(this.trans(_line.x2, "x"), this.trans(_line.y2, "y"));
    c.stroke();
  }
  testPoint(_pt, _color) {
    if (!developerMode) return false;
    c.fillStyle = _color;
    c.beginPath();
    c.arc(
      this.trans(_pt.x, "x"),
      this.trans(_pt.y, "y"),
      0.03 * this.sC,
      0,
      dp
    );
    c.fill();
  }

  renderInfo() {
    c.fillStyle = "orange";
    this.infoStack.forEach((val, i, array) => {
      c.fillText(val, this.sC / 15, this.sC * i + this.sC);
    });

    let xOffset = width / 11;
    let yOffset = height / 20;
    let xDist = width / 40;
    let boxWidth =
      (width - xOffset * 1.2 - xDist * (this.infoObjStack.length - 1)) /
      this.infoObjStack.length;
    let boxHeight = height / 7;
    let boxBorderColor = "black";
    let boxColor = "rgba(78, 54, 54, 0.5)";
    let textColor = "white";
    let infoCount = 9;
    this.infoObjStack.forEach((obj, i) => {
      c.fillStyle = boxColor;
      let xCorner = xOffset + i * boxWidth + i * xDist;
      c.fillRect(xCorner, yOffset, boxWidth, boxHeight);
      c.strokeStyle = boxBorderColor;
      c.rect(xCorner, yOffset, boxWidth, boxHeight);
      c.stroke();
      let objName = obj.constructor.name;
      c.fillStyle = textColor;
      c.font = "15px Arial";
      c.fillText(
        objName + " " + obj.id,
        xCorner + boxWidth / 2 - objName.length * 4,
        yOffset + boxHeight / infoCount
      );
      c.font = "10px Arial";
      this.showVector(
        xCorner + boxWidth / 30,
        yOffset + 2 * (boxHeight / infoCount),
        "velocity",
        obj.v
      );
      this.showVector(
        xCorner + boxWidth / 30,
        yOffset + 3 * (boxHeight / infoCount),
        "force",
        obj.f
      );
      this.showPoint(
        xCorner + boxWidth / 30,
        yOffset + 4 * (boxHeight / infoCount),
        "position",
        obj.r
      );
      this.showVarRounded(
        xCorner + boxWidth / 30,
        yOffset + 5 * (boxHeight / infoCount),
        "angular velocity",
        obj.w
      );
      this.showVarUnrounded(
        xCorner + boxWidth / 30,
        yOffset + 6 * (boxHeight / infoCount),
        "torque",
        obj.t
      );
      this.showVarRounded(
        xCorner + boxWidth / 30,
        yOffset + 7 * (boxHeight / infoCount),
        "angle",
        obj.a
      );
      this.showVarUnrounded(
        xCorner + boxWidth / 30,
        yOffset + 8 * (boxHeight / infoCount),
        "mass",
        obj.m
      );
      if (click) {
        if (
          mouseX > xCorner &&
          mouseX < xCorner + boxWidth &&
          mouseY > yOffset &&
          mouseY < yOffset + boxHeight
        ) {
          switch (obj.constructor.name) {
            case "Player":
              devOpType = PLAYER;
              break;
            case "Rock":
              devOpType = ROCK;
              break;
            case "GrappleGun":
              devOpType = GRAPPLE_GUN;
              break;
            case "Hook":
              devOpType = HOOK;
              break;
            case "Wall":
              devOpType = WALL;
              break;
            default:
              alert("obj type " + obj.constructor.name + " not found");
          }
          devOpId = obj.id;
        }
      }
    });
    this.infoStack = [];
    this.infoObjStack = [];
  }

  test(_color) {
    if (arguments.length == 1) c.fillStyle = _color;
    c.fillRect(50, 50, 50, 50);
  }
  show(_info) {
    this.infoStack.push(_info);
  }
  showObj(_obj) {
    this.infoObjStack.push(_obj);
  }
  blink() {
    window.setTimeout(() => {
      c.fillRect(100, 50, 50, 50);
    }, 100);
  }
  showVector(_x, _y, _vecName, _vector) {
    c.fillText(
      _vecName +
        ": cx = " +
        Math.round(_vector.cx) +
        ", cy = " +
        Math.round(_vector.cy) +
        " pr = " +
        Math.round(_vector.pr) +
        ", pa = " +
        Math.round(_vector.pa),
      _x,
      _y
    );
  }
  showPoint(_x, _y, _pointName, _pt) {
    c.fillText(
      _pointName + ": x = " + Math.round(_pt.x) + ", y = " + Math.round(_pt.y),
      _x,
      _y
    );
  }
  showVarRounded(_x, _y, _varName, _var) {
    c.fillText(_varName + " = " + Math.round(_var), _x, _y);
  }
  showVarUnrounded(_x, _y, _varName, _var) {
    c.fillText(_varName + " = " + _var, _x, _y);
  }
}
