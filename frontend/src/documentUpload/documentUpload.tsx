// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import styles from './documentUpload.module.scss';


const FileInput = React.forwardRef((props, ref: any) => {
    const {
      children, handleFileChange, id,
    } : any = props;

    return (
      <div ref={ref} className={styles.uploadButton}>
        <input
          ref={ref}
          id={id}
          onChange={handleFileChange}
          onClick={(event) => {
            // to allow the same file be uploaded again
            event.target.value = null;
          }}
          type="file"
        />
        <label htmlFor={id}>
          {children}
        </label>
      </div>
    );
});

const renderImages = (documents) => {
    return documents.map((document) => {
        return(
            <div className={styles.documentImages} key={document.imageUrl}>
                <img src={document.imageUrl} alt={document.imageUrl}></img>
            </div>
        )
    });
}

const DocumentUpload = () => {
    const [documentState, setDocumentState] = useState([]);

    const handleFileChange : any = (event) => {
        const documentArray = documentState;
        const uploadedDocument = {
            file: event.target.files[0],
            imageUrl: URL.createObjectURL(event.target.files[0]),
        };

        documentArray.push(uploadedDocument)

        console.log('updatedDocument state', documentArray);

        setDocumentState(documentArray);
    }

    return (
        <div>
            <h4> Document upload </h4>
            <span> documents go here </span>

            <form>
                <FileInput component={FileInput} handleFileChange={ (e) => { handleFileChange(e)}} id="uploadButton">
                    {'submit document'}
                </FileInput>
                <span> images </span>
                <div> {documentState.length && renderImages(documentState)}</div>
            </form>
        </div>
    )
}

export default DocumentUpload
