const Read = require("../Read");

class ReadJson extends Read {
    constructor() {
        super();
    }

    parser = (data, callback = () => {}) => {
        callback(null, JSON.parse(data));
        //return JSON.parse(data);
    }
}

module.exports = ReadJson;