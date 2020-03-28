import React from "react";
import "../../assets/App.css";
export default class RenderCircles extends React.Component {
    render() {
        const renderCircles = this.props.data.map((item, index) =>
            parseInt(item.label) === 1 ? (
                <circle
                    className="tooltip"
                    cx={this.props.scale.x(item.weight)}
                    cy={this.props.scale.y(item.size)}
                    r="4"
                    style={{ fill: "green" }}
                    key={index}
                />
            ) : (
                <circle
                    className="tooltip"
                    cx={this.props.scale.x(item.weight)}
                    cy={this.props.scale.y(item.size)}
                    r="4"
                    style={{ fill: "red" }}
                    key={index}
                />
            )
        );
        return <g>{renderCircles}</g>;
    }
}
