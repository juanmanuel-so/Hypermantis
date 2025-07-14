const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('node:path');
const { Menu, ipcMain } = require('electron');
const { default: getMenu } = require('./utils/getMenu');
const ContextMenu = require("secure-electron-context-menu").default;
const fs = require('fs');
const os = require('os');


const logFilePath = path.join(app.getPath('userData'), 'python-log.txt');
fs.writeFileSync(logFilePath, '=== NUEVO LOG ===\n', 'utf-8');
const logFile = fs.createWriteStream(logFilePath, { flags: 'a' });
console.log('Guardando log en:', logFilePath);
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
const { spawn } = require('child_process');


logFile.write(`Iniciando app. Platform: ${process.platform}\n`);
logFile.write(`process.resourcesPath: ${process.resourcesPath}\n`);


const isMac = process.platform === 'darwin'

let pythonProcess;


app.whenReady().then(() => {
  let backendPath;
  const exeName = process.platform === 'win32' ? 'server.exe' : 'server';
  const isDev = !app.isPackaged;
  logFile.write(`Dev? ${isDev}\n`);
  if (isDev) {
    backendPath = path.join(__dirname, '..', '..', 'server_py', exeName);
  } else {
    backendPath = path.join(process.resourcesPath, exeName);
  }

  logFile.write(`Intentando iniciar backend desde: ${backendPath}\n`);

  // Verifica si el archivo realmente existe
  if (fs.existsSync(backendPath)) {
    logFile.write(`El backend existe en la ruta indicada.\n`);
  } else {
    logFile.write(`⚠️ El backend NO existe en la ruta indicada.\n`);
  }

  try {
    pythonProcess = spawn(backendPath, []);

    pythonProcess.stdout.on('data', (data) => {
      const text = data.toString();
      console.log(`PYTHON: ${text}`);
      logFile.write(`PYTHON: ${text}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      const text = data.toString();
      console.error(`PYTHON ERROR: ${text}`);
      logFile.write(`PYTHON ERROR: ${text}`);
    });

    pythonProcess.on('close', (code) => {
      logFile.write(`PYTHON CLOSED with code ${code}\n`);
    });

    pythonProcess.on('error', (err) => {
      logFile.write(`PYTHON PROCESS ERROR: ${err.toString()}\n`);
    });

  } catch (err) {
    logFile.write(`EXCEPCIÓN lanzada al spawn: ${err.toString()}\n`);
  }
});

app.on('before-quit', () => {
  if (pythonProcess) pythonProcess.kill();
  logFile.write(`api cerrada\n`);
});

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
    if (pythonProcess) pythonProcess.kill();
    logFile.write(`api cerrada\n`);
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  if (pythonProcess) pythonProcess.kill();
  logFile.write(`api cerrada\n`);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
