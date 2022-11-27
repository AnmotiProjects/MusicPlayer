const { app, dialog, Menu, BrowserWindow } = require("electron");
const path = require("path");

const window = {};

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    const menuTemplate = Menu.buildFromTemplate([
        {
            label: "ファイル",
            submenu: [
                { role: "close", label: "閉じる" }
            ]
        },
        {
            label: "開発者用",
            click: () => { mainWindow.webContents.openDevTools(); }
        }
    ]);

    Menu.setApplicationMenu(menuTemplate);


    mainWindow.on("close", (e) => {
        const option = {
            type: "info",
            title: "アプリはまだ終了していません。",
            message: "アプリを終了しますか?",
            buttons: ["キャンセル", "最小化", "終了する"],
            defaultId: 0
        }
        const selected = dialog.showMessageBoxSync(option);
        if (selected === 1) mainWindow.minimize();
        else if (selected === 3) e.preventDefault();
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
});




app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

