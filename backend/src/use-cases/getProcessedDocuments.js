const { S3 } = require('aws-sdk');

const s3 = new S3({
    accessKeyId: 'ASIA4DBU3L76QVIAKFM6',
    secretAccessKey: 'ZFQB5MkO5Nve4w9v4QSkXoaOb63ZxfKbDZ33qBa5',
    region: 'eu-west-1'
});

const bucketUrl = 'https://document-crackers-2022.s3.eu-west-1.amazonaws.com/'

const listProcessedDocuments = async () => {
    const processedObjectList = await s3.listObjects({
        Bucket: 'document-crackers-2022',
        Prefix: 'images-data/'
    }).promise();

    const imagesList = await s3.listObjects({
        Bucket: 'document-crackers-2022',
        Prefix: 'images/'
    }).promise();

    const [images, objects] = await Promise.all([imagesList, processedObjectList]);

    const imagesData = images.Contents.splice(1).map((obj) => obj.Key)
    const objectsData = objects.Contents.splice(1).map((obj) => obj.Key)

    const ret = imagesData.map((image) => {
        const dataFileName = image.replace('.','-') + '.json';

        return {
           imageFile: `${bucketUrl}images/${image}`,
           dataFile: `${bucketUrl}images-data/${objectsData.includes(dataFileName) ? dataFileName : null}`
        }
    });

    //return processedObjectList.Contents.splice(1).map((obj) => obj.Key);
    return ret
}

const getProcessedDocument = async (documentId) => {
    const document = await s3.getObject({
        Bucket: 'document-crackers-2022',
        Key: `images-data/${documentId}`
    }).promise();
    return Buffer.from(document.Body).toString('utf8');
}

module.exports = { getProcessedDocument, listProcessedDocuments };
