const PerformWriting = require("../PerformWriting")
const WriteJson = require("../../../model/output/WriteJson");

class PerformWritingJson extends PerformWriting {
    writer = null;

    constructor() {
        super();
        this.writer = new WriteJson();
    }

    callWrite = (fileInfo, callback) => {
        this.writer.writeToDisk(fileInfo.path, fileInfo.name, fileInfo.trainedJson, fileInfo.notes, callback);
    }
}

module.exports = PerformWritingJson;
