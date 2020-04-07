class PerformWriting {
    writer = null;
    constructor() {
        if (this.constructor === PerformWriting) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    getWriter = () => {
        throw new TypeError(
            "Do not call abstract method getWriter from child."
        );
    };

    callWrite = () => {
        throw new TypeError(
            "Do not call abstract method callWrite from child."
        );
    };
}

module.exports = PerformWriting;
