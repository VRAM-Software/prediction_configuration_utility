import React from 'react';
import FileChooser from './components/FileChooser';
import Graph from './components/Graph';
import './App.css';


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        VRAM Software Web App - PoC 1
        <Graph />
        <FileChooser />
      </div>
    );
  }
}
