import React from 'react';
import './FileChooser.css';
import Chooser from './Chooser';
// ipcRenderer => comunica con ipcMain in main.js
const { ipcRenderer } = window.require('electron');

// Il primo form serve a copiare il file originale json in una directory
// pensavo di copiare il file in modo da non lavorare sul file originale 
// per evitare possibili errori/corruzione dei dati
export default class FileChooser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonFile: null,
            csvFile: null
        }
    }


    sendInfo = e => {
        e.preventDefault();
        console.log(this.state.fileArray)
        // ipcRenderer.send('async-msg', fileInfo);
    }

    getFileInfo = file => {
        return {
            name: file.name,
            path: file.path,
            type: file.type
        }
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

    render() {
        return (
            <div className="fileChooserContainer">
                <form className="fileChooserForm" onSubmit={this.sendInfo}>
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

                    <div>
                        <Chooser
                            type="csv"
                            onChange={this.onChange}
                            isFileChosen={this.state.csvFile ? true : false}
                        />
                        <span> {this.state.csvFile ? this.state.csvFile.name : "Nessun file selezionato"}  </span>
                    </div>

                    <button className="customButton" type="submit">Inizia Addestramento</button>
                </form>
            </div>
        );
    }
}