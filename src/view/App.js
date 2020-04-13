import React from "react";
import Chooser from "./ui/Chooser";
import Graph from "./ui/Graph";
import UserNotes from "./ui/UserNotes";
import Modal from "./ui/Modal";
import ParamModal from "./ui/ParamModal";
import CheckBox from "./ui/CheckBox";
import config from "../config/config";
import "./App.css";
const { ipcRenderer } = window.require("electron");

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            userNotes: "",
            fileName: "addestramento",
            isTrainingDone: false,
            isModalEnabled: false,
            jsonFileInfo: null,
            csvFileInfo: null,
            trainedJson: null,
            algorithm: "svm",
            isTraining: false,
            isParamModalEnabled: false,
            tempData: [],
            params: [],
            array: [],
            paramLength: null,
        };
        this.setUserData = this.setUserData.bind(this);
        this.handleCloseParamModal = this.handleCloseParamModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleChangeFileName = this.handleChangeFileName.bind(this);
        this.handleSaveJson = this.handleSaveJson.bind(this);
        this.selectParams = this.selectParams.bind(this);
        this.setParams = this.setParams.bind(this);
        this.resetState = this.resetState.bind(this);
        this.loadConfiguration = this.loadConfiguration.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getFileInfo = this.getFileInfo.bind(this);
        this.handleChangeAlgorithm = this.handleChangeAlgorithm.bind(this);
        this.startTraining = this.startTraining.bind(this);
    }

    setUserData() {
        const data = this.state.tempData;
        this.setState({
            userData: data,
        });
    }

    handleCloseParamModal(e) {
        e.preventDefault();
        if (this.state.userData) {
            this.setState({
                isParamModalEnabled: false,
            });
        } else {
            this.setState({
                isParamModalEnabled: false,
            });
            this.resetState();
        }
    }

    handleOpenModal(e) {
        e.preventDefault();
        this.setState({
            isModalEnabled: true,
        });
    }

    handleCloseModal(e) {
        e.preventDefault();
        this.setState({
            isModalEnabled: false,
        });
    }

    handleChangeNotes(e) {
        this.setState({
            userNotes: e.target.value,
        });
    }

    handleChangeFileName(e) {
        this.setState({
            fileName: e.target.value,
        });
    }

    handleSaveJson(e) {
        e.preventDefault();
        ipcRenderer.send("write-file", {
            name: this.state.fileName,
            notes: this.state.userNotes,
            trainedJson: this.state.trainedJson,
        });
        this.handleCloseModal(e);
    }

    selectParams(data) {
        this.setState({
            isParamModalEnabled: true,
            params: data,
        });
    }

    setParams(data) {
        this.setState({
            params: data,
            isParamModalEnabled: false,
        });
        this.setUserData();
    }

    resetState() {
        this.setState({
            userData: null,
            userNotes: "",
            fileName: "addestramento",
            isTrainingDone: false,
            isModalEnabled: false,
            jsonFileInfo: null,
            csvFileInfo: null,
            trainedJson: null,
            isTraining: false,
            isParamModalEnabled: false,
            tempData: [],
            params: [],
            array: [],
            paramLength: null,
        });
    }

    loadData(e) {
        if (e.target.files[0]) {
            const obj = this.getFileInfo(e.target.files[0]);
            this.resetState();
            this.setState({
                csvFileInfo: obj,
            });
            ipcRenderer.send("read-file", {
                path: obj.path,
                extension: obj.extension,
            });
            ipcRenderer.on("finished-reading", (event, arg) => {
                if (arg[0]) {
                    let array = Object.keys(arg[0]);
                    this.selectParams(array);
                    this.setState({
                        tempData: arg,
                        paramLength: array.length,
                    });
                }
            });
        } else {
            console.log("Il file è nullo");
        }
    }

    loadConfiguration(e) {
        if (e.target.files[0]) {
            const obj = this.getFileInfo(e.target.files[0]);
            this.setState({
                jsonFileInfo: obj,
            });
            ipcRenderer.send("read-file", {
                path: obj.path,
                extension: obj.extension,
            });
            ipcRenderer.on("finished-reading", (event, arg) => {
                if (arg.notes) {
                    this.setState({
                        userNotes: arg.notes,
                    });
                } else {
                    console.error(
                        "Il file json inserito non è conforme allo standard dell'applicazione"
                    );
                    this.setState({
                        jsonFileInfo: null,
                    });
                }
            });
        } else {
            console.log("Il file è nullo");
        }
    }

    getFileInfo(file) {
        return {
            name: file.name,
            path: file.path,
            type: file.type,
            extension: file.name.split(".").pop(),
        };
    }

    handleChangeAlgorithm(algorithm) {
        if (algorithm !== this.state.algorithm) {
            this.setState({
                algorithm: algorithm,
                trainedJson: null,
            });
        } else {
            console.log("Algoritmo scelto è già inizializzato");
        }
    }

    startTraining(e) {
        e.preventDefault();
        this.setState({
            isTraining: true,
        });
        ipcRenderer.send("train-data", {
            data: this.state.userData,
            params: this.state.params,
            algorithm: this.state.algorithm,
        });
        ipcRenderer.on("finished-training", (event, arg) => {
            this.setState({
                isTrainingDone: true,
                isTraining: false,
                trainedJson: arg,
            });
        });
    }

    render() {
        const group = (
            <>
                <div className='graphContainer'>
                    <Graph
                        data={this.state.userData}
                        params={this.state.params}
                        result={this.state.trainedJson}
                        axisControl={this.state.axisControl}
                        paramLength={this.state.paramLength}
                        algorithm={this.state.algorithm}
                    />
                </div>

                <div className='infoContainer'>
                    <CheckBox
                        algorithms={config.algorithms}
                        handleCheckBox={this.handleChangeAlgorithm}
                        algorithm={this.state.algorithm}
                    />
                    <h3 className='margin-top-medium'>
                        Inserisci note al file di configurazione
                    </h3>
                    <UserNotes
                        handleChange={this.handleChangeNotes}
                        value={this.state.userNotes}
                    />
                    {this.state.trainedJson ? (
                        <span className='done'>Addestramento avvenuto</span>
                    ) : null}
                    <button
                        className='customButton buttonNormal'
                        onClick={() => this.selectParams(this.state.params)}
                    >
                        Scegli nuovi parametri
                    </button>
                </div>
            </>
        );

        let buttonSvm = null;
        this.state.csvFileInfo
            ? (buttonSvm = (
                  <button
                      className='customButton buttonNormal'
                      onClick={this.startTraining}
                  >
                      {this.state.isTraining
                          ? "Addestrando..."
                          : "Inizia addestramento svm"}
                  </button>
              ))
            : (buttonSvm = (
                  <button
                      className='customButtonDisabled buttonNormal'
                      disabled
                  >
                      Inizia addestramento svm
                  </button>
              ));

        let buttonRl = null;
        this.state.csvFileInfo
            ? (buttonRl = (
                  <button
                      className='customButton buttonNormal'
                      onClick={this.startTraining}
                  >
                      {this.state.isTraining
                          ? "Addestrando..."
                          : "Inizia addestramento rl"}
                  </button>
              ))
            : (buttonRl = (
                  <button
                      className='customButtonDisabled buttonNormal'
                      disabled
                  >
                      Inizia addestramento rl
                  </button>
              ));

        return (
            <div className='App'>
                <span id='metaText'>VRAM Software Applicativo Esterno</span>

                <div className='contentContainer'>
                    {this.state.userData !== null ? group : null}
                </div>
                <div className='fileChooserContainer'>
                    <div>
                        <Chooser
                            type='csv'
                            onChange={this.loadData}
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
                            type='json'
                            onChange={this.loadConfiguration}
                            isFileChosen={!!this.state.jsonFileInfo}
                        />
                        <span>
                            {this.state.jsonFileInfo
                                ? this.state.jsonFileInfo.name
                                : "Nessun file selezionato"}
                        </span>
                    </div>
                    <div>
                        {this.state.algorithm === "rl" ? buttonRl : null}
                        {this.state.algorithm === "svm" ? buttonSvm : null}
                    </div>
                    <div>
                        {this.state.isTrainingDone ? (
                            <button
                                className='customButton buttonNormal'
                                onClick={this.handleOpenModal}
                            >
                                Salva json
                            </button>
                        ) : (
                            <button
                                className='customButtonDisabled buttonNormal'
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
                {this.state.isParamModalEnabled ? (
                    <ParamModal
                        data={this.state.params}
                        setParams={this.setParams}
                        close={this.handleCloseParamModal}
                        changeAlgorithm={this.handleChangeAlgorithm}
                    />
                ) : null}
            </div>
        );
    }
}
