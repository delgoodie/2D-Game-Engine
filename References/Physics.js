class Physics {
  static collision(_objA, _objB, _colPt, _line) {
    if (_objA != undefined && _objB != undefined && _colPt != undefined) {
      if (_line !== undefined) {
        let Av = this.getV(_objA, _colPt);
        let Bv = this.getV(_objB, _colPt);
        let objAfn = this.getFn(_line, _objA);
        let objBfn = this.getFn(_line, _objB);
        game.cam.testLine(_line, "yellow", 0.04);
        game.cam.testLine(objBfn.toLine(_colPt), "green", 0.05);
        let AreferenceV = this.SinV(Bv, objAfn) - this.SinV(Av, objAfn);
        let BreferenceV = this.SinV(Av, objBfn) - this.SinV(Bv, objBfn);
        this.putF(
          _objA,
          new Vector(
            objAfn.cx * Math.abs(AreferenceV) * (0.0 + _objB.Ec),
            objAfn.cy * Math.abs(AreferenceV) * (0.0 + _objB.Ec)
          ),
          _colPt
        );
        this.putF(
          _objB,
          new Vector(
            objBfn.cx * Math.abs(BreferenceV) * (0.0 + _objA.Ec),
            objBfn.cy * Math.abs(BreferenceV) * (0.0 + _objA.Ec)
          ),
          _colPt
        );
        game.cam.show(
          "obj A = " +
            _objA.constructor.name +
            ", obj B = " +
            _objB.constructor.name
        );
      }
    } else {
      console.log("Physics gets: " + _line);
      //alert("Physics Collision Arguments invalid   objA = " + _objA + ", objB = " + _objB + ", colPt = " + _colPt + ", line = " + _line);
    }
  }

  static getFn(_side, _obj) {
    if (_side.m * _obj.r.x + _side.b > _obj.r.y)
      return new Vector(1, _side.toVector().pa + pi + hp, true);
    else return new Vector(1, _side.toVector().pa + hp, true);
  }

  static putF(_obj, _v, _pt) {
    if (_v.cx != NaN && _pt.x != NaN && _obj != undefined && _v.pr != 0) {
      let objComV = new Vector(_pt.x - _obj.r.x, _pt.y - _obj.r.y);
      let a = this.adif(_v, objComV);
      let netVhat = objComV.hat();
      let momentArm =
        _v.pr * (a > hp ? Math.abs(pi - a) / hp : Math.abs(a) / hp);
      if (objComV.pa < pi) {
        if (
          _v.pa + dp - (objComV.pa + dp) > 0 &&
          _v.pa + dp - (objComV.pa + dp) < pi
        ) {
          momentArm = Math.abs(momentArm);
        } else {
          momentArm = -Math.abs(momentArm);
        }
      } else {
        if (
          objComV.pa + dp - (_v.pa + dp) > 0 &&
          objComV.pa + dp - (_v.pa + dp) < pi
        ) {
          momentArm = -Math.abs(momentArm);
        } else {
          momentArm = Math.abs(momentArm);
        }
      }

      let netVector = new Vector(
        Math.cos(a) * _v.pr * netVhat.cx,
        Math.cos(a) * _v.pr * netVhat.cy
      );
      if (!_obj.rLock && netVector.cx != NaN) {
        _obj.f.inc(netVector.cx, netVector.cy);
      }
      if (!_obj.aLock && momentArm != NaN) {
        _obj.t += momentArm / 2;
      }
    } else {
      if (_v.pr == 0);
      else
        alert(
          "putF Arguments invalid obj = " +
            _obj +
            ", v = " +
            _v +
            ", pt = " +
            _pt +
            " v.pr = " +
            _v.pr
        );
    }
  }

  static subV(_v1, _v2) {
    return new Vector(_v1.cx - _v2.cx, _v1.cy - _v2.cy);
  }

  static SinV(_v1, _v2) {
    return _v1.cx * _v2.hat().cx + _v1.cy * _v2.hat().cy;
  }
  static VinV(_v1, _v2) {
    return new Vector(
      _v1.cx * _v2.hat().cx + _v1.cy * _v2.hat().cy,
      _v1.cx * -_v2.hat().cy + _v1.cy * _v2.hat().cx
    );
  }

  static getV(_obj, _pt) {
    let rPt = new Vector(_pt.x - _obj.r.x, _pt.y - _obj.r.y);
    rPt.pa = _obj.w > 0 ? rPt.pa + hp : rPt.pa + pi + hp;
    let vHat = rPt.hat();
    let aV = new Vector(
      vHat.cx * (Math.abs(_obj.w) * rPt.pr),
      vHat.cy * (Math.abs(_obj.w) * rPt.pr)
    );
    return this.addVector(aV, _obj.v);
  }

  static addVector(_v1, _v2) {
    return new Vector(_v1.cx + _v2.cx, _v1.cy + _v2.cy);
  }

  static between(_l1, _l2, _pt) {
    if (
      (_pt.y > this.plot(_l1, _pt.x) && _pt.y < this.plot(_l2, _pt.x)) ||
      (_pt.y < this.plot(_l1, _pt.x) && _pt.y > this.plot(_l2, _pt.x))
    ) {
      return true;
    } else return false;
  }

  static plot(_line, _x) {
    return _line.m * _x + _line.b;
  }

  static getPolyArea(_pts) {
    let com = this.avg2D(_pts);
    let area = 0;
    _pts.forEach((pt, ptIndex, ptArray) => {
      let side1 = new Line(pt, ptArray[(ptIndex + 1) % ptArray.length]);
      let side2 = new Line(
        pt,
        ptArray[(ptIndex + ptArray.length - 1) % ptArray.length]
      );
      let v1 = side1.toVector(0);
      let v2 = new Vector(com.x - pt.x, com.y - pt.y);
      let a = this.adif(v1, v2);
      if (v2.pr < 0 || v1.pr < 0) alert("pr < 0");
      area += Math.abs(Math.cos(a) * v2.pr * Math.sin(a) * v2.pr * 0.5);
      v1 = side2.toVector(0);
      a = this.adif(v1, v2);
      area += Math.abs(Math.cos(a) * v2.pr * Math.sin(a) * v2.pr * 0.5);
    });
    return area;
  }

  static getArea(_obj) {
    if (_obj.type == "polygon") {
      return this.getPolyArea(_obj.pt);
    } else if (_obj.type == "circle") {
      return this.getCircleArea(_obj.radius);
    }
  }

  static getCircleArea(_radius) {
    return Math.pow(_radius, 2) * pi;
  }

  static distFromLine(_pt, _line, _returnLine) {
    if (!this.between(_line.normal(_line.pt1), _line.normal(_line.pt2), _pt)) {
      if (arguments.length == 3 && _returnLine) {
        return this.dist(_pt, _line.pt1) < this.dist(_pt, _line.pt2)
          ? new Line(_pt, _line.pt1)
          : new Line(_pt, _line.pt2);
      } else {
        return this.dist(_pt, _line.pt1) < this.dist(_pt, _line.pt2)
          ? this.dist(_pt, _line.pt1)
          : this.dist(_pt, _line.pt2);
      }
    } else {
      let v1 = new Vector(_pt.x - _line.x1, _pt.y - _line.y1);
      let v2 = _line.toVector();
      let apx1x2 = this.adif(v1, v2);
      if (arguments.length == 3 && _returnLine) {
        return new Line(
          _pt,
          new Point(
            Math.cos(apx1x2) * v1.pr * (v2.cx / v2.pr) + _line.x1,
            Math.cos(apx1x2) * v1.pr * (v2.cy / v2.pr) + _line.y1
          )
        );
      } else {
        return this.dist(
          _pt,
          new Point(
            Math.cos(apx1x2) * v1.pr * (v2.cx / v2.pr) + _line.x1,
            Math.cos(apx1x2) * v1.pr * (v2.cy / v2.pr) + _line.y1
          )
        );
      }
    }
  }
  static distFromLineUnedged(_pt, _line, _returnLine) {
    if (this.between(_line.normal(_line.pt1), _line.normal(_line.pt2), _pt)) {
      let v1 = new Vector(_pt.x - _line.x1, _pt.y - _line.y1);
      let v2 = _line.toVector();
      let apx1x2 = this.adif(v1, v2);
      if (arguments.length == 3 && _returnLine) {
        return new Line(
          _pt,
          new Point(
            Math.cos(apx1x2) * v1.pr * (v2.cx / v2.pr) + _line.x1,
            Math.cos(apx1x2) * v1.pr * (v2.cy / v2.pr) + _line.y1
          )
        );
      } else {
        return this.dist(
          _pt,
          new Point(
            Math.cos(apx1x2) * v1.pr * (v2.cx / v2.pr) + _line.x1,
            Math.cos(apx1x2) * v1.pr * (v2.cy / v2.pr) + _line.y1
          )
        );
      }
    }
  }

  static dotProduct(_v1, _v2) {
    return _v1.cx * _v2.cx + _v1.cy * _v2.cy;
  }

  static adif(_v1, _v2) {
    if (_v1.pa > _v2.pa) {
      return _v1.pa - _v2.pa > pi ? dp - (_v1.pa - _v2.pa) : _v1.pa - _v2.pa;
    } else {
      return _v2.pa - _v1.pa > pi ? dp - (_v2.pa - _v1.pa) : _v2.pa - _v1.pa;
    }
  }

  static ptEval(_pt, _obj) {
    game.cam.testPoint(_pt, "yellow");
    switch (_obj.type) {
      case "circle":
        if (this.dist(_pt, _obj.r) <= _obj.radius) {
          game.cam.testPoint(_pt, "blue");
          return true;
        } else return false;
        break;
      case "polygon":
        let count = 0;
        _obj.pt.forEach((objPt, objPtIndex, objPtArray) => {
          let side = new Line(
            objPt,
            objPtArray[(objPtIndex + 1) % objPtArray.length]
          );
          game.cam.testLine(side, "yellow", 0.02);
          if (side.m * _obj.r.x + side.b > _obj.r.y) {
            //checks if center of mass is above or below line to define inequality
            if (side.m * _pt.x + side.b > _pt.y) {
              count++;
              game.cam.testLine(side, "blue", 0.02);
            }
          } else {
            if (side.m * _pt.x + side.b < _pt.y) {
              count++;
              game.cam.testLine(side, "blue", 0.02);
            }
          }
        });
        if (count == _obj.pt.length) {
          game.cam.testPoint(_pt, "blue");
          return true;
        } else return false;
    }
  }

  static dist(_pt1, _pt2) {
    return Math.sqrt(
      Math.pow(_pt2.x - _pt1.x, 2) + Math.pow(_pt2.y - _pt1.y, 2)
    );
  }

  static mag(_x, _y) {
    return Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2));
  }

  static atan(_x, _y) {
    return _y !== 0
      ? _y > 0
        ? Math.atan(_x / -_y) + hp
        : pi + hp - Math.atan(_x / _y)
      : _x > 0
      ? 0
      : pi;
  }

  static avg2D(_ptArray) {
    let x = 0;
    let y = 0;
    _ptArray.forEach(val => {
      x += val.x;
      y += val.y;
    });
    x /= _ptArray.length;
    y /= _ptArray.length;
    return new Point(x, y);
  }

  static pTc(_r, _a) {
    return [Math.cos(_a) * _r, Math.sin(_a) * _r];
  }

  static cTp(_x, _y) {
    return [this.mag(_x, _y), this.atan(_x, _y)];
  }
}
