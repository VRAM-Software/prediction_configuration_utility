import React from "react"

export default class TrendLine extends React.Component {
    constructor(props) {
        super(props)
        this.sortNumber = this.sortNumber.bind(this)
        this.linearRegression = this.linearRegression.bind(this)
    }
    sortNumber(a, b) {
        return a - b
    }

    linearRegression(x, y) {
        const lr = {}
        const n = y.length
        let sumX = 0
        let sumY = 0
        let sumXy = 0
        let sumXx = 0
        let sumYy = 0

        for (let i = 0; i < y.length; i++) {
            sumX += x[i]
            sumY += y[i]
            sumXy += x[i] * y[i]
            sumXx += x[i] * x[i]
            sumYy += y[i] * y[i]
        }

        lr["slope"] = (n * sumXy - sumX * sumY) / (n * sumXx - sumX * sumX)
        lr["intercept"] = (sumY - lr.slope * sumX) / n
        lr["r2"] = Math.pow(
            (n * sumXy - sumX * sumY) /
                Math.sqrt(
                    (n * sumXx - sumX * sumX) * (n * sumYy - sumY * sumY)
                ),
            2
        )

        return (num) => {
            return lr.slope * num + lr.intercept
        }
    }

    render() {
        let temp = []
        const coordsX = this.props.data.map((n) => {
            temp.push(parseFloat(n[this.props.params[0]]))
            return parseFloat(n[this.props.params[0]])
        })

        let coordsY = []

        for (let i = 0; i < this.props.data.length; i++) {
            coordsY.push(
                temp[i] * this.props.result[1][0] + this.props.result[0][0]
            )
        }

        const trendline = this.linearRegression(coordsX, coordsY)

        // Lowest and highest x coordinates to draw a plot line
        const lowestX = coordsX.sort(this.sortNumber)[0]
        const hightestX = coordsX.sort(this.sortNumber)[coordsX.length - 1]
        const trendlinePoints = [
            [lowestX, trendline(lowestX)],
            [hightestX, trendline(hightestX)],
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
