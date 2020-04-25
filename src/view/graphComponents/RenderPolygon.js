import React from "react";
export default class RenderPolygon extends React.Component {
    render() {
        let renderPolygonTest = null;
        if (this.props.algorithm === "svm") {
            if (this.props.viewDataTest) {
                renderPolygonTest = this.props.dataForTest.map((item, index) =>
                    item[this.props.params[this.props.params.length - 1]] >
                    0 ? (
                        <rect
                            x={this.props.scale.x(item[this.props.params[0]])}
                            y={this.props.scale.y(item[this.props.params[1]])}
                            height="8"
                            width="8"
                            stroke="black"
                            strokeWidth="1"
                            style={{ fill: "green" }}
                            key={index}
                        />
                    ) : (
                        <rect
                            x={this.props.scale.x(item[this.props.params[0]])}
                            y={this.props.scale.y(item[this.props.params[1]])}
                            height="8"
                            width="8"
                            stroke="black"
                            strokeWidth="1"
                            style={{ fill: "red" }}
                            key={index}
                        />
                    )
                );
            }
        } else {
            renderPolygonTest = this.props.dataForTest.map((item, index) => (
                <rect
                    x={this.props.scale.x(item[this.props.params[0]])}
                    y={this.props.scale.y(item[this.props.params[1]])}
                    height="8"
                    width="8"
                    stroke="black"
                    strokeWidth="1"
                    style={{ fill: "#4392f1" }}
                    key={index}
                />
            ));
        }

        return <g>{renderPolygonTest}</g>;
    }
}
