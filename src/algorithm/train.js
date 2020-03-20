const modules = require("ml-modules");
const SVM = modules.SVM;

class SvmTrainer {
    // tested 100%
    constructor() {
        this.trainedJson = null;
        this.data = [];
        this.labels = [];
        this.options = {
            kernel: "linear",
            karpathy: true
        };
    }

    // not tested
    // need to test wether svm.train is called with the right arguments
    train = data => {
        let svm = new SVM();
        this.translateData(data);
        svm.train(this.data, this.labels, this.options);
        this.trainedJson = svm.toJSON();
        // this.printPrediction(svm);
        return this.trainedJson;
    };

    // tested 100%
    translateData = json => {
        let data = [];
        let labels = [];
        for (let i = 0; i < json.length; i++) {
            data.push([parseFloat(json[i].weight), parseFloat(json[i].size)]);
            labels.push(json[i].label);
        }
        this.data = data;
        this.labels = labels;
    };

    // commented out 'cause unused
    // printPrediction = svmOld => {
    //   let svm = new SVM();
    //   svm.fromJSON(this.trainedJson);

    //   this.data.forEach((point) => {
    //       console.log("Prediction_1: " + svmOld.predict(point));
    //       console.log("Prediction_2: " + svm.predictClass(point));
    //   })
    // };

    // useless to test a getter
    getTrainedJson = () => {
        return this.trainedJson;
    };
}

module.exports = SvmTrainer;
