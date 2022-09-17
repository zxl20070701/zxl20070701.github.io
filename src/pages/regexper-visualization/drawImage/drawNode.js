export default function (painter, x, y, width, height, color, content, textColor) {

    // 先绘制背景
    painter
        .config('fillStyle', color)
        .fillRect(x, y, width, height)

        // 再绘制内容
        .config('fillStyle', textColor || '#000')
        .fillText(content, x + width * 0.5, y + height * 0.5);

};
