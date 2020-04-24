import React from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import Axis from "./Axis";
import RenderCircles from "./RenderCircles";
import Grid from "./Grid";
import TrendLine from "./TrendLine";
import Graph from "../ui/Graph";
import RenderPolygon from "./RenderPolygon";

export default class ScatterPlot extends React.Component {
    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 30 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        const svgWidth = width + margin.right + margin.left;
        const svgHeight = height + margin.top + margin.bottom;
        const gTransform = "translate(" + margin.left + "," + margin.top + ")";
        //const xAxisTransformcenterd = "translate(0," + height / 2 + ")";
        //const yAxisTransformcentered = "translate(" + width / 2 + "," + 0 + ")";
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

        let len = Math.floor(((this.props.data.length * 2) / 3));
        let dataForTraining = [];
        for(let i = 0; i < len; i++){
            dataForTraining.push(this.props.data[i]);
        }
        let dataForQuality = [];
        for(let i = len; i < this.props.data.length; i++){
            dataForQuality.push(this.props.data[i]);
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
                <svg width={svgWidth} height={svgHeight} className='chart'>
                    <g
                        width={width}
                        height={height}
                        transform={gTransform}
                        className='main'
                    >
                        {/*{this.props.result && this.props.paramLength < 4 && this.props.algorithm === "svm"? (*/}
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

                        <RenderCircles
                            dataForTraining={dataForTraining}
                            params={this.props.params}
                            algorithm={this.props.algorithm}
                            scale={{ x, y }}
                            viewDataTraining={this.props.viewDataTraining}
                            viewDataTest={this.props.viewDataTest}
                        />

                        <RenderPolygon
                            dataForTest={dataForQuality}
                            params={this.props.params}
                            algorithm={this.props.algorithm}
                            scale={{ x, y }}
                            viewDataTraining={this.props.viewDataTraining}
                            viewDataTest={this.props.viewDataTest}
                        />


                        <Axis
                            axis='x'
                            transform={xAxisTransform}
                            scale={axisBottom().scale(x)}
                        />
                        <Axis
                            axis='y'
                            transform={yAxisTransform}
                            scale={axisLeft().scale(y)}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
