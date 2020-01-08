class Work {
  constructor(_obj, _id, _op) {
    this.object = _obj;
    this.id = _id;
    this.op = _op;
    this.lines = [];
  }

  evalHandler() {
    this.object.forEach((objA, objAindex) => {
      let newCollisions = [];
      this.op.worker.forEach((wkr, wkrIndex) => {
        wkr.object.forEach((objB, objBindex) => {
          if (objAindex != objBindex || this.id != wkrIndex) {
            var blocked = false;

            if (objA.collisions.includes(objB)) {
              if (this.evaluate(objA, objB, true)) newCollisions.push(objB);
            } else {
              if (this.evaluate(objA, objB, true)) newCollisions.push(objB);
            }
          }
        });
      });
      objA.collisions = newCollisions;
    });
  }

  evaluate(_objA, _objB, _sim) {
    switch (_objB.type) {
      case "circle":
        switch (_objA.type) {
          case "circle":
            if (Physics.dist(_objA.r, _objB.r) <= _objA.radius + _objB.radius) {
              this.op.cam.test("blue");
              _objA.collisions.push(_objB);
              _objB.collisions.push(_objA);
              _objB.altered = true;
              if (
                _objA.collisionCondition(_objB) &&
                _objB.collisionCondition(_objA) &&
                _sim
              )
                this.collisionHandler(_objA, _objB);
            }
            break;

          case "polygon":
            if (Physics.ptEval(_objB.r, _objA)) {
              this.op.cam.test("orange");
              _objA.collisions.push(_objB);
              _objB.collisions.push(_objA);
              _objB.altered = true;
              //           if (_objA.collisionCondition(_objB) && _objB.collisionCondition(_objA) && _sim) this.collisionHandler(_objA, _objB);
            }

            _objA.pt.forEach((objPt, objPtIndex, objPtArray) => {
              let side = new Line(
                objPt,
                objPtArray[(objPtIndex + 1) % objPtArray.length]
              );
              if (Physics.distFromLineUnedged(_objB.r, side) <= _objB.radius) {
                this.op.cam.test("green");
                _objA.collisions.push(_objB);
                _objB.collisions.push(_objA);
                _objB.altered = true;
                if (
                  _objA.collisionCondition(_objB) &&
                  _objB.collisionCondition(_objA) &&
                  _sim
                )
                  this.collisionHandler(_objA, _objB, side);
              }
            });
            break;

          default:
            alert("objA type not found");
        }
        break;

      case "polygon":
        _objB.pt.forEach(objBpt => {
          if (Physics.ptEval(objBpt, _objA)) {
            this.op.cam.test("red");
            _objA.collisions.push(_objB);
            _objB.collisions.push(_objA);
            _objB.altered = true;
            if (
              _objA.collisionCondition(_objB) &&
              _objB.collisionCondition(_objA) &&
              _sim
            )
              this.collisionHandler(_objA, _objB, objBpt);
          }
        });
        break;

      default:
        alert("objB type not found");
    }
  }

  collisionHandler(_objA, _objB, _data) {
    if (_objA == undefined || _objB == undefined)
      alert("collisionHandler arguments undefined");
    //CIRCLE - CIRCLE
    if (_objA.type == "circle" && _objB.type == "circle") {
      let centerLine = new Vector(_objB.r.x - _objA.r.x, _objB.r.y - _objA.r.y);
      centerLine.pr = _objA.radius;
      let colPt = new Point(
        _objA.r.x + centerLine.cx,
        _objA.r.y + centerLine.cy
      );
      let colLine = new Vector(3, centerLine.pa + hp, true);
      Physics.collision(_objA, _objB, colPt, colLine.toLine(colPt));
    }

    //CIRCLE - POLY
    if (_objA.type == "polygon" && _objB.type == "circle") {
      //TODO: if circle gets stuck in poly
      if (_data == true) {
        Physics.collision(_objA, _objB, _objA.r);
      } else {
        let coll = Physics.distFromLineUnedged(_objB.r, _data, true);
        let colPt = coll.x1 == _objB.r.x ? coll.pt2 : coll.pt1;
        this.op.cam.testLine(_data, "blue", 0.1);
        this.op.cam.testLine(coll, "red", 0.1);
        Physics.collision(_objA, _objB, colPt, _data);
      }
    }

    //POLY - CIRCLE
    if (_objA.type == "circle" && _objB.type == "polygon") {
      let colV = new Vector(_data.x - _objA.r.x, _data.y - _objA.r.y);
      colV.pa = colV.pa + hp;
      Physics.collision(_objA, _objB, _data, colV.toLine(_data));
    }

    //POLY - POLY
    if (_objA.type == "polygon" && _objB.type == "polygon") {
      let sides = [];
      let dists = [];
      _objA.pt.forEach((objApt, objAptIndex, objAptArray) => {
        sides.push(
          new Line(objApt, objAptArray[(objAptIndex + 1) % objAptArray.length])
        );
        dists.push(Physics.distFromLine(_data, sides[objAptIndex]));
      });
      let min = Math.min(...dists);
      dists.forEach((dist, i) => {
        if (min == dist) {
          if (sides[i] == undefined) alert(sides[i]);
          Physics.collision(
            _objA,
            _objB,
            _data,
            new Line(sides[i].x1, sides[i].y1, sides[i].x2, sides[i].y2)
          );
          this.lines.push(sides[i]);
        }
      });
    }
  }

  update() {
    this.object.forEach((obj, i) => {
      obj.update();
      this.op.cam.showObj(obj);
      obj.v.c = [obj.v.cx + obj.f.cx / obj.m, obj.v.cy + obj.f.cy / obj.m];
      obj.r.a = [obj.r.x + obj.v.cx / fps, obj.r.y + obj.v.cy / fps];
      obj.w += obj.t / obj.m;
      obj.a += obj.w / fps;
      obj.f.c = [0, 0];
      obj.t = 0;
      obj.f.inc(-obj.v.cx * 0.001, -obj.v.cy * 0.001);
      obj.t += -obj.w * 0.001;
      obj.m = Physics.getArea(obj);
      obj.a %= dp;
    });
    this.evalHandler();
    this.lines.forEach(line => {
      this.op.cam.testLine(line, "red", 0.05);
    });
  }
}
