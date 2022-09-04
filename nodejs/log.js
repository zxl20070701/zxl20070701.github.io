// 日志
exports.log = function (txt) {
    console.log("\x1B[33m" + txt + "\x1B[39m");
};

// 错误
exports.error = function (txt) {
    console.log("\x1B[35m" + txt + "\x1B[39m");
};
