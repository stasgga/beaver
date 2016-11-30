var wrapper = function(paths) {
  var svgFile = "<?xml version='1.0' encoding='utf-8'?>\n\
    <svg width='120cm' height='240cm' xmlns='http://www.w3.org/2000/svg'>\n\
    <style type='text/css'>path{stroke:#000;fill:none;}</style>\n\
    <g transform='scale(35.43307)'><path d='" + paths + "' /></g>\n\
    </svg>";
  return svgFile;
}

exports.wrapper = wrapper;