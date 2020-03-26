import React from "react";
import ScatterPlot from "./graphComponents/ScatterPlot";
import ScatterPlotNoAxis from "./graphComponents/ScatterPlotNoAxis";
export default class Graph extends React.Component {
    render() {
        return (
            <g>
                <ScatterPlot data={this.props.data} result={this.props.result} graph="svm" />
            </g>
            
        );
    }
}
