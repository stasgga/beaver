'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frameBox = exports.outer = exports.door = undefined;

var _paper = require('paper');

var _paper2 = _interopRequireDefault(_paper);

var _methods = require('./methods');

var M = _interopRequireWildcard(_methods);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_paper2.default.setup();

var pts = function pts(width, height) {
  var w = width * 100;
  var h = height * 100;
  return [[0, h], [w / 2, h * 0.6], [w / 2, 0], [-w / 2, 0], [-w / 2, h * 0.6]];
};

var door = exports.door = function door() {
  var points = [[1, 1], [1, 0], [0, 0], [0, 1]];
  var d = M.connectPoints(points);
  return M.svg(d);
};

var outer = exports.outer = function outer(width, height) {
  var mainPoints = pts(width, height);
  var mainPath = M.connectPoints(mainPoints);
  // const innerPoints = M.offsetPoints(mainPoints, -16.5)
  // const innerPath = M.connectPoints(innerPoints)
  // const outerPoints = M.offsetPoints(mainPoints, 16.5)
  // const outerPath = M.connectPoints(outerPoints)
  return M.svg(mainPath);
};

// export const frame = (width, height, frameThickness) => {
//   const mainPoints = pts(width, height)
//   const mainPath = M.connectPoints(mainPoints)
//   const innerPoints = M.offsetPoints(mainPoints, -frameThickness)
//   const innerPath = M.connectPoints(innerPoints)
//   const outerPoints = M.offsetPoints(mainPoints, frameThickness)
//   const outerPath = M.connectPoints(outerPoints)
//   return M.compound([outerPath, innerPath])
// }

var frameBox = exports.frameBox = function frameBox(width, height) {
  var frameThickness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 11;

  var mainPoints = pts(width, height);
  var mainPath = M.connectPoints(mainPoints);
  var innerPoints = M.offsetPoints(mainPoints, -frameThickness);
  var innerPath = M.connectPoints(innerPoints);
  var outerPoints = M.offsetPoints(mainPoints, frameThickness);
  var outerPath = M.connectPoints(outerPoints);
  // return M.compound([outerPath, innerPath])

  var rects = [];
  var holes = [];
  var cutLines = [];

  mainPath.curves.map(function (curve) {
    var point = void 0;
    var halfLength = curve.length / 2;
    var distance = 15;
    var allPoints = [];

    for (var i = 1; i < halfLength / distance; i++) {
      point = curve.getPointAt(i * 15);
      allPoints.push(point);
      // M.fill(M.circle(point.x, point.y, 5), "red")
    }
    var localPoints = [];
    for (var j = 1; j < halfLength / distance; j++) {
      point = curve.getPointAt(curve.length - j * 15);
      localPoints.push(point);
      // M.fill(M.circle(point.x, point.y, 3), "green")
    }
    allPoints = allPoints.concat(localPoints.reverse());
    var point1 = allPoints[allPoints.length / 2 - 1];
    var point2 = allPoints[allPoints.length / 2];
    var c = point1.subtract(point2);
    var length = c.length;
    // let finalPoints = allPoints
    point = point2.add(c.multiply(0.5));
    // M.fill(M.circle(point.x, point.y, 1), 'black')

    if (length <= distance + 10) {
      allPoints.splice(allPoints.length / 2 - 1, 2);
    }
    allPoints.splice(allPoints.length / 2, 0, point);

    for (var k = 1; k < allPoints.length; k++) {
      point = allPoints[k];

      if (k % 2 === 1) {
        var rectangle = M.fill(M.rectangle(point.x - 10, point.y - 16, 20, 32), '#000');
        rectangle.rotate(curve.segment1.point.subtract(curve.segment2.point).angle);
        rects.push(rectangle);

        var innerRect = M.rectangle(point.x - 4, point.y - 13, 8, 26);
        innerRect.rotate(curve.segment1.point.subtract(curve.segment2.point).angle);
        innerRect.transformContent = true;
        var outerRect = M.fill(M.rectangle(point.x - 6, point.y - 10, 12, 20), 'blue');
        outerRect.rotate(curve.segment1.point.subtract(curve.segment2.point).angle);
        outerRect.transformContent = true;
        holes.push(M.intersect([innerRect, outerRect]));
      }

      if (k === 4 || k === allPoints.length - 5) {
        var cutLine = M.rectangle(point.x, point.y - 30, 1, 60);
        cutLine.transformContent = true;
        cutLine.rotate(curve.segment1.point.subtract(curve.segment2.point).angle);
        cutLines.push(cutLine);
      }
    }
    return true;
  });

  var svgshape = M.unite([M.compound([innerPath, outerPath]), rects]);
  var hs = M.unite(holes);
  svgshape = M.intersect([svgshape, hs]);

  var svgdata = "";

  M.chunkArray(cutLines, function (slice) {
    var splitShape = M.connectPoints([slice[0].segments[0].point, slice[1].segments[0].point, slice[1].segments[1].point, slice[1].segments[1].point.multiply(1.5), slice[0].segments[1].point.multiply(1.5), slice[0].segments[1].point]);
    var p = M.divide(splitShape, svgshape);
    svgdata += M.svg(p, false);
  });

  return svgdata;

  // M.fill(svgshape, 'black')
  // return M.fill(frame(width,height,frameThickness), 'green')
};

// export const framebox = (width,height) => {
//   const w = width * 100
//   const h = height * 100
//   const mainPoints = [
//     [0,h],
//     [w/2,h*0.6],
//     [w/2,0],
//     [-w/2,0],
//     [-w/2,h*0.6]
//   ]
//   const mainPath = M.connectPoints(mainPoints)
//   const innerPoints = M.offsetPoints(mainPoints, -16.5)
//   const innerPath = M.connectPoints(innerPoints)
//   const outerPoints = M.offsetPoints(mainPoints, 16.5)
//   const outerPath = M.connectPoints(outerPoints)

//   return M.svg(outerPath)
//   // return M.svg(M.unite([innerPath, outerPath]))
// }