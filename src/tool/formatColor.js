import xhtml from './xhtml';

// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
var _formatColor = function (color) {
    var colorNode = document.getElementsByTagName('head')[0];
    colorNode.style['color'] = color;
    var rgba = xhtml.getStyle(colorNode, 'color');
    var rgbaArray = rgba.replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,[\\x20\\t\\r\\n\\f]'));
    return [+rgbaArray[0], +rgbaArray[1], +rgbaArray[2], rgbaArray[3] == undefined ? 1 : +rgbaArray[3]];
};

export var formatColor = _formatColor;

// 提供给 webgl 使用
export var format3DColor = function (color) {
    var colorArray = _formatColor(color);
    return [
        colorArray[0] / 255,
        colorArray[1] / 255,
        colorArray[2] / 255,
        colorArray[3]
    ];
};