var _toString = Object.prototype.toString;
var getType = function (value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return _toString.call(value);
};

var isPlainObject = function (value) {
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

var isString = function (value) {
    var type = typeof value;
    return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
};

var isObject = function (value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};

var isFunction = function (value) {
    if (!isObject(value)) {
        return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' ||
        type === '[object GeneratorFunction]' || type === '[object Proxy]';
};

var isNumber = function (value) {
    return typeof value === 'number' || (
        value !== null && typeof value === 'object' &&
        getType(value) === '[object Number]'
    );
};

var isBoolean = function (value) {
    return value === true || value === false ||
        (value !== null && typeof value === 'object' && getType(value) === '[object Boolean]');
};

var toString = function (val) {
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

window.rebotF12 = function (obj) {
    var consoleEl = document.getElementById("f12-console");

    consoleEl.innerHTML = "";
    var iframeConsole = obj.window.console;

    var colors = {
        log: "black",
        info: 'green',
        debug: 'blue',
        warn: '#FF9800',
        error: 'red',
        trace: 'pink'
    };

    var showData = function (target, msg) {

        var doitShowData = function (target, obj) {
            if (target.getElementsByTagName('i')[0]) {
                target.getElementsByTagName('i')[0].addEventListener("click", function () {

                    // 如果是字符串，就不需要展开了
                    if (isString(obj)) return;

                    // 如果没有加载过
                    if (target.getAttribute('hadload') != 'yes') {

                        target.setAttribute('hadload', 'yes');
                        target.setAttribute('isopen', 'yes');

                        var templateEl = document.createElement("div");
                        for (var key in obj) {
                            try {

                                var spanEl = document.createElement("span");
                                spanEl.setAttribute("isopen", "no");
                                templateEl.appendChild(spanEl);

                                var iEl = document.createElement("i");
                                iEl.innerText = ":" + toString(obj[key]);
                                spanEl.appendChild(iEl);

                                var emEl = document.createElement("em");
                                emEl.innerText = key;
                                emEl.setAttribute("style", 'font-style:normal;color:#905');
                                iEl.insertBefore(emEl, iEl.childNodes[0]);

                            } catch (e) {
                                // todo
                            }
                        }
                        templateEl.setAttribute("class", "item");
                        target.appendChild(templateEl);

                        // 添加交互
                        var index = 0, lis = target.getElementsByTagName('span');
                        for (var key in obj) {
                            doitShowData(lis[index++], obj[key]);
                        }
                    }

                    // 如果加载过了，直接控制打开或者关闭即可
                    else {
                        if (target.getAttribute('isopen') == 'no') target.setAttribute('isopen', 'yes');
                        else target.setAttribute('isopen', 'no');
                    }

                });
            }
        };

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
            doitShowData(target, msg);
        }

    };

    var appendConsole = function (item) {

        var liEl = document.createElement('li');
        consoleEl.appendChild(liEl);

        liEl.style.color = colors[item.type];

        var i, itemEl;
        for (i = 0; i < item.content.length; i++) {

            itemEl = document.createElement('div');
            liEl.appendChild(itemEl);

            showData(itemEl, item.content[i]);
        }
    };

    iframeConsole.log = function () {
        appendConsole({
            type: "log",
            content: arguments
        });
    };

    iframeConsole.info = function () {
        appendConsole({
            type: "info",
            content: arguments
        });
    };

    iframeConsole.debug = function () {
        appendConsole({
            type: "debug",
            content: arguments
        });
    };

    iframeConsole.warn = function () {
        appendConsole({
            type: "warn",
            content: arguments
        });
    };

    iframeConsole.error = function () {
        appendConsole({
            type: "error",
            content: arguments
        });
    };

    iframeConsole.trace = function () {
        appendConsole({
            type: "trace",
            content: arguments
        });
    };

    if ('addEventListener' in window) {

        // 监听Promise相关错误
        obj.window.addEventListener('unhandledrejection', function (event) {
            var content = event.reason.stack;
            appendConsole({
                type: "error",
                content: [content]
            });
        });

        // throw new error的捕获
        obj.window.addEventListener('error', function (event) {
            var content = event.message + " " + event.filename + " " + event.lineno + " \nstack :\n" + (event.error ? event.error.stack : "");
            appendConsole({
                type: "error",
                content: [content]
            });
        });
    }
};