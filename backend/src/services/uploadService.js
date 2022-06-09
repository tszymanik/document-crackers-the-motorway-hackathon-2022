const { S3 } = require('aws-sdk');
const s3 = new S3({
  accessKeyId: 'ASIA4DBU3L76QVIAKFM6',
  secretAccessKey: 'ZFQB5MkO5Nve4w9v4QSkXoaOb63ZxfKbDZ33qBa5',
  region: 'eu-west-1'
});

const uploadToS3 = async (fileBuffer, fileName) => {
  const params = {
    Bucket: 'document-crackers-2022',
    Key: `images/${fileName}`,
    Body: fileBuffer
  };
  try {
    await s3.putObject(params).promise();
    console.log('HURRA', fileBuffer, fileName);
  } catch (e) {
    console.log('ZJEBANE')
  }
  return;
};

module.exports = { uploadToS3 };
