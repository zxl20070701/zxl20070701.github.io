
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/bar-polar-real-estate/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['204']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('340');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('341');


__pkg__scope_args__=window.__pkg__getBundle('259');
var ResizeObserver =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('142');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('148');
var ruler =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('154');
var rotate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('149');
var getLoopColors =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('338');
var drawRectRadius =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var i, y, p1, p2, indexs;

            var data = [

                // 最低、最高、平均
                ["北京", 5000, 10000, 6785.71],
                ["上海", 4000, 10000, 6825],
                ["深圳", 3000, 6500, 4463.33],
                ["广州", 2500, 5600, 3793.83],
                ["苏州", 2000, 4000, 3060],
                ["杭州", 2000, 4000, 3222.33],
                ["南京", 2500, 4000, 3133.33],
                ["福州", 1800, 4000, 3100],
                ["青岛", 2000, 3500, 2750],
                ["济南", 2000, 3000, 2500],
                ["长春", 1800, 3000, 2433.33],
                ["大连", 2000, 2700, 2375],
                ["温州", 1500, 2800, 2150],
                ["郑州", 1500, 2300, 2100],
                ["武汉", 1600, 3500, 2057.14],
                ["成都", 1500, 2600, 2037.5],
                ["东莞", 1500, 2417.54, 1905.85],
                ["沈阳", 1500, 2000, 1775],
                ["烟台", 1500, 1800, 1650]
            ];

            var colors = getLoopColors(2);

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;
            var mytooltip = this._refs.mytooltip.value;

            var painter;

            var beginDeg, deg = Math.PI * 2 / data.length, maxValue = 0, cx, cy, radius, distV;

            // 求解最大值
            for (i = 0; i < data.length; i++) {
                if (maxValue < data[i][2]) {
                    maxValue = data[i][2];
                }
            }

            // 刻度尺
            var rulerData = ruler(maxValue, 0, 5);

            // 监听画布大小改变
            ResizeObserver(mycontent, function () {
                painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight, true);

                // 圆心和半径
                cx = mycontent.clientWidth * 0.5;
                cy = mycontent.clientHeight * 0.5;
                radius = Math.max(Math.min(cx, cy) * 0.75, 0);

                distV = radius / rulerData[rulerData.length - 1];

                if (radius <= 0) return;

                painter.clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight);

                beginDeg = Math.PI * -0.5;

                // 左上文字
                painter.config({
                    "fontSize": 18,
                    "fontWeight": 800
                }).fillText("How expensive is it to rent an apartment in China?", 20, 20)
                    .config({
                        "fontSize": 12,
                        "fontWeight": 400,
                        "fillStyle": "#70727b"
                    }).fillText("Data from https://www.numbeo.com", 20, 45);

                // 绘制垂直刻度尺和圆
                painter.config({
                    'textAlign': "right"
                });
                for (i = 0; i < rulerData.length; i++) {
                    y = cy - radius / (rulerData.length - 1) * i;

                    // 圆
                    painter.config({
                        "strokeStyle": i == rulerData.length - 1 ? "#70727b" : "#edf1f7"
                    }).strokeCircle(cx, cy, radius / (rulerData.length - 1) * i);

                    // 刻度
                    painter.config({
                        "fillStyle": "#6e7079",
                        "strokeStyle": "#6e7079"
                    }).fillText(rulerData[i], cx - 7, y)
                        .beginPath().moveTo(cx, y).lineTo(cx - 5, y).stroke();
                }

                // 垂直线
                painter.beginPath().moveTo(cx, cy).lineTo(cx, cy - radius).stroke();

                // 图例

                painter.config({
                    "fillStyle": colors[0]
                });
                drawRectRadius(painter, cx - 85, mycontent.clientHeight - 30, 30, 16, 5).fill()
                    .config({
                        "fillStyle": "black",
                        "textAlign": "left"
                    }).fillText("Range", cx - 50, mycontent.clientHeight - 22);

                painter.config({
                    "fillStyle": colors[1]
                });
                drawRectRadius(painter, cx + 5, mycontent.clientHeight - 30, 30, 16, 5).fill()
                    .config({
                        "fillStyle": "black"
                    }).fillText("Average", cx + 40, mycontent.clientHeight - 22);

                // 绘制圆刻度尺和内容
                painter.config({
                    "textAlign": "center"
                });
                for (i = 0; i < data.length; i++) {
                    painter.setRegion("");

                    p1 = rotate(cx, cy, beginDeg + deg * 0.5, cx + radius + 20, cy);

                    // 刻度值
                    painter.config({
                        "fillStyle": "#6e7079"
                    }).fillText(data[i][0], p1[0], p1[1]);

                    p1 = rotate(cx, cy, beginDeg + deg, cx + radius, cy);
                    p2 = rotate(cx, cy, beginDeg + deg, cx + radius + 5, cy);

                    // 刻度线
                    painter.beginPath().moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).stroke();

                    // 绘制最高最低
                    painter.setRegion("0-" + i).config({
                        "fillStyle": colors[0]
                    }).fillArc(cx, cy, distV * data[i][1], distV * data[i][2], beginDeg + deg * 0.1, deg * 0.8);

                    // 绘制平均
                    painter.setRegion("1-" + i).config({
                        "fillStyle": colors[1]
                    }).fillArc(cx, cy, distV * data[i][3] - 1, distV * data[i][3] + 1, beginDeg + deg * 0.1, deg * 0.8);

                    beginDeg += deg;
                }

            });

            var currentRegion = false;
            mycanvas.addEventListener('mousemove', function (event) {
                if (painter) {
                    var regionName = painter.getRegion(event);
                    if (regionName) {

                        if (regionName != currentRegion) {
                            mytooltip.style.display = '';

                            indexs = regionName.split('-');

                            // 修改悬浮框内容
                            mytooltip.innerHTML = "<div style='border-color:" + colors[indexs[0]] + "'><h6>" + data[indexs[1]][0] + "</h6>" +
                                "<div>Lowest：" + data[indexs[1]][1] + "</div>" +
                                "<div>Highest：" + data[indexs[1]][2] + "</div>" +
                                "<div>Average：" + data[indexs[1]][3] + "</div></div>";

                            currentRegion = regionName;
                        }

                        // 修改悬浮框位置
                        mytooltip.style.left = (event.offsetX + 20) + "px";
                        mytooltip.style.top = (event.offsetY + 20) + "px";

                    }

                    // 隐藏悬浮框
                    else if (currentRegion) {
                        currentRegion = false;
                        mytooltip.style.display = 'none';
                    }
                }
            });
        }

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/bar-polar-real-estate/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['340']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"极坐标下的柱状图","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content bar-polar-real-estate","ref":"mycontent"},"childNodes":[11,12]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tooltip","ref":"mytooltip"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/bar-polar-real-estate/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['341']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='echarts-example']>div.bar-polar-real-estate{\n\nposition: relative;\n\n}\n\n [dialog-view='echarts-example']>div.bar-polar-real-estate .tooltip{\n\nposition: absolute;\n\ntransition-duration: 100ms;\n\ntransition-timing-function: linear;\n\ntransition-property: left top;\n\npointer-events: none;\n\n}\n\n [dialog-view='echarts-example']>div.bar-polar-real-estate .tooltip>div{\n\nbox-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;\n\nborder-style: solid;\n\nbackground-color: rgb(255, 255, 255);\n\nborder-width: 1px;\n\nborder-radius: 4px;\n\ncolor: rgb(102, 102, 102);\n\nfont: 14px / 21px sans-serif;\n\npadding: 10px;\n\ntext-align: left;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ResizeObserver
/*****************************************************************/
window.__pkg__bundleSrc__['259']=function(){
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
// Original file:./src/tool/canvas/extend/rectRadius
/*****************************************************************/
window.__pkg__bundleSrc__['338']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 绘制圆角矩形
 * @param {Painter} painter 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number} radius 
 * @returns Painter
 */
__pkg__scope_bundle__.default= function (painter, x, y, width, height, radius) {

    var _width = width, _height = height, _borderRadius = radius, _x = x + width, _y = y + height;

    return painter
        .beginPath()
        .arc(_x - _borderRadius, _y - _borderRadius, _borderRadius, Math.PI * 0.5, -Math.PI * 0.5)
        .arc(_x - _borderRadius, _y - _height + _borderRadius, _borderRadius, 0, -0.5 * Math.PI)
        .arc(_x - _width + _borderRadius, _y - _height + _borderRadius, _borderRadius, Math.PI * 1.5, -0.5 * Math.PI)
        .arc(_x - _width + _borderRadius, _y - _borderRadius, _borderRadius, Math.PI, -0.5 * Math.PI)
        .closePath();
};

    return __pkg__scope_bundle__;
}
