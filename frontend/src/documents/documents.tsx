import React, {useState} from 'react';
import DocumentUpload from './documentUpload/documentUpload';
import DocumentDisplay from "./documentDisplay/documentDisplay";
import {IDocument} from "./document.model";


const Documents = () => {
    const [documentState, setDocumentState] = useState<IDocument[]>([]);

    const addDocument = (uploadedDocument: IDocument) => {
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
