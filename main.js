const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const isDev = require('electron-is-dev');
const fs = require('fs');
var childProcess = require('child_process');

const Trainer = require('./algorithm/train');

let window;
var OUTPUT;

function startTraining(data, notes) {
  const trainer = new Trainer();
  trainer.train(data, notes);
  OUTPUT = trainer.getOutputJson();
}

writeToDisk = (json, fileName) => {
  fs.writeFile(
    'algorithm/output/' + fileName + '.json',
    json,
    function (err) {
      if (err) return console.error(err);
      console.log("ciao file");
    }
  );
}

function runScript(scriptPath, callback) {
  var invoked = false;
  var process = childProcess.fork(scriptPath);
  process.on('error', function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  process.on('exit', function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
}

function createWindow() {
  var mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // ricordate di cambiare la porta dopo localhost se necessario
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
  writeToDisk(OUTPUT, arg);
})

ipcMain.on("start-training", (event, arg) => {
  startTraining(arg.data, arg.notes, (err) => {
    if (err) throw err;
    console.log('Finished training');
  });
  event.reply("finished-training");
})
