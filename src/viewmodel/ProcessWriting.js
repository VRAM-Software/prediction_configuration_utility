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
        this.setStrategy = this.setStrategy.bind(this);
        this.getStrategy = this.getStrategy.bind(this);
        this.getFileInfo = this.getFileInfo.bind(this);
        this.setPath = this.setPath.bind(this);
        this.setName = this.setName.bind(this);
        this.setTrainingResult = this.setTrainingResult.bind(this);
        this.setNotes = this.setNotes.bind(this);
        this.startWriting = this.startWriting.bind(this);
    }

    setStrategy(type) {
        if (type === "json") {
            this.strategy = new PerformWritingJson();
        }
    }

    getStrategy() {
        return this.strategy;
    }

    getFileInfo() {
        return this.fileInfo;
    }

    setPath(path) {
        this.fileInfo.path = path;
    }

    setName(name) {
        this.fileInfo.name = name;
    }

    setTrainingResult(trainedJson) {
        this.fileInfo.trainedJson = trainedJson;
    }

    setNotes(notes) {
        this.fileInfo.notes = notes;
    }

    startWriting(callback) {
        this.strategy.callWrite(this.fileInfo, callback);
    }
}

module.exports = ProcessWriting;
