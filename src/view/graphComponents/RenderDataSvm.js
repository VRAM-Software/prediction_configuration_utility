import React from "react";
export default class RenderDataSvm extends React.Component {
    render() {
        const dataTrain = this.props.dataForTraining.map((item, index) =>
            item[this.props.params[this.props.params.length - 1]] > 0 ? (
                <circle
                    cx={this.props.scale.x(item[this.props.params[0]])}
                    cy={this.props.scale.y(item[this.props.params[1]])}
                    r="4"
                    stroke="black"
                    strokeWidth="1"
                    style={{ fill: "green" }}
                    key={index}
                />
            ) : (
                <circle
                    cx={this.props.scale.x(item[this.props.params[0]])}
                    cy={this.props.scale.y(item[this.props.params[1]])}
                    r="4"
                    stroke="black"
                    strokeWidth="1"
                    style={{ fill: "red" }}
                    key={index}
                />
            )
        );

        const dataQuality = this.props.dataForQuality.map((item, index) =>
            item[this.props.params[this.props.params.length - 1]] > 0 ? (
                <rect
                    x={this.props.scale.x(item[this.props.params[0]])}
                    y={this.props.scale.y(item[this.props.params[1]])}
                    height="8"
                    width="8"
                    stroke="black"
                    strokeWidth="1"
                    style={{ fill: "green" }}
                    key={index}
                />
            ) : (
                <rect
                    x={this.props.scale.x(item[this.props.params[0]])}
                    y={this.props.scale.y(item[this.props.params[1]])}
                    height="8"
                    width="8"
                    stroke="black"
                    strokeWidth="1"
                    style={{ fill: "red" }}
                    key={index}
                />
            )
        );

        return (
            <g>
                {this.props.viewDataQuality ? dataQuality : null}
                {this.props.viewDataTraining ? dataTrain : null}
            </g>
        );
    }
}
