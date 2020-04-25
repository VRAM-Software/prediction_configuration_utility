import React from "react";
import styles from "./style/SvmQualityIndex.module.css";

export default class SvmQualityIndex extends React.Component {
    render() {
        let classname = null;
        if (this.props.index > 0.6) {
            classname = styles["good"];
        }
        if (this.props.index > 0.4 && this.props.index <= 0.6) {
            classname = styles["medium"];
        }
        if (this.props.index <= 0.4) {
            classname = styles["bad"];
        }
        return (
            <div className={`${classname} ${styles["index-container"]}`}>
                <p>{this.props.text}</p>
                <p className={styles["quality-index-perc"]}>
                    {Math.trunc(this.props.index * 100)}%
                </p>
            </div>
        );
    }
}
