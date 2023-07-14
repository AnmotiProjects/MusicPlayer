const path = require("path");
const fs = require("fs");

function resolvePath(relativePath) {
    const absolutePath = path.resolve("./app", relativePath);
    try {
        fs.accessSync(absolutePath);
        return absolutePath;
    } catch (error) {
        console.error(`Failed to resolve path: ${absolutePath}`);
        return false;
    }
}

module.exports = resolvePath;