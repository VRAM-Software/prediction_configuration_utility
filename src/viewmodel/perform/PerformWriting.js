class PerformWriting {
    constructor() {
        if (this.constructor === PerformWriting) {
            throw new TypeError("Can not construct abstract class.");
        }
        if (this.callWrite === PerformWriting.prototype.callWrite) {
            throw new TypeError("Please implement abstract method callWrite.");
        }
    }

    callWrite = () => {
        throw new TypeError("Do not call abstract method callWrite from child.");
    };
}

module.exports = PerformWriting;
