// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const getCroppedImgBlob = (image, pixelCrop, fileName): Promise<any> => {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    console.log('pixelCrop', pixelCrop)

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(file => {
            file.name = fileName;
            resolve(file);
        }, "image/jpeg");
    });
}

export const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}
