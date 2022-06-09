const { analyzeWithPolygons } = require('./analyse-with-polygons');
const { detectTransitions } = require('./detectTransition');
const { rotate } = require('./rotate');
const { shift } = require('./shift');

const transAnal = (textractData, config) => {
  const transitions = detectTransitions(config.known, textractData.Blocks);
  const rotated = rotate(textractData.Blocks, transitions.rotateAngle);
  const shifted = shift(rotated, transitions.shiftX, transitions.shiftY);
  const analyzed = analyzeWithPolygons({ ...textractData, Blocks: shifted });
  return analyzed;
}

module.exports = {
  transAnal
}
