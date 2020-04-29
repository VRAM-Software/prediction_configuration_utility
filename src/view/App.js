import React from "react";

import {
    Graph,
    ControlPanel,
    Button,
    FileInput,
    ChangeParamModal,
    SaveFileModal,
} from "./UI";
import styles from "./App.module.css";
const { ipcRenderer } = window.require("electron");
const { dialog } = window.require("electron").remote;

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
            viewDataTraining: true,
            viewDataTest: true,
            userFolder: "",
        };
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
        this.handleChangeFolder = this.handleChangeFolder.bind(this);
        this.fileIsNull = this.fileIsNull.bind(this);
        this.fileNotRecognised = this.fileNotRecognised.bind(this);
        this.fileIsEmpty = this.fileIsEmpty.bind(this);
        this.fileConfErrors = this.fileConfErrors.bind(this);
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
        if (/([a-zA-Z0-9\s_\\.\-\(\):])/.test(this.state.fileName)) {
            console.log("ciao");
            dialog.showErrorBox(
                "Input error",
                "Il nome del file contiene caratteri non riconosciuti. Correggere e riprovare."
            );
        } else {
            ipcRenderer.send("write-file", {
                name: this.state.fileName,
                path: this.state.userFolder,
                notes: this.state.userNotes,
                trainedJson: this.state.trainedJson,
            });
            this.handleCloseModal(e);
        }
    }

    handleViewDataTraining(e) {
        this.setState({
            viewDataTraining: !this.state.viewDataTraining,
        });
    }

    handleViewDataTest(e) {
        this.setState({
            viewDataTest: !this.state.viewDataTest,
        });
    }

    selectParams(data) {
        this.setState({
            isParamModalEnabled: true,
            params: data,
        });
    }

    trainReset() {
        this.setState({
            isTrainingDone: false,
            qualityIndex: null,
            trainedJson: null,
        });
    }

    setParams(data) {
        const tempData = this.state.tempData;
        this.setState({
            params: data,
            isParamModalEnabled: false,
            userData: tempData,
        });
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
        if (!e.target.files[0]) {
            this.fileIsNull();
            return;
        }

        const obj = this.getFileInfo(e.target.files[0]);

        if (obj.extension !== "csv") {
            this.fileNotRecognised();
            return;
        }

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
                const array = Object.keys(arg[0]);
                this.selectParams(array);
                this.setState({
                    tempData: arg,
                    paramLength: array.length,
                });
            } else {
                this.setState({
                    csvFileInfo: null,
                });
                this.fileIsEmpty();
            }
        });
    }

    loadConf(e) {
        if (!e.target.files[0]) {
            this.fileIsNull();
            return;
        }

        const obj = this.getFileInfo(e.target.files[0]);

        if (obj.extension !== "json") {
            this.fileNotRecognised();
            return;
        }

        this.setState({
            jsonFileInfo: obj,
        });

        ipcRenderer.send("read-file-conf", {
            path: obj.path,
            extension: obj.extension,
        });

        ipcRenderer.on("finished-reading-conf", (event, arg) => {
            if (arg[0]) {
                if (arg.notes) {
                    this.setState({
                        userNotes: arg.notes,
                    });
                } else {
                    this.fileConfErrors();
                }
            } else {
                this.fileIsEmpty();
            }
        });
    }

    fileIsNull() {
        console.log("Input Error");
        dialog.showErrorBox(
            "Input error",
            "Il file inserito é nullo o corrotto. Riprovare."
        );
    }

    fileNotRecognised() {
        console.log("Input Error");
        dialog.showErrorBox(
            "Input error",
            "Il file é in un formato non riconosciuto. Riprovare."
        );
    }

    fileIsEmpty() {
        console.log("Input Error");
        dialog.showErrorBox(
            "Input error",
            "Il file inserito é vuoto. Riprovare."
        );
    }

    fileConfErrors() {
        console.log("Input Error");
        dialog.showErrorBox(
            "Input error",
            "Il file json inserito non è conforme allo standard dell'applicazione. Riprovare."
        );
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
                qualityIndex: null,
                isTrainingDone: false,
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

    handleChangeFolder(e) {
        e.preventDefault();
        ipcRenderer.send("set-save-folder");
        ipcRenderer.on("folder-selected", (event, arg) => {
            this.setState({
                userFolder: arg[0],
            });
        });
    }

    render() {
        const group = (
            <>
                <Graph
                    data={this.state.userData}
                    params={this.state.params}
                    result={this.state.trainedJson}
                    paramLength={this.state.paramLength}
                    algorithm={this.state.algorithm}
                    viewDataTraining={this.state.viewDataTraining}
                    viewDataTest={this.state.viewDataTest}
                />

                <ControlPanel
                    handleCheckBox={this.handleChangeAlgorithm}
                    algorithm={this.state.algorithm}
                    selectParams={() => this.selectParams(this.state.params)}
                    buttonText="Scegli nuovi parametri"
                    viewDataTraining={this.state.viewDataTraining}
                    viewDataTest={this.state.viewDataTest}
                    toggleDataTraining={this.handleViewDataTraining}
                    toggleDataTest={this.handleViewDataTest}
                    onChangeNotes={this.handleChangeNotes}
                    notes={this.state.userNotes}
                    isTrainingFinished={this.state.trainedJson}
                    qualityIndex={this.state.qualityIndex}
                />
            </>
        );

        const buttonSvm = (
            <Button
                loading={this.state.isTraining}
                loadingText="Addestrando..."
                text="Inizia addestramento SVM"
                onClick={this.startTraining}
                disabled={!this.state.csvFileInfo}
                showMessage={this.state.trainedJson}
                customMessage="Addestramento effettuato"
            />
        );

        const buttonRl = (
            <Button
                loading={this.state.isTraining}
                loadingText="Addestrando..."
                text="Inizia addestramento RL"
                onClick={this.startTraining}
                disabled={!this.state.csvFileInfo}
                showMessage={this.state.trainedJson}
                customMessage="Addestramento effettuato"
            />
        );

        return (
            <div className={styles["container"]}>
                <span id="metaText">VRAM Software Applicativo Esterno</span>
                <div className={styles["content-container"]}>
                    {this.state.userData !== null ? group : null}
                </div>
                <div className={styles["buttons-container"]}>
                    <FileInput
                        type="csv"
                        onChange={this.loadData}
                        isFileChosen={this.state.csvFileInfo}
                    />
                    <FileInput
                        type="json"
                        onChange={this.loadConf}
                        isFileChosen={this.state.jsonFileInfo}
                    />
                    {this.state.algorithm === "rl" ? buttonRl : null}
                    {this.state.algorithm === "svm" ? buttonSvm : null}
                    <Button
                        loading={false}
                        text="Salva json"
                        onClick={this.handleOpenModal}
                        disabled={!this.state.isTrainingDone}
                    />
                </div>
                {this.state.isParamModalEnabled ? (
                    <ChangeParamModal
                        data={this.state.params}
                        setParams={this.setParams}
                        close={this.handleCloseParamModal}
                        changeAlgorithm={this.handleChangeAlgorithm}
                        trainReset={this.trainReset}
                    />
                ) : null}
                {this.state.isModalEnabled ? (
                    <SaveFileModal
                        close={this.handleCloseModal}
                        change={this.handleChangeFileName}
                        save={this.handleSaveJson}
                        value={this.state.fileName}
                        setFolder={this.handleChangeFolder}
                        userFolder={this.state.userFolder}
                        inputError={this.state.inputError}
                    />
                ) : null}
            </div>
        );
    }
}
