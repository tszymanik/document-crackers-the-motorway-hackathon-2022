// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styles from './documentUpload.module.scss';

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
            <div className={styles.documentImages}>
                <img src={document.imageUrl} alt={document.imageUrl}></img>
            </div>
        )
    });
}

const DocumentUpload = (props) => {
    const { handleFileChange, documents } = props;
    return (
        <form>
            <FileInput component={FileInput} handleFileChange={ (e) => { handleFileChange(e)}} id="uploadButton" />
            <div>{documents.length && renderImages(documents)}</div>
        </form>
    )
}

export default DocumentUpload
