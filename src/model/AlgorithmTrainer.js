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
}

module.exports = AlgorithmTrainer;
