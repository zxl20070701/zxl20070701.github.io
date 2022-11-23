const { ipcMain, BrowserWindow } = require('electron');

// 用于缓存一些必要的数据
let renderViewCache = {}, uniqueID; // 窗口数据和最后打开窗口标志
let wins = {}; // 窗口实例

module.exports = function (pagename, _config, params = {}) {

    let config = {
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    };

    for (let key in _config) {
        config[key] = _config[key];
    }


    // 缓存数据
    let _uniqueID = new Date().valueOf();
    renderViewCache[_uniqueID] = {
        uniqueID: _uniqueID,
        pagename,
        params
    };

    uniqueID = _uniqueID;

    // 创建浏览器窗口
    let win = new BrowserWindow(config);
    wins[_uniqueID] = win;

    // 窗口关闭
    win.once('closed', () => {
        console.log(_uniqueID);
        delete renderViewCache[_uniqueID];
        delete wins[_uniqueID];
    });

    // 打开渲染界面
    win.loadFile('./electron/index.html');

    // 打开F12
    win.webContents.openDevTools();

    return win;

};

// 获取启动数据
ipcMain.on("renderView", function (event, _uniqueID) {
    event.returnValue = renderViewCache[_uniqueID || uniqueID];
});

// 最小化窗口
ipcMain.on("minimize", function (event, _uniqueID) {
    wins[_uniqueID].minimize();
});

// 关闭窗口
ipcMain.on("close", function (event, _uniqueID) {
    wins[_uniqueID].close();
});