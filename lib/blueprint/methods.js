'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersect = exports.chunkArray = exports.divide = exports.compound = exports.clone = exports.rectangle = exports.circle = exports.stroke = exports.fill = exports.unite = exports.offsetPoints = exports.svg = exports.connectPoints = undefined;

var _paper = require('paper');

var _paper2 = _interopRequireDefault(_paper);

var _clipsy = require('clipsy');

var _clipsy2 = _interopRequireDefault(_clipsy);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectPoints = exports.connectPoints = function connectPoints(points) {
  var strokeWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var strokeColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#000";
  var closePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var shape = new _paper2.default.Path();
  shape.moveTo(points[0]);
  for (var i = 1; i < points.length; i++) {
    shape.lineTo(points[i]);
  }
  if (closePath) {
    shape.closePath();
  }
  return shape;
};

var svg = exports.svg = function svg(path) {
  var onlyD = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var s = path.exportSVG({ asString: false, bounds: null }).getAttribute('d');
  return onlyD ? s : '<path d="' + s + '" />';
};

var offsetPoints = exports.offsetPoints = function offsetPoints(points, delta) {
  var clipper = new _clipsy2.default.Clipper();
  var newPoints = [];
  for (var i = 0; i < points.length; i++) {
    newPoints.push({ X: points[i][0], Y: points[i][1] });
  }
  var processedPoints = clipper.OffsetPolygons([newPoints], delta, 2, 10, true)[0];
  newPoints = [];
  for (var j = 0; j < processedPoints.length; j++) {
    newPoints.push([processedPoints[j].X, processedPoints[j].Y]);
  }
  return newPoints;
};

var unite = exports.unite = function unite(array) {
  var arr = _lodash2.default.flattenDeep(array);
  var united = arr[0];
  for (var i = 1; i < arr.length; i++) {
    united = united.unite(arr[i]);
  }
  return united;
};

var fill = exports.fill = function fill(shape) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'black';

  shape.fillColor = color;
  return shape;
};

var stroke = exports.stroke = function stroke(shape) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'black';

  shape.strokeColor = color;
  return shape;
};

var circle = exports.circle = function circle(x, y, radius) {
  return new _paper2.default.Path.Circle(new _paper2.default.Point(x, y), radius);
};

var rectangle = exports.rectangle = function rectangle(x, y, width, height) {
  return new _paper2.default.Path.Rectangle(x, y, width, height);
};

var clone = exports.clone = function clone(n) {
  return n.clone();
};

var compound = exports.compound = function compound(array) {
  var arr = _lodash2.default.flattenDeep(array);
  return new _paper2.default.CompoundPath({
    children: _lodash2.default.map(arr, clone)
  });
};

var divide = exports.divide = function divide(a, b) {
  return a.divide(b).children[1];
};

var chunkArray = exports.chunkArray = function chunkArray(array, callback) {
  for (var i = 0, l = array.length; i < l; i++) {
    callback.call(array, [array[i], i === array.length - 1 ? array[0] : array[i + 1]]);
  }
};

var intersect = exports.intersect = function intersect(array) {
  var arr = _lodash2.default.flattenDeep(array);
  var united = arr[0];
  for (var i = 1; i < arr.length; i++) {
    united = united.subtract(arr[i]);
  }
  return united;
};