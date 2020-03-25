import React from "react";
import * as csv from "csvtojson";
import Chooser from "./Chooser";
import Graph from "./Graph";
import UserNotes from "./UserNotes";
import Modal from "./Modal";
import "../assets/App.css";
import CheckBox from "./CheckBox";
import config from "../config/config";
import test from "./test";
const { ipcRenderer } = window.require("electron");

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            userNotes: "",
            notesPredittore: "",
            fileName: "addestramento",
            isTrainingDone: false,
            isModalEnabled: false,
            jsonFileInfo: null,
            csvFileInfo: null,
            trainedJson: null,
            algorithm: "svm",
            isTraining: false
        };
    }

    handleOpenModal = e => {
        e.preventDefault();
        this.setState({
            isModalEnabled: true
        });
    };

    handleCloseModal = e => {
        e.preventDefault();
        this.setState({
            isModalEnabled: false
        });
    };

    handleChangeNotes = e => {
        this.setState({
            userNotes: e.target.value
        });
    };

    handleChangeNotesPredittore = e => {
        this.setState({
            notesPredittore: e.target.value
        });
    };

    handleChangeFileName = e => {
        this.setState({
            fileName: e.target.value
        });
    };

    handleSaveJson = e => {
        e.preventDefault();
        ipcRenderer.send("save-to-disk", {
            name: this.state.fileName,
            notes: this.state.userNotes
        });
        this.handleCloseModal(e);
    };

    handleStartTraining = e => {
        e.preventDefault();
        this.setState({
            isTraining: true
        });
        ipcRenderer.send("start-training", {
            data: this.state.userData,
            notes: this.state.userNotes
        });
        ipcRenderer.on("finished-training", (event, arg) => {
            this.setState({
                isTrainingDone: true,
                isTraining: false,
                trainedJson: arg
            });
        });
    };

    // translate this method to a call to main Process
    csvToJson = file => {
        const reader = new FileReader();
        const app = this;
        reader.onload = function(e) {
            const txt = reader.result;
            csv({
                delimiter: "auto"
            })
                .fromString(txt)
                .then(res => {
                    app.setState({
                        userData: res
                    });
                });
        };
        reader.readAsText(file);
    };

    onChange = e => {
        if (e.target.files[0]) {
            const obj = this.getFileInfo(e.target.files[0]);
            if (obj.extension === "json") {
                this.setState({
                    jsonFileInfo: obj
                });
            } else if (obj.extension === "csv") {
                this.csvToJson(e.target.files[0]);
                this.setState({
                    csvFileInfo: obj
                });
            } else {
                console.log("Il file non è corretto");
            }
        } else {
            console.log("Il file è nullo");
        }
    };

    getFileInfo = file => {
        return {
            name: file.name,
            path: file.path,
            type: file.type,
            extension: file.name.split(".").pop()
        };
    };

    handleChangeAlgorithm = algorithm => {
        if (algorithm !== this.state.algorithm) {
            this.setState(
                {
                    algorithm: algorithm
                },
                () => {
                    console.log(this.state);
                }
            );
        } else {
            console.log("Algoritmo scelto è già inizializzato");
        }
    };

    render() {
        const group = (
            <>
                <div className="graphContainer">
                    <Graph
                        data={this.state.userData}
                        result={this.state.trainedJson}
                    />
                </div>

                <div className="infoContainer">
                    <CheckBox
                        algorithms={config.algorithms}
                        handleCheckBox={this.handleChangeAlgorithm}
                        algorithm={this.state.algorithm}
                    />
                    <h3 className="margin-top-medium">
                        Inserisci note del predittore
                    </h3>
                    <UserNotes
                        handleChange={this.handleChangeNotesPredittore}
                        value={this.state.notesPredittore}
                    />
                    <h3 className="margin-top-medium">
                        Inserisci note al file di configurazione
                    </h3>
                    <UserNotes
                        handleChange={this.handleChangeNotes}
                        value={this.state.userNotes}
                    />
                </div>
            </>
        );

        return (
            <div className="App">
                <span id="metaText">
                    VRAM Software Applicativo Esterno - PoC 3
                </span>
                <div className="contentContainer">
                    {this.state.userData !== null ? group : null}
                </div>
                <div className="fileChooserContainer">
                    <div>
                        <Chooser
                            type="csv"
                            onChange={this.onChange}
                            isFileChosen={!!this.state.csvFileInfo}
                        />
                        <span>
                            {this.state.csvFileInfo
                                ? this.state.csvFileInfo.name
                                : "Nessun file selezionato"}
                        </span>
                    </div>
                    <div>
                        <Chooser
                            type="json"
                            onChange={this.onChange}
                            isFileChosen={!!this.state.jsonFileInfo}
                        />
                        <span>
                            {this.state.jsonFileInfo
                                ? this.state.jsonFileInfo.name
                                : "Nessun file selezionato"}
                        </span>
                    </div>
                    <div>
                        {this.state.csvFileInfo ? (
                            <button
                                className="customButton buttonNormal"
                                onClick={this.handleStartTraining}
                            >
                                {this.state.isTraining
                                    ? "Addestrando..."
                                    : "Inizia addestramento"}
                            </button>
                        ) : (
                            <button
                                className="customButtonDisabled buttonNormal"
                                disabled
                            >
                                Inizia addestramento
                            </button>
                        )}
                    </div>
                    <div>
                        {this.state.isTrainingDone ? (
                            <button
                                className="customButton buttonNormal"
                                onClick={this.handleOpenModal}
                            >
                                Salva json
                            </button>
                        ) : (
                            <button
                                className="customButtonDisabled buttonNormal"
                                disabled
                            >
                                Salva json
                            </button>
                        )}
                    </div>
                </div>
                {this.state.isModalEnabled ? (
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
