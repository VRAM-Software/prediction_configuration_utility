const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const fs = require("fs");
const Trainer = require("./algorithm/train");
const Utils = require("./classes/Utils");
const IO = require("./classes/IO");
const meta = require("./config/config");
let window;
var jsonTrained;

function startTraining(data, notes, callback) {
    const trainer = new Trainer();
    trainer.train(data, notes);
    jsonTrained = trainer.getTrainedJson();

    if (typeof callback === "function") callback();
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
    IO.writeToDisk(arg.name, Utils.buildJson(jsonTrained, arg.notes, meta));
    event.reply("File correctly written");
});

ipcMain.on("start-training", (event, arg) => {
    startTraining(arg.data, arg.notes, err => {
        if (err) throw err;
        console.log("Finished training");
    });
    event.reply("finished-training");
});

ipcMain.on("get-json-from-csv", (event, arg) => {
    console.log(arg);
    let file = IO.readCsvFile(arg);
    if (file) {
        event.reply("csv-converted", file);
    }
});
