class PerformReading {
    constructor() {
        if (this.constructor === PerformReading) {
            throw new TypeError("Can not construct abstract class.");
        }
        if (this.callRead === PerformReading.prototype.callRead) {
            throw new TypeError("Please implement abstract method callRead.");
        }
    }

    callRead = () => {
        throw new TypeError("Do not call abstract method callRead from child.");
    };
}

module.exports = PerformReading;
