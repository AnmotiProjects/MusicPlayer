const Electron = require("electron");
const { dialog, ipcMain } = Electron;
const path = require("path");

const createMainWindow = require("./createMainWindow.js");

const Data = {};

createMainWindow(Electron, Data);

function loadMusicFiles(path = ".") {
    const files = dialog.showOpenDialogSync(Data.mainWindow, {
        properties: ["openFile"],
        title: "ファイルを開く",
        filters: [
            {
                name: "音楽ファイル",
                extensions: ["webp"]
            }
        ],
        defaultPath: path,
        multiSelections: true
    });
    Data.mainWindow.webContents.send("loadedMusicFiles", files);
}

ipcMain.handle("loadMusicFiles", (path) => {
    loadMusicFiles(path);
});