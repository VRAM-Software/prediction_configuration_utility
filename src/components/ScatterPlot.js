import React from "react"
import { scaleLinear, axisLeft, axisBottom, select } from "d3"

function sortNumber(a, b) {
    return a - b
}

export default class ScatterPlot extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        let x, y = null;

        if (this.props.graph === "svm") {
            const max_x = Math.max.apply(Math, data.map((o) => {
                return o.weight;
            }));
            const max_y = Math.max.apply(Math, data.map((o) => {
                return o.size;
            }));
            x = scaleLinear()
                .range([0, width])
                .domain([-max_x - 2, max_x + 2]);
            y = scaleLinear()
                .range([0, height])
                .domain([max_y + 2, -max_y - 2]);
        } else {
            x = scaleLinear().range([0, width]).domain([-300, 300]);
            y = scaleLinear().range([0, height]).domain([300, -300]);
        }

        return (
            <div>
                <svg
                    width={width + margin.right + margin.left}
                    height={height + margin.top + margin.bottom}
                    className="chart"
                >
                    <g
                        transform={"translate(" + margin.left + "," + margin.top + ")"}
                        width={width}
                        height={height}
                        className="main"
                    >
                        <RenderCircles data={data} scale={{ x, y }} />
                        {/* <TrendLine data={data} scale={{ x, y }} />  */}
                        <Axis
                            axis="x"
                            transform={'translate(0,' + height / 2 + ")"}
                            scale={axisBottom().scale(x)}
                        />
                        <Axis
                            axis="y"
                            transform={'translate(' + width / 2 + ',' + 0 + ')'}
                            scale={axisLeft().scale(y)}
                        />
                    </g>
                </svg>
            </div>
        )
    }
}

class Axis extends React.Component {
    componentDidMount() {
        const node = this.refs[this.props.axis];
        select(node).call(this.props.scale);
    }

    render() {
        return (
            <g
                className="main axis date"
                transform={this.props.transform}
                ref={this.props.axis}
            />
        )
    }
}


class RenderCircles extends React.Component {
    render() {
        const renderCircles = this.props.data.map((item, index) => (
            <circle
                cx={this.props.scale.x(item.weight)}
                cy={this.props.scale.y(item.size)}
                r="4"
                style={item.label !== "1" ? {fill: "red"} : {fill: "green"}}
                key={index}
            />
        ));
        return <g>{renderCircles}</g>
    }
}

class TrendLine extends React.Component {
    render() {
        const x_coords = this.props.data.map(n => {
            return n[0]
        });
        const y_coords = this.props.data.map(n => {
            return n[1]
        });
        const trendline = linearRegression(y_coords, x_coords);

        // Lowest and highest x coordinates to draw a plot line
        const lowest_x = x_coords.sort(sortNumber)[0];
        const hightest_x = x_coords.sort(sortNumber)[x_coords.length - 1];
        const trendline_points = [
            [lowest_x, trendline(lowest_x)],
            [hightest_x, trendline(hightest_x)]
        ]

        return (
            <line
                x1={this.props.scale.x(trendline_points[0][0])}
                y1={this.props.scale.y(trendline_points[0][1])}
                x2={this.props.scale.x(trendline_points[1][0])}
                y2={this.props.scale.y(trendline_points[1][1])}
                style={{ stroke: "black", strokeWidth: "2" }}
            />
        )
    }
}


function linearRegression(y, x) {
    let lr = {};
    let n = y.length;
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;
    let sum_yy = 0;

    for (let i = 0; i < y.length; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_xx += x[i] * x[i];
        sum_yy += y[i] * y[i];
    }

    lr["slope"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    lr["intercept"] = (sum_y - lr.slope * sum_x) / n;
    lr["r2"] = Math.pow(
        (n * sum_xy - sum_x * sum_y) /
        Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
        2
    );

    return num => {
        return lr.slope * num + lr.intercept
    };
}
