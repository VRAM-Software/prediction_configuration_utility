import React from "react";
import styles from "./style/Graph.module.css";
import ScatterPlot from "../graphComponents/ScatterPlot";

class Graph extends React.Component {
    render() {
        return (
            <div className={styles["graph-container"]}>
                <div className={styles["graph"]}>
                    <ScatterPlot
                        data={this.props.data}
                        params={this.props.params}
                        result={this.props.result}
                        paramLength={this.props.paramLength}
                        algorithm={this.props.algorithm}
                        viewDataTraining={this.props.viewDataTraining}
                        viewDataTest={this.props.viewDataTest}
                    />
                </div>
            </div>
        );
    }
}

export default Graph;
