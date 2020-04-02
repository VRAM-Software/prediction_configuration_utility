const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const SvmTrainer = require("../model/algorithm/SvmTrainer");
const meta = require("../config/config");
const ReadCsv = require("../model/input/ReadCsv");
const ReadJson = require("../model/input/ReadJson");
const WriteJson = require("../model/output/WriteJson");
let window;
let jsonTrained;

function startTraining(data, callback) {
    const trainer = new SvmTrainer();
    jsonTrained = trainer.train(data);

    if (typeof callback === "function") {
        callback();
    }
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
    let objToWrite = writer.buildTrainedFile(jsonTrained, arg.notes, meta);
    let string = writer.parser(objToWrite);
    writer.writeToDisk("src/output", arg.name, string);
    event.reply("File correctly written");
});

ipcMain.on("start-training", (event, arg) => {
    startTraining(arg.data, err => {
        if (err) {
            throw err;
        }
        console.log("Finished training");
    });
    console.log(jsonTrained);
    event.reply("finished-training", jsonTrained);
});

ipcMain.on("get-json-from-csv", (event, arg) => {
    const csvReader = new ReadCsv();
    csvReader.readFile(arg, (err, res) => {
        event.reply("read-csv", res);
    })
});
