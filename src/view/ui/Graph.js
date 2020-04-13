import React from "react";
import ScatterPlot from "../graphComponents/ScatterPlot";
export default class Graph extends React.Component {
    render() {
        return (
            <ScatterPlot
                data={this.props.data}
                params={this.props.params}
                result={this.props.result}
                paramLength={this.props.paramLength}
                algorithm={this.props.algorithm}
                graph='svm'
            />
        );
    }
}
