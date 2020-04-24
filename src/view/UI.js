import React from "react";
import config from "../config/config.json";
import ScatterPlot from "./graphComponents/ScatterPlot";
import { CheckBoxes, SetDataCheckBoxes } from "./components/CheckBoxes";
import Button from "./components/Button";
import FileInput from "./components/FileInput";
import TextArea from "./components/TextArea";
import Input from "./components/Input";
import SvmQualityIndex from "./components/SvmQualityIndex";
import FolderInput from "./components/FolderInput";
import styles from "./UI.module.css";

class SaveFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userFolder: "",
            userName: "",
        };
    }
    render() {
        return (
            <div className={styles["modal-container"]}>
                <div className={styles["modal-save-file"]}>
                    <h3>Salva con nome:</h3>
                    <Input
                        placeholder="Scrivi nome file .json"
                        handleChange={this.props.change}
                    />
                    <FolderInput
                        folderPath={this.props.userFolder}
                        onClick={this.props.setFolder}
                    />
                    <div>
                        <Button
                            loading={false}
                            loadingText={null}
                            text="Chiudi"
                            onClick={this.props.close}
                        />
                        <Button
                            loading={false}
                            loadingText={null}
                            text="Salva Json"
                            onClick={this.props.save}
                        />
                    </div>
                </div>
                <div
                    className={styles["modal-background"]}
                    onClick={this.props.close}
                />
            </div>
        );
    }
}

class ChangeParamModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            selectedIndex: null,
            algorithm: null,
        };
        this.addValue = this.addValue.bind(this);
        this.changeAlg = this.changeAlg.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
    }

    componentDidMount() {
        let array = new Array(this.props.data.length);
        this.setState({
            selected: array,
        });
    }

    addValue(e, index) {
        let array = this.state.selected;
        if (e.target.value !== "null") {
            array[index] = e.target.value;
            this.setState({
                selected: array,
            });
        } else {
            array[index] = null;
        }
    }

    changeAlg(e) {
        this.setState({
            algorithm: e.target.value,
        });
    }

    sendInfo(e) {
        e.preventDefault();
        this.props.changeAlgorithm(this.state.algorithm);
        this.props.setParams(this.state.selected);
        this.props.trainReset();
    }

    render() {
        const obj = this.props.data.map((item, index) => (
            <option
                key={index}
                disabled={this.state.selected.includes(item) ? true : false}
            >
                {item}
            </option>
        ));

        const selects = this.props.data.map((item, index) => (
            <select key={index} onChange={(e) => this.addValue(e, index)}>
                <option value="null" selected>
                    Seleziona valore
                </option>
                {obj}
            </select>
        ));

        return (
            <div className={styles["modal-container"]}>
                <div className={styles["modal-set-param"]}>
                    <div className={styles["modal-frame"]}>
                        <div onClick={this.props.close}>🗙</div>
                    </div>
                    <h4>Seleziona l'algoritmo da utilizzare</h4>
                    <div>
                        <select onChange={this.changeAlg}>
                            <option value={null} selected disabled>
                                Seleziona un algoritmo
                            </option>
                            <option value="svm">SVM</option>
                            <option value="rl">RL</option>
                        </select>
                    </div>

                    <h4>Seleziona i parametri da utilizzare</h4>
                    {this.state.algorithm === "svm" ? (
                        <span>
                            Il primi due valori verrano usati rispettivamente
                            come X e Y mentre l'ultimo rappresenterà la
                            classificazione dei dati
                        </span>
                    ) : null}
                    <div className={styles["modal-set-param-select-container"]}>
                        {selects}
                    </div>
                    <div className={styles["modal-set-param-button-container"]}>
                        <Button
                            loading={false}
                            loadingText={null}
                            disabled={
                                this.state.selected.includes(undefined) ||
                                this.state.selected.includes(null) ||
                                this.state.algorithm === null
                            }
                            disabledText="Disabilitato"
                            text="Conferma"
                            onClick={this.sendInfo}
                        />
                    </div>
                </div>
                <div
                    className={styles["modal-background"]}
                    onClick={this.props.close}
                />
            </div>
        );
    }
}

class ResultPanel extends React.Component {
    render() {
        return (
            <div className={styles["resultPanel-container"]}>
                {this.props.qualityIndex &&
                this.props.algorithmChosen === "svm" ? (
                    <div
                        className={
                            styles["resultPanel-quality-index-container"]
                        }
                    >
                        <h3>Indici di qualità</h3>
                        <div>
                            <SvmQualityIndex
                                text="Precision"
                                index={this.props.qualityIndex.precision}
                            />
                            <SvmQualityIndex
                                text="Recall"
                                index={this.props.qualityIndex.recall}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

class ControlPanel extends React.Component {
    render() {
        return (
            <div className={styles["controlPanel-container"]}>
                <CheckBoxes
                    algorithms={config.algorithms}
                    handleCheckBox={this.props.handleCheckBox}
                    algorithm={this.props.algorithm}
                />

                <SetDataCheckBoxes
                    viewDataTraining={this.props.viewDataTraining}
                    viewDataTest={this.props.viewDataTest}
                    handleViewDataTraining={this.props.toggleDataTraining}
                    handleViewDataTest={this.props.toggleDataTest}
                />

                <h3>Inserisci note al file di configurazione</h3>
                <TextArea
                    placeholder="Scrivi alcune note..."
                    onChange={this.props.onChangeNotes}
                    value={this.props.notes}
                />

                <div className={styles["controlPanel-result-container"]}>
                    <ResultPanel
                        isTrainingFinished={this.props.isTrainingFinished}
                        qualityIndex={this.props.qualityIndex}
                        algorithmChosen={this.props.algorithm}
                    />
                    <div>
                        <h3>Scegli nuovi parametri</h3>
                        <Button
                            loading={false}
                            loadingText={null}
                            text="Seleziona parametri"
                            onClick={this.props.selectParams}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className={styles["graph-container"]}>
                <div className={styles["graph"]}>
                    <ScatterPlot
                        data={this.props.data}
                        params={this.props.params}
                        result={this.props.result}
                        paramLength={this.props.paramLength}
                        algorithm={this.props.algorithm}
                        viewDataTraining={this.props.viewDataTraining}
                        viewDataTest={this.props.viewDataTest}
                    />
                </div>
            </div>
        );
    }
}

export {
    CheckBoxes,
    SetDataCheckBoxes,
    FileInput,
    TextArea,
    Input,
    SaveFileModal,
    ChangeParamModal,
    ControlPanel,
    Button,
    Content,
};
