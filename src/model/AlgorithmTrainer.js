class AlgorithmTrainer {
    constructor() {
        if (this.constructor === AlgorithmTrainer) {
            throw new TypeError("Can not construct abstract class AlgorithmTrainer.");
        }
        if (this.train === AlgorithmTrainer.prototype.train) {
            throw new TypeError("Please implement abstract method train.");
        }
        if (this.translateData === AlgorithmTrainer.prototype.train) {
            throw new TypeError("Please implement abstract method translateData.");
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
}

module.exports = AlgorithmTrainer;
