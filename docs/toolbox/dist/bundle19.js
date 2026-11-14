
/*************************** [bundle] ****************************/
// Original file:./src/pages/snake-eating/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['82']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('237');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('238');


__pkg__scope_args__=window.__pkg__getBundle('152');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('181');
var getKeyCode =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    var painter;

    return {
        name: "snake-eating",
        render: template,
        data: {

            // 提示内容
            tips: obj.ref("温馨提示：点击「开始游戏」启动运行！"),

            // 记录是否游戏中
            isRuning: obj.ref(false),

            // 食物
            foodBlock: [],

            // 记录小蛇
            blocks: [],

            // 下一步走法
            mulpD: ""

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "贪吃蛇" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './snake-eating.png');
        },
        mounted: function () {
            var canvas = this._refs.mycanvas.value;

            // 获取画笔
            painter = canvasRender(canvas, canvas.clientWidth, canvas.clientHeight, {}, true);

            this.updateView();

            // 启动键盘监听
            var _this = this;
            getKeyCode(function (keyCode) {
                switch (keyCode) {
                    case 'up': {
                        _this.mulpD = [0, -1];
                        break;
                    }
                    case 'down': {
                        _this.mulpD = [0, 1];
                        break;
                    }
                    case 'left': {
                        _this.mulpD = [-1, 0];
                        break;
                    }
                    case 'right': {
                        _this.mulpD = [1, 0];
                        break;
                    }
                }
            });
        },
        methods: {

            // 刷新视图
            updateView: function () {
                var i, context = painter.painter;

                painter.clearRect(0, 0, 500, 500);

                // 先绘制格子
                painter.config({
                    strokeStyle: "#e7eee2"
                });
                for (i = 0; i < 25; i++) {
                    painter

                        // 横线条
                        .beginPath().moveTo(0, i * 20).lineTo(500, i * 20).stroke()

                        // 纵线条
                        .beginPath().moveTo(i * 20, 0).lineTo(i * 20, 500).stroke();

                }

                // 蛇身使用圆角分段，头部根据前进方向绘制眼睛
                for (i = 0; i < this.blocks.length; i++) {
                    var x = this.blocks[i][0] * 20 + 2;
                    var y = this.blocks[i][1] * 20 + 2;
                    var size = 16;

                    context.beginPath();
                    context.moveTo(x + 6, y);
                    context.lineTo(x + size - 6, y);
                    context.quadraticCurveTo(x + size, y, x + size, y + 6);
                    context.lineTo(x + size, y + size - 6);
                    context.quadraticCurveTo(x + size, y + size, x + size - 6, y + size);
                    context.lineTo(x + 6, y + size);
                    context.quadraticCurveTo(x, y + size, x, y + size - 6);
                    context.lineTo(x, y + 6);
                    context.quadraticCurveTo(x, y, x + 6, y);
                    context.closePath();

                    var bodyGradient = context.createLinearGradient(x, y, x + size, y + size);
                    if (i === 0) {
                        bodyGradient.addColorStop(0, "#69c98d");
                        bodyGradient.addColorStop(1, "#269565");
                    } else {
                        var shade = Math.max(0, 1 - i / Math.max(this.blocks.length, 12));
                        bodyGradient.addColorStop(0, "rgba(136, 219, 157, " + (0.72 + shade * 0.28) + ")");
                        bodyGradient.addColorStop(1, "rgba(65, 174, 113, " + (0.72 + shade * 0.28) + ")");
                    }
                    context.fillStyle = bodyGradient;
                    context.shadowColor = "rgba(31, 112, 71, 0.16)";
                    context.shadowBlur = 3;
                    context.fill();
                    context.shadowBlur = 0;

                    if (i === 0) {
                        var direction = this.mulpD && this.mulpD.length ? this.mulpD : [0, -1];
                        var centerX = x + size / 2 + direction[0] * 2;
                        var centerY = y + size / 2 + direction[1] * 2;
                        var perpendicularX = -direction[1] * 4;
                        var perpendicularY = direction[0] * 4;

                        [[-1, 1], [1, -1]].forEach(function (side) {
                            var eyeX = centerX + perpendicularX * side[0];
                            var eyeY = centerY + perpendicularY * side[0];
                            context.beginPath();
                            context.arc(eyeX, eyeY, 2.5, 0, Math.PI * 2);
                            context.fillStyle = "#fff";
                            context.fill();
                            context.beginPath();
                            context.arc(eyeX + direction[0], eyeY + direction[1], 1.2, 0, Math.PI * 2);
                            context.fillStyle = "#174d3b";
                            context.fill();
                        });
                    }
                }

                // 食物绘制成带叶子的苹果
                if (this.foodBlock.length) {
                    var foodX = this.foodBlock[0] * 20 + 10;
                    var foodY = this.foodBlock[1] * 20 + 10;

                    context.save();
                    context.shadowColor = "rgba(190, 67, 58, 0.22)";
                    context.shadowBlur = 5;
                    context.beginPath();
                    context.moveTo(foodX, foodY - 5);
                    context.bezierCurveTo(foodX - 2, foodY - 9, foodX - 9, foodY - 5, foodX - 8, foodY + 1);
                    context.bezierCurveTo(foodX - 7, foodY + 9, foodX - 2, foodY + 10, foodX, foodY + 7);
                    context.bezierCurveTo(foodX + 3, foodY + 10, foodX + 8, foodY + 8, foodX + 8, foodY + 1);
                    context.bezierCurveTo(foodX + 9, foodY - 5, foodX + 2, foodY - 9, foodX, foodY - 5);
                    var foodGradient = context.createRadialGradient(foodX - 3, foodY - 3, 1, foodX, foodY, 10);
                    foodGradient.addColorStop(0, "#ff9b83");
                    foodGradient.addColorStop(1, "#e94e55");
                    context.fillStyle = foodGradient;
                    context.fill();
                    context.shadowBlur = 0;

                    context.beginPath();
                    context.moveTo(foodX, foodY - 5);
                    context.quadraticCurveTo(foodX + 1, foodY - 9, foodX + 3, foodY - 10);
                    context.strokeStyle = "#79563c";
                    context.lineWidth = 1.5;
                    context.lineCap = "round";
                    context.stroke();

                    context.beginPath();
                    context.moveTo(foodX + 1, foodY - 8);
                    context.bezierCurveTo(foodX + 5, foodY - 12, foodX + 9, foodY - 8, foodX + 6, foodY - 6);
                    context.bezierCurveTo(foodX + 4, foodY - 5, foodX + 2, foodY - 6, foodX + 1, foodY - 8);
                    context.fillStyle = "#57ae70";
                    context.fill();
                    context.restore();
                }

            },

            // 开始游戏
            beginGame: function () {

                // 初始化参数
                this.isRuning = true;
                this.mulpD = [0, -1];
                this.foodBlock = [20, 20];
                this.blocks = [
                    [10, 10],
                    [10, 11],
                    [10, 12],
                    [10, 13],
                    [11, 13],
                    [12, 13],
                    [13, 13],
                    [14, 13]
                ];

                this.updateView();

                // 轮询修改数据
                var _this = this;
                var interval = setInterval(function () {

                    var newBlock = [
                        _this.blocks[0][0] + _this.mulpD[0],
                        _this.blocks[0][1] + _this.mulpD[1]
                    ];

                    // 判断是否合法
                    if (!_this.isValidBlock(newBlock)) {

                        _this.isRuning = false;
                        clearInterval(interval);
                        _this.tips = "[分数：" + (_this.blocks.length - 8) + "]小蛇出界或者撞到自己了。";

                        return;
                    }

                    _this.blocks.unshift(newBlock);

                    // 判断是否吃到食物了
                    if (
                        newBlock[0] == _this.foodBlock[0] &&
                        newBlock[1] == _this.foodBlock[1]
                    ) {
                        _this.foodBlock = _this.newFood();
                    } else {
                        _this.blocks.pop();
                    }

                    _this.updateView();
                }, 200);

            },

            // 判断是否合法
            isValidBlock: function (block) {

                // 如果越界了
                if (block[0] < 0 || block[0] >= 25 || block[1] < 0 || block[1] >= 25) return false;

                for (var i = 0; i < this.blocks.length; i++) {

                    // 如果撞到自己了
                    if (this.blocks[i][0] == block[0] && this.blocks[i][1] == block[1]) return false;
                }

                return true;
            },

            // 产生新的事物
            newFood: function () {
                var newFood, tryNum = 1;
                do {

                    if (tryNum >= 10000) {
                        this.isRuning = false;
                        this.tips = '意外终止，系统内部错误。';
                    }

                    newFood = [
                        +(Math.random() * 24).toFixed(0),
                        +(Math.random() * 24).toFixed(0)
                    ];
                    tryNum += 1;
                } while (!this.isValidBlock(newFood));

                return newFood;
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/snake-eating/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['237']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,8,9]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,3]},{"type":"text","content":"贪吃蛇","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[4,6]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[5]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[7]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:active":"isRuning?'no':'yes'"},"childNodes":[10,11]},{"type":"tag","name":"span","attrs":{"ui-bind":"tips"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"beginGame"},"childNodes":[12]},{"type":"text","content":"开始游戏","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/snake-eating/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['238']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"snake-eating\"]{\n\nwidth: 500px;\n\nleft: calc(50vw - 250px);\n\ntop: 50px;\n\nfont-size: 0;\n\noverflow: hidden;\n\nborder: 1px solid rgba(111, 158, 120, 0.24);\n\nborder-radius: 20px;\n\nbackground-color: #f5fbf1;\n\nbox-shadow:\n        0 18px 48px rgba(84, 126, 91, 0.16),\n        0 3px 10px rgba(84, 126, 91, 0.08);\n\n}\n\n [page-view=\"snake-eating\"][focus=\"no\"]>h2{\n\ncolor: #9aaa98;\n\nbackground-color: #edf4e9;\n\n}\n\n [page-view=\"snake-eating\"][focus=\"no\"]>h2::after{\n\nopacity: 0.45;\n\n}\n\n [page-view=\"snake-eating\"][focus=\"no\"]>canvas{\n\nfilter: saturate(0.75);\n\n}\n\n [page-view=\"snake-eating\"]>h2{\n\nposition: relative;\n\nz-index: 1;\n\nheight: 56px;\n\nbox-sizing: border-box;\n\npadding-left: 62px;\n\nfont-size: 16px;\n\nfont-weight: 600;\n\nline-height: 56px;\n\nletter-spacing: 2px;\n\ncolor: #473d1c;\n\nbackground-color: #e8f4e4;\n\nbackground-image: url(\"./snake-eating.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 80%;\n\nbackground-position: 10px center;\n\nborder-bottom: 1px solid rgba(111, 158, 120, 0.2);\n\n}\n\n [page-view=\"snake-eating\"]>h2 .win-btns>button{\n\nopacity: 0.75;\n\ntransition: opacity 0.2s ease, filter 0.2s ease;\n\n}\n\n [page-view=\"snake-eating\"]>h2 .win-btns>button:hover{\n\nopacity: 1;\n\nfilter: drop-shadow(0 2px 4px rgba(74, 130, 86, 0.25));\n\n}\n\n [page-view=\"snake-eating\"]>canvas{\n\ndisplay: block;\n\nwidth: 500px;\n\nheight: 500px;\n\nbackground-color: #f7fbf2;\n\nfilter: drop-shadow(0 2px 4px rgba(96, 145, 99, 0.08));\n\n}\n\n [page-view=\"snake-eating\"]::after{\n\ncontent: \" \";\n\nposition: absolute;\n\nleft: 0;\n\ntop: 56px;\n\nz-index: 1;\n\nwidth: 500px;\n\nheight: 500px;\n\nbox-sizing: border-box;\n\nborder: 1px solid rgba(125, 164, 117, 0.12);\n\nbox-shadow: inset 0 0 32px rgba(220, 238, 210, 0.18);\n\npointer-events: none;\n\n}\n\n [page-view=\"snake-eating\"]>div{\n\nposition: absolute;\n\nleft: 0;\n\ntop: 56px;\n\nz-index: 2;\n\ndisplay: flex;\n\nflex-direction: column;\n\nalign-items: center;\n\njustify-content: center;\n\nwidth: 500px;\n\nheight: 500px;\n\nborder-radius: 0 0 20px 20px;\n\nbackground-color: rgba(245, 250, 239, 0.72);\n\nbackground-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.52), rgba(231, 243, 224, 0.74));\n\n-webkit-backdrop-filter: blur(5px);\n\nbackdrop-filter: blur(5px);\n\n}\n\n [page-view=\"snake-eating\"]>div[active='no']{\n\ndisplay: none;\n\n}\n\n [page-view=\"snake-eating\"]>div>span{\n\nposition: absolute;\n\nleft: 20px;\n\ntop: 20px;\n\nmax-width: calc(100% - 40px);\n\nbox-sizing: border-box;\n\npadding: 9px 14px;\n\nborder: 1px solid rgba(133, 178, 127, 0.24);\n\nborder-radius: 12px;\n\ncolor: #979324;\n\nbackground-color: rgba(255, 255, 255, 0.74);\n\nbox-shadow: 0 4px 14px rgba(85, 126, 88, 0.08);\n\nfont-size: 12px;\n\nfont-weight: 400;\n\nline-height: 1.7em;\n\nletter-spacing: 0.3px;\n\n}\n\n [page-view=\"snake-eating\"]>div>span::before{\n\ncontent: \" \";\n\ndisplay: inline-block;\n\nwidth: 7px;\n\nheight: 7px;\n\nmargin-right: 8px;\n\nmargin-top: -1px;\n\nvertical-align: middle;\n\nborder-radius: 50%;\n\nbackground-color: #58531d;\n\n}\n\n [page-view=\"snake-eating\"]>div>button{\n\nposition: relative;\n\ndisplay: block;\n\nmin-width: 168px;\n\nheight: 46px;\n\nmargin: 0;\n\npadding: 0 32px;\n\nborder: 1px solid rgba(107, 163, 116, 0.2);\n\nborder-radius: 999px;\n\noutline: none;\n\ncolor: #fff;\n\nbackground-color: #979326;\n\nbackground-image: linear-gradient(135deg, #989427, #8a861f);\n\nbox-shadow:\n                0 8px 18px rgba(99, 158, 107, 0.24),\n                inset 0 1px 0 rgba(255, 255, 255, 0.5);\n\nfont-size: 14px;\n\nfont-weight: 600;\n\nletter-spacing: 3px;\n\ncursor: pointer;\n\ntransition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;\n\n}\n\n [page-view=\"snake-eating\"]>div>button::after{\n\ncontent: \" \";\n\nposition: absolute;\n\ninset: -5px;\n\nborder: 1px solid rgba(126, 184, 132, 0.25);\n\nborder-radius: 999px;\n\npointer-events: none;\n\n}\n\n [page-view=\"snake-eating\"]>div>button:hover{\n\ntransform: translateY(-2px);\n\nfilter: brightness(1.04);\n\nbox-shadow:\n                    0 12px 22px rgba(99, 158, 107, 0.3),\n                    inset 0 1px 0 rgba(255, 255, 255, 0.58);\n\n}\n\n [page-view=\"snake-eating\"]>div>button:active{\n\ntransform: translateY(0) scale(0.98);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['152']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('153');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('155');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('153');
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
window.__pkg__bundleSrc__['153']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('154');
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
window.__pkg__bundleSrc__['154']=function(){
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
window.__pkg__bundleSrc__['155']=function(){
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
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['181']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 字典表
var dictionary = {

    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",

    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],

    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",

    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    224: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear",
    19: "pause",

    // 功能键
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",

    // 余下键
    189: ["-", "_"],
    187: ["=", "+"],
    219: ["[", "{"],
    221: ["]", "}"],
    220: ["\\", "|"],
    186: [";", ":"],
    222: ["'", '"'],
    188: [",", "<"],
    190: [".", ">"],
    191: ["/", "?"],
    192: ["`", "~"]

};

// 非独立键字典
var help_key = ["shift", "ctrl", "alt"];

// 返回键盘此时按下的键的组合结果
var keyCode = function (event) {
    event = event || window.event;

    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];

    var _key = key[0];

    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";

    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
        key[0] = key[1] = "";
    }

    // 判断是否按下了caps lock
    var lockPress = event.code == "Key" + event.key && !shift;

    // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写
    resultKey = (preKey + ((preKey == '' && lockPress) ? key[1] : key[0]));

    if (key[0] == "") {
        resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey == '' ? _key : resultKey;
};

__pkg__scope_bundle__.getKeyString = keyCode;

/**
 * 获取键盘此时按下的键的组合结果
 * @param {Function} callback 回调，键盘有键被按下的时候触发
 * @return {Function} 返回一个函数，执行此函数可以取消键盘监听
 * @examples
 *  keyCode(function (data) {
 *      console.log(data);
 *  });
 */
__pkg__scope_bundle__.default= function (callback) {

    // 记录MacOS的command是否被按下
    var macCommand = false;

    var doKeydown = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = true;

        if (macCommand && !/command/.test(keyStringCode) && !/ctrl/.test(keyStringCode)) keyStringCode = "ctrl+" + keyStringCode;
        callback(keyStringCode.replace(/command/g, 'ctrl').replace('ctrl+ctrl', 'ctrl'), event);
    };

    var doKeyup = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = false;
    };

    // 在body上注册
    document.body.addEventListener('keydown', doKeydown, false);
    document.body.addEventListener('keyup', doKeyup, false);

    // 返回取消监听函数
    return function () {
        document.body.removeEventListener('keydown', doKeydown, false);
        document.body.removeEventListener('keyup', doKeyup, false);
    }
};

    return __pkg__scope_bundle__;
}
