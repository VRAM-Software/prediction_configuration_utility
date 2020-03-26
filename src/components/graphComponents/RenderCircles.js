import React from "react";
import "../../assets/App.css";
export default class RenderCircles extends React.Component {
    handleClick = (point) => {
        console.log(point.x, point.y);
    }
    render() {
        const renderCircles = this.props.data.map((item, index) => (
            parseInt(item.label) === 1 ?
            <>
                <circle
                    className="tooltip"
                    onClick={() => this.handleClick({x: item.weight, y: item.size})}
                    cx={this.props.scale.x(item.weight)}
                    cy={this.props.scale.y(item.size)}
                    r="4"
                    style={{ fill: "green" }}
                    key={index}
                />
                <text className="tooltipLabel" x={20} y={0} fill="black">
                    ({item.weight}, {item.size})
                </text>
            </>
            :
            <>
                <circle
                    className="tooltip"
                    onClick={() => this.handleClick({x: item.weight, y: item.size})}
                    cx={this.props.scale.x(item.weight)}
                    cy={this.props.scale.y(item.size)}
                    r="4"
                    style={{ fill: "red" }}
                    key={index}
                />
                <text className="tooltipLabel" x={20} y={0} fill="black">
                    ({item.weight}, {item.size})
                </text>
            </>
        ));
        return <g>{renderCircles}</g>;
    }
}
