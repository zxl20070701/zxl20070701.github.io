/******/
/******/  // pkg Bootstrap/******/  
/******/  /******/  
/******/  // 记录bundle的函数源码/******/  
/******/  window.__pkg__bundleSrc__ = {};/******/  
/******/  /******/  
/******/  // 记录bundle的运行结果/******/  
/******/  window.__pkg__bundleObj__ = {};/******/  
/******/  /******/  
/******/  // 获取bundle结果/******/  
/******/  window.__pkg__getBundle = function (bundleName) {/******/  
/******/  /******/  
/******/      // 一个bundle只有第一次导入的时候需要执行/******/  
/******/      if (!(bundleName in window.__pkg__bundleObj__)) {/******/  
/******/          window.__pkg__bundleObj__[bundleName] = window.__pkg__bundleSrc__[bundleName]();/******/  
/******/      }/******/  
/******/  /******/  
/******/      // 返回需要的bundle的结果/******/  
/******/      return window.__pkg__bundleObj__[bundleName];/******/  
/******/  }/******/  
/******/  /******/  
/******/  window.__pkg__bundleFile__ = {};/******/  
/******/  /******/  
/******/  // 获取懒加载bundle结果/******/  
/******/  window.__pkg__getLazyBundle = function (fileName, bundleName) {/******/  
/******/      return new Promise(function (resolve) {/******/  
/******/  /******/  
/******/          // 如果加载过了/******/  
/******/          if (window.__pkg__bundleFile__[fileName]) {/******/  
/******/              resolve(window.__pkg__getBundle(bundleName));/******/  
/******/              return;/******/  
/******/          }/******/  
/******/  /******/  
/******/          // 获取head标签/******/  
/******/          var head = document.getElementsByTagName('head')[0];/******/  
/******/  /******/  
/******/          // 创建script/******/  
/******/          var script = document.createElement('script');/******/  
/******/  /******/  
/******/          // 设置属性/******/  
/******/          script.setAttribute("async", "async");/******/  
/******/          script.src = fileName;/******/  
/******/  /******/  
/******/          // 追加到页面/******/  
/******/          head.appendChild(script);/******/  
/******/  /******/  
/******/          window.__pkg__bundleFile__[fileName] = true;/******/  
/******/  /******/  
/******/          script.addEventListener('load', function () {/******/  
/******/              resolve(window.__pkg__getBundle(bundleName));/******/  
/******/          }, false);/******/  
/******/  /******/  
/******/  /******/  
/******/      });/******/  
/******/  }/******/  
/******/  
/************************************************************************/
/******/

/*************************** [bundle] ****************************/
// Original file:./src/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['0']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('1');
var useTemplate =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('28');
var urlFormat =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('29');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('30');
var isFunctin =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('31');
var remove =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('32');
var lazyPages =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('46');
var lazyDialogs =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('52');


// 浏览器兼容文件
__pkg__scope_args__=window.__pkg__getBundle('53');


// 调试后台
__pkg__scope_args__=window.__pkg__getBundle('54');
var runDebug =__pkg__scope_args__.default;

runDebug();

// 启动桌面
__pkg__scope_args__=window.__pkg__getBundle('64');
var desktopOption =__pkg__scope_args__.default;

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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/framework/useTemplate
/*****************************************************************/
window.__pkg__bundleSrc__['1']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('2');
var isObject =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('3');
var isFunctin =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('5');
var evalExpress=__pkg__scope_args__.evalExpress;


__pkg__scope_args__=window.__pkg__getBundle('11');
var toNode =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('12');
var setAttribute =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('13');
var isValidKey =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('14');
var ref=__pkg__scope_args__.ref;
var reactive=__pkg__scope_args__.reactive;

__pkg__scope_args__=window.__pkg__getBundle('15');
var watcher=__pkg__scope_args__.watcher;
var proxy=__pkg__scope_args__.proxy;


// 公共指令
__pkg__scope_args__=window.__pkg__getBundle('16');
var uiBind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('17');
var uiModel =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('18');
var uiOn =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('19');
var uiDragdrop =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('23');
var uiRightMenu =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function useTemplate(el, pagefactory, props) {

    var key;

    var pageinfo = pagefactory({
        ref: ref,
        reactive: reactive
    }, props || {});

    // 创建实例
    var instance = {
        _el: el,

        // 记录数据改变需要触发的更新
        _update: [],

        // 记录ref节点
        _refs: {},

        /**
         * 后续需要的生命周期钩子
         */
        _beforeMount: pageinfo.beforeMount,
        _mounted: pageinfo.mounted,
        _beforeUpdate: pageinfo.beforeUpdate,
        _updated: pageinfo.updated,
        _beforeDestory: pageinfo.beforeDestory,
        _destoryed: pageinfo.destoryed,
        _minimize: pageinfo.minimize,
        _reshow: pageinfo.reshow,
        _beforeFocus: pageinfo.beforeFocus,
        _focused: pageinfo.focused,
        _beforeUnfocus: pageinfo.beforeUnfocus,
        _unfocused: pageinfo.unfocused,
        _show: pageinfo.show,
        _hidden: pageinfo.hidden
    };

    if ('name' in pageinfo) instance._name = pageinfo.name;

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
                for (var p = 0; p < instance._update.length; p++) {
                    instance._update[p]();
                }

                // 触发改变后钩子
                if (isFunctin(pageinfo.updated)) {
                    pageinfo.updated.call(instance);
                }

                hadWillUpdate = false;
            }, 0);
        }

    };

    // 在实例上挂载方法
    if ('methods' in pageinfo) {
        for (key in pageinfo.methods) {

            // 对于&和_开头的，我们预留内部使用
            isValidKey(key);

            instance[key] = pageinfo.methods[key];
        }
    }

    // 实例上挂载数据并启动监听
    if ("data" in pageinfo) {
        for (key in pageinfo.data) {
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
    pageinfo.directives['ui-dragdrop'] = uiDragdrop;
    pageinfo.directives['ui-right-menu'] = uiRightMenu;

    if ("render" in pageinfo) {

        // 触发挂载前钩子
        if (isFunctin(pageinfo.beforeMount)) {
            pageinfo.beforeMount.call(instance);
        }

        // 初始化挂载
        (function doMount(el, childNodes) {
            var k
            for (k = 0; k < childNodes.length; k++) {
                (function () {
                    var currentNode, currentEl, attrKey, attrValue, keyArray, directive, value;

                    currentNode = pageinfo.render[childNodes[k]];

                    // 如果是节点
                    if (currentNode.type == 'tag') {

                        // 兼容svg特殊类型创建节点
                        currentEl = toNode(currentNode.name);

                        for (attrKey in currentNode.attrs) {
                            attrValue = currentNode.attrs[attrKey];

                            // 如果是ref
                            if (attrKey == 'ref') {
                                instance._refs[attrValue] = currentEl;
                            }

                            keyArray = (attrKey + ":").split(':');

                            // 指令
                            if (keyArray[0] in pageinfo.directives) {
                                directive = pageinfo.directives[keyArray[0]];

                                // 插入钩子直接执行
                                if (isFunctin(directive.inserted)) {

                                    (function (directive, attrValue, keyArray) {

                                        // 为什么延迟？
                                        // 这是为了等待节点挂载完毕
                                        setTimeout(function () {

                                            value = undefined;
                                            try { value = evalExpress(instance, attrValue) } catch (e) { }

                                            directive.inserted(currentEl.value, {
                                                type: keyArray[1],
                                                exp: attrValue,
                                                value: value,
                                                target: instance,
                                                useTemplate: useTemplate
                                            });
                                        });
                                    })(directive, attrValue, keyArray);
                                }

                                // 如果是更新钩子
                                // 登记
                                if (isFunctin(directive.update)) {

                                    (function (directive, attrValue, keyArray) {
                                        instance._update.push(function () {
                                            value = undefined;
                                            try { value = evalExpress(instance, attrValue) } catch (e) { }

                                            directive.update(currentEl.value, {
                                                type: keyArray[1],
                                                exp: attrValue,
                                                value: value,
                                                target: instance,
                                                useTemplate: useTemplate
                                            });
                                        });
                                    })(directive, attrValue, keyArray);

                                }

                            }

                            // 普通
                            else {
                                setAttribute(currentEl, attrKey, attrValue);
                            }

                        }

                        // 挂载到页面
                        el.appendChild(currentEl.value);

                        // 解析孩子
                        doMount(currentEl.value, currentNode.childNodes);

                    }

                    // 如果是文本
                    else if (currentNode.type == 'text') {
                        currentEl = document.createTextNode("");
                        currentEl.textContent = currentNode.content

                            // 特殊转义字符进行校对
                            .replace(/\&lt;/g, '<')
                            .replace(/\&gt;/g, '>')
                            .replace(/\&amp;/g, '&');

                        el.appendChild(currentEl);
                    }
                })();
            }
        })(el, pageinfo.render[0].childNodes);

        // 触发挂载后钩子
        if (isFunctin(pageinfo.mounted)) {
            setTimeout(function () {
                pageinfo.mounted.call(instance);
            });
        }
    } else {
        throw new Error("Render is required!");
    }

    return instance;

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isObject.js
/*****************************************************************/
window.__pkg__bundleSrc__['2']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 判断一个值是不是Object。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Object返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isFunction.js
/*****************************************************************/
window.__pkg__bundleSrc__['3']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('2');
var isObject =__pkg__scope_args__.default;


/**
 * 判断一个值是不是Function。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Function返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    if (!isObject(value)) {
        return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' ||
        type === '[object GeneratorFunction]' || type === '[object Proxy]';
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/getType.js
/*****************************************************************/
window.__pkg__bundleSrc__['4']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var toString = Object.prototype.toString;

/**
 * 获取一个值的类型字符串[object type]
 *
 * @param {*} value 需要返回类型的值
 * @returns {string} 返回类型字符串
 */
__pkg__scope_bundle__.default= function (value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/value/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['5']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('6');
var analyseExpress =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('8');
var toPath =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('10');
var calcValue =__pkg__scope_args__.default;


// 解析一段表达式
__pkg__scope_bundle__.evalExpress = function (target, express, scope) {
    if (arguments.length < 3) scope = {};

    var expressArray = analyseExpress(target, express, scope);
    var path = toPath(target, expressArray, scope);

    // 如果不是表达式
    if (path.length > 1) throw new Error("Illegal expression : " + express + "\nstep='evalExpress',path=" + path + ",expressArray=" + expressArray);

    return path[0];
};

// 获取表达式作为key对应的值
__pkg__scope_bundle__.getValue = function (target, express, scope) {
    if (arguments.length < 3) scope = {};

    var expressArray = analyseExpress(target, express, scope);
    var path = toPath(target, expressArray, scope);
    return calcValue(target, path, scope);
};

// 设置表达式作为key对应的值
__pkg__scope_bundle__.setValue = function (target, express, value, scope) {
    if (arguments.length < 4) scope = {};

    var expressArray = analyseExpress(target, express, scope);
    var path = toPath(target, expressArray, scope);

    var _target = target;
    for (var i = 0; i < path.length - 1; i++) {

        // 如果需要补充
        if (!(path[i] in _target)) _target[path[i]] = Array.isArray(_target) ? [] : {};

        // 拼接下一个
        _target = _target[path[i]];
    }

    _target[path[path.length - 1]] = value;
    return target;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/value/analyseExpress.js
/*****************************************************************/
window.__pkg__bundleSrc__['6']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('7');
var isString =__pkg__scope_args__.default;


var blankReg = new RegExp("[\\x20\\t\\r\\n\\f]");
var identifier = /^[a-zA-Z_$][0-9a-zA-Z_$]{0,}$/;

// 把表达式按照最小单位切割
// 后续我们的任务就是对这个数组进行归约即可(归约交付给别的地方，这里不继续处理)

/**
 * 例如：
 *  target={
 *      a:{
 *              value:9
 *         },
 *      b:7,
 *      flag:'no'
 *  }
 *  express= "a.value>10 && b< 11 ||flag=='yes'"
 * 变成数组以后应该是：
 *
 * // 比如最后的yes@value表示这是一个最终的值，不需要再计算了
 * ['a','[@value','value@value',']@value','>@value','10@value','&&@value','b','<@value','||@value','flag','==@value','yes@value']
 *
 * 然后，进一步解析得到：
 * [{value:9},'[','value',']','>',10,'&&',7,'<','||','no','==','yes']
 *
 * (当然，我们实际运算的时候，可能和这里不完全一致，这里只是为了方便解释我们的主体思想)
 *
 * 然后我们返回上面的结果即可！
 */

// 除了上述原因，统一前置处理还有一个好处就是：
// 可以提前对部分语法错误进行报错，方便定位调试
// 因为后续的操作越来越复杂，错误越提前越容易定位

var specialCode1 = ['+', '-', '*', '/', '%', '&', '|', '!', '?', ':', '[', ']', '(', ")", '>', '<', '='];
var specialCode2 = ['+', '-', '*', '/', '%', '&', '|', '!', '?', ':', '>', '<', '=', '<=', '>=', '==', '===', '!=', '!=='];

__pkg__scope_bundle__.default= function (target, express, scope) {

    // 剔除开头和结尾的空白
    express = express.trim();

    var i = -1,

        // 当前面对的字符
        currentChar = null;

    // 获取下一个字符
    var next = function () {
        currentChar = i++ < express.length - 1 ? express[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    var nextNValue = function (n) {
        return express.substring(i, n + i > express.length ? express.length : n + i);
    };

    next();

    var expressArray = [];
    while (true) {

        if (i >= express.length) break;

        // 先匹配普通的符号
        // + - * / %
        // && || !
        // ? :
        // [ ] ( )
        // > < >= <= == === != !==
        // 如果是&或者|比较特殊

        if (specialCode1.indexOf(currentChar) > -1) {

            // 对于特殊的符号
            if (['&', '|', '='].indexOf(currentChar) > -1) {
                if (['==='].indexOf(nextNValue(3)) > -1) {
                    expressArray.push(nextNValue(3));
                    i += 2; next();
                } else if (['&&', '||', '=='].indexOf(nextNValue(2)) > -1) {
                    expressArray.push(nextNValue(2));
                    i += 1; next();
                } else {
                    throw new Error("Illegal expression : " + express + "\nstep='analyseExpress',index=" + i);
                }
            }


            else {

                // 拦截部分比较特殊的
                if (['!=='].indexOf(nextNValue(3)) > -1) {
                    expressArray.push(nextNValue(3));
                    i += 2; next();
                } else if (['>=', '<=', '!='].indexOf(nextNValue(2)) > -1) {
                    expressArray.push(nextNValue(2));
                    i += 1; next();
                }

                // 普通的单一的
                else {
                    expressArray.push(currentChar);
                    next();
                }

            }
        }

        // 如果是字符串
        else if (['"', "'"].indexOf(currentChar) > -1) {
            var temp = "", beginTag = currentChar;
            next();

            // 如果没有遇到结束标签
            // 目前没有考虑 '\'' 这种带转义字符的情况，当然，'\"'这种是支持的
            // 后续如果希望支持，优化这里即可
            while (currentChar != beginTag) {
                if (i >= express.length) {

                    // 如果还没有遇到结束标识就结束了，属于字符串未闭合错误
                    throw new Error("String unclosed error : " + express + "\nstep='analyseExpress',index=" + i);

                }

                // 继续拼接
                temp += currentChar;
                next();
            }
            expressArray.push(temp + "@string");
            next();
        }

        // 如果是数字
        else if (/\d/.test(currentChar)) {
            var dotFlag = 'no'; // no表示还没有匹配到.，如果已经匹配到了，标识为yes，如果匹配到了.，可是后面还没有遇到数组，标识为error
            var temp = currentChar; next();
            while (i < express.length) {
                if (/\d/.test(currentChar)) {
                    temp += currentChar;
                    if (dotFlag == 'error') dotFlag = 'yes';
                } else if ('.' == currentChar && dotFlag == 'no') {
                    temp += currentChar;
                    dotFlag = 'error';
                } else {
                    break;
                }
                next();
            }

            // 如果小数点后面没有数字，辅助添加一个0
            if (dotFlag == 'error') temp += "0";
            expressArray.push(+temp);
        }

        // 如果是特殊符号
        // 也就是类似null、undefined等
        else if (['null', 'true'].indexOf(nextNValue(4)) > -1) {
            expressArray.push({
                "null": null,
                "true": true
            }[nextNValue(4)]);
            i += 3; next();
        } else if (['false'].indexOf(nextNValue(5)) > -1) {
            expressArray.push({
                'false': false
            }[nextNValue(5)]);
            i += 4; next();
        } else if (['undefined'].indexOf(nextNValue(9)) > -1) {
            expressArray.push({
                "undefined": undefined
            }[nextNValue(9)]);
            i += 8; next();
        }

        // 如果是空格
        else if (blankReg.test(currentChar)) {
            do {
                next();
            } while (blankReg.test(currentChar) && i < express.length);
        }

        else {

            var dot = false;

            // 对于开头有.进行特殊捕获，因为有.意味着这个值应该可以变成['key']的形式
            // 这是为了和[key]进行区分，例如：
            // .key 等价于 ['key'] 翻译成这里就是 ['[','key',']']
            // 可是[key]就不一样了，翻译成这里以后应该是 ['[','这个值取决当前对象和scope',']']
            // 如果这里不进行特殊处理，后续区分需要额外的标记，浪费资源
            if (currentChar == '.') {
                dot = true;
                next();
            }

            // 如果是标志符
            /**
             *  命名一个标识符时需要遵守如下的规则：
             *  1.标识符中可以含有字母 、数字 、下划线_ 、$符号
             *  2.标识符不能以数字开头
             */
            // 当然，是不是关键字等我们就不校对了，因为没有太大的实际意义
            // 也就是类似flag等局部变量

            if (identifier.test(currentChar)) {

                var len = 1;
                while (i + len <= express.length && identifier.test(nextNValue(len))) len += 1;
                if (dot) {
                    expressArray.push('[');
                    expressArray.push(nextNValue(len - 1) + '@string');
                    expressArray.push(']');
                } else {
                    var tempKey = nextNValue(len - 1);
                    // 如果不是有前置.，那就是需要求解了
                    var tempValue = tempKey in scope ? scope[tempKey] : target[tempKey];
                    expressArray.push(isString(tempValue) ? tempValue + "@string" : tempValue);
                }
                i += (len - 2); next();
            }

            // 都不是，那就是错误
            else {
                throw new Error("Illegal express : " + express + "\nstep='analyseExpress',index=" + i);
            }
        }

    }

    // 实际情况是，对于-1等特殊数字，可能存在误把1前面的-号作为运算符的错误，这里拦截校对一下
    var length = 0;
    for (var j = 0; j < expressArray.length; j++) {
        if (["+", "-"].indexOf(expressArray[j]) > -1 &&
            // 如果前面的也是运算符或开头，这个应该就不应该是运算符了
            (j == 0 || specialCode2.indexOf(expressArray[length - 1]) > -1)) {
            expressArray[length++] = +(expressArray[j] + expressArray[j + 1]);
            j += 1;
        } else {
            expressArray[length++] = expressArray[j];
        }
    }
    expressArray.length = length;

    return expressArray;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isString.js
/*****************************************************************/
window.__pkg__bundleSrc__['7']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;


/**
 * 判断一个值是不是String。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是String返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    var type = typeof value;
    return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/value/toPath.js
/*****************************************************************/
window.__pkg__bundleSrc__['8']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('9');
var evalValue =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('10');
var calcValue =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('7');
var isString =__pkg__scope_args__.default;


// 小括号去除方法

var doit1 = function (target, expressArray, scope) {

    // 先消小括号
    // 其实也就是归约小括号
    if (expressArray.indexOf('(') > -1) {

        var newExpressArray = [], temp = [],
            // 0表示还没有遇到左边的小括号
            // 1表示遇到了一个，以此类推，遇到一个右边的会减1
            flag = 0;
        for (var i = 0; i < expressArray.length; i++) {
            if (expressArray[i] == '(') {
                if (flag > 0) {
                    // 说明这个应该是需要计算的括号里面的括号
                    temp.push('(');
                }
                flag += 1;
            } else if (expressArray[i] == ')') {
                if (flag > 1) temp.push(')');
                flag -= 1;

                // 为0说明主的小括号归约结束了
                if (flag == 0) {
                    var _value = evalValue(doit1(target, temp, scope));
                    newExpressArray.push(isString(_value) ? _value + '@string' : _value);
                    temp = [];
                }
            } else {
                if (flag > 0) temp.push(expressArray[i]);
                else newExpressArray.push(expressArray[i]);
            }
        }
        expressArray = newExpressArray;
    }

    // 去掉小括号以后，调用中括号去掉方法
    return doit2(expressArray);

};

// 中括号嵌套去掉方法

var doit2 = function (expressArray) {

    var hadMore = true;
    while (hadMore) {

        hadMore = false;

        var newExpressArray = [], temp = [],

            // 如果为true表示当前在试探寻找归约最小单元的结束
            flag = false;

        // 开始寻找里面需要归约的最小单元（也就是可以立刻获取值的）
        for (var i = 0; i < expressArray.length; i++) {

            // 这说明这是一个需要归约的
            // 不过不一定是最小单元
            // 遇到了，先记下了
            if (expressArray[i] == '[' && i != 0 && expressArray[i - 1] != ']') {
                if (flag) {
                    // 如果之前已经遇到了，说明之前保存的是错误的，需要同步会主数组
                    newExpressArray.push('[');
                    for (var j = 0; j < temp.length; j++) newExpressArray.push(temp[j]);
                } else {
                    // 如果之前没有遇到，修改标记即可
                    flag = true;
                }
                temp = [];
            }

            // 如果遇到了结束，这说明当前暂存的就是最小归结单元
            // 计算后放回主数组
            else if (expressArray[i] == ']' && flag) {
                hadMore = true;

                // 计算
                var tempValue = evalValue(temp);
                var _value = newExpressArray[newExpressArray.length - 1][tempValue];
                newExpressArray[newExpressArray.length - 1] = isString(_value) ? _value + "@string" : _value;

                // 状态恢复
                flag = false;
            } else {

                if (flag) {
                    temp.push(expressArray[i]);
                } else {
                    newExpressArray.push(expressArray[i]);
                }

            }
        }

        expressArray = newExpressArray;

    }

    return expressArray;
};

// 路径
// ["[",express,"]","[",express"]","[",express,"]"]
// 变成
// [express][express][express]

var doit3 = function (expressArray) {
    var newExpressArray = [], temp = [];
    for (var i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '[') {
            temp = [];
        } else if (expressArray[i] == ']') {
            newExpressArray.push(evalValue(temp));
        } else {
            temp.push(expressArray[i]);
        }
    }
    return newExpressArray;
};

// 获取路径数组(核心是归约的思想)

__pkg__scope_bundle__.default= function toPath(target, expressArray, scope) {

    var newExpressArray = doit1(target, expressArray, scope);

    // 其实无非就三类
    // 第一类：[express][express][express]express
    // 第二类：express
    // 第三类：[express][express][express]

    var path;

    // 第二类
    if (newExpressArray[0] != '[') {
        path = [evalValue(newExpressArray)];
    }

    // 第三类
    else if (newExpressArray[newExpressArray.length - 1] == ']') {
        path = doit3(newExpressArray);
    }

    // 第一类
    else {
        var lastIndex = newExpressArray.lastIndexOf(']');
        var tempPath = doit3(newExpressArray.slice(0, lastIndex + 1));
        var tempArray = newExpressArray.slice(lastIndex + 1);
        tempArray.unshift(calcValue(target, tempPath, scope));
        path = [evalValue(tempArray)];
    }

    return path;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/value/eval.js
/*****************************************************************/
window.__pkg__bundleSrc__['9']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var getExpressValue = function (value) {
    // 这里是计算的内部，不需要考虑那么复杂的类型
    if (typeof value == 'string') return value.replace(/@string$/, '');
    return value;
};

var setExpressValue = function (value) {
    if (typeof value == 'string') return value + "@string";
    return value;
};

__pkg__scope_bundle__.default= function (expressArray) {

    // 采用按照优先级顺序归约的思想进行

    // 需要明白，这里不会出现括号
    // （小括号或者中括号，当然，也不会有函数，这里只会有最简单的表达式）
    // 这也是我们可以如此归约的前提

    // + - * / %
    // && || !
    // ? :
    // > < >= <= == === != !==

    // !
    // 因为合并以后数组长度一定越来越短，我们直接复用以前的数组即可
    var length = 0, i = 0;
    for (; i < expressArray.length; i++) {
        if (expressArray[i] == '!') {
            // 由于是逻辑运算符，如果是字符串，最后的@string是否去掉已经没有意义了
            expressArray[length] = !expressArray[++i];
        } else expressArray[length] = expressArray[i];
        length += 1;
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // * / %
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '*') {
            // 假设不知道一定正确，主要是为了节约效率，是否提供错误提示，再议
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) * getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '/') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) / getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '%') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) % getExpressValue(expressArray[++i]);
        } else {

            // 上面不会导致数组增长
            expressArray[length++] = expressArray[i];
        }

    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // + -
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '+') {
            expressArray[length - 1] = setExpressValue(getExpressValue(expressArray[length - 1]) + getExpressValue(expressArray[++i]));
        } else if (expressArray[i] == '-') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) - getExpressValue(expressArray[++i]);
        } else expressArray[length++] = expressArray[i];
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // > < >= <=
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '>') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) > getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '<') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) < getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '<=') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) <= getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '>=') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) >= getExpressValue(expressArray[++i]);
        } else expressArray[length++] = expressArray[i];
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // == === != !==
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '==') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) == getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '===') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) === getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '!=') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) != getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '!==') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) !== getExpressValue(expressArray[++i]);
        } else expressArray[length++] = expressArray[i];
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // && ||
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '&&') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) && getExpressValue(expressArray[1 + i]);
            i += 1;
        } else if (expressArray[i] == '||') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) || getExpressValue(expressArray[1 + i]);
            i += 1;
        } else expressArray[length++] = expressArray[i];
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // ?:
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '?') {
            expressArray[length - 1] = getExpressValue(expressArray[length - 1]) ? getExpressValue(expressArray[i + 1]) : getExpressValue(expressArray[i + 3]);
            i += 3;
        } else expressArray[length++] = expressArray[i];
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    throw new Error('Unrecognized expression : [' + expressArray.toString() + "]");

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/value/value.js
/*****************************************************************/
window.__pkg__bundleSrc__['10']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (target, expressArray, scope) {
    var value = expressArray[0] in scope ? scope[expressArray[0]] : target[expressArray[0]];
    for (var i = 1; i < expressArray.length; i++) {
        try {
            value = value[expressArray[i]];
        } catch (e) {
            console.error({
                target: target,
                scope: scope,
                expressArray: expressArray,
                index: i
            });
            throw e;
        }
    }
    return value;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/to-node.js
/*****************************************************************/
window.__pkg__bundleSrc__['11']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 节点创建
 * @param {string} tagname 节点名称
 * @returns {Element} 返回创建的节点
 */
__pkg__scope_bundle__.default= function (tagname) {
    if (['svg', 'circle', 'path', 'rect', 'ellipse', 'line', 'polyline', 'polygon', 'text'].indexOf(tagname) > -1) {
        return {
            type: "svg",
            value: document.createElementNS('http://www.w3.org/2000/svg', tagname)
        };
    } else {
        return {
            type: "html",
            value: document.createElement(tagname)
        };
    }
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/setAttribute.js
/*****************************************************************/
window.__pkg__bundleSrc__['12']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 节点属性设置
 * @param {JSON} el 固定格式:{type:"svg"|"html",value:Element}
 * @param {string} key 属性名称
 * @param {any} value 属性指
 */
__pkg__scope_bundle__.default= function (el, key, value) {
    if (el.type == 'svg' && ["href", "title", "show", "type", "role", "actuate"].indexOf(key)) {
        el.value.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:' + key, value);
    } else {
        el.value.setAttribute(key, value);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/framework/isValidKey.js
/*****************************************************************/
window.__pkg__bundleSrc__['13']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 判断是否是合法的方法或数据key

__pkg__scope_bundle__.default= function (key) {
    // 判断是不是_或者$开头的
    // 这两个内部预留了
    if (/^[_$]/.test(key)) {
        throw new Error('The beginning of _ or $ is not allowed：' + key);
    }
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/framework/remark-data.js
/*****************************************************************/
window.__pkg__bundleSrc__['14']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('2');
var isObject =__pkg__scope_args__.default;


var _ref = function (data) {

    // 如果是定义的数据，不好监听，嵌套一层壳
    return {
        value: data,
        type: 'ref'
    };

};

__pkg__scope_bundle__.ref = _ref;
__pkg__scope_bundle__.reactive = function (data) {

    // 如果是对象
    if (isObject(data)) {
        return {
            value: data,
            type: 'reactive'
        };
    }

    // 否则，还是用ref
    else {
        return _ref(data);
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/framework/observe-data.js
/*****************************************************************/
window.__pkg__bundleSrc__['15']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.proxy = function (instance, data, key, doback) {

    var _proxy = new Proxy(data.value, {
        get: function (_target, _key) {
            return _target[_key];
        },
        set: function (_target, _key, _value) {

            var flag = Reflect.set(_target, _key, _value);

            // 回调通知组件更新
            doback();

            return flag;

        }
    });

    data.value = _proxy;
    instance[key] = _proxy;

};

__pkg__scope_bundle__.watcher = function (instance, data, key, doback) {

    // 记录值
    var value = data.value;

    var getter_setter = {
        get: function () {
            return value;
        },
        set: function (newValue) {
            value = newValue;

            // 回调通知组件更新
            doback();
        }
    };

    // setter和getter添加监听
    Object.defineProperty(data, 'value', getter_setter);

    // 组件实例新增属性
    instance[key] = value;
    Object.defineProperty(instance, key, getter_setter);

};



    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/directives/ui-bind.js
/*****************************************************************/
window.__pkg__bundleSrc__['16']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('7');
var isString =__pkg__scope_args__.default;


var doit = function (el, binding) {

    // 如果有type表示给属性赋值
    if (isString(binding.type) && binding.type.length > 0) {

        if (el.getAttribute(binding.type) != binding.value) {
            el.setAttribute(binding.type, binding.value);
        }
    }

    // 否则是设置内容或值
    else {

        if (el.value != binding.value || el.textContent != binding.value) {
            el.value = el.textContent = binding.value;
        }

    }

}

__pkg__scope_bundle__.default= {
    inserted: doit,
    update: doit
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/directives/ui-model.js
/*****************************************************************/
window.__pkg__bundleSrc__['17']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('5');
var setValue=__pkg__scope_args__.setValue;


__pkg__scope_bundle__.default= {
    inserted: function (el, binding) {
        el.value = binding.value;
        el.addEventListener('input', function () {
            setValue(binding.target, "." + binding.exp, el.value);
        }, false);
    },
    update: function (el, binding) {
        el.value = binding.value;
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/directives/ui-on.js
/*****************************************************************/
window.__pkg__bundleSrc__['18']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {
    inserted: function (el, binding) {

        var types = binding.type.split('.'), modifier = {

            // 阻止默认事件
            "prevent": false,

            // 阻止冒泡
            "stop": false,

            // 只执行一次
            "once": false,

            //  回车
            "enter": false

        }, i;

        var callback = function (event) {

            if (modifier.enter) {
                var keycode = event.keyCode || event.which;
                if (keycode != 13) return;
            }

            if (modifier.stop) event.stopPropagation();
            if (modifier.prevent) event.preventDefault();

            binding.value.apply(binding.target, [event, el]);

            if (modifier.once) {
                el.removeEventListener(types[0], callback, false);
            }

        }

        for (i = 1; i < types.length; i++) {
            modifier[types[i]] = true;
        }

        el.addEventListener(types[0], callback, false);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/directives/ui-dragdrop.js
/*****************************************************************/
window.__pkg__bundleSrc__['19']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('20');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('21');
var unbind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var getStyle =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= {

    inserted: function (el, binding) {
        var bindingValue = binding.value || [0, 0, 0, 0];
        el.style.cursor = 'move';

        // 寻找窗口轮廓
        var _el = el.parentNode;
        while (getStyle(_el, 'position') == 'static' && _el) {
            _el = _el.parentNode;
        }

        //绑定鼠标左键按下事件
        bind(el, 'mousedown', function mousedown(event) {
            event.stopPropagation();

            //解决浏览器全选无法拖拽弹框
            el.setCapture && el.setCapture();

            var lf = event.clientX;
            var tp = event.clientY;

            if (binding.type == 'desktop') {
                bindingValue = [0, 50 - _el.clientWidth, _el.clientHeight - 50, 50 - _el.clientWidth];
            }

            var left = getStyle(_el, 'left').replace('px', '');
            var top = getStyle(_el, 'top').replace('px', '');

            //绑定鼠标移动事件
            function mousemove(event) {
                event.stopPropagation();

                var newLeft = left - - event.clientX - lf;
                var newTop = top - - event.clientY - tp;

                // 判断水平是否越界
                if (newLeft > bindingValue[3] && newLeft + _el.clientWidth < window.innerWidth - bindingValue[1]) {
                    _el.style.left = newLeft + 'px';
                }

                // 左越界
                else if (newLeft <= bindingValue[3]) {
                    _el.style.left = bindingValue[3] + 'px';
                }

                // 右越界
                else {
                    _el.style.left = (window.innerWidth - bindingValue[1] - _el.clientWidth) + 'px';
                }

                // 判断垂直是否越界
                if (newTop > bindingValue[0] && newTop + _el.clientHeight < window.innerHeight + bindingValue[2]) {
                    _el.style.top = newTop + 'px';
                }

                // 上越界
                else if (newTop <= bindingValue[0]) {
                    _el.style.top = bindingValue[0] + 'px';
                }

                // 下越界
                else {
                    _el.style.top = (window.innerHeight + bindingValue[2] - _el.clientHeight) + 'px';
                }

                _el.style.right = 'auto';
                _el.style.bottom = 'auto';

            }
            bind(document, 'mousemove', mousemove);

            //绑定鼠标松开事件,清除鼠标移动绑定
            bind(document, 'mouseup', function (event) {
                event.stopPropagation();

                unbind(document, 'mousemove', mousemove);
                _el.releaseCapture && _el.releaseCapture();
                return false;
            });
        });

    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/bind
/*****************************************************************/
window.__pkg__bundleSrc__['20']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 绑定事件
var bindEvent = function (dom, eventType, callback) {

    if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
            bindEvent(dom[i], eventType, callback);
        }
        return;
    }

    if (window.attachEvent)
        dom.attachEvent("on" + eventType, callback);
    else
        dom.addEventListener(eventType, callback, false);
};

__pkg__scope_bundle__.default= bindEvent;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/unbind
/*****************************************************************/
window.__pkg__bundleSrc__['21']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 去掉绑定事件
var unbindEvent = function (dom, eventType, handler) {

    if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
            unbindEvent(dom[i], eventType, handler);
        }
        return;
    }

    if (window.detachEvent)
        dom.detachEvent('on' + eventType, handler);
    else
        dom.removeEventListener(eventType, handler, false);

};

__pkg__scope_bundle__.default= unbindEvent;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/getStyle
/*****************************************************************/
window.__pkg__bundleSrc__['22']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 获取样式
__pkg__scope_bundle__.default= function (dom, name) {
    // 获取结点的全部样式
    var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
        document.defaultView.getComputedStyle(dom, null) :
        dom.currentStyle;

    // 如果没有指定属性名称，返回全部样式
    return typeof name === 'string' ?
        allStyle.getPropertyValue(name) :
        allStyle;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/directives/ui-right-menu
/*****************************************************************/
window.__pkg__bundleSrc__['23']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('24');
var lazyContextmenus =__pkg__scope_args__.default;


var rootEl = document.getElementById('contextmenu-root');

document.getElementsByTagName('body')[0].addEventListener('click', function () {
    rootEl.style.display = 'none';
    rootEl.innerHTML = "";
});

__pkg__scope_bundle__.default= {
    inserted: function (el, binding) {

        // 注册鼠标右键
        el.addEventListener("contextmenu", function (event) {

            // 取消默认事件
            event.preventDefault();

            // 取消冒泡事件
            event.stopPropagation();

            lazyContextmenus[binding.type]().then(function (data) {
                rootEl.innerHTML = "";
                rootEl.style.display = "";

                var contextmenuInstance = binding.useTemplate(rootEl, data.default, {
                    event: event,
                    target: el,
                    exp: binding.exp,
                    value: binding.value,
                    instance: binding.target
                });
                rootEl.setAttribute('contextmenu-view', contextmenuInstance._name || "");

                var lf = event.clientX;
                var tp = event.clientY;

                var dist = 10; // 间隙

                if (lf < 0) // 左越界
                    rootEl.style.left = dist + "px";
                else if (lf + rootEl.clientWidth + dist * 2 > window.innerWidth) // 右越界
                    rootEl.style.left = (lf - dist - rootEl.clientWidth) + "px";
                else // 水平无越界
                    rootEl.style.left = (lf + dist) + "px";

                if (tp < 0) // 上越界
                    rootEl.style.top = dist + "px";
                else if (tp + rootEl.clientHeight + dist * 2 > window.innerHeight) // 下越界
                    rootEl.style.top = (tp - dist - rootEl.clientHeight) + "px";
                else // 垂直无越界
                    rootEl.style.top = (tp + dist) + "px";
            });

        });

    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['24']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 系统右键
    system: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle1.js','25')
    },

    // 桌面右键
    "desktop-line": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle2.js','26')
    },

    // 应用右键
    "app": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle3.js','27')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/urlFormat
/*****************************************************************/
window.__pkg__bundleSrc__['28']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 浏览器地址格式化
 * @returns {JSON} 固定格式:{router:Array<string>,params:{}}
 */
__pkg__scope_bundle__.default= function () {

    var splitTemp = window.location.href.split('?');
    var routerTemp = (splitTemp[0] + "#").split("#")[1].replace(/^\//, '').replace(/\/$/, '').split('/');
    var paramTemp = splitTemp[1] || "";

    var paramResult, paramArray;
    if (paramTemp == "") {
        paramResult = {};
    } else {
        paramArray = paramTemp.split("&"), paramResult = {};
        paramArray.forEach(function (item) {
            var temp = item.split("=");
            paramResult[temp[0]] = temp[1];
        })
    }

    var resultData = {
        router: routerTemp[0] == '' ? [] : routerTemp,
        params: paramResult
    };

    return resultData;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isString
/*****************************************************************/
window.__pkg__bundleSrc__['29']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;


/**
 * 判断一个值是不是String。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是String返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    var type = typeof value;
    return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isFunction
/*****************************************************************/
window.__pkg__bundleSrc__['30']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('2');
var isObject =__pkg__scope_args__.default;


/**
 * 判断一个值是不是Function。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Function返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    if (!isObject(value)) {
        return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' ||
        type === '[object GeneratorFunction]' || type === '[object Proxy]';
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/remove
/*****************************************************************/
window.__pkg__bundleSrc__['31']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 删除结点
__pkg__scope_bundle__.default= function (el) {
    el.parentNode.removeChild(el);
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['32']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 正则表达式可视化
    "regexper-visualization": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle4.js','33')
    },

    // 音频编辑器
    "audio-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle5.js','34')
    },

    // 格式化JSON字符串
    "format-json": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle6.js','35')
    },

    // 图片编辑器
    "image-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle7.js','36')
    },

    // 模型编辑器
    "model-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle8.js','37')
    },

    // 贪吃蛇
    "snake-eating": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle9.js','38')
    },

    // scss转css
    "scss": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle10.js','39')
    },

    // 代码编辑器
    "code-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle11.js','40')
    },

    // 录屏软件
    "recorder-screen": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle12.js','41')
    },

    // 浏览器
    "browser": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle13.js','42')
    },

    // geoJSON查看器
    "geo-json": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle14.js','43')
    },

    // 我的电脑
    "computer": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle15.js','44')
    },

    // 应用中心
    "application": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle16.js','45')
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['46']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 调试
    debugger: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle17.js','47')
    },

    // 颜色选择
    "color-picker": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle18.js','48')
    },

    // 接口文档
    api: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle19.js','49')
    },

    // 项目介绍
    what: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle20.js','50')
    },


    // 截图工具
    "snipping-tool": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle21.js','51')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/common.scss
/*****************************************************************/
window.__pkg__bundleSrc__['52']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n body{\n\nbackground-color: #fafafa;\n\nbackground-image: url(\"./desktop.jpeg\");\n\noverflow: hidden;\n\nheight: 100vh;\n\nbackground-size: cover;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\n}\n\n body>div#view-root, body>div#win-root, body>div#dialog-root{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 0;\n\nheight: 0;\n\n}\n\n body>div#win-root{\n\nz-index: 5;\n\n}\n\n body>div#dialog-root{\n\nz-index: 10;\n\n}\n\n body>div#dialog-root>div.mask{\n\nleft: 0;\n\ntop: 0;\n\nwidth: 100vw;\n\nheight: 100vh;\n\nbackground-color: rgba(0, 0, 0, 0.5);\n\ndisplay: none;\n\n}\n\n body>div#dialog-root>div.mask:not(:last-child){\n\ndisplay: block;\n\n}\n\n body>div#dialog-root>div[dialog-view]{\n\nz-index: -1;\n\n}\n\n body>div#dialog-root>div[dialog-view]:last-child{\n\nz-index: 1;\n\n}\n\n/* // 窗口按钮\r */\n\n body .win-btns{\n\nposition: absolute;\n\nright: 20px;\n\ntop: -0.5px;\n\nfont-size: 0;\n\n}\n\n body .win-btns>button{\n\nfont-size: 0;\n\nheight: 24px;\n\nvertical-align: top;\n\noutline: none;\n\nborder: none;\n\nbackground-repeat: no-repeat;\n\nbackground-position-y: center;\n\nbackground-size: auto 100%;\n\ncursor: pointer;\n\nmargin: 0 !important;\n\nbackground-color: transparent !important;\n\n}\n\n body .win-btns>button.min{\n\nbackground-image: url(\"./min-btn.png\");\n\nwidth: 36px;\n\n}\n\n body .win-btns>button.close{\n\nbackground-image: url(\"./close-btn.png\");\n\nwidth: 59px;\n\n}\n\n/* // 应用logo\r */\n\n body [tag=\"regexper-visualization\"]{\n\nbackground-image: url('./regexper-visualization.png');\n\n}\n\n body [tag=\"audio-editor\"]{\n\nbackground-image: url('./audio-editor.png');\n\n}\n\n body [tag=\"format-json\"]{\n\nbackground-image: url('./format-json.png');\n\n}\n\n body [tag=\"image-editor\"]{\n\nbackground-image: url('./image-editor.png');\n\n}\n\n body [tag=\"model-editor\"]{\n\nbackground-image: url('./model-editor.png');\n\n}\n\n body [tag=\"snake-eating\"]{\n\nbackground-image: url('./snake-eating.png');\n\n}\n\n body [tag=\"scss\"]{\n\nbackground-image: url('./scss.png');\n\n}\n\n body [tag=\"code-editor\"]{\n\nbackground-image: url('./code-editor.png');\n\n}\n\n body [tag=\"recorder-screen\"]{\n\nbackground-image: url('./recorder-screen.png');\n\n}\n\n body [tag=\"api\"]{\n\nbackground-image: url('./api.png');\n\n}\n\n body [tag=\"debugger\"]{\n\nbackground-image: url('./debugger.png');\n\n}\n\n body [tag=\"browser\"]{\n\nbackground-image: url('./browser.png');\n\n}\n\n body [tag=\"geo-json\"]{\n\nbackground-image: url('./geoJSON.png');\n\n}\n\n body [tag=\"computer\"]{\n\nbackground-image: url('./computer.png');\n\n}\n\n body [tag=\"snipping-tool\"]{\n\nbackground-image: url('./snipping.png');\n\n}\n\n body [tag=\"application\"]{\n\nbackground-image: url('./application.png');\n\n}\n\n [win-view], [dialog-view], [page-view]{\n\nposition: fixed;\n\nbackground-color: #fafafa;\n\nbox-shadow: #607d8b 2px 0px 6px 1px;\n\n}\n\n #contextmenu-root{\n\nposition: fixed;\n\nz-index: 10;\n\n}\n\n #contextmenu-root ul{\n\nwidth: 220px;\n\nborder: 1px solid rgb(190, 189, 189);\n\nbackground-color: rgb(241, 241, 241);\n\nborder-radius: 3px;\n\n}\n\n #contextmenu-root ul li[notshow='yes']{\n\ndisplay: none;\n\n}\n\n #contextmenu-root ul li.line{\n\nheight: 1px;\n\nbackground-color: #d5d9db;\n\nmargin-left: 50px;\n\n}\n\n #contextmenu-root ul li.btn{\n\nline-height: 2em;\n\nfont-size: 14px;\n\npadding-left: 60px;\n\nposition: relative;\n\ncursor: pointer;\n\n}\n\n #contextmenu-root ul li.btn::before{\n\ncontent: \" \";\n\nposition: absolute;\n\nwidth: 50px;\n\nheight: 100%;\n\ntext-align: center;\n\nleft: 0;\n\ntop: 0;\n\nborder-right: 1px solid #d5d9db;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 70%;\n\nbackground-position: center center;\n\n}\n\n #contextmenu-root ul li.btn:hover{\n\noutline: 1px solid rgba(207, 208, 208, 0.72);\n\nbackground-color: rgba(228, 252, 254, 0.538);\n\nborder-radius: 3px;\n\n}\n\n/* // 不可用的\r */\n\n #contextmenu-root ul li.btn.gray{\n\ncolor: #c2c2ca;\n\ncursor: not-allowed;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/polyfill/Promise
/*****************************************************************/
window.__pkg__bundleSrc__['53']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var isObject = function (value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};

var getType = function (value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return Object.prototype.toString.call(value);
};

var isFunction = function (value) {
    if (!isObject(value)) {
        return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' ||
        type === '[object GeneratorFunction]' || type === '[object Proxy]';
};

function Promise(doback) {

    var doResolve = function (doback, that) {

        // 防止重复修改状态
        var done = false;

        try {
            doback(function (value) {
                if (done) return; done = true;
                that.$$changeState(value, 'fulfilled');

            }, function (reason) {
                if (done) return; done = true;
                that.$$changeState(reason, 'rejected');

            });
        } catch (error) {
            if (done) return; done = true;
            that.$$changeState(error, 'rejected');
        }

    };

    if (!(this instanceof Promise)) {

        // 所有的报错方式和内容我们都尽力和原生的保持一致，下同
        throw new TypeError('undefined is not a promise');
    }

    if (!(isFunction(doback))) {
        throw new TypeError('Promise resolver ' + doback + ' is not a function');
    }

    /**
     * 参数初始化
     */

    // 当前的值
    this.__value = undefined;

    // 记录着由于then，catch或finally登记的方法
    // Array<onFulfilled|undefined, onRejected|undefined, callback|undefined>
    this.__hocks = [];

    // 状态
    this.__state = 'pending';

    /**
     * 准备完毕以后，开始处理
     */
    doResolve(doback, this);
}

// 添加辅助方法
Promise.prototype.$$changeState = function (data, state) {

    // 更改状态
    this.__state = state;
    this.__value = data;

    // 由于状态改变了，触发对then，finnaly，catch等的执行更新
    this.$$triggerEvent();

};

Promise.prototype.$$triggerEvent = function () {

    // 这个方法的任务就是把__hocks中记录的方法依次执行了
    // 什么时候会停止？两种情况：
    // 1.队列执行完了
    // 2.遇到其中一个执行方法返回Promise

    var currentHock = null;

    // 同意状态就去寻找下一个onFulfilled
    // 拒绝状态就去寻找下一个onRejected
    // 数组下标0和1分别记录这两个状态，因此先根据状态确定下标即可
    var index = this.__state == 'fulfilled' ? 0 : 1, i;

    // 可能找到，可能到结尾都没有找到
    while (this.__hocks.length > 0) {

        if (isFunction(this.__hocks[0][index])) {
            currentHock = this.__hocks.shift();
            break;
        }

        // 对于路过的finally执行一下
        else if (isFunction(this.__hocks[0][2])) {
            this.__hocks[0][2]();
        }

        this.__hocks.shift();

    }

    // 如果找到了
    if (currentHock !== null) {
        var result = currentHock[index](this.__value);

        // 如果是Promise
        if (isObject(result) && result.constructor === this.constructor) {
            for (var i = 0; i < this.__hocks.length; i++) {
                result.__hocks.push(this.__hocks[i]);
                if (result.__state != 'pending') result.$$triggerEvent();
            }

            this.then = function (onFulfilled, onRejected) {

                result.then(onFulfilled, onRejected);
            };
            this.catch = function (onRejected) {

                result.catch(onRejected);
            };
            this.finally = function (callback) {

                result.finally(callback);
            };

        }

        // 否则
        else {

            this.__value = result;
            this.__state = "fulfilled";
            this.$$triggerEvent();

        }

    }

};

/**
 * 原型上的方法
 */

// 添加解决(fulfillment)和拒绝(rejection)回调到当前 promise,
// 返回一个新的 promise,
// 将以回调的返回值来resolve。
Promise.prototype.then = function (onFulfilled, onRejected) {

    this.__hocks.push([onFulfilled, onRejected, undefined]);

    if (this.__state != 'pending') { this.$$triggerEvent(); }

    return this;

};

// 添加一个拒绝(rejection) 回调到当前 promise, 返回一个新的promise。
// 当这个回调函数被调用，
// 新 promise 将以它的返回值来resolve，
// 否则如果当前promise 进入fulfilled状态，
// 则以当前promise的完成结果作为新promise的完成结果。
Promise.prototype.catch = function (onRejected) {

    this.__hocks.push([undefined, onRejected, undefined]);

    if (this.__state != 'pending') { this.$$triggerEvent(); }

    return this;

};

// 添加一个事件处理回调于当前promise对象，
// 并且在原promise对象解析完毕后，
// 返回一个新的promise对象。
// 回调会在当前promise运行完毕后被调用，
// 无论当前promise的状态是完成(fulfilled)还是失败(rejected)。
Promise.prototype.finally = function (callback) {

    this.__hocks.push([undefined, undefined, callback]);

    if (this.__state != 'pending') { this.$$triggerEvent(); }

    return this;


};

/**
 * 静态方法
 */

// 返回一个状态由给定value决定的Promise对象。
// 如果该值是thenable(即，带有then方法的对象)，
// 返回的Promise对象的最终状态由then方法执行决定；
// 否则的话(该value为空，基本类型或者不带then方法的对象),
// 返回的Promise对象状态为fulfilled，
// 并且将该value传递给对应的then方法。
// 通常而言，如果您不知道一个值是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,
// 这样就能将该value以Promise对象形式使用。
Promise.resolve = function (value) {

    if (isObject(value) && value.constructor === Promise) {
        return value;
    }

    return new Promise(function (resolve) {
        resolve(value);
    });

};

// 返回一个状态为失败的Promise对象，
// 并将给定的失败信息传递给对应的处理方法。
Promise.reject = function (reason) {

    return new Promise(function (resolve, reject) {
        reject(reason);
    });

};

// 这个方法返回一个新的promise对象，
// 该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
// 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
// 这个新的promise对象在触发成功状态以后，
// 会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，
// 顺序跟iterable的顺序保持一致；
// 如果这个新的promise对象触发了失败状态，
// 它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
// Promise.all方法常被用于处理多个promise对象的状态集合.
Promise.all = function (iterable) {

    return new Promise(function (resolve, reject) {

        if (!Array.lisArray(iterable)) {
            return reject(new TypeError('undefined is not iterable (cannot read property Symbol(Symbol.iterator))'));
        }

        var resultData = Array.prototype.slice.call(iterable), num = 0;

        if (resultData.length == 0) resolve([]);

        var doHelp = function (index, item) {
            if (item.__state !== "pending") {

                num += 1;

                if (item.__state == 'rejected') {

                    // 如果遇到第一个失败的，拒绝即可
                    reject(item.__value);
                } else {

                    resultData[index] = item.__value;

                    if (num == resultData.length) {
                        resolve(resultData);
                    }
                }

            } else {
                setTimeout(function () { doHelp(index, item); });
            }
        };

        for (var i = 0; i < resultData.length; i++) {
            doHelp(i, resultData[i]);
        }

    });

};

// 等到所有promises都已敲定（settled）（每个promise都已兑现（fulfilled）或已拒绝（rejected））。
// 返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。
Promise.allSettled = function (iterable) {

    return new Promise(function (resolve, reject) {

        if (!Array.lisArray(iterable)) {
            return reject(new TypeError('undefined is not iterable (cannot read property Symbol(Symbol.iterator))'));
        }

        var resultData = Array.prototype.slice.call(iterable), num = 0;

        if (resultData.length == 0) resolve([]);

        var doHelp = function (index, item) {
            if (item.__state !== "pending") {

                num += 1;

                resultData[index] = {
                    status: item.__state
                };

                if (item.__state == 'fulfilled') {
                    resultData[index].value = item.__value;
                } else {
                    resultData[index].reason = item.__value;
                }

                if (num == resultData.length) {
                    resolve(resultData);
                }

            } else {
                setTimeout(function () { doHelp(index, item); });
            }
        };

        for (var i = 0; i < resultData.length; i++) {
            doHelp(i, resultData[i]);
        }

    });

};
// 收一个Promise对象的集合，
// 当其中的一个 promise 成功，
// 就返回那个成功的promise的值。
Promise.any = function (iterable) {

    return new Promise(function (resolve, reject) {

        if (!Array.lisArray(iterable)) {
            return reject(new TypeError('undefined is not iterable (cannot read property Symbol(Symbol.iterator))'));
        }

        var num = 0;

        if (iterable.length == 0) resolve(undefined);

        var doHelp = function (index, item) {
            if (item.__state !== "pending") {

                num += 1;

                if (item.__state == 'rejected') {

                    if (num == iterable.length) {

                        // 为了兼容性，我们放弃AggregateError
                        return reject(new Error('All promises were rejected'));
                    }

                } else {

                    // 遇到第一个成功的，标记解决即可
                    resolve(item.__value);

                }

            } else {
                setTimeout(function () { doHelp(index, item); });
            }
        };

        for (var i = 0; i < iterable.length; i++) {
            doHelp(i, iterable[i]);
        }

    });
};

// 当iterable参数里的任意一个子promise被成功或失败后，
// 父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，
// 并返回该promise对象。
Promise.race = function (iterable) {

    return new Promise(function (resolve, reject) {

        if (!Array.lisArray(iterable)) {
            return reject(new TypeError('undefined is not iterable (cannot read property Symbol(Symbol.iterator))'));
        }

        if (iterable.length == 0) resolve(undefined);

        var doHelp = function (index, item) {
            if (item.__state !== "pending") {

                if (item.__state == 'rejected') {
                    reject(item.__value);
                } else {
                    resolve(item.__value);
                }

            } else {
                setTimeout(function () { doHelp(index, item); });
            }
        };

        for (var i = 0; i < iterable.length; i++) {
            doHelp(i, iterable[i]);
        }

    });
};

// 如果Promise不存在
if (!('Promise' in window)) {
    window['Promise'] = Promise;
}

// 由于不同浏览器对一些具体的方法兼容不一样
// （比如一些浏览器支持Promise，可是不支持某个方法，需要对该方法进行兼容）
// 需要进一步嗅探，后续如果有必要再说


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/debugger/index
/*****************************************************************/
window.__pkg__bundleSrc__['54']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('55');
var isObject =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('56');
var showData =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('62');
var toString =__pkg__scope_args__.default;


var console = window.console;

// 原生的打印方法 + 当前执行的代码在堆栈中的调用路径
var log = console.log;
var info = console.info;
var debug = console.debug;
var warn = console.warn;
var error = console.error;
var trace = console.trace;

// 记录的打印、错误等日志记录
window._consoleArray_ = [];

var colors = {
    log: "gray",
    info: 'green',
    debug: 'blue',
    warn: 'f1c010',
    error: 'red',
    trace: 'white'
};
window._consoleAppend_ = function (item) {
    var rootEl = document.getElementById('console-el');

    var liEl = document.createElement('li');
    rootEl.appendChild(liEl);

    liEl.style.color = colors[item.type];

    var i, itemEl, brEl;
    for (i = 0; i < item.content.length; i++) {

        itemEl = document.createElement('div');
        liEl.appendChild(itemEl);

        showData(itemEl, item.content[i]);

        if (i < item.content.length - 1) {
            brEl = document.createElement('div');
            liEl.appendChild(brEl);

            brEl.setAttribute('class', 'br');
        }
    }

};

function trigger(type, info) {
    if (type == 'console') {

        // 先保存起来
        window._consoleArray_.push(info);

        // 如果弹框打开，同步追加
        if (document.getElementById('console-el')) {
            window._consoleAppend_(info);
        }
    }
}

__pkg__scope_bundle__.default= function () {

    console.log = function () {
        log.apply(this, arguments);
        trigger('console', {
            type: "log",
            content: arguments
        });
    };
    console.info = function () {
        info.apply(this, arguments);
        trigger('console', {
            type: "info",
            content: arguments
        });
    };
    console.debug = function () {
        debug.apply(this, arguments);
        trigger('console', {
            type: "debug",
            content: arguments
        });
    };
    console.warn = function () {
        warn.apply(this, arguments);
        trigger('console', {
            type: "warn",
            content: arguments
        });
    };
    console.error = function () {
        error.apply(this, arguments);
        trigger('console', {
            type: "error",
            content: arguments
        });
    };
    console.trace = function () {
        trace.apply(this, arguments);
        trigger('console', {
            type: "trace",
            content: arguments
        });
    };

    if ('addEventListener' in window) {

        // 监听Promise相关错误
        window.addEventListener('unhandledrejection', function (event) {
            var content = event.reason.stack;
            trigger('console', {
                type: "error",
                content: [content]
            });
        });

        // throw new error的捕获
        window.addEventListener('error', function (event) {
            var content = event.message + " " + event.filename + " " + event.lineno + " \nstack :\n" + (event.error ? event.error.stack : "");
            trigger('console', {
                type: "error",
                content: [content]
            });
        });
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isObject
/*****************************************************************/
window.__pkg__bundleSrc__['55']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 判断一个值是不是Object。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Object返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/debugger/showData
/*****************************************************************/
window.__pkg__bundleSrc__['56']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('57');
var appendTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('20');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('29');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('30');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('60');
var isNumber =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('61');
var isBoolean =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('62');
var toString =__pkg__scope_args__.default;


var doit = function (target, obj) {

    bind(target.getElementsByTagName('i')[0], 'click', function () {

        // 如果是字符串，就不需要展开了
        if (isString(obj)) return;

        // 如果没有加载过
        if (target.getAttribute('hadload') != 'yes') {

            target.setAttribute('hadload', 'yes');
            target.setAttribute('isopen', 'yes');

            var template = "<div class='item'>";

            for (var key in obj) {
                try {
                    template += "<span isopen='no'><i><em style='font-style:normal;color:#905'>" + key + "</em>:" + toString(obj[key]) + "</i></span>";
                } catch (e) {
                    // todo
                }
            }
            template += "</div>";
            appendTo(target, template);

            // 添加交互
            var index = 0, lis = target.getElementsByTagName('span');
            for (var key in obj) {
                doit(lis[index++], obj[key]);
            }
        }

        // 如果加载过了，直接控制打开或者关闭即可
        else {
            if (target.getAttribute('isopen') == 'no') target.setAttribute('isopen', 'yes');
            else target.setAttribute('isopen', 'no');
        }

    });

};

__pkg__scope_bundle__.default= function (target, msg) {

    // 如果是字符串、函数、数字等
    if (isString(msg) || isFunction(msg) || isNumber(msg) || isBoolean(msg)) {
        target.innerText = msg;
    }

    else if (msg === undefined) target.innerText = 'undefined';
    else if (msg === null) target.innerText = 'null';

    else {
        target.setAttribute('defType', 'showobject');
        target.setAttribute('class', 'item');

        // 默认作为对象显示
        target.setAttribute('hadload', 'no');
        target.setAttribute('isopen', 'no');
        target.innerHTML = "<i>" + toString(msg) + "</i>";
        doit(target, msg);
    }
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/appendTo
/*****************************************************************/
window.__pkg__bundleSrc__['57']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('58');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('59');
var toNode =__pkg__scope_args__.default;


// 追加结点(内部结尾)
__pkg__scope_bundle__.default= function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.appendChild(node);
    return node;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isElement
/*****************************************************************/
window.__pkg__bundleSrc__['58']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (dom) {
    return dom !== null && typeof dom === 'object' &&
        [1, 9, 11].indexOf(dom.nodeType) > -1
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/toNode
/*****************************************************************/
window.__pkg__bundleSrc__['59']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('58');
var isElement =__pkg__scope_args__.default;


// 变成结点
__pkg__scope_bundle__.default= function (template) {
    var frame = document.createElement("div");
    frame.innerHTML = template;
    var childNodes = frame.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        if (isElement(childNodes[i])) return childNodes[i];
    }
    return null;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isNumber
/*****************************************************************/
window.__pkg__bundleSrc__['60']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;


/**
 * 判断一个值是不是number。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是number返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    return typeof value === 'number' || (
        value !== null && typeof value === 'object' &&
        getType(value) === '[object Number]'
    );
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isBoolean
/*****************************************************************/
window.__pkg__bundleSrc__['61']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;


/**
 * 判断一个值是不是Boolean。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Boolean返回true，否则返回false
 */
__pkg__scope_bundle__.default= function (value) {
    return value === true || value === false ||
        (value !== null && typeof value === 'object' && getType(value) === '[object Boolean]');
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/debugger/toString
/*****************************************************************/
window.__pkg__bundleSrc__['62']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('63');
var isPlainObject =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (val) {
    if (Array.isArray(val)) {
        var resultData = "[";
        for (var key in val) {
            resultData += val[key] + ',';
        }
        return resultData.replace(/\,$/, ']');
    }

    if (isPlainObject(val)) {
        var resultData = "{";
        for (var key in val) {
            resultData += key + ":" + val[key] + ",";
        }
        return resultData.replace(/\,$/, '}');
    }

    return val;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isPlainObject
/*****************************************************************/
window.__pkg__bundleSrc__['63']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('4');
var getType =__pkg__scope_args__.default;


/**
 * 判断一个值是不是一个朴素的'对象'
 * 所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
 */

__pkg__scope_bundle__.default= function (value) {
    if (value === null || typeof value !== 'object' || getType(value) != '[object Object]') {
        return false;
    }

    // 如果原型为null
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/index
/*****************************************************************/
window.__pkg__bundleSrc__['64']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('65');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('66');


__pkg__scope_args__=window.__pkg__getBundle('29');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('30');
var isFunction =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('67');
var lazyWins =__pkg__scope_args__.default;


var formatTimeItem = function (val) {
    if (val < 10) return "0" + val;
    return val;
};

var wins = {}, isWinOpen = {};
__pkg__scope_bundle__.default= function (obj) {
    return {
        name:"desktop",
        render: template,
        data: {

            // 当前时间
            time: obj.ref(""),
            date: obj.ref(""),

            // 记录谁被选中
            select: obj.ref("")
        },
        methods: {

            // 打开应用
            goto: function (event, target) {
                this.select = "";
                this.$openView(target.getAttribute('tag'));
            },

            // 打开弹框
            openDialog: function (event, target) {
                if (isWinOpen.begin) this.toggleWin("begin");

                this.$openDialog(target.getAttribute('tag'));
            },

            // 修改当前选中应用
            doSelect: function (event, target) {
                this.select = target.getAttribute('tag');
            },

            // 窗口控制
            toggleWin: function (event, target) {
                var _this = this, winName = isString(event) ? event : target.getAttribute('tag');

                // 如果已经加载，切换
                if (wins[winName]) {

                    if (isWinOpen[winName]) {
                        if (!isFunction(wins[winName].instance._hidden) || !wins[winName].instance._hidden()) {
                            wins[winName].el.style.display = "none";
                        }
                    } else {
                        if (!isFunction(wins[winName].instance._show) || !wins[winName].instance._show()) {
                            wins[winName].el.style.display = "";
                        }
                    }

                    isWinOpen[winName] = !isWinOpen[winName];
                }

                // 否则打开
                else {
                    this.$openWin(lazyWins[winName]).then(function (data) {
                        wins[winName] = data;
                        isWinOpen[winName] = true;

                        if (isFunction(wins[winName].instance._show) && wins[winName].instance._show()) { }

                        // 补充方法
                        data.instance.$openView = _this.$openView;
                        data.instance.openDialog = function (event, target) {
                            _this.openDialog(event, target);
                        }

                    });
                }
            },
        },
        mounted: function () {
            var _this = this, updateTime = function () {
                var curDate = new Date();

                _this.time = formatTimeItem(curDate.getHours()) + ":" + formatTimeItem(curDate.getMinutes()) + ":" + formatTimeItem(curDate.getSeconds());
                _this.date = curDate.getFullYear() + "年" + (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日"
            };

            setInterval(updateTime, 1000);
            updateTime();

            document.getElementsByTagName("body")[0].addEventListener('click', function () {
                if (isWinOpen.begin) _this.toggleWin("begin");
            });
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['65']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,22]},{"type":"tag","name":"ul","attrs":{"class":"content","ui-right-menu:system":"","ui-on:click":"doSelect","tag":""},"childNodes":[2,4,6,8,10,12,14,16,18,20]},{"type":"tag","name":"li","attrs":{"ui-bind:select":"select=='computer'?'yes':'no'","ui-on:click.stop":"doSelect","title":"资源管理器","tag":"computer","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[3]},{"type":"text","content":"我的电脑","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='recorder-screen'?'yes':'no'","ui-on:click.stop":"doSelect","title":"一个H5版本的电脑屏幕录制软件","tag":"recorder-screen","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[5]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='code-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"支持图片、代码等查看和编辑，支持文件或目录打开、编辑、新建和保存","tag":"code-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[7]},{"type":"text","content":"代码编辑器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='geo-json'?'yes':'no'","ui-on:click.stop":"doSelect","title":"主要用于快速了解一份geoJSON地理数据的内容","tag":"geo-json","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[9]},{"type":"text","content":"geoJSON查看器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='regexper-visualization'?'yes':'no'","ui-on:click.stop":"doSelect","title":"输入一个正则表达式后可以把其变成可视化的图表来快速读懂意义","tag":"regexper-visualization","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[11]},{"type":"text","content":"正则表达式可视化","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='format-json'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以对一个JSON字符串进行格式化，支持非严格模式","tag":"format-json","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[13]},{"type":"text","content":"格式化JSON字符串","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='audio-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以对音频文件进行切割、合并等操作，支持多种格式","tag":"audio-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[15]},{"type":"text","content":"音频编辑器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='image-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以对图片进行编辑，包括合并、修改大小、美化等","tag":"image-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[17]},{"type":"text","content":"图片编辑器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='scss'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以把scss变成css，目前只支持注释和嵌套语法","tag":"scss","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[19]},{"type":"text","content":"scss转css","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='model-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以编辑3D模型，支持格式包括：stl、obj、fbx、mtl、ply、gltf、mod等","tag":"model-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[21]},{"type":"text","content":"3D模型编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"taskline","ui-right-menu:desktop-line":""},"childNodes":[23,24,25,26]},{"type":"tag","name":"span","attrs":{"class":"begin","title":"快速开始","tag":"begin","ui-on:click.stop":"toggleWin"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"what","tag":"what","ui-on:click":"openDialog"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"wins","id":"wins-line-id"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"time"},"childNodes":[27,28]},{"type":"tag","name":"div","attrs":{"ui-bind":"time"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind":"date"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['66']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"desktop\"]{\n\nuser-select: none;\n\nbackground-color: transparent;\n\nposition: static;\n\n}\n\n [page-view=\"desktop\"]>ul.content{\n\nwidth: 100vw;\n\nheight: calc(100vh - 35px);\n\noverflow: hidden;\n\ndisplay: flex;\n\nflex-direction: column;\n\nflex-wrap: wrap;\n\nalign-items: flex-start;\n\nalign-content: flex-start;\n\npadding: 20px 0;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li{\n\nwidth: 70px;\n\npadding-top: 60px;\n\nmargin: 0 5px;\n\nfont-size: 12px;\n\ncolor: white;\n\nbackground-size: 45px auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center 10px;\n\ntext-align: center;\n\nline-height: 1.6em;\n\nheight: 100px;\n\nvertical-align: top;\n\ncursor: pointer;\n\nposition: relative;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li.link::before{\n\ncontent: \" \";\n\nposition: absolute;\n\nwidth: 17px;\n\nheight: 17px;\n\nbackground-image: url(\"./rt.jpeg\");\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nleft: 12px;\n\ntop: 38px;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li[select='yes']{\n\nbackground-color: rgba(228, 228, 228, 0.294);\n\n}\n\n [page-view=\"desktop\"]>div.taskline{\n\nposition: fixed;\n\nleft: 0;\n\nbottom: 0;\n\nwidth: 100%;\n\nheight: 35px;\n\nbackground-color: rgba(3, 71, 126, 0.6);\n\nborder-top: 1px solid #313333;\n\nz-index: 10;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span{\n\nposition: absolute;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.begin{\n\ncursor: pointer;\n\nwidth: 45px;\n\nheight: 45px;\n\nleft: 5px;\n\nbottom: 5px;\n\nbackground-image: url('./windows7.png');\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nborder-radius: 50%;\n\nbox-shadow: 3px 3px 20px 0px rgba(96, 125, 139, 0.754);\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.what{\n\ncursor: pointer;\n\nwidth: 35px;\n\nheight: 35px;\n\nbackground-image: url('./what.png');\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nleft: 55px;\n\nbottom: 0;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins{\n\nleft: 90px;\n\nbottom: 0;\n\nwidth: calc(100% - 185px);\n\nheight: 35px;\n\noverflow: hidden;\n\npadding: 0 5px;\n\ndisplay: flex;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins>span{\n\nline-height: 31px;\n\nfont-size: 12px;\n\nborder: 1px solid #607d8b;\n\npadding-right: 5px;\n\nborder-radius: 3px;\n\nmargin-top: 1px;\n\ncolor: white;\n\nbackground-image: radial-gradient(rgba(255, 255, 255, 0), rgba(189, 187, 187, 0.489));\n\nflex-basis: 120px;\n\nwhite-space: nowrap;\n\ntext-overflow: ellipsis;\n\noverflow: hidden;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins>span[focus=\"yes\"]{\n\nbackground-image: radial-gradient(rgba(255, 255, 255, 0.141), rgba(189, 187, 187, 0.675));\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins>span>span{\n\ndisplay: inline-block;\n\nwidth: 30px;\n\nheight: 31px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nbackground-size: 80% auto;\n\nvertical-align: top;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.time{\n\nright: 0;\n\nwidth: 100px;\n\ntext-align: center;\n\ntop: 2px;\n\nheight: 100%;\n\ncolor: white;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.time>div:first-child{\n\nfont-size: 12px;\n\nline-height: 15px;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.time>div:last-child{\n\nfont-size: 12px;\n\nline-height: 15px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['67']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 快速开始
    begin: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle22.js','68')
    }

};

    return __pkg__scope_bundle__;
}

window.__pkg__bundleSrc__['0']();