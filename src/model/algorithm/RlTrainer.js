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
        let valX = [];
        let valY = [];
        const result = [];
        let array = Object.keys(data[0]);
        if (array.length > 2) {
            for (let i = 0; i < data.length; i++) {
                valX = [];
                valX.push(1);
                valY = [];
                for (let j = 0; j < this.options.numX - 1; j++) {
                    const objToAdd = data[i];
                    valX.push(parseFloat(objToAdd[Object.keys(objToAdd)[j]]));
                }
                valY.push(parseFloat(data[i][Object.keys(data[i])[this.params.length - 1]]));
                result.push({x: valX, y: valY});
            }
        }
        else {
            for (let i = 0; i < data.length; i++) {
                valX = [];
                valX.push(1);
                valY = [];
                valX.push(parseFloat(data[i][this.params[0]]));
                valY.push(parseFloat(data[i][this.params[1]]));
                result.push({x: valX, y: valY});
                console.log("result2");
                console.log(result);
            }
        }
        this.data = result;
    };


    setParams = params => {
        this.params = params;
    };

    buildTrainedObject = result => {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "rl";
        let array = this.params;
        array.length = Math.min(array.length, array.length-1);
        file.predictors = array;
        file.result = result;
        return file;
    };

    setOptions = option => {
        this.options = option;
    };
}

module.exports = RlTrainer;
