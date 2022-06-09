import React, {useState} from 'react';
import DocumentUpload from './documentUpload/documentUpload';
import DocumentDisplay from "./documentDisplay/documentDisplay";
import {IDocument} from "./document.model";
import styles from "./documents.module.scss";


const Documents = () => {
    const [documentState, setDocumentState] = useState<IDocument[]>([]);

    const addDocument = (uploadedDocument: IDocument) => {
        setDocumentState([...documentState, uploadedDocument])
    }

    return (
        <div>
            <h4> Document upload </h4>
            <div className={styles.container}>
                <DocumentUpload addDocument={addDocument}/>
                <DocumentDisplay documents={documentState} />
            </div>
        </div>
    )
}

export default Documents;
