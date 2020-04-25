const PerformTraining = require("../PerformTraining");
const SvmTrainer = require("../../../model/algorithm/SvmTrainer");

class PerformTrainingSvm extends PerformTraining {
    trainer = null;
    result = null;
    qualityIndex = null;

    constructor() {
        super();
        this.trainer = new SvmTrainer();
        this.getTrainer = this.getTrainer.bind(this);
        this.callTrain = this.callTrain.bind(this);
    }

    getTrainer() {
        return this.trainer;
    }

    callTrain(params, data, callback) {
        this.trainer.setParams(params);
        this.result = this.trainer.train(data);
        this.qualityIndex = this.trainer.getQualityIndex();
        callback(null, this.result, this.qualityIndex);
    }
}

module.exports = PerformTrainingSvm;
