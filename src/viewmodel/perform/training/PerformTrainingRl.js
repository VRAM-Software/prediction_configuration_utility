const PerformTraining = require("../PerformTraining");
const RlTrainer = require("../../../model/algorithm/RlTrainer");

class PerformTrainingRl extends PerformTraining {
    trainer = null;
    result = null;

    constructor() {
        super();
        this.trainer = new RlTrainer();
    }

    getTrainer = () => {
        return this.trainer;
    };

    callTrain = (params, data, callback) => {
        this.trainer.setParams(params);
        this.trainer.setOptions({ numX: params.length, numY: 1 });
        this.result = this.trainer.train(data);
        callback(null, this.result);
    };
}

module.exports = PerformTrainingRl;
