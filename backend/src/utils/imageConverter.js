const BASE_REGEXP = /^data:image\/jpeg;base64,(.*)$/;

const convertFromBaseToImageBuffer = (base64Image) => {
    const matches = BASE_REGEXP.exec(base64Image);
    if (!matches[1]) {
        return undefined
    }
    return Buffer.from(matches[1], 'base64');
};


module.exports = { convertFromBaseToImageBuffer }
