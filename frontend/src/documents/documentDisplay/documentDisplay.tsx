// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styles from './documentDisplay.module.scss';

interface IDocumentDisplayProps {
    documents: {fileName: string, base64: string}[]
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
