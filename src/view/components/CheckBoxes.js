import React from "react";
import styles from "./style/CheckBoxes.module.css";

class SetDataCheckBoxes extends React.Component {
    render() {
        return (
            <div className={styles["container"]}>
                <h3>Seleziona i dati da visualizzare</h3>
                <div>
                    <div className={styles["checkbox-container"]}>
                        <div
                            id="checkboxTrain"
                            className={`${styles["checkbox"]} ${
                                this.props.viewDataTraining
                                    ? styles["checkbox-selected"]
                                    : styles["checkbox-not-selected"]
                            }`}
                            onClick={() => this.props.handleViewDataTraining()}
                        ></div>
                        <span
                            onClick={() => this.props.handleViewDataTraining()}
                        >
                            Dati per l'addestramento
                        </span>
                        <span className={styles["circle"]}></span>
                    </div>

                    <div className={styles["checkbox-container"]}>
                        <div
                            id="checkboxTest"
                            className={`${styles["checkbox"]} ${
                                this.props.viewDataTest
                                    ? styles["checkbox-selected"]
                                    : styles["checkbox-not-selected"]
                            }`}
                            onClick={() => this.props.handleViewDataTest()}
                        ></div>
                        <span onClick={() => this.props.handleViewDataTest()}>
                            Dati per il calcolo degli indici di qualità
                        </span>
                        <span className={styles["rect"]}></span>
                    </div>
                </div>
            </div>
        );
    }
}

export { SetDataCheckBoxes };
