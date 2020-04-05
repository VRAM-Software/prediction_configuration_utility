const PerformReadingCsv = require("./perform/reading/PerformReadingCsv")
const PerformReadingJson = require("./perform/reading/PerformReadingJson")

class ProcessReading {
    strategy = null;
    path = null;
    extension = null;

    constructor(extension) {
        this.extension = extension;
        if (extension === "json") {
            this.strategy = new PerformReadingJson();
        } 
        if (extension === "csv") {
            this.strategy = new PerformReadingCsv();
        }
        
    }

    setPath = (path) => {
        this.path = path;
    }

    startReading = (callback) => {
        this.strategy.callRead(this.path, callback);
    }
}

module.exports = ProcessReading;
