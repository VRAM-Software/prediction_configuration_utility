import React from "react";
import styles from "./style/FolderInput.module.css";

export default class FolderInput extends React.Component {
    render() {
        return (
            <input
                id={this.props.id}
                className={styles["custom-input"]}
                type="text"
                placeholder="Seleziona una cartella"
                value={this.props.folderPath}
                onClick={this.props.onClick}
                readOnly={true}
            />
        );
    }
}
