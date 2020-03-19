import React from "react";
import * as csv from "csvtojson";
import Chooser from "./Chooser";
import Graph from "./Graph";
import UserNotes from "./UserNotes";
import Modal from "./Modal";
import "../assets/App.css";

const { ipcRenderer } = window.require("electron");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      trainedJson: null,
      dataSet: null,
      jsonFile: null,
      csvFile: null,
      notes: "No notes",
      fileName: "std_json_file",
      isTrainingDone: false
    };
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({
      showModal: true
    });
  };

  handleCloseModal = e => {
    e.preventDefault();
    this.setState({
      showModal: false
    });
  };

  handleChangeNotes = e => {
    this.setState({
      notes: e.target.value
    });
  };

  handleChangeFileName = e => {
    this.setState({
      fileName: e.target.value
    });
  };

  handleSaveJson = e => {
    e.preventDefault();
    const obj = {
      name: this.state.fileName,
      json: this.state.trainedJson,
      notes: this.state.notes
    };
    ipcRenderer.send("save-to-disk", obj);
    this.handleCloseModal(e);
  };

  handleStartTraining = e => {
    e.preventDefault();
    const obj = {
      data: this.state.dataSet,
      notes: this.state.notes
    };
    ipcRenderer.send("start-training", obj);
    ipcRenderer.on("finished-training", () => {
      this.setState({
        isTrainingDone: true
      });
    });
  };

  csvToJson = file => {
    const reader = new FileReader();
    const app = this;
    reader.onload = function(e) {
      const txt = reader.result;
      csv({
        delimiter: "auto"
      })
        .fromString(txt)
        .then(jsonObj => {
          app.setState({
            dataSet: jsonObj
          });
        });
    };
    reader.readAsText(file);
  };

  onChange = e => {
    let obj = null;
    if (e.target.files[0]) {
      obj = this.getFileInfo(e.target.files[0]);
    }
    if (obj) {
      switch (obj.type) {
        case "application/json":
          this.setState({
            jsonFile: obj
          });
          break;
        default:
          this.csvToJson(e.target.files[0]);
          this.setState({
            csvFile: obj
          });
          break;
        // default:
        //   throw console.error("Il file selezionato non è del tipo corretto");
      }
    } else {
      console.log("Il file è nullo");
    }
  };

  getFileInfo = file => {
    return {
      name: file.name,
      path: file.path,
      type: file.type
    };
  };

  render() {
    const group = (
      <>
        <div className="graphContainer">
          <Graph data={this.state.dataSet} />
        </div>

        <div className="infoContainer">
          <UserNotes
            handleChange={this.handleChangeNotes}
            value={this.state.notes}
          />
        </div>
      </>
    );

    return (
      <div className="App">
        <span>VRAM Software Applicativo Esterno - PoC 3</span>
        <div className="contentContainer">
          {this.state.dataSet !== null ? group : null}
        </div>
        <div className="fileChooserContainer">
          <form className="fileChooserForm">
            <div>
              <Chooser
                type="csv"
                onChange={this.onChange}
                isFileChosen={!!this.state.csvFile}
              />
              <span>
                {this.state.csvFile
                  ? this.state.csvFile.name
                  : "Nessun file selezionato"}
              </span>
            </div>
            <div>
              <Chooser
                type="json"
                onChange={this.onChange}
                isFileChosen={!!this.state.jsonFile}
              />
              <span>
                {this.state.jsonFile
                  ? this.state.jsonFile.name
                  : "Nessun file selezionato"}
              </span>
            </div>
            {this.state.csvFile ? (
              <button
                className="customButton"
                onClick={this.handleStartTraining}
              >
                Inizia addestramento
              </button>
            ) : (
              <button className="customButtonDisabled" disabled>
                Inizia addestramento
              </button>
            )}
            {this.state.isTrainingDone ? (
              <button className="customButton" onClick={this.handleOpenModal}>
                Salva json
              </button>
            ) : (
              <button className="customButtonDisabled" disabled>
                Salva json
              </button>
            )}
          </form>
        </div>
        {this.state.showModal ? (
          <Modal
            close={this.handleCloseModal}
            change={this.handleChangeFileName}
            save={this.handleSaveJson}
            value={this.state.fileName}
          />
        ) : null}
      </div>
    );
  }
}
