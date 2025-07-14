// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
const ContextMenu = require("secure-electron-context-menu").default;
contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateTheme: (callback) => ipcRenderer.on("update-theme", callback),
  onCloseTab: (callback) => ipcRenderer.on("close-tab", callback),
})

contextBridge.exposeInMainWorld("api", {
  contextMenu: ContextMenu.preloadBindings(ipcRenderer)
})