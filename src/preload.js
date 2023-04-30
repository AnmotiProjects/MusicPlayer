const { ipcRenderer } = require("electron");

window.loadMusicFiles = (path) => {
    ipcRenderer.invoke("loadMusicFiles", path);
}

ipcRenderer.on("loadedMusicFiles", (event, files) => {
    console.log(files);
});