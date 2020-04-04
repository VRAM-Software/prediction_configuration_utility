class AlgorithmTrainer {
    constructor() {
        if (this.constructor === AlgorithmTrainer) {
            throw new TypeError("Can not construct abstract class AlgorithmTrainer.");
        }
    }

    train = data => {
        throw new TypeError("Do not call abstract method train from child.");
    };

    translateData = data => {
        throw new TypeError(
            "Do not call abstract method translateData from child."
        );
    };

    setParams = params => {
        throw new TypeError(
            "Do not call abstract method setParams from child."
        );
    };

    buildTrainedObject = result => {
        throw new TypeError(
            "Do not call abstract method buildTrainedObject from child."
        );
    };

    setQualityIndex = data => {
        throw new TypeError(
            "Do not call abstract method setQualityIndex from child."
        );
    };
}

module.exports = AlgorithmTrainer;
