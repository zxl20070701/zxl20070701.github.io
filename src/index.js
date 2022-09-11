import isObject from "./tool/type/isObject";
import isFunctin from "./tool/type/isFunction";

import useTemplate from "./framework/useTemplate";
import isValidKey from "./framework/isValidKey";
import { ref, reactive } from "./framework/remark-data";
import { watcher, proxy } from "./framework/observe-data";

import urlFormat from "./tool/urlFormat";
import lazyLoad from "./pages/lazy-load";

import './common.scss';

// 公共指令
import uiBind from "./directives/ui-bind";
import uiModel from "./directives/ui-model";
import uiOn from "./directives/ui-on";

// 浏览器兼容文件
import './polyfill/Promise';

var pagename = urlFormat().router[0]
var el = document.getElementById('root');

// 默认打开主页
if (!(pagename in lazyLoad)) pagename = "home";

var initPageinfo = function (pagefactory) {
    var key;

    var pageinfo = pagefactory({
        ref: ref,
        reactive: reactive
    });

    // 创建实例
    var instance = {};

    // 如果js中有数据改变需要更新试图，会触发这个方法
    var hadWillUpdate = false;
    var upateView = function () {

        // 节流处理
        // 如果在一次有多个数据改变，保证只会触发一次更新
        if (!hadWillUpdate) {
            hadWillUpdate = true;

            setTimeout(function () {

                // 触发改变前钩子
                if (isFunctin(pageinfo.beforeUpdate)) {
                    pageinfo.beforeUpdate.call(instance);
                }

                // 触发更新
                console.log('更新...', instance);

                // 触发改变后钩子
                if (isFunctin(pageinfo.updated)) {
                    pageinfo.updated.call(instance);
                }

                hadWillUpdate = false;
            }, 0);
        }

    };

    // 实例上挂载数据并启动监听
    if ("data" in pageinfo) {
        for (key in pageinfo.data) {

            // 对于&和_开头的，我们预留内部使用
            isValidKey(key);

            // 如果是标记需要双向绑定的
            if (isObject(pageinfo.data[key]) && 'value' in pageinfo.data[key] && 'type' in pageinfo.data[key]) {
                if (pageinfo.data[key].type == 'ref') {
                    watcher(instance, pageinfo.data[key], key, upateView);
                } else if (pageinfo.data[key].type == 'reactive') {
                    proxy(instance, pageinfo.data[key], key, upateView);
                }
            }

            // 否则就静态数据
            else {
                instance[key] = pageinfo.data[key];
            }
        }
    }

    // 登记全局指令
    pageinfo.directives = pageinfo.directives || {};
    pageinfo.directives['ui-bind'] = uiBind;
    pageinfo.directives['ui-model'] = uiModel;
    pageinfo.directives['ui-on'] = uiOn;

    // 触发挂载前钩子
    if (isFunctin(pageinfo.beforeMount)) {
        pageinfo.beforeMount.call(instance);
    }

    // 初始化挂载
    console.log("挂载...", instance);

    // 触发挂载后钩子
    if (isFunctin(pageinfo.mounted)) {
        pageinfo.mounted.call(instance);
    }

    return pageinfo;
};

lazyLoad[pagename]().then(function (data) {

    // 挂载页面
    useTemplate(el, initPageinfo(data.default));

});