import React from "react";
import "../App.css";
import SaveFileName from "./SaveFileName";

export default class Modal extends React.Component {
  render() {
    return (
      <div className="modalContainer">
        <div className="saveJsonModal">
          <SaveFileName handleChange={this.props.change} />
          <button onClick={this.props.close}>Chiudi</button>
          <button onClick={this.props.save}>Salva Json</button>
        </div>
        <div className="modalBackground" onClick={this.props.close} />
      </div>
    );
  }
}
