import React from "react";
import "../assets/App.css";

export default class CheckBox extends React.Component {
    render() {
        const list = this.props.algorithms.map((item, index) => (
            <div key={index} className="checkBoxContainer">
                <div
                    className={
                        item.name === this.props.algorithm
                            ? "checkSelected"
                            : "checkNotSelected"
                    }
                    id="checkBox"
                    onClick={() => this.props.handleCheckBox(item.name)}
                ></div>
                <span onClick={() => this.props.handleCheckBox(item.name)}>
                    {item.desc}
                </span>
            </div>
        ));
        return (
            <div id="checkContainer">
                <h3 id="checkBoxInfo">
                    Scegliere l'algoritmo di predizione da utilizzare per
                    l'addestramento
                </h3>
                <div>{list}</div>
            </div>
        );
    }
}
