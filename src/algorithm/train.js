const modules = require("ml-modules");
const SVM = modules.SVM;

class SvmTrainer {
    constructor() {
        this.trainedJson = null;
        this.data = [];
        this.labels = [];
        this.options = {
            kernel: "linear",
            karpathy: true
        };
    }

    train = data => {
        const svm = new SVM();
        this.translateData(data);
        svm.train(this.data, this.labels, this.options);
        this.trainedJson = svm.toJSON();
        return this.trainedJson;
    };

    translateData = json => {
        const data = [];
        const labels = [];
        for (let i = 0; i < json.length; i++) {
            data.push([parseFloat(json[i].weight), parseFloat(json[i].size)]);
            labels.push(json[i].label);
        }
        this.data = data;
        this.labels = labels;
    };

    // useless to test a getter
    getTrainedJson = () => {
        return this.trainedJson;
    };
}

module.exports = SvmTrainer;
