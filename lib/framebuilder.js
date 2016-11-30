'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paper = require('paper');

var _paper2 = _interopRequireDefault(_paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_paper2.default.setup();

var build = function build(width, height) {
  console.log(width, height);
  var rect = new _paper2.default.Path.Rectangle(10, 10, parseFloat(width), parseFloat(height));
  return rect.exportSVG({ asString: false, bounds: null }).getAttribute('d');
};

exports.default = build;