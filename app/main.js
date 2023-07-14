'use strict';

const { app, ipcMain, dialog, webContents } = require("electron");
const createMainWindow = require("./createMainWindow");

const Data = {
    isQuickclose: false
};

function sendEvent(channel) {
    Data.mainWindow.webContents.send(channel)
}

const menuContent = [
    {
        label: "ファイル",
        submenu: [
            {
                label: "プレイリストに追加",
                click: () => sendEvent("addPlaylistBtn")
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
                    }
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
];

app.once("ready", () => {
    createMainWindow(Data, menuContent);
});