const { dialog } = require("electron");

const methods = {
    open: dialog.showOpenDialog,
    openSync: dialog.showOpenDialogSync,
    save: dialog.showSaveDialog,
    saveSync: dialog.showSaveDialogSync,
    message: dialog.showMessageBox,
    messageSync: dialog.showMessageBoxSync,
    error: dialog.showErrorBox,
    certificateTrust: dialog.showCertificateTrustDialog
};

const defaultOptions = {
    open: {
        title: "ファイルを選択してください。",
        defaultPath: null,
        buttonLabel: null,
        filters: [ { name: 'すべてのファイル', extensions: ['*'] } ],
        openFile: true,
        openDirectory: false,
        multiSelections: false,
        showHiddenFiles: false,
        promptToCreate: false,
        dontAddToRecent: false
    }
};

class CreateDialog {
    create(methodName, ..._options) {
        const method = methods[methodName];
        const options = Object.assign({}, ..._options);
        return method(options);
    }

    open(_options) {
        const options = Object.assign({}, defaultOptions.open, _options);
        return this.create("open", {
            title: options.title,
            defaultPath: options.defaultPath,
            buttonLabel: options.buttonLabel,
            filters: options.filters,
            properties: [
                options.openFile ? "openFile" : "",
                options.openDirectory ? "openDirectory" : "",
                options.multiSelections ? "multiSelections" : "",
                options.showHiddenFiles ? "showHiddenFiles" : "",
                options.promptToCreate ? "promptToCreate" : "",
                options.dontAddToRecent ? "dontAddToRecent" : ""
            ].filter(Boolean)
        });
    }


}

module.exports = new CreateDialog();