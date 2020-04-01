const AlgorithmTrainer = require("../AlgorithmTrainer");
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
        const data = [];
        const labels = [];
        for (let i = 0; i < json.length; i++) {
            data.push([parseFloat(json[i].weight), parseFloat(json[i].size)]);
            labels.push(json[i].label);
        }
        this.data = data;
        this.labels = labels;
    };

    setQualityIndex = data => {};
}

module.exports = SvmTrainer;
