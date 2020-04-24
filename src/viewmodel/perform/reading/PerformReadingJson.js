const PerformReading = require("../PerformReading");
const ReadJson = require("../../../model/input/ReadJson");

class PerformReadingCsv extends PerformReading {
    reader;

    constructor() {
        super();
        this.reader = new ReadJson();

        this.getReader = this.getReader.bind(this);
        this.callRead = this.callRead.bind(this);
    }

    getReader() {
        return this.reader;
    }

    callRead(path, callback) {
        this.reader.readFile(path, callback);
    }
}

module.exports = PerformReadingCsv;
