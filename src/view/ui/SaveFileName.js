import React from "react";

export default class SaveFileName extends React.Component {
    render() {
        return (
            <input
                id="inputSaveName"
                placeholder="Scrivi nome file .json"
                onChange={this.props.handleChange}
                value={this.props.value}
            />
        );
    }
}
