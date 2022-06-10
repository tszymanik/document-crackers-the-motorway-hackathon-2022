import React, {useState} from 'react';
import DocumentUpload from './documentUpload/documentUpload';
import DocumentDisplay from "./documentDisplay/documentDisplay";
import {IDocument} from "./document.model";
import styles from "./documents.module.scss";
import {ImagesService} from "../services/images.service";

interface IDocProps {
    backToList: () => void
}

const Documents = (props: IDocProps) => {
    const [documentState, setDocumentState] = useState<IDocument[]>([]);
    const imagesService: ImagesService = new ImagesService()

    const addDocument = (uploadedDocument: IDocument) => {
        setDocumentState([...documentState, uploadedDocument])
    }

    return (
        <div className={styles.container}>
            <h4> Document upload </h4>
            <DocumentUpload addDocument={addDocument}/>
            <DocumentDisplay documents={documentState} />
            <div className={styles.buttonContainer}>
                {!!documentState.length && (
                    <button className={styles.button} onClick={() => {
                        const payload = documentState.map((item, index) => {
                            item.fileName = `${new Date().getTime()}-page${index + 1}.jpg`
                            return item
                        })

                        imagesService.uploadImage(payload)
                            .then((r: any) => {
                                props.backToList();
                                setDocumentState([]);
                            })
                            .catch((e: any) => {
                                alert(':(')
                            });
                    }}>Make Request</button>
                )}
            </div>
        </div>
    )
}

export default Documents;
