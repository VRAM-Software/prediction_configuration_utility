import React from "react";

export default class UserNotes extends React.Component {
    render() {
        return (
            <textarea
                placeholder='Scrivi alcune note...'
                onChange={this.props.handleChange}
                value={this.props.value}
            />
        );
    }
}
