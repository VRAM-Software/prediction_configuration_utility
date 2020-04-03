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
        rl.insertData(this.data);
        console.log(rl.calculateCoefficients());
        this.trainedJson = rl.calculateCoefficients();
        return this.trainedJson;
    };

    translateData = data => {
        let dataToInsert = [];
        for (let i = 0; i < data.length; i++) {
            dataToInsert.push({x: [data[i][this.params[0]]], y: [data[i][this.params[1]]] });
        }
        this.data = dataToInsert;
    };

    setParams = params => {
        this.params = params;
    };

    //TODO: Provare a passarla nel costruttore
    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
