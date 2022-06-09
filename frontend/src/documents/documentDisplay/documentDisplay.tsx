import React  from 'react';
import styles from '../documentUpload/documentUpload.module.scss';
import {IDocument} from "../document.model";

interface IDocumentDisplayProps {
    documents: IDocument[]
}

const DocumentDisplay = ({ documents }: IDocumentDisplayProps) => {
    if (!documents || !documents.length) return null
    return (
        <div>
            {documents.map((item: IDocument) => (
                <div className={styles.documentImages} key={item.base64}>
                    <img src={item.base64} alt={item.base64}/>
                </div>
            ))}
        </div>
    )
}

export default DocumentDisplay
