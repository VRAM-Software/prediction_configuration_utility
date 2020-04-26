import React from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import Axis from "./Axis";
import Grid from "./Grid";
import TrendLine from "./TrendLine";
import RenderDataSvm from "./RenderDataSvm";
import RenderDataRl from "./RenderDataRl";

export default class ScatterPlot extends React.Component {
    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 30 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        const svgWidth = width + margin.right + margin.left;
        const svgHeight = height + margin.top + margin.bottom;
        const gTransform = "translate(" + margin.left + "," + margin.top + ")";
        const xAxisTransform = "translate(0," + height + ")";
        const yAxisTransform = "translate(0,0)";
        let constraints = {
            maxX: Math.max.apply(
                Math,
                this.props.data.map((o) => {
                    return o[this.props.params[0]];
                })
            ),
            maxY: Math.max.apply(
                Math,
                this.props.data.map((o) => {
                    return o[this.props.params[1]];
                })
            ),
            minX: Math.min.apply(
                Math,
                this.props.data.map((o) => {
                    return o[this.props.params[0]];
                })
            ),
            minY: Math.min.apply(
                Math,
                this.props.data.map((o) => {
                    return o[this.props.params[1]];
                })
            ),
        };

        let dataForTraining = [];
        let dataForQuality = [];

        if (this.props.algorithm === "rl") {
            let len = Math.floor((this.props.data.length * 2) / 3);
            for (let i = 0; i < len; i++) {
                dataForTraining.push(this.props.data[i]);
            }
            for (let i = len; i < this.props.data.length; i++) {
                dataForQuality.push(this.props.data[i]);
            }
        } else {
            let dataSplittedOne = [];
            let dataSplittedNotOne = [];
            for (let i = 0; i < this.props.data.length; i++) {
                if (
                    this.props.data[i][
                        this.props.params[this.props.params.length - 1]
                    ] === "1"
                ) {
                    dataSplittedOne.push(this.props.data[i]);
                } else {
                    dataSplittedNotOne.push(this.props.data[i]);
                }
            }
            let lenOne = Math.floor((dataSplittedOne.length * 2) / 3);
            let lenNotOne = Math.floor((dataSplittedNotOne.length * 2) / 3);
            for (let i = 0; i < dataSplittedOne.length; i++) {
                if (i < lenOne) {
                    dataForTraining.push(dataSplittedOne[i]);
                } else {
                    dataForQuality.push(dataSplittedOne[i]);
                }
            }
            for (let i = 0; i < dataSplittedNotOne.length; i++) {
                if (i < lenNotOne) {
                    dataForTraining.push(dataSplittedNotOne[i]);
                } else {
                    dataForQuality.push(dataSplittedNotOne[i]);
                }
            }
        }

        let x = null;
        let y = null;
        x = scaleLinear()
            .domain([constraints.minX - 2, constraints.maxX + 2])
            .range([0, width]);
        y = scaleLinear()
            .domain([constraints.minY - 2, constraints.maxY + 2])
            .range([height, 0]);

        return (
            <div>
                <svg width={svgWidth} height={svgHeight} className="chart">
                    <g
                        width={width}
                        height={height}
                        transform={gTransform}
                        className="main"
                    >
                        {this.props.result &&
                        this.props.paramLength < 4 &&
                        this.props.algorithm === "svm" ? (
                            <Grid
                                result={this.props.result.result}
                                paramLength={this.props.paramLength}
                                constraints={constraints}
                                width={width}
                                height={height}
                                scale={{ x, y }}
                            />
                        ) : null}

                        {this.props.result &&
                        this.props.paramLength < 3 &&
                        this.props.algorithm === "rl" ? (
                            <TrendLine
                                result={this.props.result.result}
                                params={this.props.params}
                                data={data}
                                scale={{ x, y }}
                            />
                        ) : null}

                        {this.props.algorithm === "svm" ? (
                            <RenderDataSvm
                                dataForTraining={dataForTraining}
                                dataForQuality={dataForQuality}
                                params={this.props.params}
                                scale={{ x, y }}
                                viewDataTraining={this.props.viewDataTraining}
                                viewDataQuality={this.props.viewDataTest}
                            />
                        ) : null}

                        {this.props.algorithm === "rl" ? (
                            <RenderDataRl
                                dataForTraining={dataForTraining}
                                dataForQuality={dataForQuality}
                                params={this.props.params}
                                scale={{ x, y }}
                                viewDataTraining={this.props.viewDataTraining}
                                viewDataQuality={this.props.viewDataTest}
                            />
                        ) : null}

                        <Axis
                            axis="x"
                            transform={xAxisTransform}
                            scale={axisBottom().scale(x)}
                        />
                        <Axis
                            axis="y"
                            transform={yAxisTransform}
                            scale={axisLeft().scale(y)}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
