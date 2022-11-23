import useTemplate from "../../src/framework/useTemplate.js";

import lazyPages from "./pages/lazy-load.js";

var viewEl = document.getElementById('view-root');

var initData = require("electron").ipcRenderer.sendSync("renderView", sessionStorage.getItem('render-view-unique'));
sessionStorage.setItem('render-view-unique', initData.uniqueID);

lazyPages[initData.pagename]().then(function (viewData) {
    viewEl.setAttribute('page-view', initData.pagename);

    // 挂载页面
    var viewInstance = useTemplate(viewEl, viewData.default, initData.params);

    // 刷新窗口
    viewInstance.$fresh = function () {
        window.location.reload(true);
    };

    // 最小化窗口
    viewInstance.$minimize = function () {
        require("electron").ipcRenderer.send("minimize", initData.uniqueID);
    };

    // 关闭窗口
    viewInstance.$close = function () {
        require("electron").ipcRenderer.send("close", initData.uniqueID);
    };

    // 打开窗口
    viewInstance.$openWindow = function (pagename, params) {
        require("electron").ipcRenderer.send("openWindow", {
            pagename,
            params
        });
    };

});
