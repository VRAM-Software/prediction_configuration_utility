const PerformWriting = require("../PerformWriting")
const WriteJson = require("../../../model/output/WriteJson")

class PerformWritingJson extends PerformWriting {
    writer = null

    constructor() {
        super()
        this.writer = new WriteJson()

        this.getWriter = this.getWriter.bind(this)
        this.callWrite = this.callWrite.bind(this)
    }

    getWriter() {
        return this.writer
    }

    callWrite(fileInfo, callback) {
        this.writer.writeToDisk(
            fileInfo.path,
            fileInfo.name,
            fileInfo.trainedJson,
            fileInfo.notes,
            callback
        )
    }
}

module.exports = PerformWritingJson
