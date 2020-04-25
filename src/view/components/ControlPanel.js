import React from "react";
import styles from "./style/ControlPanel.module.css";
import { SetDataCheckBoxes, CheckBoxes } from "./CheckBoxes";
import TextArea from "./TextArea";
import ResultPanel from "./ResultPanel";
import Button from "./Button";
import config from "../../config/config.json";

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
                    <div className={styles["button-select-new-params"]}>
                        <h3>Scegli nuovi parametri</h3>
                        <Button
                            loading={false}
                            loadingText={null}
                            text="Seleziona parametri"
                            onClick={this.props.selectParams}
                        />
                    </div>
                    <ResultPanel
                        isTrainingFinished={this.props.isTrainingFinished}
                        qualityIndex={this.props.qualityIndex}
                        algorithmChosen={this.props.algorithm}
                    />
                </div>
            </div>
        );
    }
}

export default ControlPanel;
