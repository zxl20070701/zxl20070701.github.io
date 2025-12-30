import { initConfig } from '../../config';
import rotate from "../../transform/rotate";

/**
 * attr = {
 *    cx,cy 刻度尺圆心
 *    begin,deg 刻度尺开始角度和总度数
 *    radius 刻度尺半径
 *    mark-direction 刻度尺小刻度的位置：outer|inner
 *    value-position 刻度尺刻度文字的位置：mark|between
 *    color 刻度尺颜色
 *    value 值
 *    font-size 刻度文字大小
 *    font-rotate 文字是否旋转
 *    font-weight 字重
 *    small-mark 是否需要小刻度
 * }
 */
export default function (painter, attr) {
    var i, j, curDeg, textHelpDeg, p1, p2;

    attr = initConfig({
        "mark-direction": "outer",
        "value-position": "mark",
        "color": 'black',
        "begin": 0,
        "deg": Math.PI * 2,
        "font-size": 12,
        "font-weight": 400,
        "font-rotate": true,
        "small-mark": false
    }, attr);

    var value = attr.value;

    painter.config({
        'lineWidth': 1,
        'fillStyle': attr.color,
        'strokeStyle': attr.color,
        'fontSize': attr["font-size"],
        "fontWeight": attr["font-weight"],
        'textAlign': 'center',
        'textBaseline': 'middle',
        "lineDash": []
    });

    // 先绘制弧度
    painter.beginPath().arc(attr.cx, attr.cy, attr.radius, attr.begin, attr.deg).stroke();

    var markNumber = attr["value-position"] == "mark" ? value.length : value.length + 1;

    // 绘制刻度
    var distanceDeg = attr.deg / (markNumber - 1);

    // 绘制刻度
    for (i = 0; i < markNumber; i++) {

        p1 = rotate(
            attr.cx, attr.cy,
            attr.begin + i * distanceDeg,
            attr.cx + attr.radius, attr.cy
        );

        p2 = rotate(
            attr.cx, attr.cy,
            attr.begin + i * distanceDeg,
            attr.cx + attr.radius + (attr['small-mark'] ? 10 : 4) * (attr["mark-direction"] == 'inner' ? -1 : 1), attr.cy
        );

        painter.config({
            "lineWidth": attr['small-mark'] ? 2 : 1
        }).beginPath().moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).stroke();

        // 绘制小刻度
        painter.config({
            "lineWidth": 1
        });
        if (attr['small-mark'] && i < markNumber - 1) {

            for (j = 1; j <= 4; j++) {
                p1 = rotate(
                    attr.cx, attr.cy,
                    attr.begin + (i + j * 0.2) * distanceDeg,
                    attr.cx + attr.radius, attr.cy
                );

                p2 = rotate(
                    attr.cx, attr.cy,
                    attr.begin + (i + j * 0.2) * distanceDeg,
                    attr.cx + attr.radius + 4 * (attr["mark-direction"] == 'inner' ? -1 : 1), attr.cy
                );

                painter.beginPath().moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).stroke();
            }

        }
    }

    // 绘制刻度上的读数
    for (i = 0; i < value.length; i++) {
        curDeg = attr.begin + distanceDeg * (i + (attr["value-position"] == 'mark' ? 0 : 0.5));
        textHelpDeg = curDeg % (Math.PI * 2);

        p1 = rotate(
            attr.cx, attr.cy,
            curDeg,
            attr.cx + attr.radius + (attr["font-rotate"] && !attr['small-mark'] ? 15 : 25) * (attr["mark-direction"] == 'inner' ? -1 : 1), attr.cy
        );

        if (attr["font-rotate"]) {
            painter.fillText(value[i], p1[0], p1[1], curDeg + ((
                textHelpDeg > 0 && textHelpDeg < Math.PI ||
                textHelpDeg > -2 * Math.PI && textHelpDeg < -Math.PI
            ) ? -Math.PI * 0.5 : Math.PI * 0.5));
        } else {
            painter.fillText(value[i], p1[0], p1[1]);
        }

    }

    return painter;
};