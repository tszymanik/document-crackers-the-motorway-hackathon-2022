const { readFileSync, writeFileSync } = require('fs');
// const filename = 'TEST_V5_P2.jpg.json.js';
const filename = 'TEST_V5_P2_rotated_20.jpg.json.js';
const bigData = require('./'+filename);
// console.log(bigData);
// console.log(bigData.Blocks.filter(item => {
//   return item.BlockType === 'PAGE';
// }));
//
// return
const findText = (content, type, text) => {
  return content.Blocks.filter((item) =>
    item.BlockType === type && item?.Text.includes(text)
  )
}

const f = (text) => {
  return findText(bigData, 'LINE', text);
}

const texts = [
  'Vehicle details',
  'D.1: Make',
  'Euro status',
  'Change my vehicle details',
  'Selling or transferring my vehicle to a new keeper',
]

const foundTexts = texts.map(f);
writeFileSync('found_' + filename + '.json', JSON.stringify(foundTexts))

console.log(foundTexts);
