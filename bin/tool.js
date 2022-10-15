exports.simpleUrl = function (filepath) {
    return filepath.replace(process.cwd(), './').replace(/\\/g, '/').replace(/\/\//g, '/');
};