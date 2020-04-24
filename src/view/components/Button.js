import React from "react"
import styles from "./style/Button.module.css"

export default class Button extends React.Component {
    render() {
        return (
            <div className={styles["container"]}>
                <button
                    className={`${styles["custom-button"]} ${
                        this.props.disabled ? styles["disabled"] : null
                    }`}
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}
                >
                    {this.props.loading
                        ? this.props.loadingText
                        : this.props.disabled
                        ? this.props.disabledText
                        : this.props.text}
                </button>
                {this.props.customMessage && this.props.showMessage ? (
                    <span>{this.props.customMessage}</span>
                ) : null}
            </div>
        )
    }
}
