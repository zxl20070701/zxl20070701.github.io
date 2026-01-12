
/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/begin/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['65']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('108');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('109');


__pkg__scope_args__=window.__pkg__getBundle('110');
var animation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('111');
var cardinal =__pkg__scope_args__.default;


// 显示隐藏动画曲线
var cardinalFun = cardinal().setP([[0, 0], [0.4, 0.35], [1, 1]]);

__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "begin",
        render: template,
        data: {
            project: window._project_
        },
        methods: {
            showApp: function () {
                this.$openView("computer", {
                    init: "application"
                });
            },
            openApp: function (event, target) {
                this.$openView(target.getAttribute('tag'));
            }
        },
        mounted: function () {
            this._el.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        },
        show: function () {
            var _this = this;

            this._el.style.bottom = "-505px";
            this._el.style.display = "";

            animation(function (deep) {
                _this._el.style.bottom = (545 * cardinalFun(deep) - 505) + "px";
            }, 350, function () {
                _this._el.style.bottom = "40px";
            });

            return true;
        },
        hidden: function () {
            var _this = this;

            // 恢复滚动位置
            this._refs.application.value.scrollTop = 0;

            animation(function (deep) {
                _this._el.style.bottom = (40 - 545 * cardinalFun(deep)) + "px";
            }, 350, function () {
                _this._el.style.display = "none";
            });

            return true;
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/begin/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['108']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,2,4,6]},{"type":"tag","name":"div","attrs":{"class":"application","ref":"application"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"search"},"childNodes":[3]},{"type":"tag","name":"input","attrs":{"type":"text","placeholder":"搜索功能维护中..."},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"user"},"childNodes":[5]},{"type":"tag","name":"div","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"quick"},"childNodes":[7,9,10,12,14,15]},{"type":"tag","name":"a","attrs":{"target":"_blank","ui-bind:href":"project.author.url"},"childNodes":[8]},{"type":"tag","name":"span","attrs":{"ui-bind":"project.author.name"},"childNodes":[]},{"type":"tag","name":"hr","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-on:click":"openDialog","tag":"debugger"},"childNodes":[11]},{"type":"text","content":"调试工具","childNodes":[]},{"type":"tag","name":"a","attrs":{"target":"_blank","ui-bind:href":"project.bugs"},"childNodes":[13]},{"type":"text","content":"提建议","childNodes":[]},{"type":"tag","name":"hr","attrs":{},"childNodes":[]},{"type":"tag","name":"a","attrs":{"target":"_blank","href":"../notebook/index.html"},"childNodes":[16]},{"type":"text","content":"文档笔记","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/begin/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['109']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [win-view=\"begin\"]{\n\nleft: 5px;\n\nbottom: 40px;\n\nwidth: 400px;\n\nheight: 505px;\n\nbackground-color: rgba(0, 0, 0, 0.6);\n\nz-index: 1;\n\nborder-radius: 5px;\n\nfont-size: 12px;\n\nborder: 1px solid #4c4c4c;\n\nbox-shadow: none;\n\n}\n\n [win-view=\"begin\"]>div{\n\nposition: absolute;\n\n}\n\n [win-view=\"begin\"]>div.application{\n\nbackground-color: white;\n\nwidth: 255px;\n\nheight: 455px;\n\nleft: 10px;\n\ntop: 10px;\n\nborder-radius: 5px;\n\nbox-shadow: inset 0 0 1px 2px grey;\n\npadding: 10px 5px;\n\noverflow: auto;\n\n}\n\n [win-view=\"begin\"]>div.application::-webkit-scrollbar{\n\nwidth: 0;\n\nheight: 0;\n\n}\n\n [win-view=\"begin\"]>div.application>h1{\n\npadding: 0 10px;\n\nline-height: 34px;\n\nfont-size: 14px;\n\n}\n\n [win-view=\"begin\"]>div.application>h1>button{\n\nfloat: right;\n\nheight: 22px;\n\nmargin-top: 6px;\n\nfont-size: 12px;\n\nbackground-color: #dcdede;\n\noutline: none;\n\nborder: none;\n\ncolor: #696565;\n\nborder-radius: 3px;\n\ncursor: pointer;\n\nbackground-image: none;\n\n}\n\n [win-view=\"begin\"]>div.application>h2{\n\nfont-size: 12px;\n\nline-height: 25px;\n\npadding-left: 10px;\n\nfont-weight: 200;\n\ncolor: #4d4d4d;\n\n}\n\n [win-view=\"begin\"]>div.application>div[tag]{\n\nbackground-repeat: no-repeat;\n\nbackground-position: 5px center;\n\nbackground-size: auto 80%;\n\nline-height: 40px;\n\npadding-left: 45px;\n\ncursor: pointer;\n\ncolor: #4b4a4a;\n\nfont-weight: 800;\n\n}\n\n [win-view=\"begin\"]>div.application>div[tag]:hover{\n\ntext-decoration: underline;\n\n}\n\n [win-view=\"begin\"]>div.search{\n\nwidth: 255px;\n\nheight: 25px;\n\nleft: 10px;\n\ntop: 470px;\n\n}\n\n [win-view=\"begin\"]>div.search>input{\n\nwidth: 100%;\n\nheight: 100%;\n\nborder-radius: 5px;\n\nbox-shadow: inset 0 0 1px 2px grey;\n\noutline: none;\n\nborder: none;\n\npadding: 0 5px;\n\n}\n\n [win-view=\"begin\"]>div.user{\n\nborder-radius: 5px;\n\nbox-shadow: inset 0 0 1px 2px grey;\n\npadding: 5px;\n\nleft: 300px;\n\ntop: -30px;\n\nbackground-color: #0e7784;\n\n}\n\n [win-view=\"begin\"]>div.user>div{\n\nwidth: 50px;\n\nheight: 50px;\n\nborder-radius: 2px;\n\nbackground-image: url(\"../images/zxl20070701.jpg\");\n\nbackground-position: center center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: 100% auto;\n\nborder: 1px solid black;\n\n}\n\n [win-view=\"begin\"]>div.quick{\n\nleft: 265px;\n\ntop: 50px;\n\nwidth: 135px;\n\npadding: 15px;\n\nline-height: 2.4em;\n\n}\n\n [win-view=\"begin\"]>div.quick>hr{\n\nborder-color: #b8b8b8;\n\n}\n\n [win-view=\"begin\"]>div.quick>div, [win-view=\"begin\"]>div.quick>a{\n\ncursor: pointer;\n\ndisplay: block;\n\ncolor: #d1caca;\n\npadding: 0 5px;\n\nbackground-image: none;\n\n}\n\n [win-view=\"begin\"]>div.quick>div:hover, [win-view=\"begin\"]>div.quick>a:hover{\n\ntext-decoration: underline;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/animation
/*****************************************************************/
window.__pkg__bundleSrc__['110']=function(){
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

/*************************** [bundle] ****************************/
// Original file:./src/tool/interpolation/cardinal
/*****************************************************************/
window.__pkg__bundleSrc__['111']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * Cardinal三次插值
 * ----------------------------
 * Hermite拟合的计算是，确定两个点和两个点的斜率
 * 用一个y=ax(3)+bx(2)+cx+d的三次多项式来求解
 * 而Cardinal是建立在此基础上
 * 给定需要拟合的两个点和第一个点的前一个点+最后一个点的后一个点
 * 第一个点的斜率由第一个点的前一个点和第二个点的斜率确定
 * 第二个点的斜率由第一个点和第二个点的后一个点的斜率确定
 */

__pkg__scope_args__=window.__pkg__getBundle('112');
var hermite =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (t) {

    // 该参数用于调整曲线走势，默认数值t=0，分水岭t=-1，|t-(-1)|的值越大，曲线走势调整的越严重
    if (arguments.length < 1) t = 0;

    var HS, i;

    // 根据x值返回y值
    var cardinal = function (x) {

        if (HS) {
            i = -1;
            // 寻找记录x所在位置的区间
            // 这里就是寻找对应的拟合函数
            while (i + 1 < HS.x.length && (x > HS.x[i + 1] || (i == -1 && x >= HS.x[i + 1]))) {
                i += 1;
            }

            // 由于js浮点运算不准确，我们对于越界的情况进行边界值返回

            if (i < 0) {
                return HS.h[0](HS.x[0]);
            }

            if (i >= HS.h.length) {
                return HS.h[HS.h.length - 1](HS.x[HS.x.length - 1]);
            }

            return HS.h[i](x);
        } else {
            throw new Error('You shoud first set the position!');
        }

    };

    // 设置张弛系数【应该在点的位置设置前设置】
    cardinal.setT = function (_t) {

        if (typeof _t === 'number') {
            t = _t;
        } else {
            throw new Error('Expecting a figure!');
        }
        return cardinal;

    };

    // 设置点的位置
    // 参数格式：[[x,y],[x,y],...]
    // 至少两个点
    cardinal.setP = function (points) {

        HS = {
            "x": [],
            "h": []
        };
        var flag,
            slope = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]),
            temp;
        HS.x[0] = points[0][0];
        for (flag = 1; flag < points.length; flag++) {
            if (points[flag][0] <= points[flag - 1][0]) throw new Error('The point position should be increamented!');
            HS.x[flag] = points[flag][0];
            // 求点斜率
            temp = flag < points.length - 1 ?
                (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) :
                (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0]);
            // 求解两个点直接的拟合方程
            // 第一个点的前一个点直接取第一个点
            // 最后一个点的后一个点直接取最后一个点
            HS.h[flag - 1] = hermite((1 - t) * 0.5).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp);
            slope = temp;
        }
        return cardinal;

    };

    return cardinal;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/interpolation/hermite
/*****************************************************************/
window.__pkg__bundleSrc__['112']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (u) {

    // 张弛系数
    if (arguments.length < 1) u = 0.5;

    var MR, a, b;

    /**
     * 根据x值返回y值
     * @param {Number} x
     */
    var hermite = function (x) {
        if (MR) {
            var sx = (x - a) / (b - a),
                sx2 = sx * sx,
                sx3 = sx * sx2;
            var sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
            return sResult * (b - a);
        } else throw new Error('You shoud first set the position!');
    };

    /**
     * 设置点的位置
     * @param {Number} x1 左边点的位置
     * @param {Number} y1
     * @param {Number} x2 右边点的位置
     * @param {Number} y2
     * @param {Number} s1 两个点的斜率
     * @param {Number} s2
     */
    hermite.setP = function (x1, y1, x2, y2, s1, s2) {
        if (x1 < x2) {
            // 记录原始尺寸
            a = x1; b = x2;
            var p3 = u * s1,
                p4 = u * s2;
            // 缩放到[0,1]定义域
            y1 /= (x2 - x1);
            y2 /= (x2 - x1);
            // MR是提前计算好的多项式通解矩阵
            // 为了加速计算
            // 如上面说的
            // 统一在[0,1]上计算后再通过缩放和移动恢复
            // 避免了动态求解矩阵的麻烦
            MR = [
                2 * y1 - 2 * y2 + p3 + p4,
                3 * y2 - 3 * y1 - 2 * p3 - p4,
                p3,
                y1
            ];
        } else throw new Error('The point x-position should be increamented!');
        return hermite;
    };

    return hermite;
};


    return __pkg__scope_bundle__;
}
