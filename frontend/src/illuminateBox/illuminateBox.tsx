import React from 'react';
import ReactCrop, {Crop} from 'react-image-crop'

import styles from './illuminateBox.module.scss';

type Cor = {
    x: number, // like a percent - from 0 to 1
    y: number,
}

interface IIlluminateBoxProps {
    leftTop: Cor,
    rightBottom: Cor
    image: string // url
}

const IlluminateBox = (props: IIlluminateBoxProps) => {

    const convertCoordinates = (leftTop: Cor, rightBottom: Cor): Crop => {
        return {
            unit: '%',
            x: leftTop.x * 100,
            y: leftTop.y * 100,
            width: (rightBottom.x - leftTop.x) * 100,
            height: (rightBottom.y - leftTop.y) * 100,
        }
    }

    const crop: Crop = convertCoordinates(props.leftTop, props.rightBottom)

    return (
        <div className={styles.wrapper}>
            <ReactCrop
                crop={crop}
                onChange={() => {}}
                locked
            >
                <img src={props.image} alt=""/>
            </ReactCrop>
        </div>
    );
}

export default IlluminateBox
