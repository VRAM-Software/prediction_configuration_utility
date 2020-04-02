import React from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import Axis from "./Axis";
import RenderCircles from "./RenderCircles";
import Grid from "./Grid";

export default class ScatterPlot extends React.Component {
    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        const svgWidth = width + margin.right + margin.left;
        const svgHeight = height + margin.top + margin.bottom;
        const gTransform = "translate(" + margin.left + "," + margin.top + ")";
        //const xAxisTransformCentered = "translate(0," + height / 2 + ")";
        //const yAxisTransformCentered = "translate(" + width / 2 + "," + 0 + ")";
        const xAxisTransform = "translate(0," + height + ")";
        const yAxisTransform = "translate(0,0)";
        let constraints = {
            maxX: Math.max.apply(
                Math,
                this.props.data.map(o => {
                    return o[this.props.params[0]];
                })
            ),
            maxY: Math.max.apply(
                Math,
                this.props.data.map(o => {
                    return o[this.props.params[1]];
                })
            ),
            minX: Math.min.apply(
                Math,
                this.props.data.map(o => {
                    return o[this.props.params[0]];
                })
            ),
            minY: Math.min.apply(
                Math,
                this.props.data.map(o => {
                    return o[this.props.params[1]];
                })
            )
        };
        
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
                        {this.props.result ? (
                            <Grid
                                result={this.props.result}
                                constraints={constraints}
                                width={width}
                                height={height}
                                scale={{ x, y }}
                            />
                        ) : null}

                        <RenderCircles data={data} params={this.props.params} scale={{ x, y }} />

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
