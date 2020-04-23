const ProcessReading = require("./ProcessReading");
const ProcessTraining = require("./ProcessTraining");
const ProcessWriting = require("./ProcessWriting");

const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
        },
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

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on("train-data", (event, arg) => {
    const processTraining = new ProcessTraining();
    processTraining.setStrategy(arg.algorithm);
    processTraining.setParams(arg.params);
    processTraining.setData(arg.data);
    processTraining.startTraining((err, res, qualityIndex) => {
        if (err) {
            throw err;
        }
        event.reply("finished-training", res, qualityIndex);
    });
});

ipcMain.on("read-file", (event, arg) => {
    readFile(arg, (err, res) => {
        if (err) {
            throw err;
        }
        event.reply("finished-reading", res);
    })
});

ipcMain.on("read-file-conf", (event, arg) => {
    readFile(arg, (err, res) => {
        if (err) {
            throw err;
        }
        event.reply("finished-reading-conf", res);
    })
});

function readFile(arg, callback) {
    const processReading = new ProcessReading();
    processReading.setStrategy(arg.extension);
    processReading.setPath(arg.path);
    processReading.startReading((err, res) => {
        if (err) {
            throw err;
        }
        callback(null, res);
    });
}


ipcMain.on("write-file", (event, arg) => {
    const processWriting = new ProcessWriting("json");
    processWriting.setStrategy("json");
    processWriting.setPath("src/output");
    processWriting.setName(arg.name);
    processWriting.setTrainingResult(arg.trainedJson);
    processWriting.setNotes(arg.notes);
    processWriting.startWriting((err, res) => {
        if (err) {
            throw err;
        }
        event.reply("finished-writing", res);
    });
});
