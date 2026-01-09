
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/gauge-barometer/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['200']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('281');
var template =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('274');
var ResizeObserver =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('102');
var animation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('121');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('282');
var drawPolarRuler =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('147');
var rotate =__pkg__scope_args__.default;


var interval, stop = function () { };
__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var p0, p1, p2, p3, p4, pDeg;

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var painter, cx, cy, radius, updateView;

            var beginDeg = Math.PI * 3 / 4, deg = Math.PI * 1.5;

            // 监听画布大小改变
            var currentValue = 58.06, value;
            ResizeObserver(mycontent, function () {
                painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight, {}, true);

                // 圆心和半径
                cx = mycontent.clientWidth * 0.5;
                cy = mycontent.clientHeight * 0.5;
                radius = Math.max(Math.min(cx, cy) - 100, 0);

                if (radius <= 0) return;

                updateView = function (value) {
                    painter.clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight);

                    pDeg = beginDeg + Math.PI * 1.5 * value * 0.01;

                    // 外刻度尺
                    drawPolarRuler(painter, {
                        cx: cx,
                        cy: cy,
                        radius: radius + 10,
                        value: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        begin: beginDeg,
                        deg: deg,
                        "font-size": 20,
                        color: "#e93f33",
                        "font-rotate": false,
                        "font-weight": 800,
                        "small-mark": true
                    });

                    // 内刻度尺
                    drawPolarRuler(painter, {
                        cx: cx,
                        cy: cy,
                        radius: radius - 10,
                        value: [0, 10, 20, 30, 40, 50, 60],
                        begin: beginDeg,
                        deg: deg,
                        color: "#000000",
                        "font-size": 20,
                        "mark-direction": "inner",
                        "font-rotate": false,
                        "font-weight": 800,
                        "small-mark": true
                    });

                    p0 = rotate(cx, cy, pDeg, cx + radius + 20, cy - 1);
                    p1 = rotate(cx, cy, pDeg, cx + radius + 20, cy + 1);
                    p2 = rotate(cx, cy, pDeg, cx - 20, cy + 4);
                    p3 = rotate(cx, cy, pDeg, cx - 30, cy);
                    p4 = rotate(cx, cy, pDeg, cx - 20, cy - 4);

                    // 表盘文字
                    painter.config({
                        "fontSize": 14,
                        "fontWeight": 200,
                        "fillStyle": "black",
                        "textAlign": "center",
                        "textBaseline": "middle"
                    }).fillText("PLP", cx, cy - radius * 0.6)

                        // 指针
                        .fillCircle(cx, cy, 7).config({
                            "lineWidth": 2
                        }).strokeCircle(cx, cy, 11)
                        .beginPath()
                        .moveTo(p0[0], p0[1])
                        .lineTo(p1[0], p1[1])
                        .lineTo(p2[0], p2[1])
                        .lineTo(p3[0], p3[1])
                        .lineTo(p4[0], p4[1])
                        .fill()

                        // 值文字
                        .config({
                            "fontSize": 34,
                            "fontWeight": 800,
                            "fillStyle": "#555555"
                        })
                        .fillText(value, cx, cy + radius * 0.4);

                };

                updateView(currentValue.toFixed(2));
            });

            // 定时模拟修改
            interval = setInterval(function () {

                value = Math.random() * 100;
                stop = animation(function (deep) {

                    if (updateView)
                        updateView(+((currentValue + (value - currentValue) * deep).toFixed(2)));

                }, 300, function () {
                    currentValue = value;
                });

            }, 1000);


        },

        beforeDestory: function () {
            if (interval) {

                // 关闭页面的时候需要关闭定时任务
                clearInterval(interval);
                stop();
            }
        }

    };

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/gauge-barometer/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['281']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"气压表","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"mycontent"},"childNodes":[11]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ResizeObserver
/*****************************************************************/
window.__pkg__bundleSrc__['274']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var _support_ = true;

__pkg__scope_bundle__.default= function (el, doback) {

    var observer = null;
    var _hadWilldo_ = false;
    var _hadNouse_ = false;

    var doit = function () {

        // 如果前置任务都完成了
        if (!_hadWilldo_) {
            _hadWilldo_ = true;

            // 既然前置任务已经没有了，那么就可以更新了？
            // 不是的，可能非常短的时间里，后续有改变
            // 因此延迟一点点来看看后续有没有改变
            // 如果改变了，就再延迟看看
            var interval = window.setInterval(function () {

                // 判断当前是否可以立刻更新
                if (!_hadNouse_) {
                    window.clearInterval(interval);

                    _hadWilldo_ = false;
                    doback();

                }

                _hadNouse_ = false;
            }, 100);

        } else {
            _hadNouse_ = true;
        }
    }

    try {


        observer = new ResizeObserver(doit);
        observer.observe(el);

    } catch (e) {

        // 如果浏览器不支持此接口

        if (_support_) {
            console.error('ResizeObserver undefined!');

            // 不支持的话，提示一次就可以了
            _support_ = false;
        }

        // 使用resize进行退化支持
        doit();
        window.addEventListener('resize', doit, false);

    }

    return function () {
        if (observer) {

            // 解除对画布大小改变的监听
            observer.disconnect();

        } else {
            window.removeEventListener('resize', doit);
        }
    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/animation
/*****************************************************************/
window.__pkg__bundleSrc__['102']=function(){
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
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['121']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('122');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('124');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('122');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height, opts, isScale) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', (isScale ? 2 : 1) * width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', (isScale ? 2 : 1) * height);
    }

    var painter = canvas.getContext("2d", opts || {});
    if (isScale) painter.scale(2, 2);

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {

        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": 'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcWndCap": 'butt',
    };

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            if (painter.setLineDash) painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (key in config) {
            config[key] = value;
        }

        // 其它情况直接生效即可
        else if (key in initPainterConfig) {
            painter[key] = value;
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !");
        }
    };

    // 画笔
    var enhancePainter = {
        __only__painter__: true,

        // 原生画笔
        painter: painter,

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') {

                    // 暂存的
                    if (arguments[0] in config) return config[arguments[0]];

                    // lineDash
                    if ('lineDash' == arguments[0]) return painter.getLineDash();

                    // 普通的
                    return painter[arguments[0]];
                }
                for (var key in arguments[0]) {
                    useConfig(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                useConfig(arguments[0], arguments[1]);
            }
            return enhancePainter;
        },

        // 文字
        "fillText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).fillText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "strokeText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "fullText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0);
            painter.fillText(text, 0, 0);
            painter.strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },

        // 路径
        "beginPath": function () { painter.beginPath(); return enhancePainter; },
        "closePath": function () { painter.closePath(); return enhancePainter; },
        "moveTo": function (x, y) {

            // 解决1px模糊问题，别的地方类似原因
            painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
            return enhancePainter;
        },
        "lineTo": function (x, y) { painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5); return enhancePainter; },
        "arc": function (x, y, r, beginDeg, deg) {
            painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
            return enhancePainter;
        },
        "fill": function () { painter.fill(); return enhancePainter; },
        "stroke": function () { painter.stroke(); return enhancePainter; },
        "full": function () { painter.fill(); painter.stroke(); return enhancePainter; },

        "save": function () { painter.save(); return enhancePainter; },
        "restore": function () { painter.restore(); return enhancePainter; },

        // 路径 - 贝塞尔曲线
        "quadraticCurveTo": function (cpx, cpy, x, y) {
            painter.quadraticCurveTo(cpx, cpy, x, y); return enhancePainter;
        },
        "bezierCurveTo": function (cp1x, cp1y, cp2x, cp2y, x, y) {
            painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y); return enhancePainter;
        },

        // 擦除画面
        "clearRect": function (x, y, w, h) { painter.clearRect(x, y, w, h); return enhancePainter; },
        "clearCircle": function (cx, cy, r) {
            painter.beginPath();
            painter.globalCompositeOperation = "destination-out";
            painter.arc(cx, cy, r, 0, Math.PI * 2); // 绘制圆形
            painter.fill(); // 填充圆形，这将会清除这个圆形区域
            painter.globalCompositeOperation = "source-over";
            painter.closePath();
            return enhancePainter;
        },

        // 弧
        "fillArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).fill(); return enhancePainter;
        },
        "strokeArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).stroke(); return enhancePainter;
        },
        "fullArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 圆形
        "fillCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).fill(); return enhancePainter;
        },
        "strokeCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).stroke(); return enhancePainter;
        },
        "fullCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 矩形
        "fillRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).fill(); return enhancePainter;
        },
        "strokeRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).stroke(); return enhancePainter;
        },
        "fullRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // base64
        "toDataURL": function (type) {
            type = type || 'image/png';
            return canvas.toDataURL(type);
        },

        // 获取指定位置颜色
        "getColor": function (x, y) {
            var currentRGBA = painter.getImageData(x - 0.5, y - 0.5, 1, 1).data;
            return "rgba(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + "," + currentRGBA[3] + ")";
        },

        // image
        "drawImage": function (img, sx, sy, sw, sh, x, y, w, h) {
            sx = sx || 0;
            sy = sy || 0;
            x = x || 0;
            y = y || 0;
            w = w ? w : canvas.getAttribute('width');
            h = h ? h : canvas.getAttribute('height');

            if (img.nodeName == 'CANVAS') {
                sw = sw ? sw : canvas.getAttribute('width');
                sh = sh ? sh : canvas.getAttribute('height');
            } else {
                // 默认类型是图片
                sw = sw || img.width;
                sh = sh || img.height;
            }

            painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);
            return enhancePainter;
        },

        /**
        * 渐变
        * -------------
        */

        //  线性渐变
        "createLinearGradient": function (x0, y0, x1, y1) {
            return linearGradient(painter, x0, y0, x1, y1);
        },

        // 环形渐变
        "createRadialGradient": function (cx, cy, r1, r2) {
            if (arguments.length < 4) {
                return radialGradient(painter, cx, cy, 0, r1);
            } else {
                return radialGradient(painter, cx, cy, r1, r2);
            }

        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['122']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('123');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线的端点类型，（"butt"平直边缘、"round"半圆和"square"矩形）
    "lineCap": "butt",

    // 线的拐角连接方式，（"miter"连接处边缘延长相接、"bevel"对角线斜角和"round"圆）
    "lineJoin": "miter",

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

    // 阴影的模糊系数，默认0，也就是无阴影
    "shadowBlur": 0,

    // 阴影的颜色
    "shadowColor": "black"

};

// 文字统一设置方法
__pkg__scope_bundle__.initText = function (painter, config, x, y, deg) {

    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font = config.fontStyle + " " + config.fontWeight + " " + config.fontSize + "px " + config.fontFamily;
    return painter;
};

// 画弧统一设置方法
__pkg__scope_bundle__.initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {

    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }

    beginDeg = beginDeg % (Math.PI * 2);

    // 当|deg|>=2π的时候都认为是一个圆环
    // 为什么不取2π比较，是怕部分浏览器浮点不精确
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2;
    } else {
        deg = deg % (Math.PI * 2);
    }

    arc(beginDeg, deg, cx, cy, r1, r2, function (
        beginA, endA,
        begInnerX, begInnerY,
        begOuterX, begOuterY,
        endInnerX, endInnerY,
        endOuterX, endOuterY,
        r
    ) {
        if (r < 0) r = -r;
        painter.beginPath();
        painter.moveTo(begInnerX, begInnerY);
        painter.arc(
            // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
            cx, cy, r1, beginA, endA, false);
        // 结尾
        if (config.arcEndCap != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config.arcStartCap != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config.arcStartCap == 'butt') painter.closePath();
    return painter;
};

// 画圆统一设置方法
__pkg__scope_bundle__.initCircle = function (painter, cx, cy, r) {
    painter.beginPath();
    painter.moveTo(cx + r, cy);
    painter.arc(cx, cy, r, 0, Math.PI * 2);
    return painter;
};

// 画矩形统一设置方法
__pkg__scope_bundle__.initRect = function (painter, x, y, width, height) {
    painter.beginPath();
    painter.rect(x, y, width, height);
    return painter;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/arc
/*****************************************************************/
window.__pkg__bundleSrc__['123']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 点（x,y）围绕中心（cx,cy）旋转deg度

var rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

// r1和r2，内半径和外半径
// beginA起点弧度，rotateA旋转弧度式

__pkg__scope_bundle__.default= function (beginA, rotateA, cx, cy, r1, r2, doback) {

    // 保证逆时针也是可以的
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }

    var temp = [], p;

    // 内部
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];

    // 外部
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];

    doback(
        beginA, beginA + rotateA,
        temp[0] + cx, temp[1] + cy,
        temp[4] + cx, temp[5] + cy,
        temp[2] + cx, temp[3] + cy,
        temp[6] + cx, temp[7] + cy,
        (r2 - r1) * 0.5
    );

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/Gradient
/*****************************************************************/
window.__pkg__bundleSrc__['124']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 线性渐变
__pkg__scope_bundle__.linearGradient = function (painter, x0, y0, x1, y1) {
    var gradient = painter.createLinearGradient(x0, y0, x1, y1);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};

// 环形渐变
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r1, r2) {
    var gradient = painter.createRadialGradient(cx, cy, r1, cx, cy, r2);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/extend/polar-ruler
/*****************************************************************/
window.__pkg__bundleSrc__['282']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('145');
var initConfig=__pkg__scope_args__.initConfig;

__pkg__scope_args__=window.__pkg__getBundle('147');
var rotate =__pkg__scope_args__.default;


/**
 * attr = {
 *    cx,cy 刻度尺圆心
 *    begin,deg 刻度尺开始角度和总度数
 *    radius 刻度尺半径
 *    mark-direction 刻度尺小刻度的位置：outer|inner
 *    value-position 刻度尺刻度文字的位置：mark|between
 *    color 刻度尺颜色
 *    value 值
 *    font-size 刻度文字大小
 *    font-rotate 文字是否旋转
 *    font-weight 字重
 *    small-mark 是否需要小刻度
 * }
 */
__pkg__scope_bundle__.default= function (painter, attr) {
    var i, j, curDeg, textHelpDeg, p1, p2;

    attr = initConfig({
        "mark-direction": "outer",
        "value-position": "mark",
        "color": 'black',
        "begin": 0,
        "deg": Math.PI * 2,
        "font-size": 12,
        "font-weight": 400,
        "font-rotate": true,
        "small-mark": false
    }, attr);

    var value = attr.value;

    painter.config({
        'lineWidth': 1,
        'fillStyle': attr.color,
        'strokeStyle': attr.color,
        'fontSize': attr["font-size"],
        "fontWeight": attr["font-weight"],
        'textAlign': 'center',
        'textBaseline': 'middle',
        "lineDash": []
    });

    // 先绘制弧度
    painter.beginPath().arc(attr.cx, attr.cy, attr.radius, attr.begin, attr.deg).stroke();

    var markNumber = attr["value-position"] == "mark" ? value.length : value.length + 1;

    // 绘制刻度
    var distanceDeg = attr.deg / (markNumber - 1);

    // 绘制刻度
    for (i = 0; i < markNumber; i++) {

        p1 = rotate(
            attr.cx, attr.cy,
            attr.begin + i * distanceDeg,
            attr.cx + attr.radius, attr.cy
        );

        p2 = rotate(
            attr.cx, attr.cy,
            attr.begin + i * distanceDeg,
            attr.cx + attr.radius + (attr['small-mark'] ? 10 : 4) * (attr["mark-direction"] == 'inner' ? -1 : 1), attr.cy
        );

        painter.config({
            "lineWidth": attr['small-mark'] ? 2 : 1
        }).beginPath().moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).stroke();

        // 绘制小刻度
        painter.config({
            "lineWidth": 1
        });
        if (attr['small-mark'] && i < markNumber - 1) {

            for (j = 1; j <= 4; j++) {
                p1 = rotate(
                    attr.cx, attr.cy,
                    attr.begin + (i + j * 0.2) * distanceDeg,
                    attr.cx + attr.radius, attr.cy
                );

                p2 = rotate(
                    attr.cx, attr.cy,
                    attr.begin + (i + j * 0.2) * distanceDeg,
                    attr.cx + attr.radius + 4 * (attr["mark-direction"] == 'inner' ? -1 : 1), attr.cy
                );

                painter.beginPath().moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).stroke();
            }

        }
    }

    // 绘制刻度上的读数
    for (i = 0; i < value.length; i++) {
        curDeg = attr.begin + distanceDeg * (i + (attr["value-position"] == 'mark' ? 0 : 0.5));
        textHelpDeg = curDeg % (Math.PI * 2);

        p1 = rotate(
            attr.cx, attr.cy,
            curDeg,
            attr.cx + attr.radius + (attr["font-rotate"] && !attr['small-mark'] ? 15 : 25) * (attr["mark-direction"] == 'inner' ? -1 : 1), attr.cy
        );

        if (attr["font-rotate"]) {
            painter.fillText(value[i], p1[0], p1[1], curDeg + ((
                textHelpDeg > 0 && textHelpDeg < Math.PI ||
                textHelpDeg > -2 * Math.PI && textHelpDeg < -Math.PI
            ) ? -Math.PI * 0.5 : Math.PI * 0.5));
        } else {
            painter.fillText(value[i], p1[0], p1[1]);
        }

    }

    return painter;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/config
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 初始化配置文件

__pkg__scope_bundle__.initConfig = function (init, data) {
    var key;
    for (key in data)
        try {
            init[key] = data[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    return init;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/transform/rotate
/*****************************************************************/
window.__pkg__bundleSrc__['147']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 点（x,y）围绕中心（cx,cy）旋转deg度
__pkg__scope_bundle__.default= function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

    return __pkg__scope_bundle__;
}
