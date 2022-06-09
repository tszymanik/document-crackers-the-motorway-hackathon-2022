import React  from 'react';
import styles from '../documentUpload/documentUpload.module.scss';
import {IDocument} from "../document.model";

interface IDocumentDisplayProps {
    documents: IDocument[]
}

const DocumentDisplay = ({ documents }: IDocumentDisplayProps) => {
    if (!documents || !documents.length) return null
    return (
        <div className={styles.documentImages}>
            {documents.map((item) => (
                <div key={item.base64}>
                    <img src={item.base64} alt={item.base64}></img>
                </div>
            ))}
        </div>
    )
}

export default DocumentDisplay
