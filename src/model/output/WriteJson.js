const fs = require("fs");

const Write = require("../Write");
const Utils = require("../Utils");

class WriteJson extends Write {
    constructor() {
        super();
        this.extension = ".json";
    }

    parser = (data, callback = () => {}) => {
        return JSON.stringify(data);
    };

    //TODO: ragionare su dove fare la build dei file da salvare
    buildTrainedFile = (json, notes, meta) => {
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

    writeToDisk = (path, name, data) => {
        let context = this;
        fs.writeFile(path + "/" + name + context.extension, this.parser(data), function(
            err
        ) {
            if (err) {
                throw err;
            }
            console.log(
                "Successfully wrote file: " +
                name + context.extension +
                " to: " + path
            );
        });
    };
}

module.exports = WriteJson;
