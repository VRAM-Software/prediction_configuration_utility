import React from "react";

export default class RenderCircles extends React.Component {
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
        return <g>{renderCircles}</g>;
    }
}
