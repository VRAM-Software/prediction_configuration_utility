import React from "react";

export default class Grid extends React.Component {
    render() {
        let xCords = [];
        for (let x = 0.0; x <= this.props.width; x += 6) {
            
            
            for (let y = 0.0; y <= this.props.height; y += 6 )
            if (Math.floor(Math.random() * 10) % 2) {
                xCords.push({x: x, y: y, color: "blue"});
            } else {
                xCords.push({x: x, y: y, color: "yellow"});
            }
            // for (let y = 0.0; y <= this.props.height; y += 20) {
            //     yCords.push(y);
            //     // let X = (x - this.props.width / 2) / 20;
            //     // let Y = (y - this.props.height / 2) / 20;
            //     // let point = boost(boosting, [X, Y]);
            //     // let predicted_class = this.algorithm.predictClass(point);
            //     // let predicted_value = 0;
            //     // if (this.options.margin.soft)
            //     //     predicted_value = this.algorithm.predict(point);
            //     // else predicted_value = predicted_class;
            //     // let random = Math.floor(Math.random() * 10);
                

            //     // this.ctx.fillRect(
            //     //     x - 20 / 2 - 1,
            //     //     y - 20 - 1,
            //     //     20 + 2,
            //     //     20 + 2
            //     // );
            // }
        }
        console.log(xCords);
        let objs = xCords.map((item, index) => (
            <rect key={index} x={item.x} y={item.y} width="8" height="8" fill={item.color} />
        ))
        return (
            <svg width={this.props.width} height={this.props.height}>
                {objs}
            </svg>
        );
    }
}
