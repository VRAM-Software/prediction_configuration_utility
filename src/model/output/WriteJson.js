const fs = require("fs");

const Write = require("../Write");

class WriteJson extends Write {
    constructor() {
        super();
        this.extension = ".json";
    }

    parser = (data, callback = () => {}) => {
        return JSON.stringify(data);
    };

    buildTrainedFile = (json, notes) => {
        let objectToWrite = json;
        objectToWrite.notes = notes;
        return objectToWrite;
    }

    writeToDisk = (path, name, data) => {
        let context = this;
        fs.writeFile(path + "/" + name + context.extension, this.parser(data), function(
            err
        ) {
            if (err) {
                throw err;
            }
            console.log(
                "Successfully wrote file: " +
                name + context.extension +
                " to: " + path
            );
        });
    };
}

module.exports = WriteJson;
