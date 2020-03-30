const fs = require("fs");
const csv = require("csvtojson");
// Still WIP
class IO {
    static writeToDisk(name, file) {
        fs.writeFile("src/algorithm/output/" + name + ".json", file, function(
            err
        ) {
            if (err) {
                return console.error(err);
            }
            console.log(
                "Successfully wrote file: " +
                    name +
                    ".json to: `src/algorithm/output/`"
            );
        });
    }

    static readJsonFile(path) {
        fs.readFile(path, (err, data) => {
            if (err) {
                throw err;
            }
            return JSON.parse(data);
        });
    }

    translateToJson(data) {
        csv({
            delimiter: "auto"
        })
            .fromString(data)
            .then(res => {
                return res;
            });
    }

    static readCsvFile(path) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            csv({
                delimiter: "auto"
            })
                .fromString(data)
                .then(res => {
                    return res;
                });
        });
    }

    
}

module.exports = IO;
