import React from "react";
import Button from "./Button";
import styles from "./style/ChangeParamModal.module.css";

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
            this.setState({
                selected: array,
            });
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
            <select
                key={index}
                onChange={(e) => this.addValue(e, index)}
                defaultValue="null"
            >
                <option value="null">Seleziona valore</option>
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
                            <option
                                value={null}
                                selected={true}
                                disabled={true}
                            >
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
                    {this.state.algorithm === "rl" ? (
                        <span>
                            Il valori selezionati verrano usati rispettivamente
                            come X, Y e Z
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

export default ChangeParamModal;
