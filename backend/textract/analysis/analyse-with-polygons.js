const interpolate = (f, xi) => {
  let result = 0; // Initialize result

  for (let i = 0; i < f.length; i++) {
    // Compute individual terms of above formula
    let term = f[i].y;
    for (let j = 0; j < f.length; j++) {
      if (j != i)
        term = term * (xi - f[j].x) / (f[i].x - f[j].x);
    }

    // Add current term to result
    result += term;
  }

  return result;
}

const equals = (a, b) => Math.abs(a - b) < 0.01;

const calcDiff = (blocks, imageConfig) => {
  return imageConfig.staticValues.map(reference => {
    const extractedData = blocks.find(extracted => extracted.Text && extracted.Text.toUpperCase().startsWith(reference.text.toUpperCase()));

    if (!extractedData) {
      return null;
    }

    return {
      reference,
      extraction: {
        left: extractedData.Geometry.BoundingBox.Left,
        top: extractedData.Geometry.BoundingBox.Top,
      },
      diff: {
        left: extractedData.Geometry.BoundingBox.Left - reference.left,
        top: extractedData.Geometry.BoundingBox.Top - reference.top
      }
    }
  }).filter(v => !!v);
}

const analyzeWithPolygons = (textractData, imageConfig) => {
  const blocks = textractData.Blocks;
  const diff = calcDiff(blocks, imageConfig);

  const leftValuesList = diff.map(({ extraction, reference }) => ({ x: reference.left, y: extraction.left }))
  const topValuesList = diff.map(({ extraction, reference }) => ({ x: reference.top, y: extraction.top }))

  const dynamicValuesInterpolations = imageConfig.dynamicValues.map(({ left, top, fieldName }) => {
    const interpolatedTop = interpolate(topValuesList, top);
    const interpolatedLeft = interpolate(leftValuesList, left);
    const matches = blocks.filter((extracted) =>
      equals(extracted.Geometry.BoundingBox.Top, interpolatedTop)
      && equals(extracted.Geometry.BoundingBox.Left, interpolatedLeft)
    );
    const value = matches.sort((a, b) => b.Text.length - a.Text.length)[0];
    return {
      fieldName,
      left: interpolatedLeft,
      top: interpolatedTop,
      matches,
      value,
    }
  })

  return dynamicValuesInterpolations;
}

module.exports = {
  analyzeWithPolygons,
  calcDiff,
};
