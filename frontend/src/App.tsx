import React, { useState } from 'react';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css'
import AddDocuments from './documents/documents';
import Header from './header/header';
import Footer from './footer/footer';
import DocumentsList from "./documentsList/documentsList";
import {IUploadedDocumentOnList} from "./documentsList/uploadedDocument.model";
import DocumentDetails from "./documentDetails/documentDetails";

function App() {
    const [view, setView] = useState<'list' | 'add' | 'details'>('list')
    const [details, setDetails] = useState<IUploadedDocumentOnList | undefined>(undefined)

    return (
        <div className="App">
            <Header/>
            <button onClick={() => setView('list')} >list</button>
            <button onClick={() => setView('add')} >add</button>
            {view === 'add' && (
                <AddDocuments/>
            )}
            {view === 'list' && (
                <DocumentsList goToDetails={(item: IUploadedDocumentOnList) => {
                    setView('details')
                    setDetails(item)
                }}/>
            )}

            {view === 'details' && details?.dataId && details.imageFile && (
                <DocumentDetails id={details.dataId} url={details.imageFile} back={() => {setView('list')}} />
            )}
            <Footer/>
        </div>
    );
}

export default App;
