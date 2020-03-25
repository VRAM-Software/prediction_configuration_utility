import React from "react";

export default class Grid extends React.Component {
    render() {
        let xCords = [];
        for (let x = 0.0; x <= this.props.width; x += 6) {
            for (let y = 0.0; y <= this.props.height; y += 6) {
                if (Math.floor(Math.random() * 10) % 2) {
                    xCords.push({ x: x, y: y, color: "blue" });
                } else {
                    xCords.push({ x: x, y: y, color: "yellow" });
                }
            }
        }
        console.log(xCords);
        let objs = xCords.map((item, index) => (
            <rect
                key={index}
                x={item.x}
                y={item.y}
                width="8"
                height="8"
                fill={item.color}
            />
        ));
        return (
            <svg width={this.props.width} height={this.props.height}>
                {objs}
            </svg>
        );
    }
}
