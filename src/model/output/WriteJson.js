const Write = require("../Write");

class WriteJson extends Write {
    constructor() {
        super();
        this.extension = ".json";
    }

    parser = (data, callback = () => {}) => {
        return JSON.stringify(data);
    };

    buildTrainedFile = (result, notes) => {
        let objectToWrite = result;
        objectToWrite.notes = notes;
        return objectToWrite;
    }
}

module.exports = WriteJson;
