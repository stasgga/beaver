import paper from 'paper'
paper.setup()

const build = (width, height) => {
  console.log(width, height)
  const rect = new paper.Path.Rectangle(10,10, parseFloat(width), parseFloat(height))
  return rect.exportSVG({ asString: false, bounds: null }).getAttribute('d')
}

export default build
