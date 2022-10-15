import useTemplate from "./framework/useTemplate";

import urlFormat from "./tool/urlFormat";

import lazyLoadPage from "./pages/lazy-load";
import lazyLoadDialog from "./dialogs/lazy-load";

import './common.scss';

// 浏览器兼容文件
import './polyfill/Promise';

// 调试后台
import runDebug from './tool/debugger/index';
runDebug();

var pagename = urlFormat().router[0]
var viewEl = document.getElementById('view-root');

var dialogRootEl = document.getElementById('dialog-root');

// 默认打开主页
if (!(pagename in lazyLoadPage)) pagename = "home";

lazyLoadPage[pagename]().then(function (viewData) {
    viewEl.setAttribute('page-view', '');
    // 挂载页面
    var viewInstance = useTemplate(viewEl, viewData.default);

    if ('_name' in viewInstance) {
        viewEl.setAttribute('page-view', viewInstance._name);
    }

    // 打开弹框方法
    var openDialog = function (lazypage, props) {

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

    // 追加调试弹框
    var debuggerEl = document.createElement('div');
    document.body.insertBefore(debuggerEl, document.body.childNodes[0]);

    // 调试窗口
    debuggerEl.setAttribute('class', 'debugger');
    debuggerEl.addEventListener('click', function () {
        openDialog(lazyLoadDialog.debugger);
    });

});