import React from 'react';
import * as csv from "csvtojson";
import Chooser from './components/Chooser';
import LinearGraph from './components/Graph';
import UserNotes from './components/UserNotes';
import SaveFileName from './components/SaveFileName';
import './App.css';

const { ipcRenderer } = window.require('electron');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainedJson: null,
            dataSet: null,
            jsonFile: null,
            csvFile: null,
            notes: "No notes",
            fileName: "std_json_file",
            isTrainingDone: false
        }
    }

    handleChangeNotes = e => {
        this.setState({
            notes: e.target.value
        })
    }

    handleChangeFileName = e => {
        this.setState({
            fileName: e.target.value
        })
    }

    handleSaveJson = e => {
        e.preventDefault();
        let obj = {
            name: this.state.fileName,
            json: this.state.trainedJson,
            notes: this.state.notes
        }
        ipcRenderer.send('save-to-disk', obj);
    }

    handleStartTraining = e => {
        e.preventDefault();
        let obj = {
            data: this.state.dataSet,
            notes: this.state.notes
        };
        ipcRenderer.send('start-training', obj);
        ipcRenderer.on('finished-training', () => {
            this.setState({
                isTrainingDone: true
            })
        })
        console.log(this.state.trainedJson);
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

        const group =
            <>
                <div className="graphContainer">
                    <LinearGraph 
                        data={this.state.dataSet} 
                    />
                </div>
                
                <div className="infoContainer">
                    <UserNotes
                        handleChange={this.handleChangeNotes}
                    />
                    <SaveFileName
                        handleChange={this.handleChangeFileName}
                    />
                </div>
            </>

        return (
            <div className="App">
                VRAM Software Applicativo Esterno - PoC 1
                <div className="contentContainer">
                    {
                        this.state.dataSet !== null ?
                            group
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
                        {
                            this.state.csvFile ?
                                <button className="customButton" onClick={this.handleStartTraining} >Inizia Addestramento</button>
                                :
                                <button className="customButtonDisabled" onClick={this.handleStartTraining} disabled>Inizia Addestramento</button>
                        }
                        {
                            this.state.isTrainingDone ?
                                <button className="customButton" onClick={this.handleSaveJson}>Salva json</button>
                                :
                                <button className="customButtonDisabled" onClick={this.handleSaveJson} disabled>Salva json</button>
                        }

                    </form>
                </div>
            </div>
        );
    }
}