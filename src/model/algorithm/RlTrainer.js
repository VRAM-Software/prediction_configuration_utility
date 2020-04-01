const AlgorithmTrainer = require("../AlgorithmTrainer");
const Regression = require("./lib/regression.module");

class RlTrainer extends AlgorithmTrainer {
    constructor() {
        super();
        this.trainedJson = null;
        this.options = null;
        this.data = [];
    }

    train = data => {
        const rl = new Regression(this.options);
        this.translateData(data);
        this.trainedJson = JSON.stringify(rl.calculateCoefficients());
        return this.trainedJson;
    };

    translateData = data => {
        let valX = [];
        let valY = [];
        const result = [];

        for (let i = 0; i < data.length; i++) {
            valX = [];
            valY = [];
            for(let j = 0; j  < this.options.numX; j++) {
                const objToAdd = data[i];
                valX.push(objToAdd[Object.keys(objToAdd)[j]]);
            }
            valY.push(data[i].y);
            result.push({x: valX, y: valY});
        }
        this.data = result;
    };

    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
