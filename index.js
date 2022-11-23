const { app, ipcMain } = require('electron');
const createWindow = require('./electron/nodejs/createWindow.js');

app.whenReady().then(() => {

    // 创建主界面
    createWindow('home', {
        height: 700,
        width: 1200
    });

});

app.on('window-all-closed', () => {
    // 点击关闭按钮，直接退出
    app.quit();
});

ipcMain.on("openWindow", function (event, data) {
    createWindow(data.pagename, {

        "talker": {
            height: 600,
            width: 260
        },

        "browser": {

        }

    }[data.pagename], data.params);
});
