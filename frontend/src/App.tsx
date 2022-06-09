import React from 'react';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css'
import BeforeAfter from './beforeAfter/beforeAfter';
import Documents from './documents/documents';

function App() {
  return (
    <div className="App">
      {/*<BeforeAfter />*/}
      <Documents />
    </div>
  );
}

export default App;
