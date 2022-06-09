import { Crop } from "react-image-crop";

export const getCroppedImgBlob = (image: CanvasImageSource, pixelCrop: Crop, fileName: string): Promise<any> => {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

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
            // @ts-ignore
            file.name = fileName;
            resolve(file);
        }, "image/jpeg");
    });
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        // @ts-ignore
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}
