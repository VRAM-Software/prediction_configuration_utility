const modules = require("ml-modules");
const fs = require('fs');
const SVM = modules.SVM;

/* code snippet

let trainer = new SvmTrainer();
trainer.train(data, notes);
trainer.printPrediction();

trainer.writeToDisk(fileName);


*/

export class SvmTrainer {
    constructor() {
        super();
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
        this.buildJson(this.JSON, notes);
    }

    translateData = (json) => {
        let data = [];
        let labels = [];
        for (let i = 0; i < json.length; i++) {
            data[i].push(json[i].weight);
            data[i].push(json[i].size);
            labels[i].push(json[i].labels);
        }
        this.data = data;
        this.labels = labels;
    }

    buildJson = (json, notes) => {
        let file = {
            author: "VRAMSoftware",
            version: "1.0.0",
            pluginAim: "svm",
            date: "",
            time: "",
            N: json["N"],
            D: json["D"],
            b: json["b"],
            kernelType: json["kernelType"],
            w: json["w"],
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

    writeToDisk = (fileName) => {
        fs.writeFile(
            'algorithm/output/' + fileName + '.json',
            this.outputJson,
            function (err) {
                if (err) return console.error(err);
                console.log("wrote file");
            }
        );
    }
}