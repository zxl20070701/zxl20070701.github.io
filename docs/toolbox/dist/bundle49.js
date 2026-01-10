
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/money-schedule/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['207']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('332');
var template =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('333');
var svgRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('106');
var animation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('151');
var rotate =__pkg__scope_args__.default;


var stop = function () { };
__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var _this = this;

            var painter = svgRender(this._refs.mysvg.value);

            // 进度条
            var rate = 0.73;

            painter

                // 绘制三个背景圆
                .config({
                    'fillStyle': '#fff7e9'
                }).appendEl("circle").fillCircle(250, 250, 250)
                .config({
                    'fillStyle': '#ffe1b1'
                }).appendEl("circle").fillCircle(250, 250, 220)
                .config({
                    'fillStyle': '#ffffff'
                }).appendEl("circle").fillCircle(250, 250, 180);

            // 准备好用来绘制动画wave的两个标签和进度弧
            var innerWave = svgRender(this._refs.mysvg.value).appendEl('path');
            var outerWave = svgRender(this._refs.mysvg.value).appendEl('path');
            var arcNode = svgRender(this._refs.mysvg.value).appendEl('path');

            // 绘制三行文字
            painter.config({
                'fontSize': 40,
                'fillStyle': '#272727',
                'textAlign': 'center'
            })
                .appendEl("text").fillText('￥100,000', 250, 210)
                .config({
                    'fontSize': 30,
                    'fillStyle': '#595757'
                })
                .appendEl("text").fillText('可借', 250, 160)
                .config({
                    'fontSize': 24,
                    'fillStyle': '#a4a1a1'
                })
                .appendEl("text").fillText('总额度150,000', 250, 260);

            // 配置进度条
            arcNode.config({
                'arcStartCap': 'round',
                'arcEndCap': 'round',
                'fillStyle': '#ff7f08'
            });

            // 启动动画并绘制进度条
            animation(function (deep) {

                // 根据当前进度deep更新弧形进度
                arcNode.fillArc(250, 250, 180, 200, -90, -360 * (1 - rate) * deep);

                // 初始化wave
                _this.fullWave(rate * deep, deep, innerWave, outerWave);

            }, 2000, function () {

                // 初始化显示完毕以后，启动wave动画
                _this.renderWave(rate, innerWave, outerWave);
            });

        },

        beforeDestory: function () {
            stop();
        },

        methods: {

            /**
            * 绘制波浪（完整的两条）
            * @param {number} rate 比率
            * @param {number} deep 动画进度
            * @param {node} innerWave 内wave结点
            * @param {node} outerWave 外wave结点
            */
            fullWave: function (rate, deep, innerWave, outerWave) {
                var help = 1;

                if (deep > 0.5) {
                    deep = deep - 0.5;
                    help = -1;
                }
                deep *= 2;

                // 绘制内弧
                this.drawerWave(innerWave.config({
                    'fillStyle': '#ff7f08'
                }), rate, deep, help);

                // 绘制外弧
                this.drawerWave(outerWave.config({
                    'fillStyle': '#fead2e'
                }), rate, deep, -help);
            },

            /**
            * 启动wave动画
            * @param {number} rate 比率
            * @param {number} deep 动画进度
            * @param {node} innerWave 内wave结点
            * @param {node} outerWave 外wave结点
            */
            renderWave: function (rate, innerWave, outerWave) {
                var _this = this;

                stop = animation(function (deep) {
                    _this.fullWave(rate, deep, innerWave, outerWave);
                }, 2000, function () {
                    _this.renderWave(rate, innerWave, outerWave);
                });
            },

            /**
            * 绘制具体的一条wave
            * @param {painter} painter 画笔
            * @param {number} rate 比率
            * @param {number} deep 动画进度
            * @param {number} help wave类型，去1或-1，分两种：开始上波和开始下波
            */
            drawerWave: function (painter, rate, deep, help) {

                // wave的起点和终点
                var beginPoint = rotate(250, 250, (0.5 - rate) * Math.PI, 410, 250);
                var endPoint = rotate(250, 250, (1.5 - rate) * Math.PI, 410, 250);

                // wave由下半圆和波浪组成
                painter
                    .beginPath()
                    .moveTo(beginPoint[0], beginPoint[1])

                    // 绘制半圆部分
                    .arc(250, 250, 160, (0.5 - rate) * 180, 2 * rate * 180)

                    // 绘制波浪部分
                    .bezierCurveTo(

                        // rate > 0.5 ? 1 - rate : rate是用来控制波动大小的，为了好看，0-0.5和0.5-1取对称
                        endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * deep, beginPoint[1] + 200 * deep * help * (rate > 0.5 ? 1 - rate : rate),
                        endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * (1 + deep), beginPoint[1] - 200 * (1 - deep) * help * (rate > 0.5 ? 1 - rate : rate),

                        // 上面是第一和第二个看着点，最后这个是终点，加上画笔开始位置作为起点
                        beginPoint[0], beginPoint[1]
                    )

                    // 填充
                    .fill();

            }
        }

    };

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/money-schedule/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['332']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"金额波浪球","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","style":"padding-top:50px"},"childNodes":[11]},{"type":"tag","name":"svg","attrs":{"ref":"mysvg","viewBox":"0 0 500 500","width":"400","height":"400"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/svg/index
/*****************************************************************/
window.__pkg__bundleSrc__['333']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('334');
var initText=__pkg__scope_args__.initText;
var initCircle=__pkg__scope_args__.initCircle;
var initPath=__pkg__scope_args__.initPath;
var initRect=__pkg__scope_args__.initRect;
var initArc=__pkg__scope_args__.initArc;

__pkg__scope_args__=window.__pkg__getBundle('8');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('335');
var toNode=__pkg__scope_args__.toNode;
var setAttribute=__pkg__scope_args__.setAttribute;
var getAttribute=__pkg__scope_args__.getAttribute;
var full=__pkg__scope_args__.full;
var fill=__pkg__scope_args__.fill;
var stroke=__pkg__scope_args__.stroke;

__pkg__scope_args__=window.__pkg__getBundle('151');
var rotate =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (svg) {

    // 用于记录配置
    var config = {

        // 基本设置
        "fillStyle": "#000",
        "strokeStyle": "#000",
        "lineWidth": 1,

        // 文字对齐方式
        "textAlign": "left",
        "textBaseline": "middle",

        // 文字设置
        "fontSize": 16,
        "fontFamily": "sans-serif",

        // arc二端闭合方式['butt':直线闭合,'round':圆帽闭合]
        "arcStartCap": "butt",
        "arcEndCap": "butt",

        // 虚线设置
        "lineDash": []

    };

    // 作用的节点
    var useEl;

    // 路径(和canvas2D的类似)
    var path = "", currentPosition = [];

    // 画笔
    var enhancePainter = {

        // 属性设置或获取
        config: function (params) {
            if (typeof params !== 'object') {
                return config[params];
            } else {
                for (var key in params) {
                    config[key] = params[key];
                }
            }
            return enhancePainter;
        },

        /**
        * 基础方法
        * ---------------------------------
        */

        // 标记应用节点
        // 也就是后续操作都会作用在此节点
        useEl: function (el) {
            useEl = el;
            return enhancePainter;
        },

        // 获取当前应用的节点
        getEl: function () {
            return useEl;
        },

        // 追加节点
        // el可以是结点或字符串，字符串的话表述节点名称
        // context可选，表示追加位置，可选，默认根svg
        // 此外，和appendBoard等操作一样，执行后新加入的结点会自动变成应用节点
        appendEl: function (el, context) {
            context = context || svg;

            if (isString(el)) el = toNode(el);
            context.appendChild(el);

            useEl = el;
            return enhancePainter;
        },

        // 追加绘制板
        // 参数和appendEl类似，只是el如果是字符串的话，表示需要绘制对应什么内容，
        // 比如el = “arc”，表示画弧（不是路径arc），那么我们会创建path节点，因为我们是使用path实现的
        appendBoard: function (el, context) {
            var _el = el;

            if (isString(el)) _el = {
                text: "text",
                path: "path",
                arc: "path",
                circle: "circle",
                rect: "rect"
            }[el];

            if (!_el) throw new Error("Unsupported drawing method:" + el);
            return this.appendEl(_el, context);
        },

        // 删除当前维护的节点
        remove: function () {
            if (!useEl) throw new Error("Currently, no node can be deleted.");

            useEl.parentNode.removeChild(useEl);
            return enhancePainter;
        },

        // 设置或获取节点属性
        attr: function (params) {
            if (!useEl) throw new Error("Currently, no node can be modified or viewed.");

            if (typeof params !== 'object') {
                return getAttribute(useEl, params);
            } else {
                for (var key in params) {
                    setAttribute(useEl, key, params[key]);
                }
            }
        },

        /**
         * 绘制方法
         * ---------------------------------
         */

        // 文字
        // deg表示文字旋转角度，是角度值，不是弧度
        fillText: function (text, x, y, deg) {
            initText(useEl, config, x, y, deg);
            useEl.textContent = text;
            fill(useEl, config);
            return enhancePainter;
        },
        strokeText: function (text, x, y, deg) {
            initText(useEl, config, x, y, deg);
            useEl.textContent = text;
            stroke(useEl, config);
            return enhancePainter;
        },
        fullText: function (text, x, y, deg) {
            initText(useEl, config, x, y, deg);
            useEl.textContent = text;
            full(useEl, config);
            return enhancePainter;
        },

        // 弧
        fillArc: function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(useEl, config, cx, cy, r1, r2, beginDeg, deg);
            fill(useEl, config);
            return enhancePainter;
        },
        strokeArc: function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(useEl, config, cx, cy, r1, r2, beginDeg, deg);
            stroke(useEl, config);
            return enhancePainter;
        },
        fullArc: function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(useEl, config, cx, cy, r1, r2, beginDeg, deg);
            full(useEl, config);
            return enhancePainter;
        },

        // 圆形
        fillCircle: function (cx, cy, r) {
            initCircle(useEl, cx, cy, r);
            fill(useEl, config);
            return enhancePainter;
        },
        strokeCircle: function (cx, cy, r) {
            initCircle(useEl, cx, cy, r);
            stroke(useEl, config);
            return enhancePainter;
        },
        fullCircle: function (cx, cy, r) {
            initCircle(useEl, cx, cy, r);
            full(useEl, config);
            return enhancePainter;
        },

        // 矩形
        fillRect: function (x, y, width, height) {
            initRect(useEl, x, y, width, height);
            fill(useEl, config);
            return enhancePainter;
        },
        strokeRect: function (x, y, width, height) {
            initRect(useEl, x, y, width, height);
            stroke(useEl, config);
            return enhancePainter;
        },
        fullRect: function (x, y, width, height) {
            initRect(useEl, x, y, width, height);
            full(useEl, config);
            return enhancePainter;
        },

        // 路径
        beginPath: function () {
            currentPosition = [];

            path = "";
            return enhancePainter;
        },
        closePath: function () {
            path += "Z";
            return enhancePainter;
        },
        moveTo: function (x, y) {
            currentPosition = [x, y];

            path += "M" + x + " " + y;
            return enhancePainter;
        },
        lineTo: function (x, y) {
            currentPosition = [x, y];

            path += (path == "" ? "M" : "L") + x + " " + y;
            return enhancePainter;
        },
        fill: function () {
            initPath(useEl, path);
            fill(useEl, config);
            return enhancePainter;
        },
        stroke: function () {
            initPath(useEl, path);
            stroke(useEl, config);
            return enhancePainter;
        },
        full: function () {
            initPath(useEl, path);
            full(useEl, config);
            return enhancePainter;
        },

        arc: function (x, y, r, beginDeg, deg) {
            var begPosition = rotate(x, y, beginDeg / 180 * Math.PI, x + r, y);
            var endPosition = rotate(x, y, (beginDeg + deg) / 180 * Math.PI, x + r, y);
            // 如果当前没有路径，说明是开始的，就移动到正确位置
            if (path == '') {
                path += "M" + begPosition[0] + "," + begPosition[1];
            }
            // 如果当前有路径，位置不正确，应该画到正确位置（和canvas保持一致）
            else if (begPosition[0] != currentPosition[0] || begPosition[1] != currentPosition[1]) {
                path += "L" + begPosition[0] + "," + begPosition[1];
            }
            path += "A" + r + "," + r + " 0 " + ((deg > 180 || deg < -180) ? 1 : 0) + "," + (deg > 0 ? 1 : 0) + " " + endPosition[0] + "," + endPosition[1];
            return enhancePainter;
        },

        // 路径 - 贝塞尔曲线
        quadraticCurveTo: function (cpx, cpy, x, y) {
            path += "Q" + cpx + " " + cpy + "," + x + " " + y;
            return enhancePainter;
        },
        bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y) {
            path += "C" + cp1x + " " + cp1y + "," + cp2x + " " + cp2y + "," + x + " " + y;
            return enhancePainter;
        }
    };

    return enhancePainter;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/svg/config.js
/*****************************************************************/
window.__pkg__bundleSrc__['334']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('335');
var setAttribute=__pkg__scope_args__.setAttribute;

__pkg__scope_args__=window.__pkg__getBundle('337');
var setStyle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('338');
var isNumber =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('339');
var arc =__pkg__scope_args__.default;


// 文字统一设置方法
__pkg__scope_bundle__.initText = function (el, config, x, y, deg) {
    if (el.nodeName.toLowerCase() !== 'text') throw new Error('Need a <text> !');

    // 垂直对齐采用dy实现
    setAttribute(el, "dy", {
        "top": config.fontSize * 0.5,
        "middle": 0,
        "bottom": -config.fontSize * 0.5,
    }[config.textBaseline]);

    setStyle(el, {

        // 文字对齐方式
        "text-anchor": {
            "left": "start",
            "right": "end",
            "center": "middle"
        }[config.textAlign],
        "dominant-baseline": "central",

        // 文字大小和字体设置
        "font-size": config.fontSize + "px",
        "font-family": config.fontFamily
    });

    // 位置
    setAttribute(el, "x", x);
    setAttribute(el, "y", y);

    // 旋转
    if (isNumber(deg)) {
        deg = deg % 360;
        setAttribute(el, "transform", "rotate(" + deg + "," + x + "," + y + ")");
    }
};

// 画圆统一设置方法
__pkg__scope_bundle__.initCircle = function (el, cx, cy, r) {
    if (el.nodeName.toLowerCase() !== 'circle') throw new Error('Need a <circle> !');
    setAttribute(el, 'cx', cx);
    setAttribute(el, 'cy', cy);
    setAttribute(el, 'r', r);
};

// 路径统一设置方法
__pkg__scope_bundle__.initPath = function (el, path) {
    if (el.nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');
    setAttribute(el, 'd', path);
};

// 画矩形统一设置方法
__pkg__scope_bundle__.initRect = function (el, x, y, width, height) {
    if (el.nodeName.toLowerCase() !== 'rect') throw new Error('Need a <rect> !');

    // 由于高和宽不可以是负数，校对一下
    if (height < 0) { height *= -1; y -= height; }
    if (width < 0) { width *= -1; x -= width; }

    setAttribute(el, 'x', x);
    setAttribute(el, 'y', y);
    setAttribute(el, 'width', width);
    setAttribute(el, 'height', height);
};

// 画弧统一设置方法
__pkg__scope_bundle__.initArc = function (el, config, cx, cy, r1, r2, beginDeg, deg) {

    if (el.nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');

    beginDeg = (beginDeg / 180) * Math.PI;
    deg = (deg / 180) * Math.PI;

    beginDeg = beginDeg % (Math.PI * 2);

    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }

    // 当|deg|>=2π的时候都认为是一个圆环
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 1.999999;
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

        var f = (endA - beginA) > Math.PI ? 1 : 0,
            d = "M" + begInnerX + " " + begInnerY;
        if (r < 0) r = -r;
        d +=
            // 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
            "A" + r1 + " " + r1 + " 0 " + f + " 1 " + endInnerX + " " + endInnerY;

        // 结尾
        if (config.arcEndCap == 'round')
            d += "A" + r + " " + r + " " + " 0 1 0 " + endOuterX + " " + endOuterY;
        else if (config.arcEndCap == '-round')
            d += "A" + r + " " + r + " " + " 0 1 1 " + endOuterX + " " + endOuterY;
        else
            d += "L" + endOuterX + " " + endOuterY;
        d += "A" + r2 + " " + r2 + " 0 " + f + " 0 " + begOuterX + " " + begOuterY;

        // 开头
        if (config.arcStartCap == 'round')
            d += "A" + r + " " + r + " " + " 0 1 0 " + begInnerX + " " + begInnerY;
        else if (config.arcStartCap == '-round')
            d += "A" + r + " " + r + " " + " 0 1 1 " + begInnerX + " " + begInnerY;
        else
            d += "L" + begInnerX + " " + begInnerY;

        if (config.arcStartCap == 'butt') d += "Z";

        setAttribute(el, 'd', d);
    });
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/svg/tool.js
/*****************************************************************/
window.__pkg__bundleSrc__['335']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('336');
var XLINK_ATTRIBUTE=__pkg__scope_args__.XLINK_ATTRIBUTE;


// 新建节点
__pkg__scope_bundle__.toNode=function(tagname) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagname);
};

// 设置属性
var _setAttribute = function (el, key, value) {

    // 需要使用xlink命名空间的xml属性
    if (XLINK_ATTRIBUTE.indexOf(key) > -1) {
        el.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:' + key, value);
    }

    // 否则
    else {
        el.setAttribute(key, value);
    }
};
__pkg__scope_bundle__.setAttribute = _setAttribute;

// 获取属性
__pkg__scope_bundle__.getAttribute=function(el, key) {
    if (XLINK_ATTRIBUTE.indexOf(key) > -1) key = 'xlink:' + key;
    return el.getAttribute(key);
};

__pkg__scope_bundle__.full=function(el, config) {
    _setAttribute(el, "stroke", config.strokeStyle);
    _setAttribute(el, "fill", config.fillStyle);
    _setAttribute(el, "stroke-dasharray", config.lineDash.join(','));
};

__pkg__scope_bundle__.fill=function(el, config) {
    _setAttribute(el, "fill", config.fillStyle);
};

__pkg__scope_bundle__.stroke=function(el, config) {
    _setAttribute(el, "stroke", config.strokeStyle);
    _setAttribute(el, "fill", "none");
    _setAttribute(el, "stroke-dasharray", config.lineDash.join(','));
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/svg/dictionary.js
/*****************************************************************/
window.__pkg__bundleSrc__['336']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.XLINK_ATTRIBUTE = ["href", "title", "show", "type", "role", "actuate"];

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/setStyle.js
/*****************************************************************/
window.__pkg__bundleSrc__['337']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 修改样式
__pkg__scope_bundle__.default= function (el, styles) {
    for (var key in styles) {
        el.style[key] = styles[key];
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isNumber.js
/*****************************************************************/
window.__pkg__bundleSrc__['338']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('5');
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
// Original file:./src/tool/canvas/arc.js
/*****************************************************************/
window.__pkg__bundleSrc__['339']=function(){
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
// Original file:./src/tool/transform/rotate
/*****************************************************************/
window.__pkg__bundleSrc__['151']=function(){
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

/*************************** [bundle] ****************************/
// Original file:./src/tool/animation
/*****************************************************************/
window.__pkg__bundleSrc__['106']=function(){
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
