class Utils {
    // not tested
    static getDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "/" + mm + "/" + dd;
    }

    // not tested
    static getTime() {
        let today = new Date();
        return String(
            today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds()
        );
    }

    // not tested
    static buildJson(json, notes, meta) {
        return JSON.stringify({
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
        });
    }
}

module.exports = Utils;
