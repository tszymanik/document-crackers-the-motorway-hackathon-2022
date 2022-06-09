import React, {useEffect, useState} from 'react';
import {IUploadedDocumentOnList} from "./uploadedDocument.model";
import {ImagesService} from "../services/images.service";
import {inspect} from "util";
import styles from './documentsList.module.scss'

interface IDocumentsListProps {
    goToDetails: (item: IUploadedDocumentOnList) => void;
}

const DocumentsList = (props: IDocumentsListProps) => {
    const [documents, setDocuments] = useState<IUploadedDocumentOnList[]>([]);
    const imagesService: ImagesService = new ImagesService()

    useEffect(() => {
        imagesService.getList()
            .then((r: any) => {
                setDocuments(r.data)
                console.log('r', r);
            })
            .catch((e: any) => {
                console.log('e', e);
            });
    }, [])


    return (
        <div className={styles.wrapper}>
            <ul>
                {documents.map((item: any, index: number) => (
                    <li
                        key={`${item.dataId}-${index}`}
                        onClick={() => {
                            if (item.dataId) {
                                props.goToDetails(item)
                            }
                        }}
                    >
                        {index + 1} - {item.dataId} {!item.dataId ? 'processing' : ''}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DocumentsList;
