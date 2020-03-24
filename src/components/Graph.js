import React from "react";
import ScatterPlot from "./graphComponents/ScatterPlot";

export default class Graph extends React.Component {
    render() {
        return <ScatterPlot data={this.props.data} result={this.props.result} graph="svm" />;
    }
}
