import React, {useState} from 'react';
import DocumentUpload from './documentUpload/documentUpload';
import DocumentDisplay from "./documentDisplay/documentDisplay";
import {IDocument} from "./document.model";
import styles from "./documents.module.scss";
import {ImagesService} from "../services/images.service";


const Documents = () => {
    const [documentState, setDocumentState] = useState<IDocument[]>([]);
    const imagesService: ImagesService = new ImagesService()

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

            {!!documentState.length && (
                <button className={styles.button} onClick={() => {
                    imagesService.uploadImage(documentState)
                        .then((r: any) => {
                            alert('OK');
                            setDocumentState([]);
                        })
                        .catch((e: any) => {
                            alert(':(')
                        });
                }}>make request</button>
            )}
        </div>
    )
}

export default Documents;
