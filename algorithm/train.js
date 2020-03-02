const modules = require("ml-modules");
const fs = require('fs');
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

    train = (data, notes) => {
        let svm = new SVM();
        this.translateData(data);
        svm.train(this.data, this.labels, this.options);
        console.log("started training");
        this.trainedJson = svm.toJSON();
        console.log(this.trainedJson);
        this.buildJson(this.trainedJson, notes);
        this.printPrediction(svm);
    }

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
        console.log(this.data);
        console.log(this.labels);
    }

    buildJson = (json, notes) => {
        let file = {
            author: "VRAMSoftware",
            version: "1.0.0",
            pluginAim: "svm",
            date: "",
            time: "",
            N: json.N,
            D: json.D,
            b: json.b,
            kernelType: json.kernelType,
            w: json.w,
            notes: notes
        };
        this.outputJson = JSON.stringify(file);
    }

    printPrediction = (svmOld) => {
        let svm = new SVM();
        svm.fromJSON(this.trainedJson);

        this.data.forEach((point) => {
            console.log("Prediction_1: " + svmOld.predict(point));
            console.log("Prediction_2: " + svm.predictClass(point));
        })
    }

    getOutputJson = () => {
        return this.outputJson;
    }

    getTrainedJson = () => {
        return this.trainedJson;
    }
}

module.exports = SvmTrainer;
