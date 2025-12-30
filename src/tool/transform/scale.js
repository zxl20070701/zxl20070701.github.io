// 点（x,y）围绕中心（cx,cy）缩放times倍
export default function (cx, cy, times, x, y) {
    return [
        +(times * (x - cx) + cx).toFixed(7),
        +(times * (y - cy) + cy).toFixed(7)
    ];
};