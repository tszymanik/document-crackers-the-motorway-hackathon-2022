import React  from 'react';
import styles from './documentDisplay.module.scss';
import {IDocument} from "../document.model";

interface IDocumentDisplayProps {
    documents: IDocument[]
}

const DocumentDisplay = ({ documents }: IDocumentDisplayProps) => {
    if (!documents || !documents.length) return null
    return (
        <>
            <h4> Your documents </h4> 
            <div className={styles.documentImages}>
            {documents.map((item) => (
                <div key={item.base64} className={styles.imageWrapper}>
                    <img src={item.base64} alt={item.base64}></img>
                </div>
            ))}
            </div>
        </>
    )
}

export default DocumentDisplay
