const fs = require("fs")

class Read {
    constructor() {
        if (this.constructor === Read) {
            throw new TypeError("Can not construct abstract class Read.")
        }

        this.readFile = this.readFile.bind(this)
    }

    readFile(path, callback) {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                throw err
            }
            this.parser(data, callback)
        })
    }

    parser(data, callback = () => {}) {
        throw new TypeError("Do not call abstract method parser from child.")
    }
}

module.exports = Read
