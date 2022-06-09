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

const analyze = (data, imageConfig) => {
  const diff = imageConfig.staticValues.map(reference => {
    const extractedData = data.find(extracted => extracted.Text && extracted.Text.toUpperCase().startsWith(reference.text.toUpperCase()));
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
  })

  const leftValuesList = diff.map(({ extraction, reference }) => ({ x: reference.left, y: extraction.left }))
  const topValuesList = diff.map(({ extraction, reference }) => ({ x: reference.top, y: extraction.top }))

  const dynamicValuesInterpolations = imageConfig.dynamicValues.map(({ left, top, fieldName }) => {
    const interpolatedTop = interpolate(topValuesList, top);
    const interpolatedLeft = interpolate(leftValuesList, left);
    matches = data.filter((extracted) =>
      equals(extracted.Geometry.BoundingBox.Top, interpolatedTop)
      && equals(extracted.Geometry.BoundingBox.Left, interpolatedLeft)
    );
    const value = matches.sort((a, b) => a.Text.length - b.Text.length)[0];
    return {
      fieldName,
      left: interpolatedLeft,
      top: interpolatedTop,
      matches,
      value,
    }
  })

  return { ...dynamicValuesInterpolations };
}

module.exports = {
  analyze
};
