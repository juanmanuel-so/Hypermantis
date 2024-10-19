const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('node:path');
const { Menu, ipcMain } = require('electron');
const { default: getMenu } = require('./utils/getMenu');
const ContextMenu = require("secure-electron-context-menu").default;
const fs = require('fs'); 
const os = require('os');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
const isMac = process.platform === 'darwin'

const tempDir = path.join(os.tmpdir(), 'hypermantis');
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {

      // Asegúrate de que esté deshabilitado

      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    icon: './assets/hypermantis',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 10, y: 10 }
  });


  ContextMenu.mainBindings(ipcMain, mainWindow, Menu, false, {
    "tab": [{
      id: "close-tab",
      label: "Close tab",

    }],
    "default": [{
      role: "cut",
      label: 'Cut',
    },
    {
      role: "copy",
      label: 'Copy',
    },
    {
      role: "paste",
      label: 'Paste',
    },
    {
      role: "selectall",
      label: 'Select All',
    }]
  });
  Menu.setApplicationMenu(getMenu({
    app,
    Menu,
    isMac,
    mainWindow,
  }))
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

};




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  app.on('will-quit', () => {
    const files = fs.readdirSync(tempDir);

    // Borrar cada archivo o carpeta dentro del directorio
    for (const file of files) {
      const filePath = path.join(tempDir, file);

      // Verificar si es un directorio o archivo
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Si es un directorio, borrarlo recursivamente
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        // Si es un archivo, borrarlo
        fs.unlinkSync(filePath);
      }
    }
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
