import React from "react";
import styles from "./style/SaveFileModal.module.css";

class SaveFileModal extends React.Component {
    render() {
        return (
            <div className="modalContainer">
                <div className="saveJsonModal">
                    <h3>Salva con nome:</h3>
                    <Input
                        placeholder="Scrivi nome file .json"
                        handleChange={this.props.change}
                    />
                    <div>
                        <button
                            className="customButton buttonSmaller"
                            onClick={this.props.close}
                        >
                            Chiudi
                        </button>
                        <button
                            className="customButton buttonSmaller"
                            onClick={this.props.save}
                        >
                            Salva Json
                        </button>
                    </div>
                </div>
                <div className="modalBackground" onClick={this.props.close} />
            </div>
        );
    }
}
