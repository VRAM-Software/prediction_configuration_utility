const AlgorithmTrainer = require("../AlgorithmTrainer");
const Regression = require("./lib/regression.module");

class RlTrainer extends AlgorithmTrainer {
    constructor() {
        super();
        this.trainedJson = null;
        this.options = null;
        this.data = [];
        this.params = [];
    }

    train = data => {
        const rl = new Regression(this.options);
        this.translateData(data);
        this.trainedJson = rl.calculateCoefficients();
        return this.trainedJson;
    };

    translateData = data => {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push({x: data[i][this.params][0], y: data[i][this.params][1]});
        }
        this.data = result;
    };

    setParams = params => {
        this.params = params;
    };

    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
