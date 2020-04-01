const Read = require("../Read");
const csv = require("csvtojson");

class ReadCsv extends Read {
    constructor() {
        super();
    }

    parser = (data, callback) => {
        csv({
            delimiter: "auto"
        })
            .fromString(data)
            .then(res => {
                callback(null, res);
            });
    }
}

module.exports = ReadCsv;
