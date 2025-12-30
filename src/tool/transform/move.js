// 点（x,y）沿着向量（ax,ay）方向移动距离d
export default function (ax, ay, d, x, y) {
    var sqrt = Math.sqrt(ax * ax + ay * ay);
    return [
        +(ax * d / sqrt + x).toFixed(7),
        +(ay * d / sqrt + y).toFixed(7)
    ];
};