import React from "react";
import styles from "./style/CheckBoxes.module.css";

class CheckBoxes extends React.Component {
    render() {
        const list = this.props.algorithms.map((item, index) => (
            <div key={index} className={styles["checkbox-container"]}>
                <div
                    className={`${styles["checkbox"]} ${styles["radio-button"]} ${
                        item.name === this.props.algorithm
                            ? styles["checkbox-selected"]
                            : styles["checkbox-not-selected"]
                    }`}
                    onClick={() => this.props.handleCheckBox(item.name)}
                ></div>
                <span onClick={() => this.props.handleCheckBox(item.name)}>
                    {item.desc}
                </span>
            </div>
        ));
        return (
            <div className={styles["container"]}>
                <h3>Seleziona un algoritmo di predizione</h3>
                <div>{list}</div>
            </div>
        );
    }
}

class SetDataCheckBoxes extends React.Component {
    render() {
        return (
            <div className={styles["container"]}>
                <h3>Seleziona i dati da visualizzare</h3>
                <div>
                    <div className={styles["checkbox-container"]}>
                        <div
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
                        <span id="circle"></span>
                    </div>

                    <div className={styles["checkbox-container"]}>
                        <div
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
                        <span id="rect"></span>
                    </div>
                </div>
            </div>
        );
    }
}

export { CheckBoxes, SetDataCheckBoxes };
