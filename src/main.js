const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

let window;

const baseDir = app.getAppPath()+"/static";



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
      : `file://${join(__dirname, '../build/index.html')}`,
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

function getJson(file) {
  console.log(file.path);
  console.log(baseDir+'/'+file.name);
  console.log("===============");
  fs.copyFile(file.path, baseDir+'/'+file.name, (err) => {
    if (err)
      throw err;
  })
}

ipcMain.on("async-msg", (event, arg) => {
  getJson(arg);
  event.reply("async-reply", 'ok');
})