import React from "react"
export default class RenderCircles extends React.Component {
    render() {
        let renderCirclesTrain = null
        if (this.props.algorithm === "svm") {
            if (this.props.viewDataTraining) {
                renderCirclesTrain = this.props.dataForTraining.map(
                    (item, index) =>
                        item[this.props.params[this.props.params.length - 1]] >
                        0 ? (
                            <circle
                                cx={this.props.scale.x(
                                    item[this.props.params[0]]
                                )}
                                cy={this.props.scale.y(
                                    item[this.props.params[1]]
                                )}
                                r="4"
                                stroke="black"
                                stroke-width="1"
                                style={{ fill: "green" }}
                                key={index}
                            />
                        ) : (
                            <circle
                                cx={this.props.scale.x(
                                    item[this.props.params[0]]
                                )}
                                cy={this.props.scale.y(
                                    item[this.props.params[1]]
                                )}
                                r="4"
                                stroke="black"
                                stroke-width="1"
                                style={{ fill: "red" }}
                                key={index}
                            />
                        )
                )
            }
        } else {
            renderCirclesTrain = this.props.dataForTraining.map(
                (item, index) => (
                    <circle
                        cx={this.props.scale.x(item[this.props.params[0]])}
                        cy={this.props.scale.y(item[this.props.params[1]])}
                        r="4"
                        stroke="black"
                        stroke-width="1"
                        style={{ fill: "white" }}
                        key={index}
                    />
                )
            )
        }

        return <g>{renderCirclesTrain}</g>
    }
}
