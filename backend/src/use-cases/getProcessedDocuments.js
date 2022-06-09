const { S3 } = require('aws-sdk');
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
});

const listProcessedDocuments = async () => {
    const processedObjectList = await s3.listObjects({
        Bucket: 'document-crackers-2022',
        Prefix: 'images-data/'
    }).promise();
    return processedObjectList.Contents.splice(1).map((obj) => obj.Key);
}

const getProcessedDocument = async (documentId) => {
    const document = await s3.getObject({
        Bucket: 'document-crackers-2022',
        Key: `images-data/${documentId}`
    }).promise();
    return Buffer.from(document.Body).toString('utf8');
}

module.exports = { getProcessedDocument, listProcessedDocuments };
