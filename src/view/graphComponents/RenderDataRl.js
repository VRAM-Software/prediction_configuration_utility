import React from "react";
export default class RenderDataRl extends React.Component {
    render() {
        const dataTrain = this.props.dataForTraining.map((item, index) => (
            <circle
                cx={this.props.scale.x(item[this.props.params[0]])}
                cy={this.props.scale.y(item[this.props.params[1]])}
                r="4"
                stroke="black"
                strokeWidth="1"
                style={{ fill: "#4392f1" }}
                key={index}
            />
        ));

        const dataQuality = this.props.dataForQuality.map((item, index) => (
            <rect
                x={this.props.scale.x(item[this.props.params[0]])}
                y={this.props.scale.y(item[this.props.params[1]])}
                height="8"
                width="8"
                stroke="black"
                strokeWidth="1"
                style={{ fill: "#4392f1" }}
                key={index}
            />
        ));

        return (
            <g>
                {this.props.viewDataQuality ? dataQuality : null}
                {this.props.viewDataTraining ? dataTrain : null}
            </g>
        );
    }
}
