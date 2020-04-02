import React from "react";
export default class RenderCircles extends React.Component {
    render() {
        const renderCircles = this.props.data.map((item, index) =>
            parseInt(item.label) === 1 ? (
                <circle
                    cx={this.props.scale.x(item[this.props.params[0]])}
                    cy={this.props.scale.y(item[this.props.params[1]])}
                    r="4"
                    style={{ fill: "green" }}
                    key={index}
                />
            ) : (
                <circle
                    cx={this.props.scale.x(item[this.props.params[0]])}
                    cy={this.props.scale.y(item[this.props.params[1]])}
                    r="4"
                    style={{ fill: "red" }}
                    key={index}
                />
            )
        );
        return <g>{renderCircles}</g>;
    }
}
