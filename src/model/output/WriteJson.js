const Write = require("../Write")

class WriteJson extends Write {
    constructor() {
        super()
        this.extension = ".json"
        this.parser = this.parser.bind(this)
    }

    parser(data, callback = () => {}) {
        return JSON.stringify(data)
    }
}

module.exports = WriteJson
