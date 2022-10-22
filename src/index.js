import useTemplate from "./framework/useTemplate";

import urlFormat from "./tool/urlFormat";
import isString from "./tool/type/isString";

import lazyPages from "./pages/lazy-load";
import lazyDialogs from "./dialogs/lazy-load";

import './common.scss';

// 浏览器兼容文件
import './polyfill/Promise';

// 调试后台
import runDebug from './tool/debugger/index';
runDebug();

var pagename = urlFormat().router[0]
var viewEl = document.getElementById('view-root');

var dialogRootEl = document.getElementById('dialog-root');
var winRootEl = document.getElementById('win-root');

// 默认打开主页
if (!(pagename in lazyPages)) pagename = "home";

lazyPages[pagename]().then(function (viewData) {
    viewEl.setAttribute('page-view', '');
    // 挂载页面
    var viewInstance = useTemplate(viewEl, viewData.default);

    if ('_name' in viewInstance) {
        viewEl.setAttribute('page-view', viewInstance._name);
    }

    // 打开弹框方法
    var openDialog = function (lazypage, props) {
        if (isString(lazypage)) lazypage = lazyDialogs[lazypage];

        var dialogEl = document.createElement('div');
        dialogRootEl.appendChild(dialogEl);

        dialogEl.setAttribute('dialog-view', '');

        return new Promise(function (resolve, reject) {
            lazypage().then(function (dialogData) {

                // 挂载弹框
                var dialogInstance = useTemplate(dialogEl, dialogData.default, props);

                if ('_name' in dialogInstance) {
                    dialogEl.setAttribute('dialog-view', dialogInstance._name);
                }

                // 注册打开弹框方法
                dialogInstance.$openDialog = openDialog;

                // 注册关闭弹框方法
                dialogInstance.$closeDialog = function (data) {
                    dialogRootEl.removeChild(dialogEl);

                    // 如果有返回数据，就说明操作完毕
                    if (data) {
                        resolve(data);
                    }

                    // 否则就是取消操作
                    else {
                        // todo
                    };
                };

            });
        });
    };

    // 注册打开弹框方法
    viewInstance.$openDialog = openDialog;

    // 注册打开窗口方法
    viewInstance.$openWin = function (lazypage, props) {
        var winEl = document.createElement('div');
        winRootEl.appendChild(winEl);

        winEl.setAttribute('win-view', '');

        return new Promise(function (resolve, reject) {
            lazypage().then(function (winData) {

                // 挂载弹框
                var winInstance = useTemplate(winEl, winData.default, props);

                if ('_name' in winInstance) {
                    winEl.setAttribute('win-view', winInstance._name);
                }

                // 注册打开弹框方法
                winInstance.$openDialog = openDialog;

                resolve({
                    instance: winInstance,
                    el: winEl
                });
            });
        });
    };

    // 追加调试弹框
    var debuggerEl = document.createElement('div');
    document.body.insertBefore(debuggerEl, document.body.childNodes[0]);

    // 调试窗口
    debuggerEl.setAttribute('class', 'debugger');
    debuggerEl.addEventListener('click', function () {
        openDialog(lazyDialogs.debugger);
    });

});