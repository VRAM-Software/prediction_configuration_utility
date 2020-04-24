import React from "react";
import Chooser from "./ui/Chooser";
import Graph from "./ui/Graph";
import UserNotes from "./ui/UserNotes";
import Modal from "./ui/Modal";
import ParamModal from "./ui/ParamModal";
import CheckBox from "./ui/CheckBox";
import ViewDataCheckBox from "./ui/ViewDataCheckBox";
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
            qualityIndex: null,
            viewDataTraining: false,
            viewDataTest: false,
        };
        this.setUserData = this.setUserData.bind(this);
        this.handleCloseParamModal = this.handleCloseParamModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleChangeFileName = this.handleChangeFileName.bind(this);
        this.handleSaveJson = this.handleSaveJson.bind(this);
        this.handleViewDataTraining = this.handleViewDataTraining.bind(this);
        this.handleViewDataTest = this.handleViewDataTest.bind(this);
        this.selectParams = this.selectParams.bind(this);
        this.setParams = this.setParams.bind(this);
        this.resetState = this.resetState.bind(this);
        this.loadConf = this.loadConf.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getFileInfo = this.getFileInfo.bind(this);
        this.handleChangeAlgorithm = this.handleChangeAlgorithm.bind(this);
        this.startTraining = this.startTraining.bind(this);
        this.trainReset = this.trainReset.bind(this);
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

    handleViewDataTraining(e) {
        this.setState({
            viewDataTraining: !this.state.viewDataTraining,
        })
    }

    handleViewDataTest(e) {
        this.setState({
            viewDataTest: !this.state.viewDataTest,
        })
    }

    selectParams(data) {
        this.setState({
            isParamModalEnabled: true,
            params: data,
        });
    }

    trainReset() {
        this.setState({
            isTrainDone: false,
            qualityIndex: null,
            trainedJson: null,
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
            qualityIndex: null,
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

    loadConf(e) {
        if (e.target.files[0]) {
            const obj = this.getFileInfo(e.target.files[0]);
            this.setState({
                jsonFileInfo: obj,
            });

            ipcRenderer.send("read-file-conf", {
                path: obj.path,
                extension: obj.extension,
            });

            ipcRenderer.on("finished-reading-conf", (event, arg) => {
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
        ipcRenderer.on("finished-training", (event, arg, qualityI) => {
            this.setState({
                isTrainingDone: true,
                isTraining: false,
                trainedJson: arg,
                qualityIndex: qualityI,
            });
        });
    }

    render() {
        const group = (
            <>
                <div className='graphInfoContainer'>
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
                        <ViewDataCheckBox
                            viewDataTraining = {this.state.viewDataTraining}
                            viewDataTest = {this.state.viewDataTest}
                            handleViewDataTraining = {this.handleViewDataTraining}
                            handleViewDataTest = {this.handleViewDataTest}
                        />
                </div>

                <div className='infoContainer'>
                    <CheckBox
                        algorithms={config.algorithms}
                        handleCheckBox={this.handleChangeAlgorithm}
                        algorithm={this.state.algorithm}
                    />
                    <button
                        className='customButton buttonNormal'
                        onClick={() => this.selectParams(this.state.params)}
                    >
                        Scegli nuovi parametri
                    </button>
                    <h3 className='margin-top-medium'>
                        Inserisci note al file di configurazione
                    </h3>
                    <UserNotes
                        handleChange={this.handleChangeNotes}
                        value={this.state.userNotes}
                    />
                    {this.state.trainedJson ? (
                        <h3 className='done'>Addestramento avvenuto</h3>
                    ) : null}

                    {this.state.qualityIndex && this.state.algorithm === "svm" ? (
                        <div className='quality-index'>
                            <h3 className='quality-index-h3'>Indici di qualità</h3>
                                <div className='quality-index-text'>

                                    {this.state.qualityIndex.precision > 0.6 ? (
                                        <div className='good-index index'>
                                            <p className='quality-index-val'>{Math.trunc(this.state.qualityIndex.precision*100)}%</p>
                                            <p>Precision</p>
                                        </div>
                                    ): null}
                                    {this.state.qualityIndex.precision > 0.4 && this.state.qualityIndex.precision <= 0.6 ? (
                                        <div className='middle-index index'>
                                            <p className='quality-index-val'>{Math.trunc(this.state.qualityIndex.precision * 100)} % </p>
                                            <p>Precision</p>
                                        </div>
                                    ): null}
                                    {this.state.qualityIndex.precision<=0.4 ? (
                                        <div className='bad-index index'>
                                            <p className='quality-index-val'>{Math.trunc(this.state.qualityIndex.precision*100)}%</p>
                                            <p>Precision</p>
                                        </div>
                                    ): null}

                                    {this.state.qualityIndex.recall>0.6 ? (
                                        <div className='good-index index'>
                                            <p className='quality-index-val'>{Math.trunc(this.state.qualityIndex.recall*100)}%</p>
                                            <p>Recall</p>
                                        </div>
                                    ): null}
                                    {this.state.qualityIndex.recall>0.4 && this.state.qualityIndex.recall<=0.6 ? (
                                        <div className='middle-index index'>
                                            <p className='quality-index-val'>{Math.trunc(this.state.qualityIndex.recall*100)}%</p>
                                            <p>Recall</p>
                                        </div>
                                    ): null}
                                    {this.state.qualityIndex.recall<0.4 ? (
                                        <div className='bad-index index'>
                                            <p className='quality-index-val'>{Math.trunc(this.state.qualityIndex.recall*100)}%</p>
                                            <p>Recall</p>
                                        </div>
                                    ): null}


                                </div>
                        </div>
                    ): null}
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
                            onChange={this.loadConf}
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
                        trainReset={this.trainReset}
                    />
                ) : null}
            </div>
        );
    }
}
