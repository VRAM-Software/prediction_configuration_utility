import React from "react"
import styles from "./style/FileInput.module.css"

export default class FileInput extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <input
                        className={styles["input"]}
                        id={`${"fileChooser" + this.props.type}`}
                        type="file"
                        name="file"
                        onChange={this.props.onChange}
                    />
                    <label
                        htmlFor={`${"fileChooser" + this.props.type}`}
                        className={styles["label"]}
                    >
                        <div
                            className={`${styles["button"]} ${
                                this.props.isFileChosen
                                    ? styles["file-chosen"]
                                    : null
                            }`}
                        >
                            Seleziona un file {this.props.type}
                        </div>
                    </label>
                </div>
                <span>
                    {this.props.isFileChosen
                        ? this.props.isFileChosen.name
                        : "Nessun file selezionato"}
                </span>
            </div>
        )
    }
}
