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
        this.params = [];
    }

    train = data => {
        const svm = new SVM();
        svm.setOptions(this.options);
        this.translateData(data);
        //let dataTrain = [];
        svm.train(this.data, this.labels);
        this.trainedJson = svm.toJSON();
        return this.trainedJson;
    };

    translateData = data => {
        const temp = [];
        let temp2 = [];
        const labels = [];
        for (let i = 0; i < data.length; i++) {
            /*for(let j = 0; j < this.params.length; ++j){
                temp2.push(parseFloat(data[i][this.params[j]]));
            }
            temp.push(temp2);*/
            temp.push([parseFloat(data[i][this.params[0]]), parseFloat(data[i][this.params[1]])]);
            labels.push(data[i].label);
        }
        this.data = temp;
        this.labels = labels;
    };

    setParams = params => {
        this.params = params;
    };

    setQualityIndex = data => {};
}

module.exports = SvmTrainer;
