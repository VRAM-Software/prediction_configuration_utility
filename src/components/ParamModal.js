import React from "react";
import "../assets/App.css";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                x: null,
                y: null
            },
            selected: []
        };
    }

    select = (name, p) => {
        if (p == "x") {
            this.setState({
                params: {
                    x: name,
                    y: null
                } 
            })
        } else {
            this.setState({
                params: {
                    y: name,
                    x: null
                } 
            })
        }
        console.log(this.state.params)
        // this.setState({
        //     params: {
        //         p: name
        //     } 
        // })
        // const array = this.state.selected;
        // if (array.length < 2) {
        //     array.push(name);
        // } else {
        //     console.log("2 values decided already");
        // }
        // this.setState({
        //     selected: array
        // })
    }

    unSelect = (p) => {
        if (p === "x") {
            this.setState({
                params: {
                    x: null,
                    y: this.state.params.y
                }
            })
        } else {
            this.setState({
                params: {
                    y: null,
                    x: this.state.params.x
                }
            })
        }
        console.log(this.state.params)
        // let array = this.state.selected.filter(item => item !== name);
        // this.setState({
        //     selected: array
        // })
    }

    render() {

        const obj = this.props.data.map((item, index) => (
            <div key={index} className="checkBoxContainer">
                x:
                <div
                    id="checkBox"
                    className={
                        this.state.params.x === item
                            ? "checkSelected"
                            : "checkNotSelected"
                    }
                    onClick={this.state.params.x === item ? () => this.unSelect("x") : () => this.select(item, "x")}
                ></div>
                y:
                <div
                    id="checkBox"
                    className={
                        this.state.params.y === item
                            ? "checkSelected"
                            : "checkNotSelected"
                    }
                    onClick={this.state.params.y === item ? () => this.unSelect("y") : () => this.select(item, "y")}
                ></div>
                <span>
                    {item}
                </span>
            </div>
        ))
        

        // const obj = this.props.data.map((item, index) => (
        //     <div className={this.state.selected.includes(item) ? "paramSelected" : ""} key={index} onClick={() => this.select(item)}>{item}</div>
        // ))
        return (
            <div className="modalContainer">
                <div className="saveJsonModal">
                    <h3>Scegli i parametri:</h3>
                    {obj}
                    {this.state.selected.length === 2 ? <button onClick={() => this.props.setParams(this.state.selected)}>Select</button> : <button disabled>Selected</button>}
                    
                </div>
                <div className="modalBackground"/>
            </div>
        );
    }
}
