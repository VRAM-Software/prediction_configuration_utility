import React from "react";
import "../App.css";

export default class Chooser extends React.Component {
    render() {
        return (
            <div>
                <input
                    className='fileChooserInput'
                    id={'fileChooser'+this.props.type}
                    type='file'
                    name='file'
                    onChange={(e) => this.props.onChange(e, this.props.conf)}
                />
                <label htmlFor={'fileChooser'+this.props.type} className='fileChooserLabel'>
                    <div
                        id='fake-button'
                        className={
                            this.props.isFileChosen ? "file-chosen" : "no-file"
                        }
                    >
                        Seleziona un file {this.props.type}
                    </div>
                </label>
            </div>
        );
    }
}
