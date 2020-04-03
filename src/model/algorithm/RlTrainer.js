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
        console.log(this.options);
        this.translateData(data);
        rl.insertData(this.data);
        this.trainedObj = rl.calculateCoefficients();
        return this.buildTrainedObject(this.trainedObj);
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
                valX.push(parseFloat(objToAdd[Object.keys(objToAdd)[j]]));
            }
            valY.push(parseFloat(data[i][Object.keys(data[i])[this.params.length-1]]));
            result.push({x: valX, y: valY});
        }
        this.data = result;
        console.log(this.data);
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

    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
