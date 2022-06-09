import React from 'react';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css'
import BeforeAfter from './beforeAfter/beforeAfter';
import Documents from './documents/documents';
import Header from './header/header';
import Footer from './footer/footer';

function App() {
  return (
    <div className="App">
      {/*<BeforeAfter />*/}
      <Header />
      <Documents />
      <Footer />
    </div>
  );
}

export default App;
