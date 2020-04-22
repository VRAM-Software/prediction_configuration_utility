import React from "react";

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.marginOne = this.marginOne.bind(this);
        this.predictClass = this.predictClass.bind(this);
        this.getColor = this.getColor.bind(this);
    }
    marginOne(inst) {
        let f = this.props.result.b;
        for (let j = 0; j < this.props.result.D; j++) {
            f += inst[j] * this.props.result.w[j];
        }

        return f;
    }

    predictClass(point) {
        return this.marginOne(point) >= 0 ? 1 : -1;
    }

    getColor(predicted, real) {
        let ri, gi;
        if (predicted < 0) {
            ri = 150 - 100 * predicted;
            gi = 250 + 100 * predicted;
        } else {
            ri = 250 - 100 * predicted;
            gi = 150 + 100 * predicted;
        }
        if (real > 0) {
            gi += 5;
        } else {
            ri += 35;
        }
        return "rgb(" + Math.floor(ri) + "," + Math.floor(gi) + ",150)";
    }

    render() {
        const coords = [];
        let multiplier = 1;
        if (this.props.constraints.maxX > 0 && this.props.constraints.minX > 0) {
            if (this.props.constraints.maxX - this.props.constraints.minX > 80) {
                multiplier = 10;
            }
        } else if (this.props.constraints.maxX < 0 && this.props.constraints.minX < 0) {
            if (Math.abs(this.props.constraints.minX) - Math.abs(this.props.constraints.maxX) > 80) {
                multiplier = 10;
            }
        } else {
            if (this.props.constraints.maxX + Math.abs(this.props.constraints.minX) > 80) {
                multiplier = 10;
            }
        }
        if (this.props.result) {
            for (
                let x = this.props.constraints.minX - 2;
                x <= this.props.constraints.maxX + 2;
                x += 0.2 * multiplier
            ) {
                for (
                    let y = this.props.constraints.minY - 2;
                    y <= this.props.constraints.maxY + 2;
                    y += 0.2 * multiplier
                ) {
                    const predictedClass = this.predictClass([x, y]);
                    const predictedValue = predictedClass;
                    const color = this.getColor(predictedValue, predictedClass);
                    coords.push({
                        x: this.props.scale.x(x),
                        y: this.props.scale.y(y),
                        color: color,
                    });
                }
            }
        }

        const objs = coords.map((item, index) => (
            <rect
                key={index}
                x={item.x}
                y={item.y}
                fill={item.color}
                width='20'
                height='20'
            />
        ));

        return (
            <svg width={this.props.width} height={this.props.height} id='grid'>
                {objs}
            </svg>
        );
    }
}
