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
            userData: null,
            userNotes: "No notes",
            fileName: "addestramento",
            isTrainingDone: false,
            isModalEnabled: false,
            jsonFileInfo: null,
            csvFileInfo: null,
            trainedJson: null
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

    handleChangeFileName = e => {
        this.setState({
            fileName: e.target.value
        });
    };

    handleSaveJson = e => {
        e.preventDefault();
        ipcRenderer.send("save-to-disk", {
            name: this.state.fileName,
            json: this.state.trainedJson,
            notes: this.state.userNotes
        });
        this.handleCloseModal(e);
    };

    handleStartTraining = e => {
        e.preventDefault();
        ipcRenderer.send("start-training", {
            data: this.state.userData,
            notes: this.state.userNotes
        });
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
                .then(res => {
                    app.setState({
                        userData: res
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
                        jsonFileInfo: obj
                    });
                    break;
                default:
                    this.csvToJson(e.target.files[0]);
                    this.setState({
                        csvFileInfo: obj
                    });
                    break;
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
                    <Graph data={this.state.userData} />
                </div>

                <div className="infoContainer">
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
                    <form className="fileChooserForm">
                        <div>
                            <Chooser
                                type="csv"
                                onChange={this.onChange}
                                isFileChosen={!!this.state.csvFile}
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
                                isFileChosen={!!this.state.jsonFile}
                            />
                            <span>
                                {this.state.jsonFileInfo
                                    ? this.state.jsonFileInfo.name
                                    : "Nessun file selezionato"}
                            </span>
                        </div>
                        {this.state.csvFileInfo ? (
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
                            <button
                                className="customButton"
                                onClick={this.handleOpenModal}
                            >
                                Salva json
                            </button>
                        ) : (
                            <button className="customButtonDisabled" disabled>
                                Salva json
                            </button>
                        )}
                    </form>
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
