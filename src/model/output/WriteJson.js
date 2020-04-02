const Write = require("../Write");
const Utils = require("../Utils");

class WriteJson extends Write {
    constructor() {
        super();
    }

    parser = (data, callback = () => {}) => {
        return JSON.stringify(data);
    };

    writeToDisk = (path, name, data, extension) => {
        fs.writeFile(path + "/" + name + extension, data, function(
            err
        ) {
            if (err) {
                return console.error(err);
            }
            console.log(
                "Successfully wrote file: " +
                name + extension +
                " to: " + path
            );
        });
    };
}

module.exports = WriteJson;
