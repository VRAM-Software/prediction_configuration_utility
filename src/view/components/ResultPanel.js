import React from "react";
import styles from "./style/ResultPanel.module.css";
import QualityIndex from "./QualityIndex";

class ResultPanel extends React.Component {
    render() {
        return (
            <div className={styles["resultPanel-container"]}>
                <h3>Indici di qualità</h3>
                {this.props.algorithmChosen === "svm" ? (
                    <div
                        className={
                            styles["resultPanel-quality-index-container"]
                        }
                    >
                        <div>
                            <QualityIndex
                                text="Precision"
                                index={
                                    this.props.qualityIndex
                                        ? this.props.qualityIndex.precision
                                        : null
                                }
                            />
                            <QualityIndex
                                text="Recall"
                                index={
                                    this.props.qualityIndex
                                        ? this.props.qualityIndex.recall
                                        : null
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        className={
                            styles["resultPanel-quality-index-container"]
                        }
                    >
                        <div>
                            <QualityIndex
                                text="RSquared"
                                index={
                                    this.props.qualityIndex
                                        ? this.props.qualityIndex.rSquared
                                        : null
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ResultPanel;
