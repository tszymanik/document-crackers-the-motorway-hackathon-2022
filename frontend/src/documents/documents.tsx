// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import DocumentUpload from './documentUpload/documentUpload';
import DocumentDisplay from "./documentDisplay/documentDisplay";


const Documents = () => {
    const [documentState, setDocumentState] = useState([]);

    const addDocument = (fileName: string, base64: string) => {
        const uploadedDocument = {
            fileName, base64
        };
        setDocumentState([...documentState, uploadedDocument])
    }

    return (
        <div>
            <h4> Document upload </h4>
            <span> documents go here </span>
            <DocumentUpload addDocument={addDocument}/>
            <DocumentDisplay documents={documentState} />
        </div>
    )
}

export default Documents;
