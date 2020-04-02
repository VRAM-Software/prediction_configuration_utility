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

    static buildTrainedFile(json, notes, meta){
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

module.exports = Utils;
