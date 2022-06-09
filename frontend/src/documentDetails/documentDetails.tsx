import React, {useEffect, useState} from 'react';
import {ImagesService} from "../services/images.service";
import {IDocumentDetails} from "./documentDetails.model";

interface IDocumentDetailsProps {
    id: string;
    url: string
    back: () => void
}

const DocumentDetails = (props: IDocumentDetailsProps) => {
    const [document, setDocument] = useState<IDocumentDetails[]>([]);
    const imagesService: ImagesService = new ImagesService()

    useEffect(() => {
        imagesService.getSingle(props.id)
            .then((r: any) => {
                console.log('r', r);
                setDocument(r.data)
            })
            .catch((e: any) => {
                console.log('e', e);
            });
    }, [props.id])

    if (!document) return null
    
    console.log('props.url', props.url)

    return (
        <div>
            <button onClick={() => {props.back()}}>back to the list</button>
            {document.map((single: IDocumentDetails, index: number) => (
                <div>
                    <h2>{index + 1}</h2>
                    <p>{JSON.stringify(single)}</p>
                    {props.url && (
                        <img src={props.url} alt=""/>
                    )}
                </div>
            ))}
        </div>
    )
}

export default DocumentDetails;
