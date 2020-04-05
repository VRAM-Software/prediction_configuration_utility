const PerformTrainingRl = require("./perform/training/PerformTrainingRl");
const PerformTrainingSvm = require("./perform/training/PerformTrainingSvm");

class ProcessTraining {
    strategy = null;
    params = null;
    data = null;

    constructor(algorithm) {
        if (algorithm === "svm") {
            this.strategy = new PerformTrainingSvm();
        }
        if (algorithm === "rl") {
            this.strategy = new PerformTrainingRl();
        }
    }

    setParams = (params) => {
        this.params = params;
    }

    setData = (data) => {
        this.data = data;
    }
    
    startTraining = (callback) => {
        this.strategy.callTrain(this.params, this.data, callback);
    }
}

module.exports = ProcessTraining;
