
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['49']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('186');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('187');


__pkg__scope_args__=window.__pkg__getBundle('188');
var lazyApiPages =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('1');
var useTemplate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('195');
var animation =__pkg__scope_args__.default;


var preNavEl = null;
__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "api",
        render: template,
        mounted: function () {
            document.getElementById('init-api-el').click();
        },
        methods: {

            // 加载文档页面
            loadApiPage: function (event) {

                var navEl = event.target.nextElementSibling;
                var apiContentEl = document.getElementById('api-content');

                lazyApiPages[event.target.getAttribute('tag')]().then(function (data) {

                    // 初始化环境

                    if (preNavEl) preNavEl.innerHTML = "";
                    navEl.innerHTML = "";
                    apiContentEl.innerHTML = "";

                    preNavEl = navEl;

                    apiContentEl.scrollTop = 0;

                    // 挂载页面
                    useTemplate(apiContentEl, data.default);

                    // 生成导航菜单
                    // 动态生成左侧菜单
                    var els = apiContentEl.children;
                    for (var index = 0; index < els.length; index++) {
                        (function (index) {
                            if (["H2", "H3", "H4"].indexOf(els[index].nodeName) > -1) {
                                var itemEl = document.createElement(els[index].nodeName);
                                navEl.appendChild(itemEl);

                                itemEl.innerHTML = els[index].innerHTML;

                                itemEl.addEventListener('click', function () {

                                    var offsetTop = els[index].offsetTop - 50;
                                    var currentScrollTop = apiContentEl.scrollTop || 0;

                                    animation(
                                        function (deep) {
                                            apiContentEl.scrollTop =
                                                (offsetTop - currentScrollTop) * deep + currentScrollTop;
                                        },
                                        500,
                                        function () {
                                            apiContentEl.scrollTop = offsetTop;
                                        }
                                    );

                                });

                            }
                        })(index);
                    }

                });

            }
        }
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['186']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,6,8]},{"type":"tag","name":"header","attrs":{"ui-dragdrop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"开发文档","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-on:click":"$closeDialog","id":"api-close"},"childNodes":[5]},{"type":"text","content":"×","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tips"},"childNodes":[7]},{"type":"text","content":"温馨提示：此文档提供的所有功能都是内置的，只能在本项目中使用。","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[9,34]},{"type":"tag","name":"div","attrs":{"class":"menu"},"childNodes":[10,14,18,22,26,30]},{"type":"tag","name":"div","attrs":{},"childNodes":[11,13]},{"type":"tag","name":"h1","attrs":{"tag":"framework","ui-on:click":"loadApiPage","id":"init-api-el"},"childNodes":[12]},{"type":"text","content":"内置框架","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[15,17]},{"type":"tag","name":"h1","attrs":{"tag":"editor","ui-on:click":"loadApiPage"},"childNodes":[16]},{"type":"text","content":"代码编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[19,21]},{"type":"tag","name":"h1","attrs":{"tag":"webgl","ui-on:click":"loadApiPage"},"childNodes":[20]},{"type":"text","content":"3D绘图 WebGL","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[23,25]},{"type":"tag","name":"h1","attrs":{"tag":"canvas","ui-on:click":"loadApiPage"},"childNodes":[24]},{"type":"text","content":"位图画笔 Canvas","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[27,29]},{"type":"tag","name":"h1","attrs":{"tag":"color-picker","ui-on:click":"loadApiPage"},"childNodes":[28]},{"type":"text","content":"颜色选择器","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[31,33]},{"type":"tag","name":"h1","attrs":{"tag":"svg","ui-on:click":"loadApiPage"},"childNodes":[32]},{"type":"text","content":"矢图画笔 SVG","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","id":"api-content"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['187']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='api']{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 40px);\n\nleft: 80px;\n\ntop: 20px;\n\nborder-radius: 5px;\n\n}\n\n [dialog-view='api']>header{\n\nline-height: 50px;\n\nheight: 50px;\n\nbox-shadow: rgb(213 221 225) 0px 4px 6px;\n\nposition: relative;\n\nuser-select: none;\n\n}\n\n [dialog-view='api']>header>h2{\n\nbackground-image: url(\"./api.png\");\n\npadding-left: 50px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 10px center;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ncolor: #4f94b5;\n\nfont-size: 20px;\n\n}\n\n [dialog-view='api']>header>i{\n\nposition: absolute;\n\ntop: 0;\n\nright: 0;\n\nfont-style: normal;\n\nfont-family: sans-serif;\n\nwidth: 50px;\n\nline-height: 50px;\n\ntext-align: center;\n\ncursor: pointer;\n\nfont-size: 30px;\n\n}\n\n [dialog-view='api']>div.tips{\n\nfont-size: 12px;\n\ncolor: #ffffff;\n\nbackground-color: #e91e63;\n\nwidth: 500px;\n\nline-height: 30px;\n\nheight: 30px;\n\ntext-align: center;\n\nleft: calc(50% - 250px);\n\ntop: 10px;\n\nposition: absolute;\n\nuser-select: none;\n\nz-index: 1;\n\npointer-events: none;\n\n}\n\n [dialog-view='api']>div.content{\n\nfont-size: 0;\n\nwhite-space: nowrap;\n\n}\n\n [dialog-view='api']>div.content>div{\n\nfont-size: 12px;\n\nheight: calc(100vh - 90px);\n\nvertical-align: top;\n\nwhite-space: normal;\n\ndisplay: inline-block;\n\nline-height: 1.6em;\n\noverflow: auto;\n\npadding: 10px 0;\n\n}\n\n [dialog-view='api']>div.content>div.menu{\n\nwidth: 240px;\n\nbackground-color: rgb(240, 240, 240);\n\npadding: 20px 10px;\n\n}\n\n [dialog-view='api']>div.content>div.menu h1, [dialog-view='api']>div.content>div.menu h2, [dialog-view='api']>div.content>div.menu h3, [dialog-view='api']>div.content>div.menu h4{\n\ncursor: pointer;\n\nfont-size: 12px;\n\ndisplay: block;\n\nline-height: 2em;\n\n}\n\n [dialog-view='api']>div.content>div.menu h1:hover, [dialog-view='api']>div.content>div.menu h2:hover, [dialog-view='api']>div.content>div.menu h3:hover, [dialog-view='api']>div.content>div.menu h4:hover{\n\ntext-decoration: underline;\n\n}\n\n [dialog-view='api']>div.content>div.menu h2{\n\nmargin-left: 20px;\n\n}\n\n [dialog-view='api']>div.content>div.menu h3{\n\nmargin-left: 40px;\n\n}\n\n [dialog-view='api']>div.content>div.menu h4{\n\nmargin-left: 60px;\n\n}\n\n [dialog-view='api']>div.content>div.content{\n\nwidth: calc(100vw - 400px);\n\npadding: 20px 30px;\n\n}\n\n [dialog-view='api']>div.content>div.content>pre{\n\nbackground: #e8e8e8;\n\npadding: 10px;\n\n}\n\n [dialog-view='api']>div.content>div.content>header{\n\nfont-size: 28px;\n\npadding: 20px 0;\n\nfont-weight: 800;\n\n}\n\n [dialog-view='api']>div.content>div.content>h2{\n\nfont-size: 20px;\n\nline-height: 2em;\n\npadding: 20px 0;\n\n}\n\n [dialog-view='api']>div.content>div.content>h3{\n\nfont-size: 16px;\n\nline-height: 2em;\n\npadding: 15px 0;\n\n}\n\n [dialog-view='api']>div.content>div.content>h4{\n\nfont-size: 12px;\n\npadding: 15px 0 5px 0;\n\ntext-decoration: overline;\n\n}\n\n [dialog-view='api']>div.content>div.content>p{\n\nline-height: 1.6em;\n\ntext-indent: 2em;\n\ncolor: #3c3939;\n\nfont-weight: 400;\n\nfont-size: 14px;\n\nmargin: 10px 0;\n\n}\n\n [dialog-view='api']>div.content>div.content>ul, [dialog-view='api']>div.content>div.content>ol{\n\nfont-size: 13px;\n\nline-height: 2.4em;\n\nmargin-left: 2.5em;\n\n}\n\n [dialog-view='api']>div.content>div.content>ol>li{\n\nlist-style-type: decimal;\n\n}\n\n [dialog-view='api']>div.content>div.content>ul>li{\n\nlist-style-type: disc;\n\n}\n\n [dialog-view='api']>div.content>div.content .warn{\n\nfont-size: 12px;\n\ncolor: #dac305;\n\nfont-weight: 400;\n\npadding: 0 3px;\n\n}\n\n [dialog-view='api']>div.content>div.content .important{\n\ncolor: rgb(255, 0, 0);\n\nfont-weight: 800;\n\npadding: 0 3px;\n\n}\n\n [dialog-view='api']>div.content>div.content>table{\n\nwidth: 100%;\n\nline-height: 20px;\n\nfont-size: 14px;\n\n}\n\n [dialog-view='api']>div.content>div.content>table>thead>tr{\n\nbackground-color: #c1bcbc;\n\nborder: 1px solid #c1bcbc;\n\ncolor: #fff;\n\n}\n\n [dialog-view='api']>div.content>div.content>table>tbody>tr>*{\n\nborder-width: 0 1px 1px 0;\n\nborder-style: solid;\n\nborder-color: #c1bcbc;\n\n}\n\n [dialog-view='api']>div.content>div.content>table>tbody>tr>*:first-child{\n\nborder-width: 0 1px 1px 1px;\n\n}\n\n [dialog-view='api']>div.content>div.content>table>tbody>tr:nth-child(2n){\n\nbackground-color: #F5F5F5;\n\n}\n\n [dialog-view='api']>div.content>div.content>table>tbody>tr:nth-child(2n+1){\n\nbackground-color: #fff;\n\n}\n\n [dialog-view='api']>div.content>div.content>table>*>tr>td{\n\npadding-left: 1em;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/pages/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['188']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 内置框架
    framework: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle28.js','189')
    },

    // 代码编辑器
    editor: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle29.js','190')
    },

    // WebGL
    webgl: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle30.js','191')
    },

    // canvas
    canvas: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle31.js','192')
    },

    // 颜色选择器
    "color-picker": function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle32.js','193')
    },

    // svg
    svg: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.2.0-bundle33.js','194')
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/animation
/*****************************************************************/
window.__pkg__bundleSrc__['195']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    //当前正在运动的动画的tick函数堆栈
var $timers = [];
//唯一定时器的定时间隔
var $interval = 13;
//指定了动画时长duration默认值
var $speeds = 400;
//定时器ID
var $timerId = null;

/**
 * 动画轮播
 * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
 * @param {number} duration 动画时长，可选
 * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
 *
 * @returns {function} 返回一个函数，调用该函数，可以提前结束动画
 */
__pkg__scope_bundle__.default= function (doback, duration, callback) {

    // 如果没有传递时间，使用内置默认值
    if (arguments.length < 2) duration = $speeds;

    var clock = {
        //把tick函数推入堆栈
        "timer": function (tick, duration, callback) {
            if (!tick) {
                throw new Error('Tick is required!');
            }
            var id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0);
            $timers.push({
                "id": id,
                "createTime": new Date(),
                "tick": tick,
                "duration": duration,
                "callback": callback
            });
            clock.start();
            return id;
        },

        //开启唯一的定时器timerId
        "start": function () {
            if (!$timerId) {
                $timerId = setInterval(clock.tick, $interval);
            }
        },

        //被定时器调用，遍历timers堆栈
        "tick": function () {
            var createTime, flag, tick, callback, timer, duration, passTime,
                timers = $timers;
            $timers = [];
            $timers.length = 0;
            for (flag = 0; flag < timers.length; flag++) {
                //初始化数据
                timer = timers[flag];
                createTime = timer.createTime;
                tick = timer.tick;
                duration = timer.duration;
                callback = timer.callback;

                //执行
                passTime = (+new Date() - createTime) / duration;
                passTime = passTime > 1 ? 1 : passTime;
                tick(passTime);
                if (passTime < 1 && timer.id) {
                    //动画没有结束再添加
                    $timers.push(timer);
                } else if (callback) {
                    callback(passTime);
                }
            }
            if ($timers.length <= 0) {
                clock.stop();
            }
        },

        //停止定时器，重置timerId=null
        "stop": function () {
            if ($timerId) {
                clearInterval($timerId);
                $timerId = null;
            }
        }
    };

    var id = clock.timer(function (deep) {
        //其中deep为0-1，表示改变的程度
        doback(deep);
    }, duration, callback);

    // 返回一个函数
    // 用于在动画结束前结束动画
    return function () {
        var i;
        for (i in $timers) {
            if ($timers[i].id == id) {
                $timers[i].id = undefined;
                return;
            }
        }
    };

};


    return __pkg__scope_bundle__;
}
