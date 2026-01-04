
/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/tools/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['66']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('94');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('95');


__pkg__scope_args__=window.__pkg__getBundle('91');
var animation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('92');
var cardinal =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('96');
var renderCalendar =__pkg__scope_args__.default;


// 显示隐藏动画曲线
var cardinalFun = cardinal().setP([[0, 0], [0.4, 0.35], [1, 1]]);

__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "tools",
        render: template,
        data: {

        },
        methods: {
            openApp: function (event, target) {
                this.$openView(target.getAttribute('tag'));
            }
        },
        mounted: function () {
            this._el.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            // 日历
            renderCalendar(this._refs.calendar.value);
        },
        show: function () {
            var _this = this;

            this._el.style.right = "-360px";
            this._el.style.display = "";

            animation(function (deep) {
                _this._el.style.right = (360 * cardinalFun(deep) - 360) + "px";
            }, 350, function () {
                _this._el.style.right = "0px";
            });

            return true;
        },
        hidden: function () {
            var _this = this;

            animation(function (deep) {
                _this._el.style.right = (-360 * cardinalFun(deep)) + "px";
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
// Original file:./src/pages/desktop/wins/tools/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['94']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"div","attrs":{"ref":"calendar","class":"calendar"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/tools/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['95']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [win-view=\"tools\"]{\n\nright: 0;\n\nbottom: 35px;\n\nwidth: 360px;\n\nheight: calc(100vh - 35px);\n\nbackground-color: rgb(91 90 90 / 10%);\n\nz-index: 1;\n\nfont-size: 12px;\n\nbox-shadow: none;\n\n}\n\n [win-view=\"tools\"]>div{\n\nbox-shadow: 0 0 15px 3px #000000ab;\n\nborder: 1px solid #ffffff52;\n\n}\n\n [win-view=\"tools\"]>div.calendar{\n\nwidth: 326px;\n\nmargin: auto;\n\ntext-align: center;\n\ncolor: white;\n\nposition: absolute;\n\nbottom: 20px;\n\nleft: 50%;\n\ntransform: translateX(-50%);\n\nbackground-color: #382f1d;\n\nborder-radius: 10px;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.header>button{\n\nborder: none;\n\noutline: none;\n\nbackground-color: transparent;\n\nfont-size: 14px;\n\ncolor: rgb(184, 182, 182);\n\ncursor: pointer;\n\nwidth: 30px;\n\nheight: 30px;\n\nborder-radius: 5px;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.header>button:hover{\n\nbackground-color: #eff9f80f;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.header>h3{\n\ndisplay: inline-block;\n\nwidth: 200px;\n\ntext-align: left;\n\npadding-top: 20px;\n\npadding-bottom: 30px;\n\nfont-size: 18px;\n\nfont-weight: 200;\n\nfont-family: monospace;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.title{\n\nmargin-top: 10px;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.title>span{\n\nline-height: 20px;\n\nheight: 20px;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.items{\n\npadding: 20px;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.items>span{\n\nborder-radius: 50%;\n\ncursor: pointer;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.items>span.gray{\n\ncolor: #75756c;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.items>span:not(.gray):hover{\n\nbackground-color: #eff9f80f;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.items>span.today{\n\nbackground-color: #55c8fb;\n\ncolor: black;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div.items>span.today:hover{\n\nbackground-color: #60bae1;\n\n}\n\n [win-view=\"tools\"]>div.calendar>div>span{\n\ndisplay: inline-block;\n\nwidth: 40px;\n\nheight: 40px;\n\nline-height: 40px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/animation
/*****************************************************************/
window.__pkg__bundleSrc__['91']=function(){
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
window.__pkg__bundleSrc__['92']=function(){
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

__pkg__scope_args__=window.__pkg__getBundle('93');
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
window.__pkg__bundleSrc__['93']=function(){
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

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/tools/calendar/index
/*****************************************************************/
window.__pkg__bundleSrc__['96']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('97');
var calcDaysArray=__pkg__scope_args__.calcDaysArray;


__pkg__scope_bundle__.default= function (el) {
    var curDate = new Date();
    var _year = curDate.getFullYear(), _month = curDate.getMonth() + 1, _day = curDate.getDate();

    var selectDayView = function (year, month) {
        var daysArray = calcDaysArray(year, month);

        var preTemplate = "";
        for (var i = 0; i < daysArray.pre.length; i++) {
            preTemplate += "<span class='gray'>" + daysArray.pre[i] + "</span>";
        }

        var curTemplate = "";
        for (var i = 0; i < daysArray.cur.length; i++) {
            if (year == _year && month == _month && daysArray.cur[i] == _day) {
                curTemplate += "<span class='today'>" + daysArray.cur[i] + "</span>";
            } else {
                curTemplate += "<span>" + daysArray.cur[i] + "</span>";
            }
        }

        var nextTemplate = "";
        for (var i = 0; i < daysArray.next.length; i++) {
            nextTemplate += "<span class='gray'>" + daysArray.next[i] + "</span>";
        }

        el.innerHTML = "";

        var headerEl = document.createElement('div');
        el.appendChild(headerEl);

        headerEl.setAttribute('class', 'header');

        // 当前日期
        var valEl = document.createElement('h3');
        headerEl.appendChild(valEl);

        valEl.innerHTML = year + "年" + month + "月";

        // 上个月
        var leftEl = document.createElement('button');
        headerEl.appendChild(leftEl);

        leftEl.innerHTML = "▲";

        leftEl.addEventListener('click', function () {
            selectDayView(month == 1 ? year - 1 : year, month == 1 ? 12 : month - 1);
        });

        // 下个月
        var rightEl = document.createElement('button');
        headerEl.appendChild(rightEl);

        rightEl.innerHTML = "▼";

        rightEl.addEventListener('click', function () {
            selectDayView(month == 12 ? year + 1 : year, month == 12 ? 1 : month + 1);
        });

        // 标题
        var titleEl = document.createElement('div');
        el.appendChild(titleEl);
        titleEl.innerHTML = '<span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>';

        titleEl.setAttribute('class', 'title');

        // 内容
        var itemsEl = document.createElement('div');
        el.appendChild(itemsEl);
        itemsEl.innerHTML = preTemplate + curTemplate + nextTemplate;

        itemsEl.setAttribute('class', 'items');
    };

    // 启动
    selectDayView(_year, _month);
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/tools/calendar/tool
/*****************************************************************/
window.__pkg__bundleSrc__['97']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 计算某月多少天
var _calcDays = function (year, month) {

    if (month == 2) {

        if ((year % 4 != 0) || (year % 100 == 0 && year % 400 != 0)) {
            return 28;
        } else {
            return 29;
        }

    } else {
        return [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }

};

__pkg__scope_bundle__.calcDays = _calcDays;

// 计算某月日历视图的天数组
__pkg__scope_bundle__.calcDaysArray = function (year, month) {

    // 0->周日 1->周一 ... 6->周六
    var index = new Date(year + '/' + month + '/1').getDay();

    // 前置多少天
    var preNum = index - 1;
    if (preNum == -1) preNum = 6;

    // 本月多少天
    var curNum = _calcDays(year, month);

    // 后置多少天
    var nextNum = 42 - preNum - curNum;

    var daysArray = {
        pre: [],
        cur: [],
        next: []
    };

    // 前置天数组
    var preMonthDays = _calcDays(month == 1 ? year - 1 : year, month == 1 ? 12 : month - 1);
    for (var i = preNum; i > 0; i--) {
        daysArray.pre.push(preMonthDays - i + 1);
    }

    // 本月天数组
    for (var i = 1; i <= curNum; i++) {
        daysArray.cur.push(i);
    }

    // 后置天数组
    for (var i = 1; i <= nextNum; i++) {
        daysArray.next.push(i);
    }

    return daysArray;
};

    return __pkg__scope_bundle__;
}
