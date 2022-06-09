import React, {useState} from 'react';
import styles from './documentUpload.module.scss';
import CropImageModal from "../../cropImageModal/CropImageModal";
import {IDocument} from "../document.model";

interface IFileInputProps {
    handleFileChange: (e: any) => void
    id: string
}

const FileInput = React.forwardRef((props: IFileInputProps, ref: any): JSX.Element => {
    const { handleFileChange, id } : IFileInputProps = props;

    return (
      <div ref={ref} className={styles.uploadButton}>
        <input
          ref={ref}
          id={id}
          onChange={handleFileChange}
          onClick={(event: any) => {
            event.target.value = null;
          }}
          type="file"
        />
        <label htmlFor={id}>
            {'Add Document'}
        </label>
      </div>
    );
});

interface IDocumentUploadProps {
    addDocument: (doc: IDocument) => void
}

const DocumentUpload = ({addDocument}: IDocumentUploadProps) => {
    const [currentFile, setCurrentFile] = useState(undefined)
    return (
        <>
            <form>
                <FileInput
                    handleFileChange={ (e: any) => {
                        setCurrentFile(e.target.files[0])
                    }}
                    id="uploadButton"
                />
            </form>
            {currentFile && (
                <CropImageModal
                    src={URL.createObjectURL(currentFile)}
                    image={currentFile}
                    applyCrop={(base64: any, fileName = 'page1.jpg') => {
                        addDocument({fileName, base64})
                        setCurrentFile(undefined); // will close modal
                    }}
                />
            )}
        </>
    )
}

export default DocumentUpload
