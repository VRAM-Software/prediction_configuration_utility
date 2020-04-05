class PerformTraining {
    constructor() {
        if (this.constructor === PerformTraining) {
            throw new TypeError("Can not construct abstract class.");
        }
        if (this.callTrain === PerformTraining.prototype.callTrain) {
            throw new TypeError("Please implement abstract method callTrain.");
        }
    }

    callTrain = () => {
        throw new TypeError(
            "Do not call abstract method callTrain from child."
        );
    };
}

module.exports = PerformTraining;
