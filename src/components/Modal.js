import React from "react";
import "../assets/App.css";
import SaveFileName from "./SaveFileName";

export default class Modal extends React.Component {
    render() {
        return (
            <div className="modalContainer">
                <div className="saveJsonModal">
                    <h3>Salva con nome:</h3>
                    <SaveFileName handleChange={this.props.change} />
                    <div>
                        <button className="customButton buttonSmaller" onClick={this.props.close}>Chiudi</button>
                        <button className="customButton buttonSmaller" onClick={this.props.save}>Salva Json</button>
                    </div>
                </div>
                <div className="modalBackground" onClick={this.props.close} />
            </div>
        );
    }
}
