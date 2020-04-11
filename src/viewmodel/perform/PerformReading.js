class PerformReading {
    constructor() {
        if (this.constructor === PerformReading) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    getReader() {
        throw new TypeError(
            "Do not call abstract method getReader from child."
        );
    };

    callRead() {
        throw new TypeError("Do not call abstract method callRead from child.");
    };
}

module.exports = PerformReading;
