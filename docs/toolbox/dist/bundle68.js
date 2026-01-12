
/*************************** [bundle] ****************************/
// Original file:./src/mobile/echarts/dialogs/line-multiple-x-axis/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['315']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('398');
var template =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('129');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('149');
var ruler =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('111');
var cardinal =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('110');
var animation =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "echarts-example",
        render: template,
        mounted: function () {

            var i, j, x, y;

            var data = [{
                year: "2015",
                value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                color: "#5470C6"
            }, {
                year: "2016",
                value: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
                color: "#EE6666"
            }]

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var painter, updateView, maxValue = 0, calcY, hadInit, itemWidth;

            // 求解值总数
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < data[i].value.length; j++) {
                    if (data[i].value[j] > maxValue) maxValue = data[i].value[j];
                }
            }

            // 刻度尺
            var rulerData = ruler(maxValue, 0, 5);

            // 留白大小
            var grid = {
                left: 30,
                top: 50,
                right: 70,
                bottom: 30
            };

            itemWidth = (mycontent.clientHeight - grid.top - grid.bottom) / data[0].value.length;

            hadInit = false;
            painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight);

            // 根据值计算出对应的坐标y值
            calcY = function (value) {
                return mycontent.clientWidth - (rulerData[rulerData.length - 1] - value) / rulerData[rulerData.length - 1] * (mycontent.clientWidth - grid.left - grid.right) - grid.right;
            };

            // 生成点真实位置
            var pointsTop = [], pointsBottom = [];
            for (i = 0; i < data[0].value.length; i++) {
                x = (i + 0.5) * ((mycontent.clientHeight - grid.top - grid.bottom) / data[0].value.length) + grid.top;

                pointsTop.push([x, calcY(data[0].value[i])]);
                pointsBottom.push([x, calcY(data[1].value[i])]);
            }

            // 生成插值函数实例
            var cardinalTop = cardinal().setP(pointsTop);
            var cardinalBottom = cardinal().setP(pointsBottom);

            updateView = function (deep, hoverData) {
                painter.clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight).config({
                    "fontSize": 10
                });

                // 垂直刻度尺
                painter.config({
                    "textAlign": "right",
                    "fillStyle": "#6e7079",
                    "lineWidth": 1,
                    "lineDash": []
                });
                for (i = 0; i < rulerData.length; i++) {
                    y = calcY(rulerData[i]);

                    painter.fillText(rulerData[i], y, grid.top - 5, Math.PI * 0.5);

                    painter.config({
                        "strokeStyle": i == 0 ? data[1].color : i == rulerData.length - 1 ? data[0].color : "#e0e6f1"
                    }).beginPath().moveTo(y, grid.top).lineTo(y, mycontent.clientHeight - grid.bottom).stroke();
                }

                // 上边水平刻度尺
                painter.config({
                    "textAlign": "center",
                    "strokeStyle": data[0].color,
                    "fillStyle": data[0].color,
                    "fontSize": 8
                });
                for (i = 0; i < data[0].value.length; i++) {
                    x = (i + 0.5) * itemWidth + grid.top;

                    painter.fillText(data[0].year + "-" + (i + 1), mycontent.clientWidth - grid.right + 15, x, Math.PI * 0.5);
                    painter.beginPath().moveTo(mycontent.clientWidth - grid.right, x).lineTo(mycontent.clientWidth - grid.right + 5, x).stroke();
                }

                // 下边水平刻度尺
                painter.config({
                    "strokeStyle": data[1].color,
                    "fillStyle": data[1].color
                });
                for (i = 0; i < data[1].value.length; i++) {
                    x = (i + 0.5) * itemWidth + grid.top;
                    y = grid.left;

                    painter.fillText(data[1].year + "-" + (i + 1), y - 15, x, Math.PI * 0.5);
                    painter.beginPath().moveTo(y, x).lineTo(y - 5, x).stroke();
                }

                // 第一个图例
                painter.config({
                    "fillStyle": "white",
                    "strokeStyle": data[0].color,
                    "lineWidth": 2,
                    "textAlign": "left"
                })
                    .beginPath().moveTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 140).lineTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 110).stroke()
                    .fullCircle(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 125, 5)
                    .config({
                        "fillStyle": "black"
                    })
                    .fillText('Precipitation(' + data[0].year + ')', mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 100, Math.PI * 0.5);

                // 第二个图例
                painter.config({
                    "fillStyle": "white",
                    "strokeStyle": data[1].color,
                    "lineWidth": 2
                })
                    .beginPath().moveTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 20).lineTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 50).stroke()
                    .fullCircle(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 35, 5)
                    .config({
                        "fillStyle": "black"
                    })
                    .fillText('Precipitation(' + data[1].year + ')', mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 60, Math.PI * 0.5);

                // 第一个曲线
                painter.config({
                    "strokeStyle": data[0].color,
                    "lineWidth": 2
                }).beginPath();
                for (x = grid.top; x < (mycontent.clientHeight - grid.top) * deep + grid.top - grid.bottom; x += 5) {
                    painter.lineTo(cardinalTop(x), x);
                }
                painter.stroke();

                // 第二个曲线
                painter.config({
                    "strokeStyle": data[1].color
                }).beginPath();
                for (x = grid.top; x < (mycontent.clientHeight - grid.top) * deep + grid.top - grid.bottom; x += 5) {
                    painter.lineTo(cardinalBottom(x), x);
                }
                painter.stroke();

                // 显示悬浮
                if (hoverData) {

                    // 垂直线条
                    painter.config({
                        "lineDash": [2],
                        "strokeStyle": "black",
                        "lineWidth": 1
                    })
                        .beginPath().moveTo(hoverData.yAxis.top, grid.top).lineTo(hoverData.yAxis.top, mycontent.clientHeight - grid.top).stroke()
                        .beginPath().moveTo(grid.left, hoverData.xAxis.left).lineTo(mycontent.clientWidth - grid.right, hoverData.xAxis.left).stroke();

                    // 左侧提示
                    painter.config({
                        "fillStyle": "black"
                    }).fillRect(hoverData.yAxis.top - 10, grid.top - 40, 20, 40)
                        .config({
                            "fillStyle": "white",
                            "textAlign": "center",
                            "fontSize": 10
                        })
                        .fillText(hoverData.yAxis.value, hoverData.yAxis.top, grid.top - 20, Math.PI * 0.5);

                    // 顶部提示
                    painter.config({
                        "fillStyle": data[0].color
                    }).fillRect(mycontent.clientWidth - grid.right + 4, hoverData.xAxis.left - 90, 20, 180)
                        .config({
                            "fillStyle": "white"
                        }).fillText("Precipitation " + data[0].year + "-" + (hoverData.xAxis.index + 1) + " " + data[0].value[hoverData.xAxis.index], mycontent.clientWidth - grid.right + 14, hoverData.xAxis.left, Math.PI * 0.5);

                    // 底部提示
                    painter.config({
                        "fillStyle": data[1].color
                    }).fillRect(grid.left - 24, hoverData.xAxis.left - 90, 20, 180)
                        .config({
                            "fillStyle": "white"
                        }).fillText("Precipitation " + data[1].year + "-" + (hoverData.xAxis.index + 1) + " " + data[1].value[hoverData.xAxis.index], grid.left - 14, hoverData.xAxis.left, Math.PI * 0.5);

                }

                if (deep == 1) {
                    painter.config({
                        "fillStyle": "white",
                        "lineDash": [],
                        "lineWidth": 2
                    });
                    for (i = 0; i < data.length; i++) {
                        for (j = 0; j < data[i].value.length; j++) {
                            painter.config({
                                "strokeStyle": data[i].color
                            }).fullCircle(calcY(data[i].value[j]), (j + 0.5) * itemWidth + grid.top, (hoverData && hoverData.xAxis.index == j) ? 5 : 3);
                        }
                    }
                }

            };

            animation(function (deep) {
                updateView(deep);
            }, 1000, function () {
                hadInit = true;
            });

            // 注册鼠标移动事件
            var hasCurrent;
            var doMove = function (event) {

                var offsetY = event.touches[0].clientX - 20;
                var offsetX = event.touches[0].clientY - 65;

                // 完成初始化以后才响应鼠标事件
                if (hadInit) {

                    // 悬浮提示
                    if (offsetX > grid.top && offsetX < mycontent.clientHeight - grid.bottom && offsetY > grid.left && offsetY < mycontent.clientWidth - grid.right) {

                        var index = Math.floor((offsetX - grid.top) / itemWidth);

                        updateView(1, {
                            xAxis: {
                                index: index,
                                left: (index + 0.5) * itemWidth + grid.top
                            },
                            yAxis: {
                                value: ((1 - (mycontent.clientWidth - offsetY - grid.right) / (mycontent.clientWidth - grid.left - grid.right)) * rulerData[rulerData.length - 1]).toFixed(2),
                                top: offsetY
                            }
                        });
                        hasCurrent = true;
                    }

                    // 出悬浮区域，隐藏悬浮提示
                    else if (hasCurrent) {
                        updateView(1);
                        hasCurrent = false;
                    }

                }
            };

            mycanvas.addEventListener('touchstart', doMove);
            mycanvas.addEventListener('touchmove', doMove);

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/echarts/dialogs/line-multiple-x-axis/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['398']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,6]},{"type":"tag","name":"header","attrs":{"class":"dialog-title"},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"多X轴折线图","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[5]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"mycontent"},"childNodes":[7]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['129']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('130');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('132');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('130');
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
window.__pkg__bundleSrc__['130']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('131');
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
window.__pkg__bundleSrc__['131']=function(){
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
window.__pkg__bundleSrc__['132']=function(){
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
// Original file:./src/tool/ruler
/*****************************************************************/
window.__pkg__bundleSrc__['149']=function(){
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
