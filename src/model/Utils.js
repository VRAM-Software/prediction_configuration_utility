const config = require("../config/config");
class Utils {
    static getDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "/" + mm + "/" + dd;
    }

    static getTime() {
        const today = new Date();
        return String(
            today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds()
        );
    }

    static getTemplateTrainedFile() {
        return {
            author: config.author,
            version: config.version,
            date: Utils.getDate(),
            time: Utils.getTime(),
        };
    }
}

module.exports = Utils;
