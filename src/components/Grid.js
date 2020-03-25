import React from "react";

export default class Grid extends React.Component {
    marginOne = inst => {
        let f = this.props.result.b;
        for (let j = 0; j < this.props.result.D; j++) {
            f += inst[j] * this.props.result.w[j];
        }

        return f;
    };

    predictClass(point) {
        return this.marginOne(point) >= 0 ? 1 : -1;
    }

    getColor = (predicted, real) => {
        let ri, gi;
        if (predicted < 0) {
            // less red 250-150
            ri = 150 - 100 * predicted; //with value = -1 ===> ri = 250
            gi = 250 + 100 * predicted; //with value = -1 ===> gi = 150
        } else {
            //less green 150-250
            ri = 250 - 100 * predicted; //with value = 1 ===> ri = 150
            gi = 150 + 100 * predicted; //with value = 1 ===> gi = 250
        }
        if (real > 0) gi += 5;
        else ri += 35;
        return "rgb(" + Math.floor(ri) + "," + Math.floor(gi) + ",150)";
    };

    render() {
        let xCords = [];
        if (this.props.result) {
            for (let x = 0.0; x <= this.props.width; x += 6) {
                for (let y = 0.0; y <= this.props.height; y += 6) {
                    let X = this.props.scale.x((x - this.props.width) / 0.5);
                    let Y = this.props.scale.y((y - this.props.height) / 0.5);
                    // let X = (x - this.props.width / 10);
                    // let Y = (y - this.props.height / 10);
                    let point = [X, Y];
                    let predictedClass = this.predictClass(point);
                    let predictedValue = predictedClass;
                    let color = this.getColor(predictedValue, predictedClass);

                    xCords.push({ x: x, y: y, color: color });
                }
            }
        }
        console.log(xCords);
        let objs = xCords.map((item, index) => (
            <rect
                key={index}
                x={item.x}
                y={item.y}
                width="6"
                height="6"
                fill={item.color}
            />
        ));

        return (
            <svg width={this.props.width} height={this.props.height} id="grid">
                {objs}
            </svg>
        );
    }
}
