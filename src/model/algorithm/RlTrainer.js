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
        this.insertData(data, rl);
        console.log("coefficiente");
        console.log(rl.calculateCoefficients());
        this.trainedJson = rl.calculateCoefficients();
        console.log("trainedJSON");
        console.log(this.trainedJson);
        return this.trainedJson;
    };

    //TODO: Sistemare l'architettura su trasnlate e ragionare se mantenere l'interfaccia Algorithm training
    translateData = data => {};

    insertData = (data, rl) => {
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i][this.params[0]]);
            //console.log(data[i][this.params[1]]);
            rl.push({x: [data[i][this.params[0]]], y: [data[i][this.params[1]]] });
        }
    };

    setParams = params => {
        this.params = params;
    };

    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
