const findText = (content, type, text) => {
  const lowerCaseText = text.toLowerCase();
  return content.Blocks.filter((item) =>
    item.BlockType === type && item?.Text.toLocaleLowerCase().includes(lowerCaseText)
  );
};

const applyDiff = (diff, target) => {
  const { x, y } = target;
  return { x: x + diff.x, y: y + diff.y };
};

const getPolygonPointViaIndex = (polygon, index) => {
  const point = polygon[index]
  return { x: point.X, y: point.Y };
};

const getDiff = (knownLeftTop, foundLeftTop) => {
  return {
    x: knownLeftTop.x - foundLeftTop.x,
    y: knownLeftTop.y - foundLeftTop.y,
  };
};

const calculateRotation = (P1, P2, P3) => {
  const angle = (
    Math.atan2((P3.y - P1.y) * 10000, (P3.x - P1.x) * 10000) -
    Math.atan2(10000 * (P2.y - P1.y), 10000 * (P2.x - P1.x))
  );
  return -1 * angle;
};

const radTo360 = (angle) => (angle / (2 * Math.PI)) * 360;

const detectTransitions = (known, wholeItems) => {
  const f = (text) => {
    return findText(wholeItems, 'LINE', text);
  };

  // console.log({
  //   leftTop: known.leftTop,
  //   leftBottom: known.leftBottom,
  //   rightBottom: known.rightBottom,
  // });
  const leftTopBlock = f(known.leftTop.text)[0];
  const leftBottomBlock = f(known.leftBottom.text)[0];
  const rightBottomBlock = f(known.rightBottom.text)[0];

  const leftTopPoint = getPolygonPointViaIndex(leftTopBlock.Geometry.Polygon, known.leftTop.polygonIndex);
  const leftBottomPoint = getPolygonPointViaIndex(leftBottomBlock.Geometry.Polygon, known.leftBottom.polygonIndex);
  const rightBottomPoint = getPolygonPointViaIndex(rightBottomBlock.Geometry.Polygon, known.rightBottom.polygonIndex);

  const diff = getDiff(known.leftTop, leftTopPoint);
  const leftBottomPointShifted = applyDiff(diff, leftBottomPoint);
  const rotationAngle = calculateRotation(known.leftTop, known.leftBottom, leftBottomPointShifted);

  const rotate = { angle: rotationAngle };
  const stretchY = { ratio: 1.0 };
  const stretchX = { ratio: 1.0 };

  // { shiftX, shiftY, rotateAngle, ratioX, ratioY }
  return {
    shiftX: diff.x,
    shiftY: diff.y,
    rotateAngle: rotate.angle,
    ratioX: stretchX.ratio,
    ratioY: stretchY.ratio,
  };
}

module.exports = {
  applyDiff,
  calculateRotation,
  detectTransitions,
}