import React from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import Axis from "./Axis";
import TrendLine from "./TrendLine";
import RenderCircles from "./RenderCircles";
import LinearSvm from "../LinearSvm";
import Grid from "../Grid";

export default class ScatterPlotNoAxis extends React.Component {
    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        let x = null;
        let y = null;

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
                .domain([0, maxX + 2])
                .range([0, width]);
            y = scaleLinear()
                .domain([maxY + 2, 0])
                .range([0, height]);
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
                        {this.props.result ? (
                            <Grid
                                result={this.props.result}
                                width={width}
                                height={height}
                                scale={{ x, y }}
                            />
                        ) : null}

                        <RenderCircles data={data} scale={{ x, y }} />

                        <Axis
                            axis="x"
                            transform={"translate(0," + height + ")"}
                            scale={axisBottom().scale(x)}
                        />
                        <Axis
                            axis="y"
                            transform="translate(0,0)"
                            scale={axisLeft().scale(y)}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
