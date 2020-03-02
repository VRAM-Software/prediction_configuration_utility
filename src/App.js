import React from 'react';
import * as csv from "csvtojson";
import Chooser from './components/Chooser';
import LinearGraph from './components/Graph';
import './App.css';
const { ipcRenderer } = window.require('electron');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: null,
      jsonFile: null,
      csvFile: null
    }
  }

  handleSaveJson = e => {
    e.preventDefault();
    ipcRenderer.send('save-to-disk', "fileName");
  }

  handleStartTraining = e => {
    e.preventDefault();
    let obj = {
        data: this.state.dataSet,
        notes: "asdasd"
    };
    ipcRenderer.send('start-training', obj);
  }

  csvToJson = (file) => {
    let reader = new FileReader();
    var app = this;
    reader.onload = function (e) {
      let txt = reader.result;
      csv({
        delimiter: 'auto'
      })
        .fromString(txt)
        .then((jsonObj) => {
          app.setState({
            dataSet: jsonObj
          })
          console.log(jsonObj);
        })
    }
    reader.readAsText(file);
  }

  onChange = e => {
    let obj = null;
    if (e.target.files[0])
      obj = this.getFileInfo(e.target.files[0]);

    if (obj) {
      switch (obj.type) {
        case "application/json":
          this.setState({
            jsonFile: obj
          })
          break;
        case "text/csv":
          this.csvToJson(e.target.files[0]);
          this.setState({
            csvFile: obj
          })
          break;
        default:
          throw console.error("Il file selezionato non è del tipo corretto");
      }
    } else {
      console.log("il file è nullo!!!")
    }
  }

  getFileInfo = file => {
    return {
      name: file.name,
      path: file.path,
      type: file.type
    };
  }

  render() {
    return (
      <div className="App">
        VRAM Software Web App - PoC 1
        <div>
          {
            this.state.dataSet !== null ?
              <LinearGraph data={this.state.dataSet} />
              :
              null
          }
        </div>
        <div className="fileChooserContainer">
          <form className="fileChooserForm" onSubmit={this.sendInfo}>
            <div>
              <Chooser
                type="csv"
                onChange={this.onChange}
                isFileChosen={this.state.csvFile ? true : false}
              />
              <span> {this.state.csvFile ? this.state.csvFile.name : "Nessun file selezionato"}  </span>
            </div>
            <div>
              <Chooser
                type="json"
                onChange={this.onChange}
                isFileChosen={this.state.jsonFile ? true : false}
              />
              <span>
                {this.state.jsonFile ? this.state.jsonFile.name : "Nessun file selezionato"}
              </span>
            </div>

            

            <button className="customButton" onClick={this.handleStartTraining}>Inizia Addestramento</button>
            <button className="customButton" onClick={this.handleSaveJson}>Salva json</button>
          </form>
        </div>
      </div>
    );
  }
}