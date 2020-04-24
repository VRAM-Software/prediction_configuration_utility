import React from "react";
import styles from "./style/Input.module.css";

export default class Input extends React.Component {
    render() {
      return (
        <input
          placeholder={this.props.placeholder}
          onChange={this.props.handleChange}
          value={this.props.value}
          className={styles['custom-input']}
        />
      );
    }
  }