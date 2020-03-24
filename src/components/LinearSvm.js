import React from "react";

export default class LinearSvm extends React.Component {
    render() {
        const decision = [];
        const pg = [];
        const ng = [];
        console.log(this.props.result);
        if (this.props.result) {
            let w = this.props.result.w;
            let b = this.props.result.b;
            const decision = [];
            for (let i = 0; i < 100; i++) {
                decision[i] = {
                    y: i,
                    x: (-w[0] / w[1]) - b / w[1]
                };
            }

            // for (let i = 0; i < 1000; i++) {
            //     pg[i] = {
            //         x: i / 100,
            //         y: (-w[0] / w[1]) * (i / 100) - (1 + b) / w[1]
            //     };
            // }

            // for (let i = 0; i < 1000; i++) {
            //     ng[i] = {
            //         x: i / 100,
            //         y: (-w[0] / w[1]) * (i / 100) - (-1 + b) / w[1]
            //     };
            // }

            console.log(decision);
        }

        return (
            <svg>
                {this.props.result ? (
                    <line
                        x1={this.props.scale.x(0)}
                        y1={this.props.scale.y(0)}
                        x2={this.props.scale.x(50)}
                        y2={this.props.scale.y(6)}
                        style={{ stroke: "black", strokeWidth: "2" }}
                    />
                ) : null}
            </svg>
        );
    }
}
