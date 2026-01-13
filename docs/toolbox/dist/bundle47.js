
/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/dialogs/pice/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['150']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('345');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('346');


__pkg__scope_args__=window.__pkg__getBundle('139');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('148');
var formatTime =__pkg__scope_args__.default;


var painter;
__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "pice",
        render: template,
        data: {

            // 时长
            duration: props.duration,

            // 片段
            piceData: props.piceData,

            //  新的切割点
            newTime: obj.ref("00:00.000")
        },
        methods: {
            // 确定
            doSubmit: function () {
                this.$closeDialog(this.piceData);
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            },

            // 更新片段选中
            updatePiceSelected: function () {
                var trs = this._refs.tableList.value.getElementsByTagName('tr'), index;
                for (index = 0; index < trs.length; index++) {
                    this.piceData.value[index] = trs[index].getElementsByTagName('input')[0].checked ? true : false;
                }
            },

            // 更新片段
            updatePice: function () {

                var template = "", index;
                for (index = 1; index < this.piceData.split.length; index++) {
                    template += "<tr>" +
                        "    <th>" +
                        "        <input type='checkbox' " + (this.piceData.value[index - 1] ? "checked='checked'" : "") + ">" +
                        "    </th>" +
                        "    <th>" + index + "</th>" +
                        "    <th>" + formatTime(this.piceData.split[index - 1]) + "</th>" +
                        "    <th>" + formatTime(this.piceData.split[index]) + "</th>" +
                        "</tr>";
                }

                this._refs.tableList.value.innerHTML = template;

            },

            // 重置切割点
            resetSplit: function () {

                this.piceData = {
                    split: [0, this.duration],
                    value: [true]
                };

                this.drawTimeLine();
                this.updatePice();
            },

            // 新增切割点
            addSplit: function () {

                //  求解出新的切割点的值
                var temp = this.newTime.split(':');
                var val = (+temp[0]) * 60 - -temp[1];

                if (val > this.duration) {
                    alert('非法输入，因为输入的时间（' + formatTime(val) + '）大于时长(（' + formatTime(this.duration) + '）');
                    return;
                }

                // 寻找新的切割点的保存位置
                var index;
                for (index = 0; index < this.piceData.split.length - 1; index++) {

                    // 如果应该存放在 index ～ index+1 之间
                    if (val >= this.piceData.split[index] && val <= this.piceData.split[index + 1]) {
                        if (val == this.piceData.split[index] || val == this.piceData.split[index + 1]) return;

                        // 插入新的切割点
                        this.piceData.split.splice(index, 1, this.piceData.split[index], val);

                        // 插入新的片段是否保存标记
                        this.piceData.value.splice(index, 1, this.piceData.value[index], this.piceData.value[index]);

                        break;
                    }
                }

                this.drawTimeLine();
                this.updatePice();
            },

            // 绘制时间轴方法
            drawTimeLine: function () {

                // 绘制前，先清空画布
                painter.clearRect(0, 0, 900, 100);

                var index;

                painter.config({
                    'textAlign': 'center',
                    'fontSize': 14,
                    'fillStyle': 'black'
                })

                // 每一秒的间距
                // (上下左右留白30)
                var dist = (900 - 60) / this.duration;

                for (index = 0; index < this.duration; index += 10) {

                    if (index % 60 == 0) {
                        painter
                            .fillRect(index * dist + 29.5, 100 - 30, 1, -25)
                            .fillText(index / 60 + ":00", index * dist + 29, 30)
                    } else {
                        painter.fillRect(index * dist + 29.5, 100 - 30, 1, -10)
                    }

                }

                // 绘制底下线条
                painter.beginPath()
                    .moveTo(30, 100 - 30)
                    .lineTo(900 - 30, 100 - 30)
                    .stroke()


                // 绘制切割标志
                painter.config({
                    'fillStyle': 'red'
                })

                var split;
                for (index = 0; index < this.piceData.split.length; index++) {
                    split = this.piceData.split[index];

                    // 绘制底部的箭头
                    painter.beginPath()
                        .moveTo(30 + split * dist, 100 - 30)
                        .lineTo(35 + split * dist, 100 - 20)
                        .lineTo(25 + split * dist, 100 - 20)
                        .fill()

                    // 绘制底部的时间
                    painter.fillText(formatTime(split), 30 + split * dist, 100 - 10)
                }
            }
        },
        mounted: function () {
            var canvas = this._refs.timeLine.value;

            // 获取画笔
            painter = canvasRender(canvas, canvas.clientWidth, canvas.clientHeight);

            // 绘制时间轴承
            this.drawTimeLine();

            // 初始化片段视图
            this.updatePice();

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/dialogs/pice/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['345']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,2,8,11,23]},{"type":"tag","name":"canvas","attrs":{"ref":"timeLine"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"add-split"},"childNodes":[3,4,6]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"newTime"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"addSplit"},"childNodes":[5]},{"type":"text","content":"新增","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"resetSplit","class":"reset"},"childNodes":[7]},{"type":"text","content":"重置","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"update"},"childNodes":[9]},{"type":"tag","name":"span","attrs":{},"childNodes":[10]},{"type":"text","content":"片段列表","childNodes":[]},{"type":"tag","name":"table","attrs":{},"childNodes":[12,22]},{"type":"tag","name":"thead","attrs":{},"childNodes":[13]},{"type":"tag","name":"tr","attrs":{},"childNodes":[14,16,18,20]},{"type":"tag","name":"th","attrs":{},"childNodes":[15]},{"type":"text","content":"选择","childNodes":[]},{"type":"tag","name":"th","attrs":{},"childNodes":[17]},{"type":"text","content":"序号","childNodes":[]},{"type":"tag","name":"th","attrs":{},"childNodes":[19]},{"type":"text","content":"开始时间","childNodes":[]},{"type":"tag","name":"th","attrs":{},"childNodes":[21]},{"type":"text","content":"结束时间","childNodes":[]},{"type":"tag","name":"tbody","attrs":{"ref":"tableList","ui-on:click":"updatePiceSelected"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btn-list"},"childNodes":[24,26]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doClose","class":"gray"},"childNodes":[25]},{"type":"text","content":"取消","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doSubmit"},"childNodes":[27]},{"type":"text","content":"确定","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/dialogs/pice/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['346']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='pice']{\n\nwidth: 900px;\n\nheight: calc(100vh - 200px);\n\nleft: calc(50vw - 450px);\n\ntop: 100px;\n\nbackground-color: white;\n\noverflow: auto;\n\n}\n\n [dialog-view='pice']>canvas{\n\nheight: 100px;\n\nwidth: 900px;\n\n}\n\n [dialog-view='pice']>div.add-split{\n\nmargin-top: 10px;\n\nmargin-left: 10px;\n\n}\n\n [dialog-view='pice']>div.add-split input{\n\nheight: 24px;\n\nwidth: 160px;\n\npadding: 0 10px;\n\nvertical-align: top;\n\noutline: none;\n\n}\n\n [dialog-view='pice']>div.add-split button{\n\nheight: 24px;\n\nborder: none;\n\nfont-size: 12px;\n\npadding: 0 10px;\n\nbackground-color: #b2b2bd;\n\ncolor: white;\n\nvertical-align: top;\n\ncursor: pointer;\n\n}\n\n [dialog-view='pice']>div.add-split button.reset{\n\nmargin-left: 10px;\n\n}\n\n [dialog-view='pice']>div.update{\n\ntext-align: center;\n\nbackground-image: url(\"./more-line.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-position: center top;\n\nmargin-top: 30px;\n\n}\n\n [dialog-view='pice']>div.update>span{\n\ncolor: #6d757a;\n\nfont-size: 12px;\n\nbackground-image: url(\"./more.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-position: center bottom;\n\nwidth: 94px;\n\nheight: 30px;\n\nline-height: 30px;\n\ndisplay: inline-block;\n\nposition: relative;\n\nbottom: 10px;\n\ncursor: pointer;\n\n}\n\n [dialog-view='pice']>div.btn-list{\n\ntext-align: center;\n\nmargin-top: 30px;\n\n}\n\n [dialog-view='pice']>div.btn-list>button{\n\nheight: 24px;\n\nborder: none;\n\nfont-size: 12px;\n\nbackground-color: #2196f3;\n\ncolor: white;\n\nwidth: 70px;\n\nmargin: 10px;\n\ncursor: pointer;\n\n}\n\n [dialog-view='pice']>div.btn-list>button.gray{\n\nbackground-color: #9e9fa0;\n\n}\n\n [dialog-view='pice']>table{\n\nwidth: calc(100% - 20px);\n\nfont-size: 14px;\n\nmargin: 10px;\n\n}\n\n [dialog-view='pice']>table thead{\n\nbackground-color: #b2b2bd;\n\n}\n\n [dialog-view='pice']>table th{\n\npadding: 5px 10px;\n\nfont-size: 12px;\n\nfont-weight: 400;\n\n}\n\n [dialog-view='pice']>table tbody, [dialog-view='pice']>table thead{\n\nborder: 1px solid #b2b2bd;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['139']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('140');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('142');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('140');
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
window.__pkg__bundleSrc__['140']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('141');
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
window.__pkg__bundleSrc__['141']=function(){
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
window.__pkg__bundleSrc__['142']=function(){
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
// Original file:./src/tool/formatTime
/*****************************************************************/
window.__pkg__bundleSrc__['148']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 把秒值变成更可读的格式
__pkg__scope_bundle__.default= function(time) {
    return (Math.floor(time / 60)) + ":" + (Math.floor(time % 60)) + "." + ((time % 1).toFixed(3) + "").replace(/^.{0,}\./, '')
};

    return __pkg__scope_bundle__;
}
