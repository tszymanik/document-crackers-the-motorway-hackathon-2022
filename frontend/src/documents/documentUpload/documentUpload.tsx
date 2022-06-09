// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import styles from './documentUpload.module.scss';
import CropImageModal from "../../cropImageModal/CropImageModal";

const FileInput = React.forwardRef((props, ref: any) => {
    const {
      handleFileChange, id,
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
            {'submit document'}
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

const DocumentUpload = (props) => {
    const [currentFile, setCurrentFile] = useState(undefined)
    return (
        <>
            <form>
                <FileInput
                    handleFileChange={ (e) => {
                        setCurrentFile(e.target.files[0])
                    }}
                    id="uploadButton"
                />
            </form>
            {currentFile && (
                <CropImageModal
                    src={URL.createObjectURL(currentFile)}
                    image={currentFile}
                    applyCrop={(bases64: any) => {
                        props.addDocument('name.jpg', bases64)
                        setCurrentFile(undefined); // will close modal
                    }}
                />
            )}
        </>
    )
}

export default DocumentUpload
