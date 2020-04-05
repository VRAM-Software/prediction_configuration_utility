const PerformWritingJson = require("./perform/writing/PerformWritingJson");

class ProcessWriting {
    strategy = null;
    fileInfo = {};

    constructor(type) {
        if (type === "json") {
            this.strategy = new PerformWritingJson();
        }
    }

    setPath = (path) => {
        this.fileInfo.path = path;
    };

    setName = (name) => {
        this.fileInfo.name = name;
    };

    setTrainingResult = (trainedJson) => {
        this.fileInfo.trainedJson = trainedJson;
    };

    setNotes = (notes) => {
        this.fileInfo.notes = notes;
    }

    startWriting = (callback) => {
        this.strategy.callWrite(this.fileInfo, callback);
    }
}

module.exports = ProcessWriting;
