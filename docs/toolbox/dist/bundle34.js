
/*************************** [bundle] ****************************/
// Original file:./src/mobile/npm-download/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['90']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('316');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('317');


__pkg__scope_args__=window.__pkg__getBundle('142');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('30');
var urlFormat =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('144');
var getValue =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('147');
var toValue =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('148');
var ruler =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('149');
var getLoopColors =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('150');
var drawRuler =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "npm-download",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Npm Download" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './npm.png');
        },
        mounted: function () {
            var _this = this;

            var urlObj = urlFormat();
            if (!urlObj.params.packages || !urlObj.params.interval) {
                alert("参数错误");
                return;
            } else {

                getValue(urlObj.params.packages).then(function (npmOralData) {

                    // 对npm数据解析
                    var npmData = {}, max = 0, len = 0;
                    for (var pkgName in npmOralData) {
                        if (npmOralData[pkgName]) {
                            npmData[pkgName] = toValue(npmOralData[pkgName].downloads, +urlObj.params.interval);

                            if (max < npmData[pkgName].max) max = npmData[pkgName].max;
                            len += 1;
                        }
                    }

                    if (len <= 0) {
                        return;
                    }

                    // 获取画笔
                    var painter = canvasRender(_this._refs.mycanvas.value);

                    var width = +_this._refs.mycanvas.value.getAttribute('width');
                    var height = +_this._refs.mycanvas.value.getAttribute('height');

                    // 求解刻度尺
                    var rulerData = ruler(max, 0, 5);
                    var colors = getLoopColors(len);

                    // 绘制刻度尺
                    drawRuler(painter, {
                        x: 20,
                        y: 50,
                        value: rulerData,
                        direction: 'LR',
                        "mark-direction": 'left',
                        length: width - 70
                    });

                    for (var pkgName in npmData) {
                        painter.config({
                            strokeStyle: colors.shift()
                        }).beginPath();
                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            painter.lineTo(20 + (npmData[pkgName].value[index] / max) * (width - 70), 50 + (index / (npmData[pkgName].value.length - 1)) * (height - 70));
                        }
                        painter.stroke();
                    }


                });

            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/npm-download/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['316']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7]},{"type":"tag","name":"header","attrs":{"class":"top-title"},"childNodes":[2]},{"type":"tag","name":"div","attrs":{},"childNodes":[3,5]},{"type":"tag","name":"h2","attrs":{},"childNodes":[4]},{"type":"text","content":"Npm Download","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[8]},{"type":"text","content":"非常抱歉，您的浏览器不支持canvas!","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/npm-download/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['317']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"npm-download\"]>canvas{\n\nwidth: 100%;\n\nheight: calc(100% - 45px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/region
/*****************************************************************/
window.__pkg__bundleSrc__['142']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('128');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('143');
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
window.__pkg__bundleSrc__['128']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('129');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('131');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('129');
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
window.__pkg__bundleSrc__['129']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('130');
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
window.__pkg__bundleSrc__['130']=function(){
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
window.__pkg__bundleSrc__['131']=function(){
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
window.__pkg__bundleSrc__['143']=function(){
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

/*************************** [bundle] ****************************/
// Original file:./src/pages/npm-download/getValue
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('145');
var xhr =__pkg__scope_args__.default;


var date = new Date();
var year = date.getFullYear();
var month_day = "-" + (date.getMonth() - (-1)) + "-" + date.getDate();

__pkg__scope_bundle__.default= function (packages) {

    var pkgNames = packages.split(',');

    var promises = []
    for (var pkgName of pkgNames) {
        (function (pkgName) {
            promises.push(new Promise(function (resolve) {

                if (sessionStorage.getItem(pkgName)) {
                    resolve([pkgName, JSON.parse(sessionStorage.getItem(pkgName))])
                } else {

                    xhr({
                        method: "GET",
                        url: "https://api.npmjs.org/downloads/range/" + (year - 1) + month_day + ":" + year + month_day + "/" + pkgName,
                    }, function (data) {
                        if (data.status == 200) {
                            sessionStorage.setItem(pkgName, data.data);
                            var npmOralData = JSON.parse(data.data);
                            resolve([pkgName, npmOralData]);
                        }
                    });
                }

            }));
        })(pkgName);
    }

    return new Promise(function (resolve) {
        Promise.all(promises).then(function (data) {
            var npmOralData = {};
            for (var index = 0; index < data.length; index++) {
                npmOralData[data[index][0]] = data[index][1];
            }
            resolve(npmOralData);
        });
    });
}

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhr/index
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('146');
var toString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (settings, callback, errorback) {

    var xmlhttp;

    // 如果外部定义了
    if (isFunction(settings.xhr)) {
        xmlhttp = settings.xhr();
    }

    // 否则就内部创建
    else {
        xmlhttp = new XMLHttpRequest();
    }

    // 请求完成回调
    xmlhttp.onload = function () {

        if (xmlhttp.readyState == 4) {

            callback({

                // 状态码
                status: xmlhttp.status,

                // 数据
                data: xmlhttp.responseText

            });

        }
    };

    // 请求超时回调
    xmlhttp.ontimeout = function () {
        errorback({
            status: xmlhttp.status,
            data: "请求超时了"
        });
    };

    // 请求错误回调
    xmlhttp.onerror = function () {
        errorback({
            status: xmlhttp.status,
            data: xmlhttp.responseText
        });
    };

    xmlhttp.open(settings.method, settings.url, true);

    // 设置请求头
    for (var key in settings.header) {
        xmlhttp.setRequestHeader(key, settings.header[key]);
    }

    // 设置超时时间
    xmlhttp.timeout = 'timeout' in settings ? settings.timeout : 6000;

    xmlhttp.send(toString(settings.data));

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhr/toString
/*****************************************************************/
window.__pkg__bundleSrc__['146']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('53');
var isPlainObject =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('31');
var isString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (data) {

    // 如果是字符串
    if (isString(data)) {
        return data;
    }

    // 如果是JSON数据
    else if (isPlainObject(data)) {
        return JSON.stringify(data);
    }

    // 如果为空
    else if (data === undefined) {
        return "";
    }

    // 否则
    else {
        return data;
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/npm-download/toValue
/*****************************************************************/
window.__pkg__bundleSrc__['147']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (oralValue, interval) {

    var value = [], time = [], max = 0;

    for (var i = oralValue.length - 1; i >= interval - 1; i -= interval) {

        var temp = 0;
        for (var j = 0; j < interval; j++) {
            temp += oralValue[i - j].downloads;
        }

        if (max < temp) max = temp;

        // 数据
        value.unshift(temp);

        // 日期
        time.unshift(oralValue[i - interval + 1].day + "至" + (i == i - interval + 1 ? oralValue[i].day : oralValue[i].day));

    }

    return {
        value: value,
        time: time,
        max: max
    };

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ruler
/*****************************************************************/
window.__pkg__bundleSrc__['148']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 刻度尺刻度求解

// 需要注意的是，实际的间距个数可能是 num-1 或 num 或 num+1 或 1
__pkg__scope_bundle__.default= function (maxValue, minValue, num) {

    // 如果最大值最小值反了
    if (maxValue < minValue) {
        var temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    }

    // 如果相等
    else if (maxValue == minValue) {
        return [maxValue];
    }

    // 为了变成 -100 ~ 100 需要放大或者缩小的倍数
    var times100 =

        (function (_value) {

            // 先确定基调，是放大还是缩小
            var _times100_base = (_value < 100 && _value > -100) ? 10 : 0.1;

            // 记录当前缩放倍数
            var _times100 = -1, _tiemsValue = _value;

            while (_times100_base == 10 ?
                // 如果是放大，超过 -100 ~ 100 就应该停止
                (_tiemsValue >= -100 && _tiemsValue <= 100)
                :
                // 如果是缩小，进入 -100 ~ 100 就应该停止
                (_tiemsValue <= -100 || _tiemsValue >= 100)
            ) {

                _times100 += 1;
                _tiemsValue *= _times100_base;

            }

            if (_times100_base == 10) {
                return Math.pow(10, _times100);
            } else {

                // 解决类似 0.1 * 0.1 = 0.010000000000000002 浮点运算不准确问题
                var temp = "0.", i;
                for (i = 1; i < _times100; i++) {
                    temp += "0";
                }
                return +(temp + "1");
            }
        })

            // 根据差值来缩放
            (maxValue - minValue);


    // 求解出 -100 ~ 100 的最佳间距值 后直接转换原来的倍数
    var distance100 = Math.ceil((maxValue - minValue) * times100 / num);

    // 校对一下
    distance100 = {
        3: 2,
        4: 5,
        6: 5,
        7: 5,
        8: 10,
        9: 10,
        11: 10,
        12: 10,
        13: 15,
        14: 15,
        16: 15,
        17: 15,
        18: 20,
        19: 20,
        21: 20,
        22: 20,
        23: 25,
        24: 25,
        26: 25,
        27: 25
    }[distance100] || distance100;

    var distance = distance100 / times100;

    // 最小值，也就是起点
    var begin = Math.floor(minValue / distance) * distance;

    var rulerArray = [], index;
    // 获取最终的刻度尺数组
    rulerArray.push(begin);
    for (index = 1; rulerArray[rulerArray.length - 1] < maxValue; index++) {
        rulerArray.push(begin + distance * index);
    }

    return rulerArray;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/getLoopColors
/*****************************************************************/
window.__pkg__bundleSrc__['149']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 获取一组循环色彩
__pkg__scope_bundle__.default= function (num, alpha) {
    if (!(alpha && alpha >= 0 && alpha <= 1)) alpha = 1;
    // 颜色集合
    var colorList = [
        'rgba(84,112,198,' + alpha + ")", 'rgba(145,204,117,' + alpha + ")",
        'rgba(250,200,88,' + alpha + ")", 'rgba(238,102,102,' + alpha + ")",
        'rgba(115,192,222,' + alpha + ")", 'rgba(59,162,114,' + alpha + ")",
        'rgba(252,132,82,' + alpha + ")", 'rgba(154,96,180,' + alpha + ")",
        'rgba(234,124,204,' + alpha + ")"
    ];

    var colors = [];

    // 根据情况返回颜色数组
    if (num <= colorList.length) {
        // 这种情况就不需要任何处理
        return colorList;
    } else {
        // 如果正好是集合长度的倍数
        if (num % colorList.length == 0) {
            // 将颜色数组循环加入后再返回
            for (var i = 0; i < (num / colorList.length); i++) {
                colors = colors.concat(colorList);
            }
        } else {
            for (var j = 1; j < (num / colorList.length); j++) {
                colors = colors.concat(colorList);
            }
            // 防止最后一个颜色和第一个颜色重复
            if (num % colorList.length == 1) {
                colors = colors.concat(colorList[4]);
            } else {
                for (var k = 0; k < num % colorList.length; k++) {
                    colors = colors.concat(colorList[k]);
                }
            }
        }
    }

    // 返回结果
    return colors;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/extend/ruler
/*****************************************************************/
window.__pkg__bundleSrc__['150']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('151');
var dotRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('152');
var initConfig=__pkg__scope_args__.initConfig;


/**
 * attr = {
 *    x,y 刻度尺的起点位置
 *    direction 刻度尺的方向：LR|RL|TB|BT
 *    length 刻度尺的长度
 *    mark-direction 刻度尺小刻度在前进方向的位置：right|left
 *    value-position 刻度尺刻度文字的位置：mark|between
 *    color 刻度尺颜色
 *    value 值
 *    font-size 刻度文字大小
 *    deg 文字旋转度数
 * }
 */
__pkg__scope_bundle__.default= function (painter, attr) {
    var i, markPosition;

    var value = attr.value;

    attr = initConfig({
        "direction": "LR",
        "mark-direction": "right",
        "value-position": "mark",
        "color": 'black',
        "font-size": 12,
        deg: 0
    }, attr);

    painter.config({
        'lineWidth': 1,
        'fillStyle': attr.color,
        'strokeStyle': attr.color,
        'fontSize': attr["font-size"],
        'textAlign': (attr.direction == 'LR' || attr.direction == 'RL') ? 'center' : (
            (
                (attr.direction == 'BT' && attr["mark-direction"] == 'right') ||
                (attr.direction == 'TB' && attr["mark-direction"] == 'left')
            ) ? 'left' : 'right'
        ),
        "lineDash": [],
        'textBaseline': 'middle'
    });



    // 刻度尺终点坐标
    var endPosition;

    // 记录小刻度如何计算
    var dxy;

    if (attr.direction == 'LR') {
        endPosition = {
            x: attr.x + attr.length,
            y: attr.y
        };
        dxy = attr["mark-direction"] == 'right' ? [0, 1] : [0, -1];
    } else if (attr.direction == 'RL') {
        endPosition = {
            x: attr.x - attr.length,
            y: attr.y
        };
        dxy = attr["mark-direction"] == 'right' ? [0, -1] : [0, 1];
    } else if (attr.direction == 'TB') {
        endPosition = {
            x: attr.x,
            y: attr.y + attr.length
        };
        dxy = attr["mark-direction"] == 'right' ? [-1, 0] : [1, 0];
    } else if (attr.direction == 'BT') {
        endPosition = {
            x: attr.x,
            y: attr.y - attr.length
        };
        dxy = attr["mark-direction"] == 'right' ? [1, 0] : [-1, 0];
    } else {

        // 错误提示
        throw new Error('Type error!');
    }

    // 绘制主轴
    painter.beginPath().moveTo(attr.x, attr.y).lineTo(endPosition.x, endPosition.y).stroke();

    var markNumber = attr["value-position"] == "mark" ? value.length : value.length + 1;

    // 绘制刻度
    var distanceLength = attr.length / (markNumber - 1);

    var dot = dotRender({
        d: [
            endPosition.x - attr.x,
            endPosition.y - attr.y
        ],
        p: [
            attr.x,
            attr.y
        ]
    });

    for (i = 0; i < markNumber; i++) {

        // 刻度
        markPosition = dot.value();
        painter.beginPath().moveTo(markPosition[0], markPosition[1]).lineTo(
            markPosition[0] + dxy[0] * 5,
            markPosition[1] + dxy[1] * 5
        ).stroke();

        dot.move(distanceLength);
    }

    // 绘制刻度上的读数
    dot = dotRender({
        d: [
            endPosition.x - attr.x,
            endPosition.y - attr.y
        ],
        p: [
            attr.x,
            attr.y
        ]
    });

    if (attr["value-position"] == "between") dot.move(distanceLength * 0.5);

    for (i = 0; i < value.length; i++) {
        markPosition = dot.value();
        painter.fillText(value[i], markPosition[0] + dxy[0] * 15, markPosition[1] + dxy[1] * 15, attr.deg);
        dot.move(distanceLength);
    }

    return painter;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/transform/dot
/*****************************************************************/
window.__pkg__bundleSrc__['151']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('152');
var initConfig=__pkg__scope_args__.initConfig;

__pkg__scope_args__=window.__pkg__getBundle('153');
var move =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('154');
var rotate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('155');
var scale =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (config) {

    config = initConfig({
        // 前进方向
        d: [1, 1],
        // 中心坐标
        c: [0, 0],
        // 当前位置
        p: [0, 0]
    }, config);

    var dotObj = {

        // 前进方向以当前位置为中心，旋转deg度
        "rotate": function (deg) {
            var dPx = config.d[0] + config.p[0], dPy = config.d[1] + config.p[1];
            var dP = rotate(config.p[0], config.p[1], deg, dPx, dPy);
            config.d = [
                dP[0] - config.p[0],
                dP[1] - config.p[1]
            ];
            return dotObj;
        },

        // 沿着当前前进方向前进d
        "move": function (d) {
            config.p = move(config.d[0], config.d[1], d, config.p[0], config.p[1]);
            return dotObj;
        },

        // 围绕中心坐标缩放
        "scale": function (times) {
            config.p = scale(config.c[0], config.c[1], times, config.p[0], config.p[1]);
            return dotObj;
        },

        // 当前位置
        "value": function () {
            return config.p;
        }

    };

    return dotObj;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/config
/*****************************************************************/
window.__pkg__bundleSrc__['152']=function(){
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
// Original file:./src/tool/transform/move
/*****************************************************************/
window.__pkg__bundleSrc__['153']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 点（x,y）沿着向量（ax,ay）方向移动距离d
__pkg__scope_bundle__.default= function (ax, ay, d, x, y) {
    var sqrt = Math.sqrt(ax * ax + ay * ay);
    return [
        +(ax * d / sqrt + x).toFixed(7),
        +(ay * d / sqrt + y).toFixed(7)
    ];
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/transform/rotate
/*****************************************************************/
window.__pkg__bundleSrc__['154']=function(){
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
// Original file:./src/tool/transform/scale
/*****************************************************************/
window.__pkg__bundleSrc__['155']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 点（x,y）围绕中心（cx,cy）缩放times倍
__pkg__scope_bundle__.default= function (cx, cy, times, x, y) {
    return [
        +(times * (x - cx) + cx).toFixed(7),
        +(times * (y - cy) + cy).toFixed(7)
    ];
};

    return __pkg__scope_bundle__;
}
