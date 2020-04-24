import React from "react"
import styles from "./style/TextArea.module.css"

export default class TextArea extends React.Component {
    render() {
        return (
            <textarea
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                value={this.props.value}
                className={styles["custom-textarea"]}
            />
        )
    }
}
