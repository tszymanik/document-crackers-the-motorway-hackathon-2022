import React from 'react';
import logo from './logo.svg';
import './App.css';
import BeforeAfter from './beforeAfter/beforeAfter';
import DocumentUpload from './documentUpload/documentUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <BeforeAfter />
      <DocumentUpload />
    </div>
  );
}
// add the react form..

export default App;
