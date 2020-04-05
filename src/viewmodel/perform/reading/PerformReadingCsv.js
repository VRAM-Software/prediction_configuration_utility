const PerformReading = require("../PerformReading");
const ReadCsv = require("../../../model/input/ReadCsv");

class PerformReadingCsv extends PerformReading {
    reader = null;
    result = null;

    constructor() {
        super();
        this.reader = new ReadCsv();
    }

    callRead = (path, callback) => {
        this.reader.readFile(path, callback);
    };
}

module.exports = PerformReadingCsv;
