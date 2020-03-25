import React from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import Axis from "./Axis";
import TrendLine from "./TrendLine";
import RenderCircles from "./RenderCircles";
import LinearSvm from "../LinearSvm";
import Grid from "../Grid";

export default class ScatterPlot extends React.Component {
    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        let x, y = null;

        if (this.props.graph === "svm") {
            const maxX = Math.max.apply(
                Math,
                data.map(o => {
                    return o.weight;
                })
            );
            const maxY = Math.max.apply(
                Math,
                data.map(o => {
                    return o.size;
                })
            );
            x = scaleLinear()
                .range([0, width])
                .domain([-maxX * 1.5 - 2, maxX * 1.5 + 2]);
            y = scaleLinear()
                .range([0, height])
                .domain([maxY * 1.5 + 2, -maxY * 1.5 - 2]);
        } else {
            x = scaleLinear()
                .range([0, width])
                .domain([-300, 300]);
            y = scaleLinear()
                .range([0, height])
                .domain([300, -300]);
        }

        return (
            <div>
                <svg
                    width={width + margin.right + margin.left}
                    height={height + margin.top + margin.bottom}
                    className="chart"
                >
                    <g
                        transform={
                            "translate(" + margin.left + "," + margin.top + ")"
                        }
                        width={width}
                        height={height}
                        className="main"
                    >
                        <RenderCircles data={data} scale={{ x, y }} />
                        {/* <Grid width={width} height={height} /> */}
                        <LinearSvm result={this.props.result} scale={{ x, y }}/>
                        {/* <TrendLine data={data} scale={{ x, y }} />  */}
                        <Axis
                            axis="x"
                            transform={"translate(0," + height / 2 + ")"}
                            scale={axisBottom().scale(x)}
                        />
                        <Axis
                            axis="y"
                            transform={"translate(" + width / 2 + "," + 0 + ")"}
                            scale={axisLeft().scale(y)}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
