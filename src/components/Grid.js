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
        console.log(this.props.minX)
      for (let x = this.props.minX-2; x <= this.props.maxX + 2; x += 0.2) {
        for (let y = this.props.minY-2; y <= this.props.maxY + 2; y += 0.2) {
          let X = x;
          let Y = y;
          let point = [X, Y];
          let predictedClass = this.predictClass(point);
          let predictedValue = predictedClass;
          let color = this.getColor(predictedValue, predictedClass);
          xCords.push({
            x: this.props.scale.x(X),
            y: this.props.scale.y(Y),
            color: color
          });
        }
      }
    }
    // console.log(xCords);
    let objs = xCords.map((item, index) => (
      <rect
        key={index}
        x={item.x}
        y={item.y}
        width="20"
        height="20"
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
