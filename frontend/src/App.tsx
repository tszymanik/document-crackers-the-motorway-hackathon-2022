import React from 'react';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css'
import BeforeAfter from './beforeAfter/beforeAfter';
import Documents from './documents/documents';
import Header from './header/header';

function App() {
  return (
    <div className="App">
      {/*<BeforeAfter />*/}
      <Header />
      <Documents />
    </div>
  );
}

export default App;
