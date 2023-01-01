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


__pkg__scope_args__=window.__pkg__getBundle('22');
var urlFormat =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('23');
var isString =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('24');
var lazyPages =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('35');
var lazyDialogs =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('39');


// 浏览器兼容文件
__pkg__scope_args__=window.__pkg__getBundle('40');


// 调试后台
__pkg__scope_args__=window.__pkg__getBundle('41');
var runDebug =__pkg__scope_args__.default;

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

    /**
     * 调试
     */

    // 追加调试弹框
    var debuggerEl = document.createElement('div');
    document.body.insertBefore(debuggerEl, document.body.childNodes[0]);

    // 调试窗口
    debuggerEl.setAttribute('class', 'debugger');
    debuggerEl.addEventListener('click', function () {

        var debuggerCloseEl = document.getElementById('debugger-close');
        if (debuggerCloseEl) {
            debuggerCloseEl.click()
        } else {
            openDialog(lazyDialogs.debugger);
        }

    });

    /**
     * 接口文档
     */

    // 追加文档弹框
    var apiEl = document.createElement('div');
    document.body.insertBefore(apiEl, document.body.childNodes[0]);

    apiEl.innerHTML = '接<br />口<br />文<br />档';

    // 文档窗口
    apiEl.setAttribute('class', 'api');
    apiEl.addEventListener('click', function () {

        var apiCloseEl = document.getElementById('api-close');
        if (apiCloseEl) {
            apiCloseEl.click()
        } else {
            openDialog(lazyDialogs.api);
        }

    });

    /**
    * 实验仓库
    */

    var downloadEl = document.createElement('a');
    document.body.insertBefore(downloadEl, document.body.childNodes[0]);

    downloadEl.setAttribute('class', 'laboratory');
    downloadEl.setAttribute('target', '_blank');
    downloadEl.setAttribute('href', 'https://github.com/zxl20070701/laboratory');
});

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


__pkg__scope_bundle__.default= function useTemplate(el, pagefactory, props) {

    var key;

    var pageinfo = pagefactory({
        ref: ref,
        reactive: reactive
    }, props || {});

    // 创建实例
    var instance = {

        // 记录数据改变需要触发的更新
        _update: [],

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
                                                target: instance
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
                                                target: instance
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
            "once": false

        }, i;

        var callback = function (event) {

            if (modifier.stop) event.stopPropagation();
            if (modifier.prevent) event.preventDefault();

            binding.value.apply(binding.target, [event, el])

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
var xhtml =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= {

    inserted: function (el, binding) {
        binding.value = binding.value || [0, 0, 0, 0];
        el.style.cursor = 'move';

        //绑定鼠标左键按下事件
        xhtml.bind(el, 'mousedown', function mousedown(event) {

            //解决浏览器全选无法拖拽弹框
            el.setCapture && el.setCapture();

            // 寻找窗口轮廓
            var _el = el.parentNode;

            var lf = event.clientX;
            var tp = event.clientY;

            var left = xhtml.getStyle(_el, 'left').replace('px', '');
            var top = xhtml.getStyle(_el, 'top').replace('px', '');

            //绑定鼠标移动事件
            function mousemove(event) {

                var newLeft = left - - event.clientX - lf;
                var newTop = top - - event.clientY - tp;

                // 判断水平是否越界
                if (newLeft > binding.value[3] && newLeft + _el.clientWidth < window.innerWidth - binding.value[1]) {
                    _el.style.left = newLeft + 'px';
                }

                // 左越界
                else if (newLeft <= binding.value[3]) {
                    _el.style.left = binding.value[3] + 'px';
                }

                // 右越界
                else {
                    _el.style.left = (window.innerWidth - binding.value[1] - _el.clientWidth) + 'px';
                }

                // 判断垂直是否越界
                if (newTop > binding.value[0] && newTop + _el.clientHeight < window.innerHeight + binding.value[2]) {
                    _el.style.top = newTop + 'px';
                }

                // 上越界
                else if (newTop <= binding.value[0]) {
                    _el.style.top = binding.value[0] + 'px';
                }

                // 下越界
                else {
                    _el.style.top = (window.innerHeight + binding.value[2] - _el.clientHeight) + 'px';
                }

            }
            xhtml.bind(document, 'mousemove', mousemove);

            //绑定鼠标松开事件,清除鼠标移动绑定
            xhtml.bind(document, 'mouseup', function (event) {
                xhtml.unbind(document, 'mousemove', mousemove);
                _el.releaseCapture && _el.releaseCapture();
                return false;
            });
        });

    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml.js
/*****************************************************************/
window.__pkg__bundleSrc__['20']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('3');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('21');
var isElement =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= {

    // 阻止冒泡
    "stopPropagation": function (event) {
        event = event || window.event;
        if (event.stopPropagation) { //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 阻止默认事件
    "preventDefault": function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 获取样式
    "getStyle": function (dom, name) {
        // 获取结点的全部样式
        var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
            document.defaultView.getComputedStyle(dom, null) :
            dom.currentStyle;

        // 如果没有指定属性名称，返回全部样式
        return typeof name === 'string' ?
            allStyle.getPropertyValue(name) :
            allStyle;
    },

    // 绑定事件
    "bind": function (dom, eventType, callback) {

        if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
            for (var i = 0; i < dom.length; i++) {
                this.bind(dom[i], eventType, callback);
            }
            return;
        }

        if (window.attachEvent)
            dom.attachEvent("on" + eventType, callback);
        else
            dom.addEventListener(eventType, callback, false);
    },

    // 去掉绑定事件
    "unbind": function (dom, eventType, handler) {

        if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
            for (var i = 0; i < dom.length; i++) {
                this.unbind(dom[i], eventType, handler);
            }
            return;
        }

        if (window.detachEvent)
            dom.detachEvent('on' + eventType, handler);
        else
            dom.removeEventListener(eventType, handler, false);

    },

    // 触发事件
    "trigger": function (dom, eventType) {
        var event;

        //创建event的对象实例。
        if (document.createEventObject) {
            // IE浏览器支持fireEvent方法
            event = document.createEventObject();
            dom.fireEvent('on' + eventType, event);
        }

        // 其他标准浏览器使用dispatchEvent方法
        else {
            event = document.createEvent('HTMLEvents');
            // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
            event.initEvent(eventType, true, false);
            dom.dispatchEvent(event);
        }

    },

    // 变成结点
    "toNode": function (template) {
        var frame = document.createElement("div");
        frame.innerHTML = template;
        var childNodes = frame.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (isElement(childNodes[i])) return childNodes[i];
        }
        return null;
    },

    // 追加结点(内部结尾)
    "appendTo": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.appendChild(node);
        return node;
    },

    // 追加结点(内部开头)
    "prependTo": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.insertBefore(node, el.childNodes[0]);
        return node;
    },

    // 删除结点
    "remove": function (el) {
        el.parentNode.removeChild(el);
    },

    // 在被指定元素之后插入结点
    "after": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.parentNode.insertBefore(node, el.nextSibling);
        return node;
    },

    // 修改样式
    "css": function (el, styles) {
        for (var key in styles) {
            el.style[key] = styles[key];
        }
    },

    // 修改属性
    "attr": function (el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    },

    // 获取鼠标相对特定元素左上角位置
    "position": function (el, event) {

        event = event || window.event;

        // 返回元素的大小及其相对于视口的位置
        var bounding = el.getBoundingClientRect();

        if (!event || !event.clientX)
            throw new Error('Event is necessary!');
        var temp = {

            // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
            "x": event.clientX - bounding.left + el.scrollLeft,
            "y": event.clientY - bounding.top + el.scrollTop
        };

        return temp;
    },

    // 复制到剪切板
    "copy": function (text, callback, errorback) {

        var el = this.appendTo(document.body, '<textarea>' + text + '</textarea>');

        // 执行复制
        el.select();
        try {
            var result = window.document.execCommand("copy", false, null);

            if (result) {
                if (isFunction(callback)) callback();
            } else {
                if (isFunction(errorback)) errorback();
            }
        } catch (e) {
            if (isFunction(errorback)) errorback(e);
        }

        document.body.removeChild(el);

    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isElement.js
/*****************************************************************/
window.__pkg__bundleSrc__['21']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (dom) {
    return dom !== null && typeof dom === 'object' &&
        [1, 9, 11].indexOf(dom.nodeType) > -1
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/urlFormat
/*****************************************************************/
window.__pkg__bundleSrc__['22']=function(){
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
window.__pkg__bundleSrc__['23']=function(){
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
// Original file:./src/pages/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['24']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 首页
    home: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle1.js','25')
    },

    // 正则表达式可视化
    "regexper-visualization": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle2.js','26')
    },

    // 音频编辑器
    "audio-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle3.js','27')
    },

    // 格式化JSON字符串
    "format-json": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle4.js','28')
    },

    // 图片编辑器
    "image-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle5.js','29')
    },

    // 模型编辑器
    "model-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle6.js','30')
    },

    // 贪吃蛇
    "snake-eating": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle7.js','31')
    },

    // scss转css
    scss: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle8.js','32')
    },

    // 代码编辑器
    "code-editor": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle9.js','33')
    },

    // npm download
    "npm-download": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle10.js','34')
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['35']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 调试
    debugger: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle11.js','36')
    },

    // 颜色选择
    "color-picker": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle12.js','37')
    },

    // 接口文档
    api: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.0-alpha.8-bundle13.js','38')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/common.scss
/*****************************************************************/
window.__pkg__bundleSrc__['39']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n body{\n\nbackground-color: #fafafa;\n\n}\n\n body>a.laboratory{\n\nbackground-image: url('./laboratory.png');\n\nposition: fixed;\n\nright: 5px;\n\ntop: 400px;\n\nwidth: 100px;\n\nheight: 100px;\n\ncursor: pointer;\n\nz-index: 200;\n\nbackground-size: 100% auto;\n\n}\n\n body>div.debugger{\n\nbackground-image: url('./debugger.png');\n\nposition: fixed;\n\nleft: 5px;\n\nbottom: 5px;\n\nwidth: 70px;\n\nheight: 70px;\n\ncursor: pointer;\n\nz-index: 200;\n\n}\n\n body>div.api{\n\nposition: fixed;\n\nleft: 0;\n\nbottom: 200px;\n\ncursor: pointer;\n\nz-index: 200;\n\nbackground-color: #eb6736;\n\npadding: 5px 5px 5px 2px;\n\ncolor: white;\n\nborder-radius: 0 5px 5px 0;\n\nfont-size: 12px;\n\n}\n\n body>div.quick-link{\n\nposition: fixed;\n\ntop: 120px;\n\nbackground-color: white;\n\nbox-shadow: 0 0 6px 0px #d6cdcd;\n\npadding: 5px;\n\nwidth: 60px;\n\nz-index: 200;\n\n}\n\n body>div.quick-link.left{\n\nborder-radius: 0 10px 10px 0;\n\nleft: 0;\n\n}\n\n body>div.quick-link.right{\n\nborder-radius: 10px 0 0 10px;\n\nright: 0;\n\n}\n\n body>div.quick-link>a{\n\ndisplay: block;\n\nfont-size: 12px;\n\nheight: 80px;\n\nwidth: 50px;\n\nbackground-size: 100% auto;\n\nbackground-position: center top;\n\nbackground-repeat: no-repeat;\n\npadding-top: 50px;\n\nline-height: 30px;\n\ntext-align: center;\n\ncolor: black;\n\n}\n\n body>div.quick-link>a.github{\n\nbackground-image: url('./code-source.jpg');\n\n}\n\n body>div.quick-link>a.home{\n\nbackground-image: url('./logo.png');\n\n}\n\n body>div.quick-link>a.notebook{\n\nbackground-image: url('./notebook.png');\n\n}\n\n body>div#win-root{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 0;\n\nheight: 0;\n\nz-index: 5;\n\n}\n\n body>div#dialog-root{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 0;\n\nheight: 0;\n\nz-index: 10;\n\n}\n\n body>div#dialog-root>div.mask{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 100vw;\n\nheight: 100vh;\n\nbackground-color: #7b787840;\n\ndisplay: none;\n\n}\n\n body>div#dialog-root>div.mask:not(:last-child){\n\ndisplay: block;\n\n}\n\n body>div#dialog-root>div[dialog-view]{\n\nz-index: -1;\n\n}\n\n body>div#dialog-root>div[dialog-view]:last-child{\n\nz-index: 1;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/polyfill/Promise
/*****************************************************************/
window.__pkg__bundleSrc__['40']=function(){
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
window.__pkg__bundleSrc__['41']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('42');
var isObject =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('43');
var showData =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('48');
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
window.__pkg__bundleSrc__['42']=function(){
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
window.__pkg__bundleSrc__['43']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('44');
var xhtml =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('23');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('45');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('46');
var isNumber =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('47');
var isBoolean =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('48');
var toString =__pkg__scope_args__.default;


var doit = function (target, obj) {

    xhtml.bind(target.getElementsByTagName('i')[0], 'click', function () {

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
            xhtml.appendTo(target, template);

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
// Original file:./src/tool/xhtml
/*****************************************************************/
window.__pkg__bundleSrc__['44']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('3');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('21');
var isElement =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= {

    // 阻止冒泡
    "stopPropagation": function (event) {
        event = event || window.event;
        if (event.stopPropagation) { //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 阻止默认事件
    "preventDefault": function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 获取样式
    "getStyle": function (dom, name) {
        // 获取结点的全部样式
        var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
            document.defaultView.getComputedStyle(dom, null) :
            dom.currentStyle;

        // 如果没有指定属性名称，返回全部样式
        return typeof name === 'string' ?
            allStyle.getPropertyValue(name) :
            allStyle;
    },

    // 绑定事件
    "bind": function (dom, eventType, callback) {

        if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
            for (var i = 0; i < dom.length; i++) {
                this.bind(dom[i], eventType, callback);
            }
            return;
        }

        if (window.attachEvent)
            dom.attachEvent("on" + eventType, callback);
        else
            dom.addEventListener(eventType, callback, false);
    },

    // 去掉绑定事件
    "unbind": function (dom, eventType, handler) {

        if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
            for (var i = 0; i < dom.length; i++) {
                this.unbind(dom[i], eventType, handler);
            }
            return;
        }

        if (window.detachEvent)
            dom.detachEvent('on' + eventType, handler);
        else
            dom.removeEventListener(eventType, handler, false);

    },

    // 触发事件
    "trigger": function (dom, eventType) {
        var event;

        //创建event的对象实例。
        if (document.createEventObject) {
            // IE浏览器支持fireEvent方法
            event = document.createEventObject();
            dom.fireEvent('on' + eventType, event);
        }

        // 其他标准浏览器使用dispatchEvent方法
        else {
            event = document.createEvent('HTMLEvents');
            // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
            event.initEvent(eventType, true, false);
            dom.dispatchEvent(event);
        }

    },

    // 变成结点
    "toNode": function (template) {
        var frame = document.createElement("div");
        frame.innerHTML = template;
        var childNodes = frame.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (isElement(childNodes[i])) return childNodes[i];
        }
        return null;
    },

    // 追加结点(内部结尾)
    "appendTo": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.appendChild(node);
        return node;
    },

    // 追加结点(内部开头)
    "prependTo": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.insertBefore(node, el.childNodes[0]);
        return node;
    },

    // 删除结点
    "remove": function (el) {
        el.parentNode.removeChild(el);
    },

    // 在被指定元素之后插入结点
    "after": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.parentNode.insertBefore(node, el.nextSibling);
        return node;
    },

    // 修改样式
    "css": function (el, styles) {
        for (var key in styles) {
            el.style[key] = styles[key];
        }
    },

    // 修改属性
    "attr": function (el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    },

    // 获取鼠标相对特定元素左上角位置
    "position": function (el, event) {

        event = event || window.event;

        // 返回元素的大小及其相对于视口的位置
        var bounding = el.getBoundingClientRect();

        if (!event || !event.clientX)
            throw new Error('Event is necessary!');
        var temp = {

            // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
            "x": event.clientX - bounding.left + el.scrollLeft,
            "y": event.clientY - bounding.top + el.scrollTop
        };

        return temp;
    },

    // 复制到剪切板
    "copy": function (text, callback, errorback) {

        var el = this.appendTo(document.body, '<textarea>' + text + '</textarea>');

        // 执行复制
        el.select();
        try {
            var result = window.document.execCommand("copy", false, null);

            if (result) {
                if (isFunction(callback)) callback();
            } else {
                if (isFunction(errorback)) errorback();
            }
        } catch (e) {
            if (isFunction(errorback)) errorback(e);
        }

        document.body.removeChild(el);

    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isFunction
/*****************************************************************/
window.__pkg__bundleSrc__['45']=function(){
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
// Original file:./src/tool/type/isNumber
/*****************************************************************/
window.__pkg__bundleSrc__['46']=function(){
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
window.__pkg__bundleSrc__['47']=function(){
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
window.__pkg__bundleSrc__['48']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('49');
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
window.__pkg__bundleSrc__['49']=function(){
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

window.__pkg__bundleSrc__['0']();