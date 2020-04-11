const PerformTraining = require("../PerformTraining");
const SvmTrainer = require("../../../model/algorithm/SvmTrainer");

class PerformTrainingSvm extends PerformTraining {
    trainer = null;
    result = null;

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
        callback(null, this.result);
    }
}

module.exports = PerformTrainingSvm;
