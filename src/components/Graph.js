import React from "react";
import ScatterPlot from "./ScatterPlot";

export default class Graph extends React.Component {
  render() {
    return <ScatterPlot data={this.props.data} graph="svm" />
  }
}
