const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const { menubar } = require('menubar');

const APP_WIDTH = 320;
const APP_HEIGHT = 568;

const mb = menubar({
  width: APP_WIDTH,
  height: APP_HEIGHT,
  'preload-window': true,
  resizable: false,
  browserWindow: {
    width: APP_WIDTH,
    height: APP_HEIGHT
  },
  index: isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
});

mb.on('after-create-window', () => {
  mb.window.openDevTools();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
