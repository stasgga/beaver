import paper from 'paper'
import * as M from './methods'
import _ from 'lodash'

paper.setup()

const pts = (width, height) => {
  const w = width * 100
  const h = height * 100
  return [
    [0,h],
    [w/2,h*0.6],
    [w/2,0],
    [-w/2,0],
    [-w/2,h*0.6]
  ]
}

export const door = () => {
  const points = [
    [1,1],
    [1,0],
    [0,0],
    [0,1]
  ]
  const d = M.connectPoints(points)
  return M.svg(d)
}

export const outer = (width,height) => {
  const mainPoints = pts(width, height)
  const mainPath = M.connectPoints(mainPoints)
  // const innerPoints = M.offsetPoints(mainPoints, -16.5)
  // const innerPath = M.connectPoints(innerPoints)
  // const outerPoints = M.offsetPoints(mainPoints, 16.5)
  // const outerPath = M.connectPoints(outerPoints)
  return M.svg(mainPath)
}

// export const frame = (width, height, frameThickness) => {
//   const mainPoints = pts(width, height)
//   const mainPath = M.connectPoints(mainPoints)
//   const innerPoints = M.offsetPoints(mainPoints, -frameThickness)
//   const innerPath = M.connectPoints(innerPoints)
//   const outerPoints = M.offsetPoints(mainPoints, frameThickness)
//   const outerPath = M.connectPoints(outerPoints)
//   return M.compound([outerPath, innerPath])
// }

export const frameBox = (width, height, frameThickness=11) => {
  const mainPoints = pts(width, height)
  const mainPath = M.connectPoints(mainPoints)
  const innerPoints = M.offsetPoints(mainPoints, -frameThickness)
  const innerPath = M.connectPoints(innerPoints)
  const outerPoints = M.offsetPoints(mainPoints, frameThickness)
  const outerPath = M.connectPoints(outerPoints)
  // return M.compound([outerPath, innerPath])

  let rects = []
  let holes = []
  let cutLines = []

  mainPath.curves.map( curve => {
    let point
    let halfLength = curve.length/2
    let distance = 15
    let allPoints = []

    for (let i = 1; i < halfLength/distance; i++) {
      point = curve.getPointAt(i*15)
      allPoints.push(point)
      // M.fill(M.circle(point.x, point.y, 5), "red")
    }
    let localPoints = []
    for (let j = 1; j < halfLength/distance; j++) {
      point = curve.getPointAt(curve.length-(j*15))
      localPoints.push(point)
      // M.fill(M.circle(point.x, point.y, 3), "green")
    }
    allPoints = allPoints.concat(localPoints.reverse())
    let point1 = allPoints[allPoints.length/2-1]
    let point2 = allPoints[allPoints.length/2]
    let c = point1.subtract(point2)
    let length = c.length
    // let finalPoints = allPoints
    point = point2.add(c.multiply(0.5))
    // M.fill(M.circle(point.x, point.y, 1), 'black')

    if (length <= distance+10) {
      allPoints.splice(allPoints.length/2-1,2)
    }
    allPoints.splice(allPoints.length/2,0,point)

    for (let k = 1; k < allPoints.length; k++) {
      point = allPoints[k]

      if (k % 2 === 1) {
        let rectangle = M.fill(M.rectangle(point.x-10, point.y-16, 20, 32), '#000')
        rectangle.rotate(curve.segment1.point.subtract(curve.segment2.point).angle)
        rects.push(rectangle)

        let innerRect = M.rectangle(point.x-4, point.y-13, 8, 26)
        innerRect.rotate(curve.segment1.point.subtract(curve.segment2.point).angle)
        innerRect.transformContent = true
        let outerRect = M.fill(M.rectangle(point.x-6, point.y-10, 12, 20), 'blue')
        outerRect.rotate(curve.segment1.point.subtract(curve.segment2.point).angle)
        outerRect.transformContent = true
        holes.push(
          M.intersect([innerRect, outerRect])
        )
      }

      if (k === 4 || k === allPoints.length - 5) {
        let cutLine = M.rectangle(point.x, point.y-30, 1, 60)
        cutLine.transformContent = true
        cutLine.rotate(curve.segment1.point.subtract(curve.segment2.point).angle)
        cutLines.push(cutLine)
      }
    }
    return true

  })

  let svgshape = M.unite([M.compound([innerPath, outerPath]), rects])
  let hs = M.unite(holes)
  svgshape = M.intersect([svgshape, hs])

  let svgdata = ""

  M.chunkArray(cutLines, function (slice){
    let splitShape = M.connectPoints([
      slice[0].segments[0].point,
      slice[1].segments[0].point,
      slice[1].segments[1].point,
      slice[1].segments[1].point.multiply(1.5),
      slice[0].segments[1].point.multiply(1.5),
      slice[0].segments[1].point
    ])
    let p = M.divide(splitShape, svgshape)
    svgdata += M.svg(p, false)
  })

  return svgdata

  // M.fill(svgshape, 'black')
  // return M.fill(frame(width,height,frameThickness), 'green')
}


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
