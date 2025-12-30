var ws = new WebSocket('ws://localhost:20001/refresh-page');

// 连接成功
ws.addEventListener('open', function (event) {
    ws.send('服务器，你好呀！');
});

// 监听来自服务器的数据
ws.addEventListener('message', function (event) {

    // 如果把该方法的参数设置为 true，那么无论文档的最后修改日期是什么，
    // 它都会绕过缓存，从服务器上重新下载该文档
    window.location.reload(true);

});

/**
 * 热更新 HMR(hot module replacement) 相关
 */

function createHotContext(ownerPath) {

    var hot = {
        accept: function (deps, callback) {

        }
    };

    return hot;
}
