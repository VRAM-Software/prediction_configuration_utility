const Write = require("../Write");

class WriteJson extends Write {
    constructor() {
        super();
    }

    parser = (data, callback = () => {}) => {
        return JSON.stringify(data);
    };
}

module.exports = WriteJson;
