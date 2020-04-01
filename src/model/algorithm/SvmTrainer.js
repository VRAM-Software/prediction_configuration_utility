const AlgorithmTrainer = require("../AlgorithmTrainer");
const modules = require("ml-modules");
const SVM = modules.SVM;

class SvmTrainer extends AlgorithmTrainer {
    constructor() {
        super();
        this.trainedJson = null;
        this.data = [];
        this.labels = [];
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
        return this.trainedJson;
    };

    translateData = data => {
        const temp = [];
        const labels = [];
        for (let i = 0; i < data.length; i++) {
            temp.push([parseFloat(data[i].weight), parseFloat(data[i].size)]);
            labels.push(data[i].label);
        }
        this.data = temp;
        this.labels = labels;
    };

    setQualityIndex = data => {};
}

module.exports = SvmTrainer;
