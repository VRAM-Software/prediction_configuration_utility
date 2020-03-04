import React from 'react';

export default class SaveFileName extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input
                placeholder="Scrivi nome file .json"
                onChange={this.props.handleChange}
            />
        );
    }
}