const { S3 } = require('aws-sdk');
const s3 = new S3({
  /*accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-1'*/
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
