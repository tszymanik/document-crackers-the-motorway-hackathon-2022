import React, {useEffect, useState} from 'react';
import {ImagesService} from "../services/images.service";
import {IDocumentDetails} from "./documentDetails.model";

import styles from './documentDetails.module.scss'
import IlluminateBox from "../illuminateBox/illuminateBox";

interface IDocumentDetailsProps {
    id: string;
    url: string; // to remove
    back: () => void;
    imagePath: string
}

const DocumentDetails = (props: IDocumentDetailsProps) => {
    const [document, setDocument] = useState<IDocumentDetails[]>([]);
    const [image, setImage] = useState<any>(undefined);
    const imagesService: ImagesService = new ImagesService()

    useEffect(() => {
        getBaseInfo();
        loadImage();
    }, [props.id])

    const getBaseInfo = () => {
        imagesService.getSingle(props.id)
            .then((r: any) => {
                console.log('r', r);
                setDocument(r.data)
            })
            .catch((e: any) => {
                console.log('e', e);
            });
    }

    const loadImage = () => {
        imagesService.getImage(props.imagePath)
            .then((r: any) => {
                console.log('r', r);
                setImage(r.data);
            })
            .catch((e: any) => {
                console.log('e', e);
            });
    }

    if (!document) return null

    console.log('props.url', props.url)

    return (
        <div>
            <button onClick={() => {props.back()}}>back to the list</button>
            {document.map((single: IDocumentDetails, index: number) => (
                <div className={styles.singleDocWrapper}>
                    <h2>{index + 1}</h2>
                    {
                        Object.keys(single).map((key, index) => {
                            return (
                                <p>
                                    <span>{key}</span>
                                    <span>{JSON.stringify(single[key])}</span>
                                </p>
                            )
                        })
                    }
                    {/*{props.url && (*/}
                    {/*    <img src={props.url} alt=""/>*/}
                    {/*)}*/}

                    {image && (
                        <img src={image.base64} alt=""/>
                    )}
                    {image && (
                        <IlluminateBox leftTop={{x: 0, y:0}} rightBottom={{x: 1, y:1}} image={image.base64}/>
                    )}

                    {/*{props.imagePath && (*/}
                    {/*    <img src={props.imagePath} alt=""/>*/}
                    {/*)}*/}

                    <hr/>
                </div>
            ))}
        </div>
    )
}

export default DocumentDetails;
