require('dotenv-defaults/config');

const { Textract } = require('aws-sdk');
const textract = new Textract();
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const bootstrap = async() => {
  const contents = readFileSync(path.join(__dirname, './images/v5-1.png'));
  const params = {
    Document: {
      Bytes: contents,
    }
  };
  textract.detectDocumentText(params, (err, data) => {
    console.log(err, 'error');
    console.log(data);
    writeFileSync('results/result.json', JSON.stringify(data))
  });
};

bootstrap();