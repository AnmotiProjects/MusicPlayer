const { dialog, ipcMain } = require("electron");
const createMainWindow = require("../libs/createMainWindow.js");

const Data = createMainWindow();

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