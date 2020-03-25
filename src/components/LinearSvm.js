import React from "react";
import result from "./outpu";
import data from "./test";
export default class LinearSvm extends React.Component {
    SMO(X, y, C, tolerance, max_passes, gamma) {
        //Performs the SMO algorithm to determine Lagrange Multipliers for a SVM

        var n = X.length, //Size of Data
            a = [], //Lagrange Multipliers
            E = [], //Expected Values
            b = 0.0, //Threshold
            passes = 0, //Current Passes
            num_changed_alphas = 0;

        //initialize lagrange multipliers
        for (var i = n - 1; i >= 0; i--) {
            a[i] = 0.0;
            E[i] = 0.0;
        }

        while (passes < max_passes) {
            num_changed_alphas = 0;

            //Calculate Ei = f(x_i) - y_i
            for (var i = n - 1; i >= 0; i--) {
                E[i] = b - y[i];
                for (var j = n - 1; j >= 0; j--) {
                    E[i] += y[j] * a[j] * this.RBF(X[i], X[j], gamma);
                }

                if (
                    (y[i] * E[i] < -tolerance && a[i] < C) ||
                    (y[i] * E[i] > tolerance && a[i] > 0)
                ) {
                    //Select j != i Randomly

                    do {
                        j = Math.floor(Math.random() * n);
                    } while (j == i);

                    //Calculate Ej = f(x_j) - y_j
                    E[j] = b - y[j];
                    for (var k = n - 1; k >= 0; k--) {
                        E[j] += y[k] * a[k] * this.RBF(X[j], X[k], gamma);
                    }

                    var alpha_old_i = a[i],
                        alpha_old_j = a[j];

                    //Compute L and H by 10 or 11
                    if (y[i] != y[j]) {
                        var L = Math.max(0, a[j] - a[i]);
                        var H = Math.min(C, C + a[j] - a[i]);
                    } else {
                        var L = Math.max(0, a[i] + a[j] - C);
                        var H = Math.min(C, a[j] + a[i]);
                    }

                    if (L == H) {
                        continue;
                    }

                    //Compute nen by 14
                    var nen =
                        2 * this.RBF(X[i], X[j], gamma) -
                        this.RBF(X[i], X[i], gamma) -
                        this.RBF(X[j], X[j], gamma);

                    if (nen >= 0) {
                        continue;
                    }

                    //Compute and clip new value for aj using 12 and 15
                    a[j] = a[j] - (y[j] * (E[i] - E[j])) / nen;

                    //Clip aj to fall in range
                    if (a[j] > H) {
                        a[j] = H;
                    } else if (a[j] < L) {
                        a[j] = L;
                    }

                    //Check Change
                    if (Math.abs(a[j] - alpha_old_j) < 10e-5) {
                        continue;
                    }
                    //Compute value for ai using 16
                    a[i] = a[i] + y[i] * y[j] * (alpha_old_j - a[j]);

                    //Compute b1 and b2 with 17 and 18
                    var b1 =
                        b -
                        E[i] -
                        y[i] *
                            (a[i] - alpha_old_i) *
                            this.RBF(X[i], X[i], gamma) -
                        y[j] *
                            (a[j] - alpha_old_j) *
                            this.RBF(X[i], X[j], gamma);

                    var b2 =
                        b -
                        E[j] -
                        y[i] *
                            (a[i] - alpha_old_i) *
                            this.RBF(X[i], X[j], gamma) -
                        y[j] *
                            (a[j] - alpha_old_j) *
                            this.RBF(X[j], X[j], gamma);

                    //Compute b by 19
                    if (a[i] > 0 && a[i] < C) {
                        b = b1;
                    } else if (a[j] > 0 && a[j] < C) {
                        b = b2;
                    } else {
                        b = (b1 + b2) / 2;
                    }
                    num_changed_alphas += 1;
                }
            }
            if (num_changed_alphas == 0) {
                passes += 1;
            } else {
                passes = 0;
            }
        }

        var w = [[]];
        for (var i = X[0].length - 1; i >= 0; i--) {
            w[0][i] = 0;
        }
        for (var i = n - 1; i >= 0; i--) {
            for (var j = X[0].length - 1; j >= 0; j--) {
                w[0][j] += a[i] * X[i][j] * y[i];
            }
        }
        return { w: w, b: b };
    }

    RBF(a, b, gamma) {
        var d = 0.0;

        for (var i = a.length - 1; i >= 0; i--) {
            d += a[i] * b[i];
        }
        return d;
    }

    render() {
        const decision = [];
        const pg = [];
        const ng = [];
        if (this.props.result) {
            let X = [];
            let Y = [];
            for (let i = data.length - 1; i >= 0; i--) {
                X[i] = [+data[i].weight, +data[i].size];
                Y[i] = +data[i].label;
            }

            let otherResult = this.SMO(X, Y, 1, 0.000001, 30, -1);

            let w = otherResult.w[0];
            let b = otherResult.b;
            // let w = this.props.result.w;
            // let b = this.props.result.b * -1;

            console.log(w, b);
            for (let i = 0; i < 10; i++) {
                decision[i] = {
                    x: i / 1,
                    y: (-w[0] / w[1]) * (i / 1) - b / w[1]
                };
            }

            for (let i = 0; i < 10; i++) {
                pg[i] = {
                    x: i / 1,
                    y: (-w[0] / w[1]) * (i / 1) - (1 + b) / w[1]
                };
            }

            for (let i = 0; i < 10; i++) {
                ng[i] = {
                    x: i / 1,
                    y: (-w[0] / w[1]) * (i / 1) - (-1 + b) / w[1]
                };
            }
            console.log(decision);
        } else {
            console.log("no json arrived here");
        }
        
        return (
            <svg>
                {ng[9] ? (
                    <>
                        <line
                            id="decision"
                            x1={this.props.scale.x(decision[0].x + this.props.minX)}
                            y1={this.props.scale.y(decision[0].y)}
                            x2={this.props.scale.x(decision[9].x + this.props.minX)}
                            y2={this.props.scale.y(decision[9].y)}
                            style={{ stroke: "black", strokeWidth: "2" }}
                        />
                        <line
                            id="pg"
                            x1={this.props.scale.x(pg[0].x + this.props.minX)}
                            y1={this.props.scale.y(pg[0].y)}
                            x2={this.props.scale.x(pg[9].x + this.props.minX)}
                            y2={this.props.scale.y(pg[9].y)}
                            style={{ stroke: "black", strokeWidth: "2", strokeDasharray: "10,10"}}
                        />
                        <line
                            id="ng"
                            x1={this.props.scale.x(ng[0].x + this.props.minX)}
                            y1={this.props.scale.y(ng[0].y)}
                            x2={this.props.scale.x(ng[9].x + this.props.minX)}
                            y2={this.props.scale.y(ng[9].y)}
                            style={{ stroke: "black", strokeWidth: "2", strokeDasharray: "10,10"}}
                        />
                    </>
                ) : null}
            </svg>
        );
    }
}
