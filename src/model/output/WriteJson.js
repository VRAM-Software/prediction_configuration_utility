const Write = require("../Write");
const Utils = require("../Utils");

class WriteJson extends Write {
    constructor() {
        super();
    }

    parser = (data, callback = () => {}) => {
        return JSON.stringify(data);
    };

    buildJson = (json, notes, meta) => {
        return {
            author: meta.author,
            version: meta.version,
            pluginAim: "svm",
            date: Utils.getDate(),
            time: Utils.getTime(),
            N: json.N,
            D: json.D,
            b: json.b,
            kernelType: json.kernelType,
            w: json.w,
            notes: notes
        };
    }
}

module.exports = WriteJson;
