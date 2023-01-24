import { setAttribute } from "./tool.js";
import setStyle from "../xhtml/setStyle.js";
import isNumber from '../type/isNumber.js';

export var XLINK_ATTRIBUTE = ["href", "title", "show", "type", "role", "actuate"];

// 文字统一设置方法
export var initText = function (el, config, x, y, deg) {
    if (el.nodeName.toLowerCase() !== 'text') throw new Error('Need a <text> !');

    // 垂直对齐采用dy实现
    setAttribute(el, "dy", {
        "top": config['font-size'] * 0.5,
        "middle": 0,
        "bottom": -config['font-size'] * 0.5,
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
        "font-size": config['font-size'] + "px",
        "font-family": config['font-family']
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