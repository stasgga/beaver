"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var wrapper = function wrapper(paths) {
  var svgFile = "<?xml version='1.0' encoding='utf-8'?>\n\
    <svg width='120cm' height='240cm' xmlns='http://www.w3.org/2000/svg'>\n\
    <style type='text/css'>path{stroke:#000;fill:none;}</style>\n\
    <g transform='scale(35.43307)'>" + paths + "</g>\n\
    </svg>";
  return svgFile;
};

exports.default = wrapper;