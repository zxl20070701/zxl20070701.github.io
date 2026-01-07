import template from './index.html';

import ResizeObserver from '../../../../tool/ResizeObserver';
import canvasRender from '../../../../tool/canvas/region';
import ruler from '../../../../tool/ruler';
import animation from '../../../../tool/animation';
import drawRuler from '../../../../tool/canvas/extend/ruler';

export default function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var i, y, x, color;

            var data = {
                date: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
                value: [

                    // 开盘、收盘、最低、最高
                    [20, 34, 10, 38],
                    [40, 35, 30, 50],
                    [31, 38, 33, 44],
                    [38, 15, 5, 42]
                ]
            }

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var painter, updateView, width, height, maxValue = 0;

            // 求解最大值
            for (i = 0; i < data.value.length; i++) {
                if (data.value[i][3] > maxValue) maxValue = data.value[i][3];
            }

            // 刻度尺
            var rulerData = ruler(maxValue, 0, 5);

            // 留白大小
            var grid = {
                left: 100,
                top: 100,
                right: 100,
                bottom: 100
            };

            // 监听画布大小改变
            ResizeObserver(mycontent, function () {
                width = mycontent.clientWidth;
                height = mycontent.clientHeight;

                var perH = (height - grid.bottom - grid.top) / rulerData[rulerData.length - 1];
                var perW = (width - grid.left - grid.right) / data.date.length;

                painter = canvasRender(mycanvas, width, height, true);

                updateView = function (deep) {
                    painter.clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight).setRegion("");

                    // 垂直刻度尺
                    painter.config({
                        "fillStyle": "#6e7079",
                        "strokeStyle": "#e0e6f1",
                        "textAlign": "right"
                    });
                    for (i = 0; i < rulerData.length; i++) {
                        y = (height - grid.top - grid.bottom) * (1 - i / (rulerData.length - 1)) + grid.top;
                        painter.fillText(rulerData[i], grid.left - 5, y);

                        painter.beginPath().moveTo(grid.left, y).lineTo(width - grid.right, y).stroke();
                    }

                    // 水平刻度尺
                    drawRuler(painter, {
                        value: data.date,
                        x: grid.left,
                        y: height - grid.bottom,
                        length: width - grid.left - grid.right,
                        color: "#6e7079",
                        "value-position": "between"
                    });

                    // 内容
                    for (i = 0; i < data.value.length; i++) {
                        painter.setRegion(i);

                        color = data.value[i][0] > data.value[i][1] ? "#5ab362" : "#ea5454";

                        y = (height - grid.top - grid.bottom) - data.value[i][0] * perH + grid.top;
                        x = grid.left + (i + 0.5) * perW;

                        painter.config({
                            "fillStyle": color,
                            "strokeStyle": color
                        })

                            // 开盘收盘
                            .fillRect(x - perW * 0.25, y, perW * 0.5, perH * (data.value[i][0] - data.value[i][1]) * deep)

                            // 最高最低
                            .beginPath()
                            .moveTo(x, y + perH * (data.value[i][0] - data.value[i][2]) * deep)
                            .lineTo(x, y + perH * (data.value[i][0] - data.value[i][3]) * deep)
                            .stroke();
                    }

                };


                animation(function (deep) {
                    updateView(deep);
                }, 300);

            });

            // 注册鼠标移动事件
            mycanvas.addEventListener('mousemove', function (event) {
                if (painter) {
                    var regionName = painter.getRegion(event);

                    mycanvas.style.cursor = regionName ? 'pointer' : 'default';

                }
            });

        }
    };
};