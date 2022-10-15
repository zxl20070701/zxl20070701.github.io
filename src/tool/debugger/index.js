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

    var itemEl = document.createElement('li');
    rootEl.appendChild(itemEl);

    var content = "", i;
    for (i = 0; i < item.content.length; i++) {
        content += item.content[i] + "<br />"
    }
    itemEl.innerHTML = content;
    itemEl.style.color = colors[item.type];
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

export default function () {

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
        window.addEventListener('unhandledrejection', event => {
            let content = event.reason.stack;
            trigger('console', {
                type: "error",
                content: [content]
            });
        });

        // throw new error的捕获
        window.addEventListener('error', event => {
            var content = event.message + " " + event.filename + " " + event.lineno + " \nstack :\n" + (event.error ? event.error.stack : "");
            trigger('console', {
                type: "error",
                content: [content]
            });
        });
    }

};