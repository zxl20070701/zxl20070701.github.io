import { setAttribute } from "./tool.js";
import setStyle from "../xhtml/setStyle.js";
import isNumber from '../type/isNumber.js';
import arc from '../canvas/arc.js';

// 文字统一设置方法
export var initText = function (el, config, x, y, deg) {
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
export var initCircle = function (el, cx, cy, r) {
    if (el.nodeName.toLowerCase() !== 'circle') throw new Error('Need a <circle> !');
    setAttribute(el, 'cx', cx);
    setAttribute(el, 'cy', cy);
    setAttribute(el, 'r', r);
};

// 路径统一设置方法
export var initPath = function (el, path) {
    if (el.nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');
    setAttribute(el, 'd', path);
};

// 画矩形统一设置方法
export var initRect = function (el, x, y, width, height) {
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
export var initArc = function (el, config, cx, cy, r1, r2, beginDeg, deg) {

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