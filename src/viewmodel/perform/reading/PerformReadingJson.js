const PerformReading = require("../PerformReading");
const ReadJson = require("../../../model/input/ReadJson");

class PerformReadingCsv extends PerformReading {
    reader = null;
    result = null;

    constructor() {
        super();
        this.reader = new ReadJson();
    }

    callRead = (path, callback) => {
        this.reader.readFile(path, callback);
    };
}

module.exports = PerformReadingCsv;
