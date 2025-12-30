import dotRender from '../../transform/dot';
import { initConfig } from '../../config';

/**
 * attr = {
 *    x,y 刻度尺的起点位置
 *    direction 刻度尺的方向：LR|RL|TB|BT
 *    length 刻度尺的长度
 *    mark-direction 刻度尺小刻度在前进方向的位置：right|left
 *    value-position 刻度尺刻度文字的位置：mark|between
 *    color 刻度尺颜色
 *    value 值
 *    font-size 刻度文字大小
 *    deg 文字旋转度数
 * }
 */
export default function (painter, attr) {
    var i, markPosition;

    var value = attr.value;

    attr = initConfig({
        "direction": "LR",
        "mark-direction": "right",
        "value-position": "mark",
        "color": 'black',
        "font-size": 12,
        deg: 0
    }, attr);

    painter.config({
        'lineWidth': 1,
        'fillStyle': attr.color,
        'strokeStyle': attr.color,
        'fontSize': attr["font-size"],
        'textAlign': (attr.direction == 'LR' || attr.direction == 'RL') ? 'center' : (
            (
                (attr.direction == 'BT' && attr["mark-direction"] == 'right') ||
                (attr.direction == 'TB' && attr["mark-direction"] == 'left')
            ) ? 'left' : 'right'
        ),
        "lineDash": [],
        'textBaseline': 'middle'
    });



    // 刻度尺终点坐标
    var endPosition;

    // 记录小刻度如何计算
    var dxy;

    if (attr.direction == 'LR') {
        endPosition = {
            x: attr.x + attr.length,
            y: attr.y
        };
        dxy = attr["mark-direction"] == 'right' ? [0, 1] : [0, -1];
    } else if (attr.direction == 'RL') {
        endPosition = {
            x: attr.x - attr.length,
            y: attr.y
        };
        dxy = attr["mark-direction"] == 'right' ? [0, -1] : [0, 1];
    } else if (attr.direction == 'TB') {
        endPosition = {
            x: attr.x,
            y: attr.y + attr.length
        };
        dxy = attr["mark-direction"] == 'right' ? [-1, 0] : [1, 0];
    } else if (attr.direction == 'BT') {
        endPosition = {
            x: attr.x,
            y: attr.y - attr.length
        };
        dxy = attr["mark-direction"] == 'right' ? [1, 0] : [-1, 0];
    } else {

        // 错误提示
        throw new Error('Type error!');
    }

    // 绘制主轴
    painter.beginPath().moveTo(attr.x, attr.y).lineTo(endPosition.x, endPosition.y).stroke();

    var markNumber = attr["value-position"] == "mark" ? value.length : value.length + 1;

    // 绘制刻度
    var distanceLength = attr.length / (markNumber - 1);

    var dot = dotRender({
        d: [
            endPosition.x - attr.x,
            endPosition.y - attr.y
        ],
        p: [
            attr.x,
            attr.y
        ]
    });

    for (i = 0; i < markNumber; i++) {

        // 刻度
        markPosition = dot.value();
        painter.beginPath().moveTo(markPosition[0], markPosition[1]).lineTo(
            markPosition[0] + dxy[0] * 5,
            markPosition[1] + dxy[1] * 5
        ).stroke();

        dot.move(distanceLength);
    }

    // 绘制刻度上的读数
    dot = dotRender({
        d: [
            endPosition.x - attr.x,
            endPosition.y - attr.y
        ],
        p: [
            attr.x,
            attr.y
        ]
    });

    if (attr["value-position"] == "between") dot.move(distanceLength * 0.5);

    for (i = 0; i < value.length; i++) {
        markPosition = dot.value();
        painter.fillText(value[i], markPosition[0] + dxy[0] * 15, markPosition[1] + dxy[1] * 15, attr.deg);
        dot.move(distanceLength);
    }

    return painter;
};