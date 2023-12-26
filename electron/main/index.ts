import { app, BrowserWindow, shell, ipcMain, session } from "electron"
import { release } from "node:os"
import { join } from "node:path"
import LCU from "./LCU"


// app.commandLine.appendSwitch('ignore-certificate-errors')
// app.commandLine.appendSwitch('disable-web-security')

process.env.DIST_ELECTRON = join(__dirname, "..")
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist")
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST

if (release().startsWith("6.1")) app.disableHardwareAcceleration()
if (process.platform === "win32") app.setAppUserModelId(app.getName())
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win = null
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js")
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, "index.html")

async function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    icon: "src/static/dragontail-13.24.1/13.24.1/img/spell/TahmKenchW.png",
    webPreferences: {
      preload,
    },
  })

  win.setMenu(null)
  // win.setBackgroundMaterial("none")

  let lcu = new LCU()

  ipcMain.handle("lcu-fetch", async (event, method, type, url) => {
    return lcu.fetch(method, type, url);
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url)
    win.webContents.openDevTools()
    // win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url)
    return { action: "deny" }
  })
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  win = null
  if (process.platform !== "darwin") app.quit()
})

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})