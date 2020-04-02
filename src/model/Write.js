const fs = require("fs");

class Write {
    constructor() {
        if (this.constructor === Write) {
            throw new TypeError("Can not construct abstract class Write.");
        }
    }

    writeToDisk = (path, name, data, extension) => {
        throw new TypeError(
            "Do not call abstract method writeToDisk from child."
        );
    };

    parser = (data, callback = () => {}) => {
        throw new TypeError(
            "Do not call abstract method parser from child."
        );
    };
}

module.exports = Write;
