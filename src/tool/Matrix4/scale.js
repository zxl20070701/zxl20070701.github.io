/**
 * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
 */
export default function (xTimes, yTimes, zTimes, cx, cy, cz) {
    cx = cx || 0; cy = cy || 0; cz = cz || 0;
    return [
        xTimes, 0, 0, 0,
        0, yTimes, 0, 0,
        0, 0, zTimes, 0,
        cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1
    ];
};
