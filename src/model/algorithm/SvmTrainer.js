const modules = require("ml-modules");
const SVM = modules.SVM;
const Utils = require("../Utils");

class SvmTrainer {
    svm = null;
    trainedJson = null;
    data = null;
    labels = null;
    params = null;
    options = null;

    constructor() {
        this.options = {
            kernel: {
                linear: true,
            },
            karpathy: true,
        };

        this.train = this.train.bind(this);
        this.translateData = this.translateData.bind(this);
        this.setParams = this.setParams.bind(this);
        this.buildTrainedObject = this.buildTrainedObject.bind(this);
        this.setQualityIndex = this.setQualityIndex.bind(this);
    }

    train(data) {
        this.svm = new SVM();
        this.svm.setOptions(this.options);
        this.translateData(data);
        this.svm.train(this.data, this.labels);
        this.trainedJson = this.svm.toJSON();
        return this.buildTrainedObject(this.trainedJson);
    }

    translateData(data) {
        const temp = [];
        let temp2 = [];
        const labels = [];
        for (let i = 0; i < data.length; i++) {
            temp2 = [];
            for (let j = 0; j < this.params.length - 1; j++) {
                temp2.push(parseFloat(data[i][this.params[j]]));
            }
            temp.push(temp2);
            labels.push(
                parseFloat(data[i][this.params[this.params.length - 1]])
            );
        }
        this.data = temp;
        this.labels = labels;
    }

    setParams(params) {
        this.params = params;
    }

    buildTrainedObject(result) {
        let file = Utils.getTemplateTrainedFile();
        file.pluginAim = "svm";
        let array = this.params;
        array.length = Math.min(array.length, array.length - 1);
        file.predictors = array;
        file.result = result;
        return file;
    }

    setQualityIndex(data) {}
}

module.exports = SvmTrainer;
