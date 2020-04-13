class PerformTraining {
    result = null;
    trainer = null;
    constructor() {
        if (this.constructor === PerformTraining) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    getTrainer() {
        throw new TypeError(
            "Do not call abstract method getTrainer from child."
        );
    }

    callTrain() {
        throw new TypeError(
            "Do not call abstract method callTrain from child."
        );
    }
}

module.exports = PerformTraining;
