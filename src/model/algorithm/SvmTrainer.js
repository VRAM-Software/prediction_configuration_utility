const AlgorithmTrainer = require("../AlgorithmTrainer");
const modules = require("ml-modules");
const SVM = modules.SVM;
const Utils = require("../Utils");

class SvmTrainer extends AlgorithmTrainer {
    constructor() {
        super();
        this.trainedObj = null;
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
        return this.buildTrainedObject(this.trainedJson);
        this.trainedJson = svm.toJSON();
    };

    translateData = data => {
        const temp = [];
        let temp2 = [];
        const labels = [];
        let array = Object.keys(data[0]);
        console.log(array);
        for (let i = 0; i < data.length; i++) {
            for(let j = 0; j < array.length-1; ++j){
                const objToAdd = data[i];
                temp2.push(parseFloat(objToAdd[Object.keys(objToAdd)[j]]));
            }
            temp.push(temp2);
            temp2 = [];
            //temp.push([parseFloat(data[i][this.params[0]]), parseFloat(data[i][this.params[1]])]);
            labels.push(data[i][Object.keys(data[i])[array.length-1]]);
        }
        console.log(temp);
        this.data = temp;
        this.labels = labels;
        console.log(this.labels);
    };

    setParams = params => {
        this.params = params;
    };

    buildTrainedObject = result => {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "svm";
        file.result = result;
        return file;
    };

    setQualityIndex = data => {};
}

module.exports = SvmTrainer;
