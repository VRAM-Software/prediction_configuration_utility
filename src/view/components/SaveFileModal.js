import React from "react";
import styles from "./style/SaveFileModal.module.css";
import Input from "./Input";
import FolderInput from "./FolderInput";
import Button from "./Button";

class SaveFileModal extends React.Component {
    render() {
        return (
            <div className={styles["modal-container"]}>
                <div className={styles["modal-save-file"]}>
                    <div className={styles["modal-frame"]}>
                        <div onClick={this.props.close}>🗙</div>
                    </div>
                    <h3>Salva con nome:</h3>
                    <div className={styles["input-container"]}>
                        <Input
                            placeholder="Scrivi nome file .json"
                            id="inputSaveName"
                            handleChange={this.props.change}
                        />
                        <FolderInput
                            id="folder-input"
                            folderPath={this.props.userFolder}
                            onClick={this.props.setFolder}
                        />
                    </div>

                    <div className={styles["button-container"]}>
                        <Button
                            loading={false}
                            loadingText={null}
                            text="Chiudi"
                            onClick={this.props.close}
                        />
                        <Button
                            loading={false}
                            loadingText={null}
                            text="Salva Json"
                            onClick={this.props.save}
                        />
                    </div>
                </div>
                <div
                    className={styles["modal-background"]}
                    onClick={this.props.close}
                />
            </div>
        );
    }
}

export default SaveFileModal;
