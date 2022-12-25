const path = require("path");

function createMainWindow(Electron, Data) {
    const { app, BrowserWindow, dialog, Menu } = Electron;

    Data.isQuickclose = false;

    app.once("ready", () => {
        Data.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            resizable: true,
            useContentSize: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, "preload.js")
            }
        });
    
        Data.menuContent = Menu.buildFromTemplate([
            {
                label: "ファイル",
                submenu: [
                    {
                        label: "ファイルを開く",
                        click: () => loadMusicFiles()
                    },
                    {
                        label: "再起動",
                        click: () => {
                            const selected = dialog.showMessageBoxSync({
                                type: "info",
                                title: "アプリを再起動しようとしています。",
                                message: "アプリを再起動しますか?",
                                buttons: ["キャンセル", "再起動"],
                                defaultId: 1
                            });
                            if (selected === 1) {
                                Data.isQuickclose = true;
                                app.relaunch();
                                app.quit();
                            };
                        }
                    },
                    {
                        label: "閉じる",
                        role: "close"
                    }
                ]
            },
            {
                label: "開発者用",
                role: "toggleDevTools"
            }
        ]);
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

        mainWindow.loadFile(path.join(__dirname, "index.html"));
    });
}

module.exports = createMainWindow;