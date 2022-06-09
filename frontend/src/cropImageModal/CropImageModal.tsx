import React, {useState, ChangeEvent, useRef, useEffect} from 'react';
import ReactCrop, {Crop} from 'react-image-crop'
import styles from './CropImageModal.module.scss';
import {blobToBase64, getCroppedImgBlob} from "./cropImageHelper";

interface ICropImageProps {
    src: string;
    image: any;
    applyCrop: (base64Image: string, fileName?: string) => void
}

const defaultCrop: Crop = {
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
}

const CropImageModal = (props: ICropImageProps) => {
    const [crop, setCrop] = useState<Crop>(defaultCrop) // in &

    const imgRef = useRef<HTMLImageElement>(null)

    const apply = () => {
        const img = document.getElementsByTagName("img")[0];
        const tempImg = new Image();
        tempImg.src = img.getAttribute('src') as string
        const fileName = `image-${new Date().getTime()}.jpg`

        getCroppedImgBlob(
            img,
            {
                x: crop.x / 100 * tempImg.width,
                y: crop.y / 100 * tempImg.height,
                width: crop.width / 100 * tempImg.width,
                height: crop.height / 100 * tempImg.height,
                unit: 'px'
            },
            fileName
        ).then((blob: any) => {
            blobToBase64(blob)
                .then((base64: string) => {
                    props.applyCrop(base64, fileName)
                })
        })
    }

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} />
            <div className={styles.content}>
                <ReactCrop
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={props.src}
                        // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        // onLoad={onImageLoad}
                    />
                </ReactCrop>
                <button className={styles.button} onClick={apply}>Apply</button>
            </div>
        </div>
    )
}

export default CropImageModal
