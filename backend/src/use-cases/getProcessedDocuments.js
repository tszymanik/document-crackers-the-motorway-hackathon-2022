const { S3 } = require('aws-sdk');

const s3 = new S3({
    /*accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'*/
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

    const imagesData = imagesList.Contents.splice(1).map((obj) => obj.Key)
    const objectsData = processedObjectList.Contents.splice(1).map((obj) => obj.Key)

    const ret = imagesData.map((image) => {
        const dataFileName = image.replace('.','-').replace('images/', 'images-data/') + '.json';
        const dataId = objectsData.includes(dataFileName) ? dataFileName : null;

        return {
            imagePath: `/${image}`,
           imageFile: `${bucketUrl}images/${image}`,
           dataFile: dataId ? `${bucketUrl}images-data/${dataId}`: null,
           dataId: dataId ? dataId.replace('images-data/', '') : null,
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
