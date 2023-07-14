const { app, BrowserWindow, dialog, Menu} = require("electron");
const resolvePath = require("./libs/resolvePath");

function createMainWindow(Data, menuContent) {
    Data.mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: resolvePath("./src/preload.js")
        }
    });

    Data.menuContent = Menu.buildFromTemplate(menuContent);
    Menu.setApplicationMenu(Data.menuContent);

    Data.mainWindow.on("close", (e) => {
        if (!Data.isQuickclose) {
            const selected = dialog.showMessageBoxSync({
                type: "info",
                title: "アプリはまだ終了していません。",
                message: "アプリを終了しますか?",
                buttons: ["キャンセル", "最小化", "終了"],
                defaultId: 0
            });
            if (selected === 1) Data.mainWindow.minimize();
            if (selected !== 2) e.preventDefault();
        };

        //終了処理
    });

    Data.mainWindow.loadFile(resolvePath("./src/index.html"));
}

module.exports = createMainWindow;