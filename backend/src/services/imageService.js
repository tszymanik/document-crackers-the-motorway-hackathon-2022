const { S3 } = require('aws-sdk');
const s3 = new S3({
    /*accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'*/
});

const getImage = async (imageId) => {
    const document = await s3.getObject({
        Bucket: 'document-crackers-2022',
        Key: `images/${imageId}`
    }).promise();
    const [name, ext] = imageId.split('.');
    return { fileName: imageId, base64: `data:image/${ext};base64,${Buffer.from(document.Body).toString('base64')}`};
}

module.exports = { getImage };
