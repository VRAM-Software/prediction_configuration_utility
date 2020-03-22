import React from "react";
import "../assets/App.css";

let algorithm = [
    { name: "svm", desc: "Support Vector Machine", selected: true },
    { name: "rl", desc: "Regressione Lineare", selected: false }
];

export default class CheckBox extends React.Component {
    render() {
        let list = algorithm.map((item, index) => (
            <div key={index} className="checkBoxContainer">
                <div className={item.selected ? "checkSelected" : "checkNotSelected"} id="checkBox" onClick={this.props.handleCheckBox}></div>
                <span>{item.desc}</span>
            </div>
        ));
        return (
            <div id="checkContainer">
                <span id="checkBoxInfo">
                    Scegliere l'algoritmo di predizione da utilizzare per
                    l'addestramento
                </span>
                <div>{list}</div>
            </div>
        );
    }
}
