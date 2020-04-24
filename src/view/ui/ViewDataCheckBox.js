import React from "react";
import "../App.css";

export default class ViewDataCheckBox extends React.Component {
    render() {
            const list = (
                <>
                    <div className='viewDataCheckBoxContainer'>
                        <div
                            className={
                                this.props.viewDataTraining
                                    ? "checkSelected checkBoxGraph"
                                    : "checkNotSelected checkBoxGraph"
                            }
                            onClick={() => this.props.handleViewDataTraining()}
                        ></div>
                        <div className='viewDataCheckBoxContainerText' onClick={() => this.props.handleViewDataTraining()}>
                            Dati per l'addestramento
                            <span id='circle'></span>
                        </div>
                    </div>

                    <div className='viewDataCheckBoxContainer'>
                        <div
                            className={
                                this.props.viewDataTest
                                    ? "checkSelected checkBoxGraph"
                                    : "checkNotSelected checkBoxGraph"
                            }
                            onClick={() => this.props.handleViewDataTest()}
                        ></div>
                        <div className='viewDataCheckBoxContainerText' onClick={() => this.props.handleViewDataTest()}>
                            Dati per il calcolo degli indici di qualità
                            <span id='rect'></span>
                        </div>
                    </div>
                </>
        );
        return (
            <div id='checkContainer'>
                <h3 id='checkBoxInfo'>
                    Seleziona tutti i dati da visualizzare
                </h3>
                <div>{list}</div>
            </div>
        );
    }
}
