const fs = require("fs");

class Write {
    constructor() {
        if (this.constructor === Write) {
            throw new TypeError("Can not construct abstract class Write.");
        }

        this.writeToDisk = this.writeToDisk.bind(this);
        this.buildTrainedFile = this.buildTrainedFile.bind(this);
    }

    writeToDisk(path, name, data, notes, callback) {
        let context = this;
        let dataToBuild = this.buildTrainedFile(data, notes);
        let stringToWrite = this.parser(dataToBuild, callback);
        fs.writeFile(
            path + "/" + name + context.extension,
            stringToWrite,
            function (err) {
                if (err) {
                    throw err;
                }
                console.log(
                    "Successfully wrote file: " +
                        name +
                        context.extension +
                        " to: " +
                        path
                );
            }
        );
    }

    buildTrainedFile(result, notes) {
        let objectToWrite = result;
        objectToWrite.notes = notes;
        return objectToWrite;
    }

    parser(data, callback = () => {}) {
        throw new TypeError("Do not call abstract method parser from child.");
    }
}

module.exports = Write;
