const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const SvmTrainer = require("../model/algorithm/SvmTrainer");
const RlTrainer = require("../model/algorithm/RlTrainer");
const ReadCsv = require("../model/input/ReadCsv");
const ReadJson = require("../model/input/ReadJson");
const WriteJson = require("../model/output/WriteJson");

function startTrainingRl(data, param, algorithm, callback) {
    let trainer = new RlTrainer();
    trainer.setOptions({ numX: param.length, numY: 1 });
    trainer.setParams(param);
    let jsonTrained = trainer.train(data);
    callback(null, jsonTrained);
}

function startTrainingSvm(data, param, algorithm, callback) {
    let trainer = new SvmTrainer();
    trainer.setParams(param);
    let jsonTrained = trainer.train(data);
    callback(null, jsonTrained);
}

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : "file:///" + app.getAppPath() + "/build/index.html"
    );

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("save-to-disk", (event, arg) => {
    const writer = new WriteJson();
    writer.writeToDisk("src/output", arg.name, arg.trainedJson, arg.notes, (err, res) => {
        event.reply("File correctly written", res);
    });
});

ipcMain.on("start-training-rl", (event, arg) => {
    startTrainingRl(arg.data, arg.params, arg.algorithm, (err, result) => {
        if (err) {
            throw err;
        }
        event.reply("finished-training", result);
    });
});
ipcMain.on("start-training-svm", (event, arg) => {
    startTrainingSvm(arg.data, arg.params, arg.algorithm, (err, result) => {
        if (err) {
            throw err;
        }
        event.reply("finished-training", result);
    });
});

ipcMain.on("get-json-from-csv", (event, arg) => {
    const csvReader = new ReadCsv();
    csvReader.readFile(arg, (err, res) => {
        event.reply("read-csv", res);
    })
});

ipcMain.on("get-json-configuration", (event, arg) => {
    const jsonReader = new ReadJson();
    jsonReader.readFile(arg, (err, res) => {
        event.reply("read-json", res);
    })
});
