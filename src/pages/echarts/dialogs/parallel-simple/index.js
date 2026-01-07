import template from './index.html';

import ResizeObserver from '../../../../tool/ResizeObserver';
import animation from '../../../../tool/animation';
import canvasRender from '../../../../tool/canvas/index';
import getLoopColors from '../../../../tool/getLoopColors';
import ruler from '../../../../tool/ruler';
import drawRuler from '../../../../tool/canvas/extend/ruler';

export default function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var i, j, k;

            var data = [
                [12.99, 100, 82, 'Good'],
                [9.99, 80, 77, 'OK'],
                [20, 120, 60, 'Excellent']
            ];

            // 留白大小
            var grid = {
                left: 100,
                top: 100,
                right: 100,
                bottom: 100
            };

            var maxValues = [];
            var rulerDatas = [];
            for (i = 0; i < data[0].length - 1; i++) {
                maxValues[i] = 0;
                for (j = 0; j < data.length; j++) {
                    if (maxValues[i] < data[j][i]) {
                        maxValues[i] = data[j][i];
                    }
                }
                rulerDatas[i] = ruler(maxValues[i], 0, 5);
            }
            rulerDatas.push(['Excellent', 'Good', 'OK', 'Bad']);

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var painter, updateView, width, height, perWidth, points;

            // 颜色
            var colors = getLoopColors(1, 0.5);

            ResizeObserver(mycontent, function () {
                width = mycontent.clientWidth;
                height = mycontent.clientHeight;

                perWidth = (width - grid.left - grid.right) / (rulerDatas.length - 1);

                points = [];
                for (i = 0; i < data.length; i++) {
                    points.push([]);
                    for (j = 0; j < data[i].length; j++) {
                        k = data[i][j];

                        // 如果是最后一列
                        if (j == data[i].length - 1) {
                            points[i].push([width - grid.right, {
                                'Excellent': 7 / 8, 'Good': 5 / 8, 'OK': 3 / 8, 'Bad': 1 / 8
                            }[k] * (height - grid.top - grid.bottom) + grid.top]);
                        }

                        // 否则
                        else {
                            points[i].push([
                                perWidth * j + grid.left,
                                (1 - data[i][j] / rulerDatas[j][rulerDatas[j].length - 1]) * (height - grid.top - grid.bottom) + grid.top
                            ]);
                        }
                    }
                }

                painter = canvasRender(mycanvas, width, height, {}, true);

                updateView = function (deep) {
                    painter.clearRect(0, 0, width, height);

                    // 绘制刻度尺
                    for (i = 0; i < rulerDatas.length; i++) {
                        drawRuler(painter, {
                            x: grid.left + perWidth * i,
                            y: height - grid.bottom,
                            length: height - grid.top - grid.bottom,
                            value: rulerDatas[i],
                            direction: "BT",
                            color: "#6e7079",
                            "value-position": i == rulerDatas.length - 1 ? "between" : "mark"
                        }).config({
                            "textAlign": "center"
                        }).fillText(["Price", "Net Weight", "Amount", "Score"][i], grid.left + perWidth * i, grid.top - 20);
                    }

                    // 绘制线条
                    painter.config({
                        "strokeStyle": colors[0],
                        "lineWidth": 4
                    });
                    for (i = 0; i < points.length; i++) {
                        painter.beginPath();
                        for (j = 0; j < points[i].length; j++) {
                            painter.lineTo(points[i][j][0], points[i][j][1]);
                        }
                        painter.stroke();
                    }


                };

                animation(function (deep) {
                    updateView(deep);
                }, 300);

            });

        }
    };
};