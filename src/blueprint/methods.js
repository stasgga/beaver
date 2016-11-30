import paper from 'paper'
import clipsy from 'clipsy'
import _ from 'lodash'

export const connectPoints = (points, strokeWidth=1, strokeColor="#000", closePath=true) => {
  let shape = new paper.Path()
  shape.moveTo(points[0])
  for (var i = 1; i < points.length; i++) {
    shape.lineTo(points[i])
  }
  if (closePath) { shape.closePath() }
  return shape
}

export const svg = (path, onlyD=true) => {
  let s = path.exportSVG({ asString: false, bounds: null }).getAttribute('d')
  return onlyD ? s : '<path d="' + s + '" />'
}

export const offsetPoints = (points, delta) => {
  let clipper = new clipsy.Clipper()
  let newPoints = []
  for (let i = 0; i < points.length; i++) {
    newPoints.push({ X: points[i][0], Y: points[i][1] })
  }
  let processedPoints = clipper.OffsetPolygons([newPoints], delta, 2, 10, true)[0]
  newPoints = []
  for (let j = 0; j < processedPoints.length; j++) {
    newPoints.push([processedPoints[j].X, processedPoints[j].Y])
  }
  return newPoints
}

export const unite = (array) => {
  const arr = _.flattenDeep(array)
  let united = arr[0]
  for (let i = 1; i < arr.length; i++) {
    united = united.unite(arr[i])
  }
  return united
}

export const fill = (shape, color='black') => {
  shape.fillColor = color
  return shape
}

export const stroke = (shape, color='black') => {
  shape.strokeColor = color
  return shape
}

export const circle = (x, y, radius) => {
  return new paper.Path.Circle(new paper.Point(x,y), radius)
}

export const rectangle = (x, y, width, height) => {
  return new paper.Path.Rectangle(x, y, width, height)
}

export const clone = (n) => {
  return n.clone()
}

export const compound = (array) => {
  var arr = _.flattenDeep(array)
  return new paper.CompoundPath({
    children: _.map(arr,clone)
  })
}

export const divide = (a,b) => {
  return (a.divide(b)).children[1]
}

export const chunkArray = (array, callback) => {
  for (var i = 0, l = array.length; i < l; i++) {
    callback.call(array, [ array[i], (i === array.length-1) ? array[0] : array[i+1] ])
  }
}

export const intersect = (array) => {
  let arr = _.flattenDeep(array)
  let united = arr[0]
  for (var i = 1; i < arr.length; i++) {
    united = united.subtract(arr[i])
  }
  return united;
}
