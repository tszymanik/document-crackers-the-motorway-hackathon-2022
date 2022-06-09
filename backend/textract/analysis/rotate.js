const rotatePoint = (x, y, angle) => {
  const r = Math.sqrt((x * x) + (y * y));
  const theta = Math.atan(y / x);
  const newTheta = (theta - angle);
  const newX = r * Math.cos(newTheta);
  const newY = r * Math.sin(newTheta);
  return {
    x: newX,
    y: newY,
  }
}

const rotate = (blocks, angle) => blocks.slice(0,1).map(block => {
  const polygon = block?.Geometry?.Polygon?.map?.(coordinate => {
    const rotated = rotatePoint(coordinate.X, coordinate.Y, angle);
    return {
      X: rotated.x,
      Y: rotated.y,
    }
  })

  return {
    ...block,
    Geometry: {
      ...block.Geometry,
      Polygon: polygon
    }
  }
})

// original
// 0.5996101498603821
// 1

// rotated 40deg clockwise
// x 1.10212
// y 0.380622

// const rotatedBlocks = rotate([{Geometry:{
//   Polygon:[
//     {
//       X: 1.10212,
//       Y: 0.380622
//     }
//   ]
// }}], -0.6981317007977318);
// console.log('rotatedBlocks', rotatedBlocks[0].Geometry.Polygon);

module.exports = {
  rotate,
}
