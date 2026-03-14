
/*************************** [bundle] ****************************/
// Original file:./src/pages/draft/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['89']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('328');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('329');


__pkg__scope_args__=window.__pkg__getBundle('305');
var canvasRender =__pkg__scope_args__.default;


var painter;
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var currentColor = '#000000';
var currentWidth = 2;
var isEraser = false;

__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "draft",
        render: template,
        data: {
            currentColor: obj.ref('#000000'),
            currentPenSize: obj.ref(1),
            isEraserMode: obj.ref(false)
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "草稿纸" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './draft.png');
        },
        mounted: function () {
            // 获取画笔
            painter = canvasRender(this._refs.mycanvas.value);

            // 设置画布背景为白色
            var canvas = this._refs.mycanvas.value;
            painter.config({
                fillStyle: '#FFFFFF'
            }).fillRect(0, 0, canvas.width, canvas.height);

            // 绑定鼠标事件
            this.bindEvents();
        },
        methods: {
            bindEvents: function () {
                var canvas = this._refs.mycanvas.value;
                var self = this;

                // 鼠标按下事件
                canvas.addEventListener('mousedown', function (e) {
                    isDrawing = true;
                    var rect = canvas.getBoundingClientRect();
                    lastX = e.clientX - rect.left;
                    lastY = e.clientY - rect.top;
                });

                // 鼠标移动事件
                canvas.addEventListener('mousemove', function (e) {
                    if (!isDrawing) return;

                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;

                    self.drawLine(lastX, lastY, x, y);

                    lastX = x;
                    lastY = y;
                });

                // 鼠标释放事件
                canvas.addEventListener('mouseup', function () {
                    isDrawing = false;
                });

                // 鼠标离开画布事件
                canvas.addEventListener('mouseout', function () {
                    isDrawing = false;
                });

                // 触摸事件支持
                canvas.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    isDrawing = true;
                    var rect = canvas.getBoundingClientRect();
                    var touch = e.touches[0];
                    lastX = touch.clientX - rect.left;
                    lastY = touch.clientY - rect.top;
                });

                canvas.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    if (!isDrawing) return;

                    var rect = canvas.getBoundingClientRect();
                    var touch = e.touches[0];
                    var x = touch.clientX - rect.left;
                    var y = touch.clientY - rect.top;

                    self.drawLine(lastX, lastY, x, y);

                    lastX = x;
                    lastY = y;
                });

                canvas.addEventListener('touchend', function () {
                    isDrawing = false;
                });
            },

            drawLine: function (x1, y1, x2, y2) {
                painter.config({
                    strokeStyle: isEraser ? '#FFFFFF' : currentColor,
                    lineWidth: currentWidth,
                    lineCap: 'round',
                    lineJoin: 'round'
                }).beginPath().moveTo(x1, y1).lineTo(x2, y2).stroke();
            },

            setColor: function (event) {
                var color = event.target.getAttribute('data-value');
                currentColor = color;
                isEraser = false;
                this.currentColor = color;
                this.isEraserMode = false;
            },

            setPenSize: function (event) {
                var size = parseInt(event.target.getAttribute('data-value'));
                currentWidth = size;
                this.currentPenSize = size;
            },

            toggleEraser: function () {
                isEraser = !isEraser;
                this.isEraserMode = isEraser;
            },

            clearCanvas: function () {
                var canvas = this._refs.mycanvas.value;
                painter.config({
                    fillStyle: '#FFFFFF'
                }).fillRect(0, 0, canvas.width, canvas.height);
            },

            saveCanvas: function () {
                var canvas = this._refs.mycanvas.value;
                var link = document.createElement('a');
                link.download = '草稿纸_' + new Date().getTime() + '.png';
                link.href = canvas.toDataURL();
                link.click();
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/draft/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['328']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,42]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"草稿纸","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"toolbar"},"childNodes":[10,21,33,36,39]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[11,13]},{"type":"tag","name":"label","attrs":{},"childNodes":[12]},{"type":"text","content":"颜色:","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"color-palette"},"childNodes":[14,15,16,17,18,19,20]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#000000' ? 'active' : '')","style":"background-color: #000000","data-value":"#000000","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FF0000' ? 'active' : '')","style":"background-color: #FF0000","data-value":"#FF0000","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#00FF00' ? 'active' : '')","style":"background-color: #00FF00","data-value":"#00FF00","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#0000FF' ? 'active' : '')","style":"background-color: #0000FF","data-value":"#0000FF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FFFF00' ? 'active' : '')","style":"background-color: #FFFF00","data-value":"#FFFF00","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FF00FF' ? 'active' : '')","style":"background-color: #FF00FF","data-value":"#FF00FF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#00FFFF' ? 'active' : '')","style":"background-color: #00FFFF","data-value":"#00FFFF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[22,24]},{"type":"tag","name":"label","attrs":{},"childNodes":[23]},{"type":"text","content":"粗细:","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"pen-sizes"},"childNodes":[25,27,29,31]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'pen-size ' + (currentPenSize === 1 ? 'active' : '')","data-value":"1","ui-on:click":"setPenSize"},"childNodes":[26]},{"type":"text","content":"1","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'pen-size ' + (currentPenSize === 3 ? 'active' : '')","data-value":"3","ui-on:click":"setPenSize"},"childNodes":[28]},{"type":"text","content":"3","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'pen-size ' + (currentPenSize === 5 ? 'active' : '')","data-value":"5","ui-on:click":"setPenSize"},"childNodes":[30]},{"type":"text","content":"5","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'pen-size ' + (currentPenSize === 8 ? 'active' : '')","data-value":"8","ui-on:click":"setPenSize"},"childNodes":[32]},{"type":"text","content":"8","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[34]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'eraser-btn ' + (isEraserMode ? 'active' : '')","ui-on:click":"toggleEraser"},"childNodes":[35]},{"type":"text","content":"橡皮擦","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[37]},{"type":"tag","name":"button","attrs":{"class":"clear-btn","ui-on:click":"clearCanvas"},"childNodes":[38]},{"type":"text","content":"清空","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[40]},{"type":"tag","name":"button","attrs":{"class":"save-btn","ui-on:click":"saveCanvas"},"childNodes":[41]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[43]},{"type":"tag","name":"canvas","attrs":{"style":"width: 100%;height: 100%;","ref":"mycanvas"},"childNodes":[44]},{"type":"text","content":"非常抱歉，您的浏览器不支持canvas!","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/draft/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['329']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"draft\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 25px;\n\n}\n\n [page-view=\"draft\"][focus=\"no\"]>header{\n\nbackground-color: #edeeee;\n\n}\n\n [page-view=\"draft\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbox-shadow: -2px 2px 5px 0px #0000004f;\n\n}\n\n [page-view=\"draft\"]>header>h2{\n\ncolor: #224858;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./draft.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: fangsong;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"draft\"]>.toolbar{\n\ndisplay: flex;\n\nalign-items: center;\n\npadding: 10px;\n\nbackground-color: #f5f5f5;\n\nborder-bottom: 1px solid #ddd;\n\ngap: 15px;\n\nflex-wrap: wrap;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group{\n\ndisplay: flex;\n\nalign-items: center;\n\ngap: 5px;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group label{\n\nfont-size: 14px;\n\ncolor: #333;\n\nmargin-right: 5px;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .color-palette{\n\ndisplay: flex;\n\ngap: 5px;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .color-palette .color-item{\n\nwidth: 24px;\n\nheight: 24px;\n\nborder-radius: 50%;\n\ncursor: pointer;\n\nborder: 2px solid transparent;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .color-palette .color-item:hover{\n\ntransform: scale(1.1);\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .color-palette .color-item.active{\n\nborder-color: white;\n\ntransform: scale(1.1);\n\nbox-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .pen-sizes{\n\ndisplay: flex;\n\ngap: 5px;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .pen-sizes .pen-size{\n\npadding: 5px 10px;\n\nbackground-color: #fff;\n\nborder: 1px solid #ddd;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 12px;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .pen-sizes .pen-size:hover{\n\nbackground-color: #e9e9e9;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .pen-sizes .pen-size.active{\n\nbackground-color: #224858;\n\ncolor: white;\n\nborder-color: #224858;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .eraser-btn, [page-view=\"draft\"]>.toolbar .tool-group .clear-btn, [page-view=\"draft\"]>.toolbar .tool-group .save-btn{\n\npadding: 6px 12px;\n\nbackground-color: #fff;\n\nborder: 1px solid #ddd;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 14px;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .eraser-btn:hover, [page-view=\"draft\"]>.toolbar .tool-group .clear-btn:hover, [page-view=\"draft\"]>.toolbar .tool-group .save-btn:hover{\n\nbackground-color: #e9e9e9;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .eraser-btn.active, [page-view=\"draft\"]>.toolbar .tool-group .clear-btn.active, [page-view=\"draft\"]>.toolbar .tool-group .save-btn.active{\n\nbackground-color: #224858;\n\ncolor: white;\n\nborder-color: #224858;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .clear-btn{\n\nbackground-color: #ff4444;\n\ncolor: white;\n\nborder-color: #ff4444;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .clear-btn:hover{\n\nbackground-color: #cc3333;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .save-btn{\n\nbackground-color: #44aa44;\n\ncolor: white;\n\nborder-color: #44aa44;\n\n}\n\n [page-view=\"draft\"]>.toolbar .tool-group .save-btn:hover{\n\nbackground-color: #339933;\n\n}\n\n [page-view=\"draft\"]>.content{\n\nheight: calc(100vh - 200px);\n\n}\n\n [page-view=\"draft\"]>.content canvas{\n\ndisplay: block;\n\ncursor: crosshair;\n\nbackground-color: white;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/region
/*****************************************************************/
window.__pkg__bundleSrc__['305']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('144');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('211');
var assemble =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (canvas, width, height, isScale) {

    // 初始化尺寸
    width = width || canvas.clientWidth;
    height = height || canvas.clientHeight;

    // 获取绘制画笔
    var drawPainter = canvasRender(canvas, width, height, {}, isScale);

    // 获取区域画笔
    var regionPainter = canvasRender(document.createElement('canvas'), width, height, {

        // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
        willReadFrequently: true
    });

    var regions = {}; //区域映射表
    var regionAssemble = assemble(0, 255, 10, 3);

    var drawRegion = false;

    var instance = {

        // 配置画笔
        config: function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== "object") return drawPainter.config([arguments[0]]);
                for (var key in arguments[0]) {
                    if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) regionPainter.config(key, arguments[0][key]);
                    drawPainter.config(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) regionPainter.config(arguments[0], arguments[1]);
                drawPainter.config(arguments[0], arguments[1]);
            }
            return instance;
        },

        // 设置当前绘制区域名称
        setRegion: function (regionName) {
            if (regionName === false) {
                drawRegion = false;
            } else {
                drawRegion = true;

                if (regions[regionName] == undefined) {
                    var tempColor = regionAssemble();
                    regions[regionName] = "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")";
                }

                regionPainter.config({
                    fillStyle: regions[regionName],
                    strokeStyle: regions[regionName]
                });
            }

            return instance;
        },

        // 获取当前事件触发的区域名称
        getRegion: function (event) {

            // 获取点击点的颜色
            var currentRGBA = regionPainter.painter.getImageData(event.offsetX - 0.5, event.offsetY - 0.5, 1, 1).data;

            // 查找当前点击的区域
            for (var key in regions) {
                if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[key]) {
                    return key;
                }
            }

            return false;
        }

    };

    for (var key in drawPainter) {
        (function (key) {

            // 如果是获取原生画笔
            if ('painter' == key) {
                instance.painter = function () {
                    return {
                        draw: drawPainter.painter,
                        region: regionPainter.painter
                    };
                };
            }

            // 特殊的过滤掉
            else if (['config'].indexOf(key) < 0) {
                instance[key] = function () {
                    if (drawRegion) regionPainter[key].apply(regionPainter, arguments);
                    var result = drawPainter[key].apply(drawPainter, arguments);
                    return result.__only__painter__ ? instance : result;
                };

            }
        })(key);
    }

    return instance;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('145');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('147');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('145');
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
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('146');
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
window.__pkg__bundleSrc__['146']=function(){
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
window.__pkg__bundleSrc__['147']=function(){
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
// Original file:./src/tool/assemble
/*****************************************************************/
window.__pkg__bundleSrc__['211']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (begin, end, step, count) {
    var val = [];
    for (var index = 0; index < count; index++) val[index] = begin;

    // 非常类似进制数，每次调用都+1
    return function () {
        for (var i = 0; i < count; i++) {

            // 如果当前位可以进1
            if (val[i] + step < end) {
                val[i] = +(val[i] + step).toFixed(7);
                break;
            }

            // 如果当前位不可以，那当前位归0，尝试下一位
            else if (i < count - 1) {
                val[i] = begin;
            }
        }

        return val;
    }
};

    return __pkg__scope_bundle__;
}
