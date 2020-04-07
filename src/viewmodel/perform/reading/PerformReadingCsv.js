const PerformReading = require("../PerformReading");
const ReadCsv = require("../../../model/input/ReadCsv");

class PerformReadingCsv extends PerformReading {
    reader;

    constructor() {
        super();
        this.reader = new ReadCsv();
    }

    getReader = () => {
        return this.reader;
    };

    callRead = (path, callback) => {
        this.reader.readFile(path, callback);
    };
}

module.exports = PerformReadingCsv;
