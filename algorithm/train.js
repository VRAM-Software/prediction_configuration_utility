const modules = require("ml-modules");
const SVM = modules.SVM;

class SvmTrainer {
    constructor() {
        this.trainedJson = null;
        this.outputJson = null;
        this.data = [];
        this.labels = [];
        this.options = {
            kernel: "linear",
            karpathy: true
        };
    }

    train = (data) => {
        let svm = new SVM();
        this.translateData(data);
        svm.train(this.data, this.labels, this.options);
        this.trainedJson = svm.toJSON();
        this.printPrediction(svm);
        return this.trainedJson;
    };

    translateData = (json) => {
        let data = [];
        let labels = [];
        for (let i = 0; i < json.length; i++) {
            data.push([
                parseFloat(json[i].weight),
                parseFloat(json[i].size)
            ]);
            labels.push(json[i].label);
        }
        this.data = data;
        this.labels = labels;
    };

    printPrediction = (svmOld) => {
        let svm = new SVM();
        svm.fromJSON(this.trainedJson);

        // this.data.forEach((point) => {
        //     console.log("Prediction_1: " + svmOld.predict(point));
        //     console.log("Prediction_2: " + svm.predictClass(point));
        // })
    };

    getOutputJson = () => {
        return this.outputJson;
    };

    getTrainedJson = () => {
        return this.trainedJson;
    };
}

module.exports = SvmTrainer;
