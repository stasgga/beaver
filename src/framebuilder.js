var paper = require('paper');

paper.setup();

var build = function(width, height) {
  console.log(width, height)
  var rect = new paper.Path.Rectangle(10,10, parseFloat(width), parseFloat(height));
  return rect.exportSVG({ asString: false, bounds: null }).getAttribute('d');
}

exports.build = build;
