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
export default function (painter, x, y, width, height, radius) {

    var _width = width, _height = height, _borderRadius = radius, _x = x + width, _y = y + height;

    return painter
        .beginPath()
        .arc(_x - _borderRadius, _y - _borderRadius, _borderRadius, Math.PI * 0.5, -Math.PI * 0.5)
        .arc(_x - _borderRadius, _y - _height + _borderRadius, _borderRadius, 0, -0.5 * Math.PI)
        .arc(_x - _width + _borderRadius, _y - _height + _borderRadius, _borderRadius, Math.PI * 1.5, -0.5 * Math.PI)
        .arc(_x - _width + _borderRadius, _y - _borderRadius, _borderRadius, Math.PI, -0.5 * Math.PI)
        .closePath();
};