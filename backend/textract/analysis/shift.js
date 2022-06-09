const shift = (blocks, shiftX, shiftY) => blocks.map(block => {
  const boundingBox = block?.Geometry?.BoundingBox && {
    ...block.Geometry.BoundingBox,
    Left: block.Geometry.BoundingBox.Left + shiftX,
    Top: block.Geometry.BoundingBox.Top + shiftY,
  }
  const polygon = block?.Geometry?.Polygon?.map?.(coordinate => ({
    X: coordinate.X + shiftX,
    Y: coordinate.Y + shiftY,
  }))

  return {
    ...block,
    Geometry: {
      ...block.Geometry,
      BoundingBox: boundingBox,
      Polygon: polygon
    }
  }
})

module.exports = {
  shift,
}
