import React from "react";
import styles from "./style/ResultPanel.module.css";
import QualityIndex from "./QualityIndex";

class ResultPanel extends React.Component {
    render() {
        return (
            <div className={styles["resultPanel-container"]}>
                {this.props.qualityIndex ? (
                    this.props.algorithmChosen === "svm" ? (
                        <div
                            className={
                                styles["resultPanel-quality-index-container"]
                            }
                        >
                            <h3>Indici di qualità</h3>
                            <div>
                                <QualityIndex
                                    text="Precision"
                                    index={this.props.qualityIndex.precision}
                                />
                                <QualityIndex
                                    text="Recall"
                                    index={this.props.qualityIndex.recall}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className={
                                styles["resultPanel-quality-index-container"]
                            }
                        >
                            <h3>Indici di qualità</h3>
                            <div>
                                <QualityIndex
                                    text="RSquared"
                                    index={this.props.qualityIndex.rSquared}
                                />
                            </div>
                        </div>
                    )
                ) : null}
            </div>
        );
    }
}

export default ResultPanel;
