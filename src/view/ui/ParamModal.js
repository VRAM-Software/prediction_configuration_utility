import React from "react";
import "../App.css";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isXselected: false,
            isYselected: false,
            selected: [],
        };
    }

    setX = (e) => {
        e.preventDefault();
        let array = this.state.selected;
        array[0] = e.target.value;
        this.setState({
            selected: array,
            isXselected: true,
        });
    };

    setY = (e) => {
        e.preventDefault();
        let array = this.state.selected;
        array[1] = e.target.value;
        this.setState({
            selected: array,
            isYselected: true,
        });
    };

    setClass = (e) => {
        e.preventDefault();
        let array = this.state.selected;
        array.push(e.target.value);
        this.setState({
            selected: array,
        });
    };

    setOrder = () => {
        let array = [];
        array.push(this.state.selected[0]);
        array.push(this.state.selected[1]);
        for (let i = 0; i < this.props.data.length - 1; i++) {
            if (!this.state.selected.includes(this.props.data[i])) {
                array.push(this.props.data[i]);
            }
        }
        array.push(this.state.selected[2]);
        this.props.setParams(array);
    };

    render() {
        const obj = this.props.data.map((item, index) => (
            <option
                key={index}
                disabled={this.state.selected.includes(item) ? true : false}
            >
                {item}
            </option>
        ));
        return (
            <div className='modalContainer'>
                <div className='saveJsonModal'>
                    <h3>Seleziona i parametri da utilizzare</h3>
                    <div className='selectContainerParamModal'>
                        <select onChange={this.setX}>
                            <option value={null} disabled selected>
                                Seleziona X
                            </option>
                            {obj}
                        </select>

                        <select
                            onChange={this.setY}
                            disabled={this.state.isXselected ? false : true}
                        >
                            <option value={null} disabled selected>
                                Seleziona Y
                            </option>
                            {obj}
                        </select>

                        <select
                            onChange={this.setClass}
                            disabled={this.state.isYselected ? false : true}
                        >
                            <option value={null} disabled selected>
                                Seleziona la classe
                            </option>
                            {obj}
                        </select>
                    </div>
                    <div id='paramModalButtonContainer'>
                        {(this.state.selected.length === 3 && this.props.data.length >= 3) || (this.state.selected.length === 2 && this.props.data.length >= 2) ? (
                            <button
                                className='customButton buttonSmaller'
                                onClick={() => this.setOrder()}
                            >
                                Select
                            </button>
                        ) : (
                            <button
                                className='customButtonDisabled buttonSmaller'
                                disabled
                            >
                                Disabled
                            </button>
                        )}
                    </div>
                </div>
                <div className='modalBackground' />
            </div>
        );
    }
}
