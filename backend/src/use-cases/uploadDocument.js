const {uploadToS3} = require("../services/uploadService");
const {convertFromBaseToImageBuffer} = require("../utils/imageConverter");

const REQUIRED_ELEMENTS = ['page1', 'page2', 'page3'];

const verifyFilenames = (filenames) => {
    return filenames.every((filename) => REQUIRED_ELEMENTS.some((requiredElement) => filename.includes(requiredElement)));
}

const uploadDocument = async (photos) => {
    let photosToProcess = photos;
    if (!Array.isArray(photos)) {
        photosToProcess = [photosToProcess];
    }
    if (!verifyFilenames(photosToProcess.map((photo) => photo.fileName))) {
        throw new Error('Wrong filenames!');
    }
    const processedImages = [];
    for (const photoFile of photosToProcess) {
        const imageBuffer = convertFromBaseToImageBuffer(photoFile.base64);
        await uploadToS3(imageBuffer, photoFile.fileName);
        processedImages.push(photoFile.fileName.split('.').join('-') + '.json');
    }
    return processedImages;
};

module.exports = { uploadDocument };
