const AlgorithmTrainer = require("../AlgorithmTrainer");
const modules = require("ml-modules");
const SVM = modules.SVM;
const Utils = require("../Utils");

class SvmTrainer extends AlgorithmTrainer {
    constructor() {
        super();
        this.trainedJson = null;
        this.data = [];
        this.labels = [];
        this.params = [];
        this.options = {
            kernel: {
                linear: true
            },
            karpathy: true
        };
    }

    train = data => {
        const svm = new SVM();
        svm.setOptions(this.options);
        this.translateData(data);
        svm.train(this.data, this.labels);
        this.trainedJson = svm.toJSON();
        return this.buildTrainedObject(this.trainedJson);
    };

    translateData = data => {
        const temp = [];
        let temp2 = [];
        const labels = [];
        let array = Object.keys(data[0]);
        console.log(this.params);
        if (array.length > 3) {
            for (let i = 0; i < data.length; i++) {
                for(let j = 0; j < this.params.length-1; ++j){
                    const objToAdd = data[i];
                    temp2.push(parseFloat(objToAdd[Object.keys(objToAdd)[j]]));
                }
                temp.push(temp2);
                temp2 = [];
                labels.push(data[i][Object.keys(data[i])[this.params.length-1]]);
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                temp.push([parseFloat(data[i][this.params[0]]), parseFloat(data[i][this.params[1]])]);
                labels.push(data[i][Object.keys(data[i])[this.params.length-1]]);
            }
        }
        this.data = temp;
        this.labels = labels;
    };

    setParams = params => {
        this.params = params;
    };

    buildTrainedObject = result => {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "svm";
        let array = this.params;
        array.length = Math.min(array.length, array.length-1);
        file.Predictors = array;
        file.result = result;
        return file;
    };

    setQualityIndex = data => {};
}

module.exports = SvmTrainer;
