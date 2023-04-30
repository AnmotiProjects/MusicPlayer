const path = require('path');
const fs = require('fs');

function resolvePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    try {
        fs.accessSync(absolutePath);
        return absolutePath;
    } catch (error) {
        return false;
    }
}

module.exports = resolvePath;