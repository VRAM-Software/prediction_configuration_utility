const Read = require("../Read")

class ReadJson extends Read {
    constructor() {
        super()
        this.parser = this.parser.bind(this)
    }

    parser(data, callback = () => {}) {
        callback(null, JSON.parse(data))
    }
}

module.exports = ReadJson
