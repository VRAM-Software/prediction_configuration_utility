const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const isDev = require('electron-is-dev');
const fs = require('fs');
var childProcess = require('child_process');

const Trainer = require('./algorithm/train');

let window;
var jsonTrained;

function startTraining(data, notes) {
  const trainer = new Trainer();
  trainer.train(data, notes);
  jsonTrained = trainer.getTrainedJson();
}

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return today;
}

function getTime() {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return String(time);
}

function buildJson(notes) {
  let file = {
    author: "VRAMSoftware",
    version: "1.0.0",
    pluginAim: "svm",
    date: getDate(),
    time: getTime(),
    N: jsonTrained.N,
    D: jsonTrained.D,
    b: jsonTrained.b,
    kernelType: jsonTrained.kernelType,
    w: jsonTrained.w,
    notes: notes
  };
  return JSON.stringify(file);
}

function writeToDisk(obj) {
  let file = buildJson(obj.notes)
  fs.writeFile(
    'algorithm/output/' + obj.name + '.json',
    file,
    function (err) {
      if (err) return console.error(err);
      console.log("Wrote file");
    }
  );
}

function createWindow() {
  var mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : 'file:///' + app.getAppPath() + '/build/index.html'
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on("save-to-disk", (event, arg) => {
  writeToDisk(arg);
})

ipcMain.on("start-training", (event, arg) => {
  startTraining(arg.data, arg.notes, (err) => {
    if (err) throw err;
    console.log('Finished training');
  });
  event.reply("finished-training");
})
