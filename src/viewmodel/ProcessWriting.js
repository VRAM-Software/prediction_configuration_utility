const PerformWritingJson = require("./perform/writing/PerformWritingJson");

class ProcessWriting {
    strategy;
    fileInfo;

    constructor() {
        this.strategy = null;
        this.fileInfo = {
            path: null,
            name: null,
            trainedJson: null,
            notes: null,
        };
    }

    setStrategy = (type) => {
        if (type === "json") {
            this.strategy = new PerformWritingJson();
        }
    };

    getStrategy = () => {
        return this.strategy;
    };

    getFileInfo = () => {
        return this.fileInfo;
    };

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
    };

    startWriting = (callback) => {
        this.strategy.callWrite(this.fileInfo, callback);
    };
}

module.exports = ProcessWriting;
