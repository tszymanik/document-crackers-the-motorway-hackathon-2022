import React from 'react';
import './App.css';
import BeforeAfter from './beforeAfter/beforeAfter';
import Documents from './documents/documents';
import Header from './header/header';

function App() {
  return (
    <div className="App">
      {/*<BeforeAfter />*/}
      <Header></Header>
      <Documents />
    </div>
  );
}

export default App;
