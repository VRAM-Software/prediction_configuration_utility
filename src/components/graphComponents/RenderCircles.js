import React from "react";

export default class RenderCircles extends React.Component {
    handleClick = (point) => {
        console.log(point.x, point.y);
    }
    render() {
        const renderCircles = this.props.data.map((item, index) => (
            parseInt(item.label) === 1 ?
            <circle
                onClick={() => this.handleClick({x: item.weight, y: item.size})}
                cx={this.props.scale.x(item.weight)}
                cy={this.props.scale.y(item.size)}
                r="4"
                style={{ fill: "green" }}
                key={index}
            />
            :
            <circle
                onClick={() => this.handleClick({x: item.weight, y: item.size})}
                cx={this.props.scale.x(item.weight)}
                cy={this.props.scale.y(item.size)}
                r="4"
                style={{ fill: "red" }}
                key={index}
            />
        ));
        return <g>{renderCircles}</g>;
    }
}
