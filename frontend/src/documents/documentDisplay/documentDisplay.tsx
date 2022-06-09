// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import styles from '../documentUpload/documentUpload.module.scss';
import CropImageModal from "../../cropImageModal/CropImageModal";


interface IDocumentDisplayProps {
    documents: {fileName: string, base64: string}[]
}

const DocumentDisplay = ({ documents }: IDocumentDisplayProps) => {
    if (!documents || !documents.length) return null
    return (
        <div>
            {documents.map((item) => (
                <div className={styles.documentImages} key={item.base64}>
                    <img src={item.base64} alt={item.base64}></img>
                </div>
            ))}
        </div>
    )
}

export default DocumentDisplay
