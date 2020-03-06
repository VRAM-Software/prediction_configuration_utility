import React from "react"
import { scaleLinear, axisLeft, axisBottom, select } from "d3"

function sortNumber(a, b) {
    return a - b
}

export default class ScatterPlot extends React.Component {
    render() {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const data = this.props.data;
        let x, y = null;

        if (this.props.graph === "svm") {
            const maxX = Math.max.apply(Math, data.map((o) => {
                return o.weight;
            }));
            const maxY = Math.max.apply(Math, data.map((o) => {
                return o.size;
            }));
            x = scaleLinear()
                .range([0, width])
                .domain([-maxX - 2, maxX + 2]);
            y = scaleLinear()
                .range([0, height])
                .domain([maxY + 2, -maxY - 2]);
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
                style={item.label !== "1" ? { fill: "red" } : { fill: "green" }}
                key={index}
            />
        ));
        return <g>{renderCircles}</g>
    }
}

class TrendLine extends React.Component {
    render() {
        const coordsX = this.props.data.map(n => {
            return n[0]
        });
        const coordsY = this.props.data.map(n => {
            return n[1]
        });
        const trendline = linearRegression(coordsY, coordsX);

        // Lowest and highest x coordinates to draw a plot line
        const lowestX = coordsX.sort(sortNumber)[0];
        const hightestX = coordsX.sort(sortNumber)[coordsX.length - 1];
        const trendlinePoints = [
            [lowestX, trendline(lowestX)],
            [hightestX, trendline(hightestX)]
        ]

        return (
            <line
                x1={this.props.scale.x(trendlinePoints[0][0])}
                y1={this.props.scale.y(trendlinePoints[0][1])}
                x2={this.props.scale.x(trendlinePoints[1][0])}
                y2={this.props.scale.y(trendlinePoints[1][1])}
                style={{ stroke: "black", strokeWidth: "2" }}
            />
        )
    }
}


function linearRegression(y, x) {
    const lr = {};
    const n = y.length;
    let sumX = 0;
    let sumY = 0;
    let sumXy = 0;
    let sumXx = 0;
    let sumYy = 0;

    for (let i = 0; i < y.length; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXy += x[i] * y[i];
        sumXx += x[i] * x[i];
        sumYy += y[i] * y[i];
    }

    lr["slope"] = (n * sumXy - sumX * sumY) / (n * sumXx - sumX * sumX);
    lr["intercept"] = (sumY - lr.slope * sumX) / n;
    lr["r2"] = Math.pow(
        (n * sumXy - sumX * sumY) /
        Math.sqrt((n * sumXx - sumX * sumX) * (n * sumYy - sumY * sumY)),
        2
    );

    return num => {
        return lr.slope * num + lr.intercept
    };
}
