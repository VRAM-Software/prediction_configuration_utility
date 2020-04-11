import React from "react";
import "../App.css";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            selectedIndex: null,
            algorithm: null,
        };
        this.addValue = this.addValue.bind(this);
        this.selectIndex = this.selectIndex.bind(this);
        this.changeAlg = this.changeAlg.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
    }

    componentDidMount() {
        let array = new Array(this.props.data.length);
        this.setState({
            selected: array,
        });
    }

    addValue(e) {
        let array = this.state.selected;
        if (e.target.value !== "null") {
            // array.length = this.props.data.length;
            array[this.state.selectedIndex] = e.target.value;
            this.setState({
                selected: array,
            });
        } else {
            array[this.state.selectedIndex] = null;
        }
    }

    selectIndex(indx) {
        this.setState({
            selectedIndex: indx,
        });
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
                onChange={this.addValue}
                onClick={() => this.selectIndex(index)}
            >
                <option value='null' selected>
                    Seleziona valore
                </option>
                {obj}
            </select>
        ));

        return (
            <div className='modalContainer'>
                <div className='setParamModal'>
                    <div id='frame'>
                        <div onClick={this.props.close}>🗙</div>
                    </div>
                    <h4>Seleziona l'algoritmo da utilizzare</h4>
                    <div>
                        <select onChange={this.changeAlg}>
                            <option value={null} selected disabled>
                                Seleziona un algoritmo
                            </option>
                            <option value='svm'>SVM</option>
                            <option value='rl'>RL</option>
                        </select>
                    </div>

                    <h4>Seleziona i parametri da utilizzare</h4>
                    <span>
                        Il primi due valori verrano usati rispettivamente come X
                        e Y mentre l'ultimo rappresenterà la classificazione dei
                        dati
                    </span>
                    <div className='selectContainerParamModal'>{selects}</div>
                    <div id='paramModalButtonContainer'>
                        {this.state.selected.includes(undefined) ||
                        this.state.selected.includes(null) ||
                        this.state.algorithm === null ? (
                            <button
                                className='customButtonDisabled buttonSmaller'
                                disabled
                            >
                                Disabled
                            </button>
                        ) : (
                            <button
                                className='customButton buttonSmaller'
                                onClick={this.sendInfo}
                            >
                                Select
                            </button>
                        )}
                    </div>
                </div>
                <div className='modalBackground' onClick={this.props.close} />
            </div>
        );
    }
}
