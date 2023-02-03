import useTemplate from "./framework/useTemplate";

import urlFormat from "./tool/urlFormat";
import isString from "./tool/type/isString";
import isFunctin from "./tool/type/isFunction";
import remove from "./tool/xhtml/remove";

import lazyPages from "./pages/lazy-load";
import lazyDialogs from "./dialogs/lazy-load";

import './common.scss';

// 浏览器兼容文件
import './polyfill/Promise';

// 调试后台
import runDebug from './tool/debugger/index';
runDebug();

// 启动桌面
import desktopOption from "./pages/desktop/index";
var desktopInstance = useTemplate(document.getElementById("desktop-root"), desktopOption);

var pagename = urlFormat().router[0]
var viewRootEl = document.getElementById('view-root');

var dialogRootEl = document.getElementById('dialog-root');
var winRootEl = document.getElementById('win-root');

// 默认显示桌面
if (!(pagename in lazyPages)) pagename = "desktop";
var goDesktop = function () {
    window.location.href = "#/desktop";

    document.getElementsByTagName('title')[0].innerText = "桌面" + window.systeName;
    document.getElementById('icon-logo').setAttribute('href', './windows7.png');
};

var openDialog, openWin, openView;

// 打开弹框方法
openDialog = function (lazypage, props) {
    if (isString(lazypage)) lazypage = lazyDialogs[lazypage];

    var dialogEl = document.createElement('div');
    dialogRootEl.appendChild(dialogEl);

    return new Promise(function (resolve, reject) {
        lazypage().then(function (dialogData) {

            // 挂载弹框
            var dialogInstance = useTemplate(dialogEl, dialogData.default, props);
            dialogEl.setAttribute('dialog-view', dialogInstance._name || "");

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

// 打开窗口方法
openWin = function (lazypage, props) {
    var winEl = document.createElement('div');
    winRootEl.appendChild(winEl);


    return new Promise(function (resolve, reject) {
        lazypage().then(function (winData) {

            // 挂载弹框
            var winInstance = useTemplate(winEl, winData.default, props);
            winEl.setAttribute('win-view', winInstance._name || "");

            // 注册打开弹框方法
            winInstance.$openDialog = openDialog;

            resolve({
                instance: winInstance,
                el: winEl
            });
        });
    });
};

// 打开视图方法
var viewInstances = {};
openView = function (pagename, props) {
    lazyPages[pagename]().then(function (viewData) {

        var viewEl = document.createElement('div');
        viewRootEl.appendChild(viewEl);

        // 挂载页面
        var viewInstance = useTemplate(viewEl, viewData.default, props);

        // 底部导航
        var winslinesEl = document.getElementById("wins-line-id");

        var lineBtnEl = document.createElement("span");
        winslinesEl.appendChild(lineBtnEl);

        // 记录
        var uniqueHash = new Date().valueOf();
        viewInstances[uniqueHash] = {
            instance: viewInstance,
            lineBtn: {
                el: lineBtnEl
            },
            isFocus: false,
            isShow: true,
            isMin: false
        };

        viewEl.setAttribute('page-view', viewInstance._name || "");

        // 注册打开视图方法
        viewInstance.$openView = openView;

        // 注册打开弹框方法
        viewInstance.$openDialog = openDialog;

        // 注册打开窗口方法
        viewInstance.$openWin = openWin;

        /**
         * 注册操作自己的方法等
         */

        // 关闭
        viewInstance.$closeView = function () {
            // 触发销毁前钩子
            if (isFunctin(viewInstance._beforeDestory)) {
                viewInstance._beforeDestory.call(viewInstance);
            }

            remove(viewEl);
            remove(lineBtnEl);

            delete viewInstances[uniqueHash];
            goDesktop();

            // 触发销毁后钩子
            if (isFunctin(viewInstance._destoryed)) {
                viewInstance._destoryed.call(viewInstance);
            }
        };

        // 最小化
        viewInstance.$minView = function (triggleName) {
            if (isFunctin(viewInstance._minimize)) {
                viewInstance._minimize.call(viewInstance);
            }

            viewInstances[uniqueHash].isMin = true;
            viewInstances[uniqueHash].isShow = false;

            if (isFunctin(viewInstance._beforeUnfocus)) {
                viewInstance._beforeUnfocus.call(viewInstance);
            }

            viewInstances[uniqueHash].isFocus = false;
            viewInstance._el.setAttribute("focus", "no");
            lineBtnEl.setAttribute("focus", "no");
            viewInstance._el.style.zIndex = 1;

            if (isFunctin(viewInstance._unfocused)) {
                viewInstance._unfocused.call(viewInstance);
            }

            viewEl.style.display = "none";

            if (triggleName != 'desktop') {
                goDesktop();
            }
        };

        // 恢复显示
        viewInstance.$reshowView = function () {

            viewInstances[uniqueHash].isMin = false;
            viewInstances[uniqueHash].isShow = true;

            viewEl.style.display = "";

            if (isFunctin(viewInstance._reshow)) {
                viewInstance._reshow.call(viewInstance);
            }
        };

        // 窗口被点击时候的处理
        viewEl.addEventListener("click", function () {

            // 如果没有被聚焦
            if (!viewInstances[uniqueHash].isFocus) {

                if (isFunctin(viewInstance._beforeFocus)) {
                    viewInstance._beforeFocus.call(viewInstance);
                }

                for (var key in viewInstances) {
                    if (key == uniqueHash) {
                        viewInstances[key].isFocus = true;
                        viewInstances[key].instance._el.style.zIndex = 2;

                        viewInstances[key].instance._el.setAttribute("focus", "yes");
                        viewInstances[key].lineBtn.el.setAttribute("focus", "yes");

                        window.location.href = "#/" + pagename;
                    } else {

                        // 如果之前获得焦点，需要出发失去焦点方法
                        var _isFocus = viewInstances[key].isFocus;

                        if (_isFocus && isFunctin(viewInstances[key].instance._beforeUnfocus)) {
                            viewInstances[key].instance._beforeUnfocus.call(viewInstances[key].instance);
                        }

                        viewInstances[key].isFocus = false;
                        viewInstances[key].instance._el.style.zIndex = 1;

                        viewInstances[key].instance._el.setAttribute("focus", "no");
                        viewInstances[key].lineBtn.el.setAttribute("focus", "no");

                        if (_isFocus && isFunctin(viewInstances[key].instance._unfocused)) {
                            viewInstances[key].instance._unfocused.call(viewInstances[key].instance);
                        }

                    }
                }

                if (isFunctin(viewInstance._focused)) {
                    viewInstance._focused.call(viewInstance);
                }

            }

        });
        viewEl.click();

        var tagName = (document.getElementsByTagName("title")[0].innerText + "").replace(window.systeName, "");
        lineBtnEl.setAttribute("title", tagName);
        lineBtnEl.innerHTML = "<span tag='" + viewInstance._name + "'></span>" + tagName;

        // 底部按钮被点击时候的处理
        lineBtnEl.addEventListener("click", function () {

            // 如果最小化了，恢复
            if (viewInstances[uniqueHash].isMin) {
                viewInstance.$reshowView();

                viewEl.click();
            } else {

                // 没有最小化，可是没有聚焦
                if (!viewInstances[uniqueHash].isFocus) {
                    viewEl.click();
                }

                // 否则最小化
                else {
                    viewInstance.$minView();
                }
            }

        });

    });
};

desktopInstance.$openView = openView;
desktopInstance.$openWin = openWin;
desktopInstance.$openDialog = openDialog;

// 隐藏所有窗口
window._minAllView_ = function () {
    for (var key in viewInstances) {
        viewInstances[key].instance.$minView("desktop");
    }

    goDesktop();
};

// 启动
if (pagename != "desktop") {
    openView(pagename);
} else {
    goDesktop();
}