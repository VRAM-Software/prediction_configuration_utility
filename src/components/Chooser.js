import React from 'react';
import '../App.css';

export default class Chooser extends React.Component {
    render() {
        return (
            <div>
                <input 
                    className="fileChooserInput"
                    id="fileChooser"
                    type="file"
                    name="file"
                    accept={"." + this.props.type}
                    onChange={this.props.onChange}
                />
                <label htmlFor="fileChooser" className="fileChooserLabel">
                    <div id="fake-button" className={this.props.isFileChosen ? "file-chosen" : "no-file"} >Seleziona un file {this.props.type}</div>
                </label>
            </div>
        );
    }
}
