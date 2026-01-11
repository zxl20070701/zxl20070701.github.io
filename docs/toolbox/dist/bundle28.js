
/*************************** [bundle] ****************************/
// Original file:./src/pages/geo-json/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['84']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('296');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('297');


__pkg__scope_args__=window.__pkg__getBundle('298');
var getBoundary =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('128');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('299');
var eoapFactory =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('300');
var drawGeometry =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "geo-json",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "geoJSON查看器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './geoJSON.png');
        },

        methods: {

            openDownload: function () {
                this.$openView("browser", {
                    url: "http://datav.aliyun.com/portal/school/atlas/area_selector"
                });
            },

            triggleFile: function () {
                this._refs.file.value.click();
            },

            inputLocalFile: function (event, target) {
                var _this = this;

                var file = target.files[0];
                var reader = new FileReader();

                reader.onload = function () {

                    try {
                        var geoJSON = JSON.parse(reader.result);
                        var boundary = getBoundary(geoJSON);

                        var painter = canvasRender(_this._refs.mycanvas.value, 800, 600);
                        var eoap = eoapFactory({
                            scale: Math.min(420 / (boundary.maxX - boundary.minX), 300 / (boundary.maxY - boundary.minY)),
                            center: [(boundary.minX + boundary.maxX) * 0.5, (boundary.minY + boundary.maxY) * 0.5]
                        });

                        var i, cx = 400, cy = 300;

                        // 绘制区域

                        painter.config({
                            strokeStyle: "#555555",
                            fillStyle: "white"
                        });

                        for (var i = 0; i < geoJSON.features.length; i++) {
                            drawGeometry(eoap, painter, cx, cy, geoJSON.features[i].geometry);
                        }

                        // 绘制名称

                        painter.config({
                            textAlign: "center",
                            fillStyle: "black",
                            "fontSize": 10
                        });

                        var dxy;
                        for (var i = 0; i < geoJSON.features.length; i++) {
                            if (Array.isArray(geoJSON.features[i].properties.center)) {
                                dxy = eoap(geoJSON.features[i].properties.center[0], geoJSON.features[i].properties.center[1]);
                                painter.fillText(geoJSON.features[i].properties.name, cx + dxy[0], cy + dxy[1]);
                            }
                        }

                    } catch (e) {
                        console.error(e);
                        alert('出现错误导致程序执行中断，你可以带着当前使用的GeoJSON去（ ' + window._project_.bugs + ' ）给我们留言。');
                    }
                };

                reader.readAsText(file);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/geo-json/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['296']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,11,12,15]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,6]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"geoJSON查看器","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"triggleFile"},"childNodes":[5]},{"type":"text","content":"选择文件","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[7,9]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[8]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[10]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"help-url"},"childNodes":[13]},{"type":"tag","name":"a","attrs":{"href":"javascript:void(0)","ui-on:click":"openDownload"},"childNodes":[14]},{"type":"text","content":"点击我进入GeoJSON下载页面","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"no-view"},"childNodes":[16]},{"type":"tag","name":"input","attrs":{"type":"file","ref":"file","ui-on:change":"inputLocalFile","accept":".json"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/geo-json/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['297']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"geo-json\"]{\n\nleft: calc(50vw - 400px);\n\ntop: 20px;\n\nfont-size: 0;\n\n}\n\n [page-view=\"geo-json\"][focus=\"no\"]>header{\n\nbackground-color: #e8eaed;\n\n}\n\n [page-view=\"geo-json\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nborder-bottom: 1px solid rgb(187, 184, 184);\n\n}\n\n [page-view=\"geo-json\"]>header>h2{\n\ncolor: #49b4f1;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./geoJSON.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"geo-json\"]>header>button{\n\nfloat: right;\n\nheight: 30px;\n\npadding: 0 10px;\n\nborder: none;\n\nmargin-top: 10px;\n\ncursor: pointer;\n\nbackground-color: red;\n\ncolor: white;\n\nmargin-right: 200px;\n\nborder-radius: 15px;\n\n}\n\n [page-view=\"geo-json\"]>canvas{\n\nwidth: 800px;\n\nheight: 600px;\n\n}\n\n [page-view=\"geo-json\"]>div.help-url{\n\nposition: absolute;\n\nleft: 10px;\n\nbottom: 10px;\n\n}\n\n [page-view=\"geo-json\"]>div.help-url>a{\n\nfont-size: 12px;\n\ncolor: #000000;\n\ntext-decoration: underline;\n\n}\n\n [page-view=\"geo-json\"]>div.no-view{\n\ndisplay: none;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/map/getBoundary
/*****************************************************************/
window.__pkg__bundleSrc__['298']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var calcMultiPolygon = function (data) {

    var minX = data[0][0][0][0],
        maxX = data[0][0][0][0],
        minY = data[0][0][0][1],
        maxY = data[0][0][0][1],
        i,
        temp;

    for (i = 0; i < data.length; i++) {
        temp = calcPolygon(data[i]);

        if (temp.minX < minX) minX = temp.minX;
        if (temp.maxX > maxX) maxX = temp.maxX;
        if (temp.minY < minY) minY = temp.minY;
        if (temp.maxY > maxY) maxY = temp.maxY;

    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };

};

var calcPolygon = function (data) {

    var minX = data[0][0][0],
        maxX = data[0][0][0],
        minY = data[0][0][1],
        maxY = data[0][0][1],
        i,
        j;

    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {

            if (minX > data[i][j][0]) minX = data[i][j][0];
            else if (maxX < data[i][j][0]) maxX = data[i][j][0];

            if (minY > data[i][j][1]) minY = data[i][j][1];
            else if (maxY < data[i][j][1]) maxY = data[i][j][1];

        }
    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };

};

var calcFeatureCollection = function (data) {

    var temp = calcFeature(data.features[0]),
        minX = temp.minX,
        maxX = temp.maxX,
        minY = temp.minY,
        maxY = temp.maxY,
        i,
        temp;

    for (i = 1; i < data.features.length; i++) {
        temp = calcFeature(data.features[i]);

        if (temp.minX < minX) minX = temp.minX;
        if (temp.maxX > maxX) maxX = temp.maxX;
        if (temp.minY < minY) minY = temp.minY;
        if (temp.maxY > maxY) maxY = temp.maxY;
    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };

};

var calcFeature = function (data) {

    if (data.geometry.type == 'Polygon' || data.geometry.type == 'MultiLineString') {
        return calcPolygon(data.geometry.coordinates);
    } else {
        return calcMultiPolygon(data.geometry.coordinates);
    }

};

__pkg__scope_bundle__.default= function (data) {

    if (data.type == 'FeatureCollection') {
        return calcFeatureCollection(data);
    } else if (data.type == 'Feature') {
        return calcFeature(data);
    } else {
        throw new Error('Type error：不是一个合法的geoJSON数据!');
    }

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
// Original file:./src/tool/map/eoap
/*****************************************************************/
window.__pkg__bundleSrc__['299']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
/* 等角斜方位投影 */

var
    // 围绕X轴旋转
    _rotateX = function (deg, x, y, z) {
        var cos = Math.cos(deg), sin = Math.sin(deg);
        return [x, y * cos - z * sin, y * sin + z * cos];
    },
    // 围绕Y轴旋转
    _rotateY = function (deg, x, y, z) {
        var cos = Math.cos(deg), sin = Math.sin(deg);
        return [z * sin + x * cos, y, z * cos - x * sin];
    },
    // 围绕Z轴旋转
    _rotateZ = function (deg, x, y, z) {
        var cos = Math.cos(deg), sin = Math.sin(deg);
        return [x * cos - y * sin, x * sin + y * cos, z];
    };

var p = [];

/*
config = {
    // 缩放比例
    scale: 1,

    // 投影中心经纬度
    center: [107, 36]
} 
*/
__pkg__scope_bundle__.default= function (config) {

    if (!('scale' in config)) config.scale = 1;
    if (!('center' in config)) config.center = [107, 36];

    return function (longitude, latitude) {
        /**
         * 通过旋转的方法
         * 先旋转出点的位置
         * 然后根据把地心到旋转中心的这条射线变成OZ这条射线的变换应用到初始化点上
         * 这样求的的点的x,y就是最终结果
         *
         *  计算过程：
         *  1.初始化点的位置是p（x,0,0）,其中x的值是地球半径除以缩放倍速
         *  2.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
         *  3.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
         *  4.接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la
         *  5.然后再对p进行经度度旋转lo获得新的p
         *  6.然后再对p进行纬度旋转la获得新的p
         *  7.旋转结束
         *
         * 特别注意：第5和第6步顺序一定不可以调换，原因来自经纬度定义上
         * 【除了经度为0的位置，不然纬度的旋转会改变原来的经度值，反过来不会】
         *
         */
        p = _rotateY((360 - latitude) / 180 * Math.PI, 100 * config.scale, 0, 0);
        p = _rotateZ(longitude / 180 * Math.PI, p[0], p[1], p[2]);
        p = _rotateZ((90 - config.center[0]) / 180 * Math.PI, p[0], p[1], p[2]);
        p = _rotateX((90 - config.center[1]) / 180 * Math.PI, p[0], p[1], p[2]);

        return [
            -p[0], // 加-号是因为浏览器坐标和地图不一样
            p[1],
            p[2]
        ];
    };
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/map/drawGeometry
/*****************************************************************/
window.__pkg__bundleSrc__['300']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('301');
var drawPolygon =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (map, painter, cx, cy, geometry) {
    var i, j;

    if (geometry.type == 'Polygon') {
        for (j = 0; j < geometry.coordinates.length; j++) {
            drawPolygon(map, painter, cx, cy, geometry.coordinates[j]);
            painter.closePath().full();
        }
    } else if (geometry.type == 'MultiLineString') {
        for (j = 0; j < geometry.coordinates.length; j++) {
            drawPolygon(map, painter, cx, cy, geometry.coordinates[j]);
            painter.stroke();
        }
    } else if (geometry.type == 'MultiPolygon') {
        for (i = 0; i < geometry.coordinates.length; i++) {
            for (j = 0; j < geometry.coordinates[i].length; j++) {
                drawPolygon(map, painter, cx, cy, geometry.coordinates[i][j]);
                painter.closePath().full();
            }
        }
    } else {
        throw new Error('不支持的几何类型：' + geometry.type);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/map/drawPolygon
/*****************************************************************/
window.__pkg__bundleSrc__['301']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (map, painter, cx, cy, coordinates) {
    var i, dxy;

    painter.beginPath();
    for (i = 0; i < coordinates.length; i++) {
        dxy = map(coordinates[i][0], coordinates[i][1]);
        painter.lineTo(cx + dxy[0], cy + dxy[1]);
    }
};

    return __pkg__scope_bundle__;
}
