const {uploadToS3} = require("../services/uploadService");
const {convertFromBaseToImageBuffer} = require("../utils/imageConverter");

const uploadDocument = async (photos) => {
    let photosToProcess = photos;
    if (!Array.isArray(photos)) {
        photosToProcess = [photosToProcess];
    }
    for (const photoFile of photosToProcess) {
        const imageBuffer = convertFromBaseToImageBuffer(photoFile.base64);
        await uploadToS3(imageBuffer, photoFile.fileName);
    }
    return;
};

module.exports = { uploadDocument };
