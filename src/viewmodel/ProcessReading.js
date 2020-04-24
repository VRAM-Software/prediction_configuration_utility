const PerformReadingCsv = require("./perform/reading/PerformReadingCsv")
const PerformReadingJson = require("./perform/reading/PerformReadingJson")

class ProcessReading {
    strategy
    path
    extension

    constructor() {
        this.strategy = null
        this.path = null
        this.extension = null

        this.setStrategy = this.setStrategy.bind(this)
        this.getStrategy = this.getStrategy.bind(this)
        this.getPath = this.getPath.bind(this)
        this.setPath = this.setPath.bind(this)
        this.startReading = this.startReading.bind(this)
    }

    setStrategy(extension) {
        this.extension = extension
        if (extension === "json") {
            this.strategy = new PerformReadingJson()
        }
        if (extension === "csv") {
            this.strategy = new PerformReadingCsv()
        }
    }

    getStrategy() {
        return this.strategy
    }

    getPath() {
        return this.path
    }

    setPath(path) {
        this.path = path
    }

    startReading(callback) {
        this.strategy.callRead(this.path, callback)
    }
}

module.exports = ProcessReading
