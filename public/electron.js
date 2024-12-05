const { app, BrowserWindow } = require('electron')
const path = require('path')

if (require("electron-squirrel-startup")) {
    app.quit();
} 
const startUrl = process.env.ELECTRON_START_URL || 
    `file://${path.join(__dirname, "../build/index.html")}`;
function createWindow () {
    const  mainWindow = new BrowserWindow({
        titleBarStyle: 'default',
        width: 1281,
        height: 800,
        minWidth: 1281,
        minHeight: 800,
        backgroundColor: '#312450',
        show: false
    })
    mainWindow.setMenu(null)
    mainWindow.loadURL(startUrl)
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

}


app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
