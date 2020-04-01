const fs = require("fs");

class Write {
    constructor() {
        if (this.constructor === Write) {
            throw new TypeError("Can not construct abstract class Write.");
        }
        if (this.parser === Write.prototype.parser) {
            throw new TypeError("Please implement abstract method writeToDisk.");
        }
    }

    writeToDisk = (path, name, data, extension) => {
        fs.writeFile(path + "/" + name + extension, data, function(
            err
        ) {
            if (err) {
                return console.error(err);
            }
            console.log(
                "Successfully wrote file: " +
                    name + extension +
                    " to: " + path
            );
        });
    };

    parser = (data, callback = () => {}) => {
        throw new TypeError(
            "Do not call abstract method parser from child."
        );
    };
}

module.exports = Write;
