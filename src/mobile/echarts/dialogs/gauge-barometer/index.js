import template from './index.html';

import animation from '../../../../tool/animation';
import canvasRender from '../../../../tool/canvas/index';
import drawPolarRuler from '../../../../tool/canvas/extend/polar-ruler';
import rotate from "../../../../tool/transform/rotate";

var interval, stop = function () { };
export default function (obj) {

    return {
        name: "echarts-example",
        render: template,
        mounted: function () {
            var p0, p1, p2, p3, p4, pDeg;

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var cx, cy, radius;

            var beginDeg = Math.PI * 3 / 4, deg = Math.PI * 1.5;

            // 监听画布大小改变
            var currentValue = 58.06, value;

            var painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight);

            // 圆心和半径
            cx = mycontent.clientWidth * 0.5;
            cy = mycontent.clientHeight * 0.5;
            radius = Math.max(Math.min(cx, cy) - 50, 0);

            var updateView = function (value) {
                painter.clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight);

                pDeg = beginDeg + Math.PI * 1.5 * value * 0.01;

                // 外刻度尺
                drawPolarRuler(painter, {
                    cx: cx,
                    cy: cy,
                    radius: radius + 10,
                    value: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    begin: beginDeg,
                    deg: deg,
                    "font-size": 14,
                    color: "#e93f33",
                    "font-rotate": false,
                    "font-weight": 800,
                    "small-mark": true
                });

                // 内刻度尺
                drawPolarRuler(painter, {
                    cx: cx,
                    cy: cy,
                    radius: radius - 10,
                    value: [0, 10, 20, 30, 40, 50, 60],
                    begin: beginDeg,
                    deg: deg,
                    color: "#000000",
                    "font-size": 14,
                    "mark-direction": "inner",
                    "font-rotate": false,
                    "font-weight": 800,
                    "small-mark": true
                });

                p0 = rotate(cx, cy, pDeg, cx + radius + 20, cy - 1);
                p1 = rotate(cx, cy, pDeg, cx + radius + 20, cy + 1);
                p2 = rotate(cx, cy, pDeg, cx - 20, cy + 4);
                p3 = rotate(cx, cy, pDeg, cx - 30, cy);
                p4 = rotate(cx, cy, pDeg, cx - 20, cy - 4);

                // 表盘文字
                painter.config({
                    "fontSize": 10,
                    "fontWeight": 200,
                    "fillStyle": "black",
                    "textAlign": "center",
                    "textBaseline": "middle"
                }).fillText("PLP", cx, cy - radius * 0.5)

                    // 指针
                    .fillCircle(cx, cy, 7).config({
                        "lineWidth": 2
                    }).strokeCircle(cx, cy, 11)
                    .beginPath()
                    .moveTo(p0[0], p0[1])
                    .lineTo(p1[0], p1[1])
                    .lineTo(p2[0], p2[1])
                    .lineTo(p3[0], p3[1])
                    .lineTo(p4[0], p4[1])
                    .fill()

                    // 值文字
                    .config({
                        "fontSize": 30,
                        "fontWeight": 800,
                        "fillStyle": "#555555"
                    })
                    .fillText(value, cx, cy + radius * 0.4);

            };

            updateView(currentValue.toFixed(2));

            // 定时模拟修改
            interval = setInterval(function () {

                value = Math.random() * 100;
                stop = animation(function (deep) {

                    if (updateView)
                        updateView(+((currentValue + (value - currentValue) * deep).toFixed(2)));

                }, 300, function () {
                    currentValue = value;
                });

            }, 1000);
        },
        beforeDestory: function () {
            if (interval) {

                // 关闭页面的时候需要关闭定时任务
                clearInterval(interval);
                stop();
            }
        }
    };
};