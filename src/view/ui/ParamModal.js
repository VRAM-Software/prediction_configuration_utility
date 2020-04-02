import React from "react";
import "../App.css";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isXselected: false,
            selected: []
        };
    }

    setX = (e) => {
        e.preventDefault();
        let array = this.state.selected;
        array[0] = e.target.value;
        this.setState({
            selected: array,
            isXselected: true
        });
    }

    setY = (e) => {
        e.preventDefault();
        let array = this.state.selected;
        array[1] = e.target.value;
        this.setState({
            selected: array
        });
    }

    render() {
        const obj = this.props.data.map((item, index) => (
            <option key={index} disabled={this.state.selected.includes(item) ? true : false}>
                {item}
            </option>
        ))
        return (
            <div className="modalContainer">
                <div className="saveJsonModal">
                    <h3>Seleziona i parametri da utilizzare</h3>
                    <div className="selectContainerParamModal">
                        <select onChange={this.setX}>
                            <option value={null} disabled selected>Seleziona X</option>
                            {obj}
                        </select>

                        <select onChange={this.setY} disabled={this.state.isXselected ? false : true}>
                            <option value={null} disabled selected>Seleziona Y</option>
                            {obj}
                        </select>
                    </div>
                    <div id="paramModalButtonContainer">
                        {this.state.selected.length === 2 ? <button className="customButton buttonSmaller" onClick={() => this.props.setParams(this.state.selected)}>Select</button> : <button className="customButtonDisabled buttonSmaller" disabled>Selected</button>}
                    </div>      
                </div>
                <div className="modalBackground"/>
            </div>
        );
    }
}