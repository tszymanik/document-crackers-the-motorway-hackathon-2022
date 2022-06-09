// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import DocumentUpload from './documentUpload/documentUpload';


const Documents = () => {
    const [documentState, setDocumentState] = useState([]);

    const handleFileChange : any = (event) => {
        const documentArray = documentState;
        const uploadedDocument = {
            file: event.target.files[0],
            imageUrl: URL.createObjectURL(event.target.files[0]),
        };

        documentArray.push(uploadedDocument);
        
        setDocumentState([...documentArray]);
    }

    return (
        <div>
            <h4> Document upload </h4>
            <span> documents go here </span>
            <DocumentUpload handleFileChange={handleFileChange} documents={documentState}> </DocumentUpload>
        </div>
    )
}

export default Documents;