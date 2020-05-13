const Regression = require("./lib/regression.module");
const Utils = require("../Utils");

class RlTrainer {
    trainedObj = null;
    dataForTrain = [];
    dataForQuality = [];
    params = null;
    options = null;
    qualityIndex = null;

    constructor() {
        this.train = this.train.bind(this);
        this.translateData = this.translateData.bind(this);
        this.setParams = this.setParams.bind(this);
        this.buildTrainedObject = this.buildTrainedObject.bind(this);
        this.setOptions = this.setOptions.bind(this);
        this.setQualityIndex = this.setQualityIndex.bind(this);
        this.getQualityIndex = this.getQualityIndex.bind(this);
        this.splitData = this.splitData.bind(this);
    }

    train(data) {
        let dataTrain = [];
        const rl = new Regression(this.options);
        this.splitData(data);
        dataTrain = this.translateData(this.dataForTrain);
        rl.insertData(dataTrain);
        this.trainedObj = rl.calculateCoefficients();
        this.qualityIndex = this.setQualityIndex(rl);
        return this.buildTrainedObject(this.trainedObj);
    }

    translateData(data) {
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
                valY.push(
                    parseFloat(
                        data[i][Object.keys(data[i])[this.params.length - 1]]
                    )
                );
                result.push({ x: valX, y: valY });
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                valX = [];
                valX.push(1);
                valY = [];
                valX.push(parseFloat(data[i][this.params[0]]));
                valY.push(parseFloat(data[i][this.params[1]]));
                result.push({ x: valX, y: valY });
            }
        }
        return result;
    }

    splitData(data) {
        let len = Math.floor((data.length * 2) / 3);
        for (let i = 0; i < len; i++) {
            this.dataForTrain.push(data[i]);
        }
        for (let i = len; i < data.length; i++) {
            this.dataForQuality.push(data[i]);
        }
    }

    setParams(params) {
        this.params = params;
    }

    buildTrainedObject(result) {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "rl";
        let array = this.params;
        array.length = Math.min(array.length, array.length - 1);
        file.predictors = array;
        file.result = result;
        return file;
    }

    setOptions(option) {
        this.options = option;
    }

    setQualityIndex(rl) {
        let qualityData = this.translateData(this.dataForQuality);
        let meanValue = 0;
        let SStot = 0;
        let SSres = 0;
        let predictedQualityData = [];
        for (let n in qualityData) {
            meanValue += qualityData[n].y[0];
        }
        meanValue = meanValue / qualityData.length;
        for (let n in qualityData) {
            SStot += Math.pow(qualityData[n].y[0] - meanValue, 2);
            predictedQualityData.push(rl.hypothesize(qualityData[n]));
            SSres += Math.pow(qualityData[n].y[0] - predictedQualityData[n], 2);
        }
        let rSquared = 1 - SSres / SStot;
        let adjusted =
            1 -
            ((qualityData.length - 1) /
                (qualityData.length - (qualityData[0].x.length + 1))) *
                (1 - rSquared);
        if (qualityData[0].x.length > 2) {
            return { rSquared: adjusted };
        } else {
            return { rSquared: rSquared };
        }
    }

    getQualityIndex() {
        return this.qualityIndex;
    }
}

module.exports = RlTrainer;
