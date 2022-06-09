// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState, ChangeEvent, useRef, useEffect} from 'react';
import ReactCrop, {Crop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {PercentCrop, PixelCrop} from "react-image-crop/dist/types";
import styles from './CropImageModal.module.scss';
import {blobToBase64, getCroppedImgBlob} from "./cropImageHelper";

interface ICropImageProps {
    src: string;
    image: any;
    applyCrop: (base64Image: string) => void
}

const defaultCrop: Crop = {
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
}

const CropImageModal = (props: ICropImageProps) => {
    const [crop, setCrop] = useState<Crop>(defaultCrop)

    const imgRef = useRef<HTMLImageElement>(null)

    const apply = () => {
        getCroppedImgBlob(
            document.getElementsByTagName("img")[0],
            crop,
            'some.jpg'
        ).then((blob: any) => {
            blobToBase64(blob)
                .then((base64: string) => {
                    console.log('base64', base64)
                    props.applyCrop(base64)
                })
        })
    }

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} />
            <div className={styles.content}>
                <ReactCrop
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
                    // onComplete={(c) => onComplete}
                    // aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={props.src}
                        // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        // onLoad={onImageLoad}
                    />
                </ReactCrop>
                <button onClick={apply}>apply</button>
            </div>
        </div>
    )
}

export default CropImageModal
