const PerformTraining = require("../PerformTraining");
const RlTrainer = require("../../../model/algorithm/RlTrainer");

class PerformTrainingRl extends PerformTraining {
    trainer = null;
    result = null;

    constructor() {
        super();
        this.trainer = new RlTrainer();

        this.getTrainer = this.getTrainer.bind(this);
        this.callTrain = this.callTrain.bind(this);
    }

    getTrainer() {
        return this.trainer;
    }

    callTrain(params, data, callback) {
        this.trainer.setParams(params);
        this.trainer.setOptions({ numX: params.length, numY: 1 });
        this.result = this.trainer.train(data);
        this.qualityIndex = this.trainer.getQualityIndex();
        callback(null, this.result, this.qualityIndex);
    }
}

module.exports = PerformTrainingRl;
