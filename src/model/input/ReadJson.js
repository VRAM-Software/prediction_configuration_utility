const Read = require("../Read");

class ReadJson extends Read {
    constructor() {
        super();
    }

    parser = (data, callback = () => {}) => {
        return JSON.parse(data);
    }
}

module.exports = ReadJson;