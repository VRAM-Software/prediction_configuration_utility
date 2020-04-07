const PerformReading = require("../PerformReading");
const ReadJson = require("../../../model/input/ReadJson");

class PerformReadingCsv extends PerformReading {
    reader;

    constructor() {
        super();
        this.reader = new ReadJson();
    }

    getReader = () => {
        return this.reader;
    };

    callRead = (path, callback) => {
        this.reader.readFile(path, callback);
    };
}

module.exports = PerformReadingCsv;
