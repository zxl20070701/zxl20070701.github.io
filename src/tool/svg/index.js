import { initText, initCircle, initPath, initRect, initArc } from "./config.js";
import isString from "../type/isString.js";
import { toNode, setAttribute, getAttribute, full, fill, stroke } from "./tool.js";
import rotate from "../transform/rotate";

export default function (svg) {

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