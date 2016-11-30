'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _framebuilder = require('./framebuilder');

var _framebuilder2 = _interopRequireDefault(_framebuilder);

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

var _index = require('./blueprint/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/save/:width/:height', function (req, res) {
  _fs2.default.writeFile("test", (0, _svg2.default)((0, _index.frameBox)(req.params.width, req.params.height)), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  res.send('saved');
});

app.get('/get', function (req, res) {
  res.download('test', 'frame.svg');
});

app.listen(4000);