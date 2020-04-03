const AlgorithmTrainer = require("../AlgorithmTrainer");
const Regression = require("./lib/regression.module");
const Utils = require("../Utils");

class RlTrainer extends AlgorithmTrainer {
    constructor() {
        super();
        this.trainedObj = null;
        this.data = [];
        this.params = [];
        this.options = null;
    }

    train = data => {
        const rl = new Regression(this.options);
        this.translateData(data);
        rl.insertData(this.data);
        this.trainedObj = rl.calculateCoefficients();
        return this.buildTrainedObject(this.trainedObj);
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

    buildTrainedObject = result => {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "rl";
        file.result = result;
        return file;
    };

    //TODO: Provare a passarla nel costruttore
    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
