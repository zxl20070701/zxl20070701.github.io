
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/zoom-line/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['206']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('321');
var template =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('277');
var ResizeObserver =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('322');
var data =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('122');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('142');
var ruler =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('323');
var throttle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('324');
var PointIn =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bindEvent =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var color = "#e94782";
            var gradient = ['rgb(255, 158, 68)', 'rgb(255, 70, 131)'];

            var boxWidth, boxHeight;

            var grid = {
                left: 55,
                top: 20,
                right: 55,
                bottom: 30
            };

            var zoom = {
                x: 0,
                y: 0,
                height: 26,
                width: 0,
                bottom: 10,
                beginIndex: Math.round((data.length - 1) * 0.3),
                endIndex: Math.round((data.length - 1) * 0.7)
            };

            var min = data[0].value, max = data[0].value;
            for (var item of data) {
                if (item.value > max) max = item.value;
                if (item.value < min) min = item.value;
            }

            var pointIn = new PointIn(), zoomPosition = 0, zoomHandler = "", handler1x = 0, handler2x = 0, zoomIndexOne = 0, zoomValueOne = 0, updateView = null;

            var helpCache = { beginIndex: 0, endIndex: 0 };

            bindEvent(mycontent, "mousedown", function (event) {
                if (!updateView) return;
                pointIn.setPoint(event.offsetX, event.offsetY);

                if (pointIn.rect(handler1x - 3, zoom.y, 6, zoom.height)) zoomHandler = "beginIndex";
                else if (pointIn.rect(handler2x - 3, zoom.y, 6, zoom.height)) zoomHandler = "endIndex";
                else if (pointIn.rect(handler1x, zoom.y - 7, handler2x - handler1x, 7)) {
                    zoomPosition = event.offsetX;
                    helpCache.beginIndex = zoom.beginIndex;
                    helpCache.endIndex = zoom.endIndex;
                }
            });

            bindEvent(mycontent, "mousemove", function (event) {
                // 修改边界
                if (zoomHandler) {
                    var x;
                    if (event.offsetX <= zoom.x) x = 0;
                    else if (event.offsetX >= zoom.x + zoom.width) x = zoom.width;
                    else x = event.offsetX - zoom.x;

                    var index = Math.round(x / zoomIndexOne);

                    if (zoom[zoomHandler] != index) {
                        zoom[zoomHandler] = index

                        if (zoom.beginIndex > zoom.endIndex) {
                            var temp = zoom.beginIndex;
                            zoom.beginIndex = zoom.endIndex;
                            zoom.endIndex = temp;
                            zoomHandler = zoomHandler == "beginIndex" ? "endIndex" : "beginIndex";
                        }
                        updateView(true);
                    }
                }

                // 移动
                else if (zoomPosition) {
                    var indexChange = Math.round((event.offsetX - zoomPosition) / zoomIndexOne);
                    if (helpCache.beginIndex + indexChange < 0) indexChange = -helpCache.beginIndex;
                    else if (helpCache.endIndex + indexChange >= data.length) indexChange = data.length - helpCache.endIndex - 1;

                    zoom.beginIndex = helpCache.beginIndex + indexChange;
                    zoom.endIndex = helpCache.endIndex + indexChange;
                    updateView(true);
                }
            });

            bindEvent(mycontent, "mouseup", function (event) {
                if (zoomHandler || zoomPosition) {
                    zoomHandler = "";
                    zoomPosition = 0;
                    updateView(false);
                }
            });

            var zoomCache = null;
            var getZoomBackground = function (painter) {
                return new Promise(function (resolve) {
                    if (zoomCache) resolve(zoomCache)
                    else {

                        // 轮廓
                        painter.config({
                            strokeStyle: "#e8ecf6"
                        }).strokeRect(zoom.x, zoom.y, zoom.width, zoom.height);

                        // 内容
                        painter.config({
                            fillStyle: "#ebeff8",
                            lineWidth: 2,
                            lineJoin: "round"
                        }).beginPath();
                        for (var index = 0; index < data.length; index++) {
                            var item = data[index];
                            painter.lineTo(zoom.x + index * zoomIndexOne, zoom.y + zoom.height - zoomValueOne * (item.value - min));
                        }
                        painter.stroke().lineTo(zoom.x + zoom.width, zoom.y + zoom.height).lineTo(zoom.x, zoom.y + zoom.height).fill();

                        var imgInstance = new Image()
                        imgInstance.onload = function () {
                            zoomCache = imgInstance;
                            resolve(zoomCache);
                        }
                        imgInstance.src = painter.toDataURL();

                    }
                });
            };

            var painter = null;

            updateView = throttle(function (isMoving) {
                painter.config({
                    fillStyle: "white"
                }).fillRect(0, 0, boxWidth, boxHeight);

                getZoomBackground(painter).then(function (zoomBackground) {

                    /**
                     * 绘制zoom
                     */
                    handler1x = zoom.x + zoom.beginIndex * zoomIndexOne;
                    handler2x = zoom.x + zoom.endIndex * zoomIndexOne;

                    painter.drawImage(zoomBackground, 0, 0, boxWidth, boxHeight);

                    // 选中区域
                    painter.config({
                        fillStyle: "rgba(33,150,240,0.2)"
                    }).fillRect(handler1x, zoom.y, handler2x - handler1x, zoom.height);

                    // 控制移动区域
                    var hdist = handler2x - handler1x;
                    if (hdist > 20) {
                        painter.config({
                            fillStyle: "#dfe5f3"
                        }).fillRect(handler1x, zoom.y, hdist, -7)
                            .config({
                                fillStyle: "white"
                            }).fillRect(handler1x + hdist * 0.5 - 5, zoom.y - 2, 10, -3);
                    }

                    // 2个把柄
                    painter.config({
                        strokeStyle: "#bbc8e3",
                        fillStyle: "white"
                    })
                        .beginPath().moveTo(handler1x, zoom.y).lineTo(handler1x, zoom.y + zoom.height).stroke()
                        .beginPath().moveTo(handler2x, zoom.y).lineTo(handler2x, zoom.y + zoom.height).stroke()
                        .fullRect(handler1x - 3, zoom.y + 5, 6, zoom.height - 10)
                        .fullRect(handler2x - 3, zoom.y + 5, 6, zoom.height - 10);

                    // 边界文字
                    if (isMoving) {
                        painter.config({
                            fillStyle: "#aaa",
                            textAlign: "right",
                            textBaseline: "middle",
                            fontSize: 10
                        })
                            .fillText(data[zoom.beginIndex].name, handler1x - 5, zoom.y + zoom.height * 0.5)
                            .config({
                                textAlign: "left"
                            })
                            .fillText(data[zoom.endIndex].name, handler2x + 5, zoom.y + zoom.height * 0.5);
                    }

                    /**
                     * 绘制折线图
                     */

                    var _min = data[zoom.beginIndex].value, _max = data[zoom.beginIndex].value;
                    for (var index = zoom.beginIndex + 1; index <= zoom.endIndex; index++) {
                        var item = data[index];
                        if (item.value > _max) _max = item.value;
                        if (item.value < _min) _min = item.value;
                    }

                    if (gradient) {
                        if (_min > 0) _min = 0;
                        if (_max < 0) _max = 0;
                    }

                    var rulerData = ruler(_max, _min, 5);
                    _min = rulerData[0];
                    _max = rulerData[rulerData.length - 1];

                    var bootomPosition = boxHeight - grid.bottom - zoom.bottom - zoom.height;

                    var getYByValue = function (value) {
                        return bootomPosition - (value - _min) / (_max - _min) * (bootomPosition - grid.top);
                    };

                    var getXByIndex = function (index) {
                        return grid.left + (boxWidth - grid.left - grid.right) * (index - zoom.beginIndex) / (zoom.endIndex - zoom.beginIndex);
                    };

                    // 绘制Y刻度尺
                    painter.config({
                        fillStyle: "#75777f",
                        strokeStyle: "#e0e6f1",
                        textAlign: "right",
                        textBaseline: "middle",
                        fontSize: 10,
                        lineWidth: 0.5
                    });
                    for (var rulerValue of rulerData) {
                        var y = getYByValue(rulerValue);
                        painter.fillText(rulerValue, grid.left - 2, y)
                            .beginPath().moveTo(grid.left, y).lineTo(boxWidth - grid.right, y).stroke();
                    }

                    // 绘制X刻度尺
                    painter.config({
                        textBaseline: "top"
                    }).fillText(data[zoom.endIndex].name, boxWidth - grid.right, bootomPosition + 5)
                        .config({
                            textAlign: "left"
                        }).fillText(data[zoom.beginIndex].name, grid.left, bootomPosition + 5);

                    if (gradient) {

                        // 绘制填充区域
                        var zeroY = getYByValue(0);
                        var deep = (zeroY - grid.top) / (bootomPosition - grid.top);
                        painter.beginPath();
                        for (var index = zoom.beginIndex; index <= zoom.endIndex; index++) {
                            painter.lineTo(getXByIndex(index), getYByValue(data[index].value));
                        }
                        painter.config({
                            fillStyle: painter.createLinearGradient(0, grid.top, 0, bootomPosition)
                                .addColorStop(0, gradient[0])
                                .addColorStop(deep, gradient[1])
                                .addColorStop(1, gradient[0])
                                .value()
                        }).lineTo(boxWidth - grid.right, zeroY)
                            .lineTo(grid.left, zeroY).fill();
                    }

                    // 绘制线条
                    painter.config({
                        lineWidth: 2,
                        strokeStyle: color
                    }).beginPath();
                    for (var index = zoom.beginIndex; index <= zoom.endIndex; index++) {
                        painter.lineTo(getXByIndex(index), getYByValue(data[index].value));
                    }
                    painter.stroke();

                });
            }, {
                time: 50
            });

            ResizeObserver(mycontent, function () {
                boxWidth = mycontent.clientWidth, boxHeight = mycontent.clientHeight;
                zoomCache = null;

                zoom.x = grid.left;
                zoom.y = boxHeight - zoom.height - zoom.bottom;
                zoom.width = boxWidth - grid.left - grid.right;

                zoomIndexOne = zoom.width / (data.length - 1);
                zoomValueOne = zoom.height / (max - min);

                painter = canvasRender(mycanvas, boxWidth, boxHeight, {}, true);

                updateView();
            });

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/zoom-line/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['321']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"可缩放折线图","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"mycontent"},"childNodes":[11]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ResizeObserver
/*****************************************************************/
window.__pkg__bundleSrc__['277']=function(){
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
// Original file:./src/pages/echarts/dialogs/zoom-line/data
/*****************************************************************/
window.__pkg__bundleSrc__['322']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let data = [{
    name: "1968/9/3",
    value: Math.round(Math.random() * 100)
}];
for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    data.push({
        name: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        value: Math.round((Math.random() - 0.5) * 20 + data[i - 1].value)
    });
}

__pkg__scope_bundle__.default= data;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['122']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('123');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('125');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('123');
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
window.__pkg__bundleSrc__['123']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('124');
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
window.__pkg__bundleSrc__['124']=function(){
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
window.__pkg__bundleSrc__['125']=function(){
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
window.__pkg__bundleSrc__['142']=function(){
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
// Original file:./src/tool/throttle
/*****************************************************************/
window.__pkg__bundleSrc__['323']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function throttle(callback, _option) {

    // 缺省值
    var option = {
        time: 200,
        keep: false,
        opportunity: "end"
    };

    // 校对
    if (_option) {
        for (var key in _option) {
            option[key] = _option[key];
        }
    }

    var hadInterval = false, hadClick = false, oneClick = false, arg;
    return function () {
        const _this = this;
        arg = arguments;

        // 如果前置任务都完成了
        if (!hadInterval) {
            if (option.opportunity != 'end') {
                callback.apply(_this, arg);
            }
            hadInterval = true;

            var interval = setInterval(() => {
                if (hadClick) {
                    if (!option.keep) {
                        callback.apply(_this, arg);
                    }
                } else {
                    if (option.opportunity != 'begin') {
                        if (oneClick || option.opportunity == 'end') callback.apply(_this, arg);
                    }
                    hadInterval = false;
                    oneClick = false;
                    clearInterval(interval);
                }
                hadClick = false;
            }, option.time);
        } else {
            hadClick = true;
            oneClick = true;
        }

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/pointin/index
/*****************************************************************/
window.__pkg__bundleSrc__['324']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('325');
var arc =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('326');
var circle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('327');
var polygon =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('328');
var rect =__pkg__scope_args__.default;


var PointIn = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

PointIn.prototype.setPoint = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
};

PointIn.prototype.arc = arc;
PointIn.prototype.circle = circle;
PointIn.prototype.polygon = polygon;
PointIn.prototype.rect = rect;

__pkg__scope_bundle__.default= PointIn;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/pointin/arc
/*****************************************************************/
window.__pkg__bundleSrc__['325']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 判断第二个弧度是否大于第一个
// 范围：[0,2PI)
var compareDeg = function (sin1, cos1, sin2, cos2) {

    // 先根据sin值把弧度分为0～PI和PI～2PI区间，如果不在一个区间，大小可以立刻判断
    if (sin2 > 0 && sin1 < 0) return false;
    else if (sin2 < 0 && sin1 > 0) return true;

    // 如果都在0～PI区间，根据cos，cos谁大谁小
    else if (sin2 > 0 && sin1 > 0) {
        return cos2 < cos1;
    }

    // 如果都在PI～2PI区间，根据cos，cos谁大谁大
    else if (sin2 < 0 && sin1 < 0) {
        return cos2 > cos1;
    }

    // sin2和sin1都不为0的情况判断了，接下来看看为0的情况

    // 都为0时，根据cos，cos谁大谁小
    else if (sin2 == 0 && sin1 == 0) {
        return cos2 < cos1;
    }

    // 只有sin2为0时，如果sin1<0则false，否则根据cos，cos谁大谁小
    else if (sin2 == 0) {
        if (sin1 < 0) return false;
        else {
            return cos2 < cos1;
        }
    }

    // 余下就是sin1为0时，如果sin2<0则true，否则根据cos，cos谁大谁小
    else {
        if (sin2 < 0) return true;
        else {
            return cos2 < cos1;
        }
    }
};

__pkg__scope_bundle__.default= function (cx, cy, r1, r2, beginDeg, deg) {
    if (r1 > r2) {
        var r = r1;
        r1 = r2;
        r2 = r;
    }

    // 如果在小圈中，或者不在大圈中，肯定不在弧中
    if (this.circle(cx, cy, r1) || !this.circle(cx, cy, r2)) return false;

    var deg1, deg2;
    if (deg >= 0) {
        deg1 = beginDeg;
        deg2 = beginDeg + deg;
    } else {
        deg2 = beginDeg;
        deg1 = beginDeg + deg;
    }

    deg1 %= (Math.PI * 2);
    deg2 %= (Math.PI * 2);

    if (deg1 < 0) deg1 += Math.PI * 2;
    if (deg2 < 0) deg2 += Math.PI * 2;

    var d = Math.sqrt((cx - this.x) * (cx - this.x) + (cy - this.y) * (cy - this.y));
    var sin = (this.y - cy) / d, cos = (this.x - cx) / d;

    if (deg1 < deg2) {
        return compareDeg(Math.sin(deg1), Math.cos(deg1), sin, cos) && compareDeg(sin, cos, Math.sin(deg2), Math.cos(deg2));
    } else {
        return !(compareDeg(Math.sin(deg2), Math.cos(deg2), sin, cos) && compareDeg(sin, cos, Math.sin(deg1), Math.cos(deg1)));
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/pointin/circle
/*****************************************************************/
window.__pkg__bundleSrc__['326']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (cx, cy, r) {

    // 特殊情况提前判断，加速计算
    if (this.x < cx - r || this.x > cx + r || this.y < cy - r || this.y > cy + r) return false;

    var d2 = (cx - this.x) * (cx - this.x) + (cy - this.y) * (cy - this.y), r2 = r * r;
    return d2 <= r2;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/pointin/polygon
/*****************************************************************/
window.__pkg__bundleSrc__['327']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (points) {
    points.push(points[0]);

    // 环绕数法
    // 以某一点做水平向右的射线，
    // 如果多边形的某条边的从下往上穿过该射线，则环绕数加一；
    // 如果多边形的某条边的从上往下穿过该射线，则环绕数减一；
    // 最终的环绕数如果不为 0 则该点在多边形内部，否则在多边形的外部。

    var count = 0;
    for (var index = 0; index < points.length - 1; index++) {

        var A = points[index], B = points[index + 1];

        // 重合的点可以忽略
        if (A[0] == B[0] && A[1] == B[1]) continue;

        // 先判断是否和当前线段相交（如果不相交，忽略）
        // 相交的第一步是，P点在垂直方向上位于AB之间
        if ((A[1] - this.y) * (B[1] - this.y) < 0) {

            // AB和P射线的焦点记为C(x,y)
            // 由AB和AC平行，且C的y值和P一样可以得到
            var C = [
                A[0] + (B[0] - A[0]) * (this.y - A[1]) / (B[1] - A[1]),
                this.y
            ];

            // 如果相交
            if (C[0] > this.x) {

                // 现在可以确定，这个P这个射线一定被线段击中了，接下来，需要确定击中的方向

                // 如果是从下往上穿
                if (A[1] < B[1]) {
                    count += 1;
                }

                // 否则就是从上往下穿
                else {
                    count -= 1;
                }

            }

        }
    }

    return count != 0;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/pointin/rect
/*****************************************************************/
window.__pkg__bundleSrc__['328']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (x, y, width, height) {
    return this.x >= x && this.x <= x + width && this.y >= y && this.y <= y + height;
};

    return __pkg__scope_bundle__;
}
