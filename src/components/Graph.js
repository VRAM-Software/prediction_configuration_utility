import React from "react";
import ScatterPlot from "./ScatterPlot";

export default class LinearGraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ScatterPlot data={this.props.data} graph="svm" />
  }
}