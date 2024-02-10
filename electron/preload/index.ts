const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('lcu', {
  fetch: (method, type, url) => ipcRenderer.invoke('lcu-fetch', method, type, url),
  // connected: (callback) => ipcRenderer.on('lcu-connected', callback),
  // disconnected: (callback) => ipcRenderer.on('lcu-disconnected', callback)
})

contextBridge.exposeInMainWorld('file', {
  fetch: (path) => ipcRenderer.invoke('file-fetch', path),
})