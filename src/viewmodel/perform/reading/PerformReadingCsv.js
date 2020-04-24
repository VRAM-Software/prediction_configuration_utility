const PerformReading = require("../PerformReading")
const ReadCsv = require("../../../model/input/ReadCsv")

class PerformReadingCsv extends PerformReading {
    reader

    constructor() {
        super()
        this.reader = new ReadCsv()

        this.getReader = this.getReader.bind(this)
        this.callRead = this.callRead.bind(this)
    }

    getReader() {
        return this.reader
    }

    callRead(path, callback) {
        this.reader.readFile(path, callback)
    }
}

module.exports = PerformReadingCsv
