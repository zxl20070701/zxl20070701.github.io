import template from './index.html';

import canvasRender from '../../../../tool/canvas/index';
import ruler from '../../../../tool/ruler';
import cardinal from '../../../../tool/interpolation/cardinal';
import animation from '../../../../tool/animation';

export default function (obj) {

    return {
        name: "echarts-example",
        render: template,
        mounted: function () {

            var i, j, x, y;

            var data = [{
                year: "2015",
                value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                color: "#5470C6"
            }, {
                year: "2016",
                value: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
                color: "#EE6666"
            }]

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var painter, updateView, maxValue = 0, calcY, hadInit, itemWidth;

            // 求解值总数
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < data[i].value.length; j++) {
                    if (data[i].value[j] > maxValue) maxValue = data[i].value[j];
                }
            }

            // 刻度尺
            var rulerData = ruler(maxValue, 0, 5);

            // 留白大小
            var grid = {
                left: 30,
                top: 50,
                right: 70,
                bottom: 30
            };

            itemWidth = (mycontent.clientHeight - grid.top - grid.bottom) / data[0].value.length;

            hadInit = false;
            painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight);

            // 根据值计算出对应的坐标y值
            calcY = function (value) {
                return mycontent.clientWidth - (rulerData[rulerData.length - 1] - value) / rulerData[rulerData.length - 1] * (mycontent.clientWidth - grid.left - grid.right) - grid.right;
            };

            // 生成点真实位置
            var pointsTop = [], pointsBottom = [];
            for (i = 0; i < data[0].value.length; i++) {
                x = (i + 0.5) * ((mycontent.clientHeight - grid.top - grid.bottom) / data[0].value.length) + grid.top;

                pointsTop.push([x, calcY(data[0].value[i])]);
                pointsBottom.push([x, calcY(data[1].value[i])]);
            }

            // 生成插值函数实例
            var cardinalTop = cardinal().setP(pointsTop);
            var cardinalBottom = cardinal().setP(pointsBottom);

            updateView = function (deep, hoverData) {
                painter.clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight).config({
                    "fontSize": 10
                });

                // 垂直刻度尺
                painter.config({
                    "textAlign": "right",
                    "fillStyle": "#6e7079",
                    "lineWidth": 1,
                    "lineDash": []
                });
                for (i = 0; i < rulerData.length; i++) {
                    y = calcY(rulerData[i]);

                    painter.fillText(rulerData[i], y, grid.top - 5, Math.PI * 0.5);

                    painter.config({
                        "strokeStyle": i == 0 ? data[1].color : i == rulerData.length - 1 ? data[0].color : "#e0e6f1"
                    }).beginPath().moveTo(y, grid.top).lineTo(y, mycontent.clientHeight - grid.bottom).stroke();
                }

                // 上边水平刻度尺
                painter.config({
                    "textAlign": "center",
                    "strokeStyle": data[0].color,
                    "fillStyle": data[0].color,
                    "fontSize": 8
                });
                for (i = 0; i < data[0].value.length; i++) {
                    x = (i + 0.5) * itemWidth + grid.top;

                    painter.fillText(data[0].year + "-" + (i + 1), mycontent.clientWidth - grid.right + 15, x, Math.PI * 0.5);
                    painter.beginPath().moveTo(mycontent.clientWidth - grid.right, x).lineTo(mycontent.clientWidth - grid.right + 5, x).stroke();
                }

                // 下边水平刻度尺
                painter.config({
                    "strokeStyle": data[1].color,
                    "fillStyle": data[1].color
                });
                for (i = 0; i < data[1].value.length; i++) {
                    x = (i + 0.5) * itemWidth + grid.top;
                    y = grid.left;

                    painter.fillText(data[1].year + "-" + (i + 1), y - 15, x, Math.PI * 0.5);
                    painter.beginPath().moveTo(y, x).lineTo(y - 5, x).stroke();
                }

                // 第一个图例
                painter.config({
                    "fillStyle": "white",
                    "strokeStyle": data[0].color,
                    "lineWidth": 2,
                    "textAlign": "left"
                })
                    .beginPath().moveTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 140).lineTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 110).stroke()
                    .fullCircle(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 125, 5)
                    .config({
                        "fillStyle": "black"
                    })
                    .fillText('Precipitation(' + data[0].year + ')', mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 - 100, Math.PI * 0.5);

                // 第二个图例
                painter.config({
                    "fillStyle": "white",
                    "strokeStyle": data[1].color,
                    "lineWidth": 2
                })
                    .beginPath().moveTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 20).lineTo(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 50).stroke()
                    .fullCircle(mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 35, 5)
                    .config({
                        "fillStyle": "black"
                    })
                    .fillText('Precipitation(' + data[1].year + ')', mycontent.clientWidth - 30, mycontent.clientHeight * 0.5 + 60, Math.PI * 0.5);

                // 第一个曲线
                painter.config({
                    "strokeStyle": data[0].color,
                    "lineWidth": 2
                }).beginPath();
                for (x = grid.top; x < (mycontent.clientHeight - grid.top) * deep + grid.top - grid.bottom; x += 5) {
                    painter.lineTo(cardinalTop(x), x);
                }
                painter.stroke();

                // 第二个曲线
                painter.config({
                    "strokeStyle": data[1].color
                }).beginPath();
                for (x = grid.top; x < (mycontent.clientHeight - grid.top) * deep + grid.top - grid.bottom; x += 5) {
                    painter.lineTo(cardinalBottom(x), x);
                }
                painter.stroke();

                // 显示悬浮
                if (hoverData) {

                    // 垂直线条
                    painter.config({
                        "lineDash": [2],
                        "strokeStyle": "black",
                        "lineWidth": 1
                    })
                        .beginPath().moveTo(hoverData.yAxis.top, grid.top).lineTo(hoverData.yAxis.top, mycontent.clientHeight - grid.top).stroke()
                        .beginPath().moveTo(grid.left, hoverData.xAxis.left).lineTo(mycontent.clientWidth - grid.right, hoverData.xAxis.left).stroke();

                    // 左侧提示
                    painter.config({
                        "fillStyle": "black"
                    }).fillRect(hoverData.yAxis.top - 10, grid.top - 40, 20, 40)
                        .config({
                            "fillStyle": "white",
                            "textAlign": "center",
                            "fontSize": 10
                        })
                        .fillText(hoverData.yAxis.value, hoverData.yAxis.top, grid.top - 20, Math.PI * 0.5);

                    // 顶部提示
                    painter.config({
                        "fillStyle": data[0].color
                    }).fillRect(mycontent.clientWidth - grid.right + 4, hoverData.xAxis.left - 90, 20, 180)
                        .config({
                            "fillStyle": "white"
                        }).fillText("Precipitation " + data[0].year + "-" + (hoverData.xAxis.index + 1) + " " + data[0].value[hoverData.xAxis.index], mycontent.clientWidth - grid.right + 14, hoverData.xAxis.left, Math.PI * 0.5);

                    // 底部提示
                    painter.config({
                        "fillStyle": data[1].color
                    }).fillRect(grid.left - 24, hoverData.xAxis.left - 90, 20, 180)
                        .config({
                            "fillStyle": "white"
                        }).fillText("Precipitation " + data[1].year + "-" + (hoverData.xAxis.index + 1) + " " + data[1].value[hoverData.xAxis.index], grid.left - 14, hoverData.xAxis.left, Math.PI * 0.5);

                }

                if (deep == 1) {
                    painter.config({
                        "fillStyle": "white",
                        "lineDash": [],
                        "lineWidth": 2
                    });
                    for (i = 0; i < data.length; i++) {
                        for (j = 0; j < data[i].value.length; j++) {
                            painter.config({
                                "strokeStyle": data[i].color
                            }).fullCircle(calcY(data[i].value[j]), (j + 0.5) * itemWidth + grid.top, (hoverData && hoverData.xAxis.index == j) ? 5 : 3);
                        }
                    }
                }

            };

            animation(function (deep) {
                updateView(deep);
            }, 1000, function () {
                hadInit = true;
            });

            // 注册鼠标移动事件
            var hasCurrent;
            var doMove = function (event) {

                var offsetY = event.touches[0].clientX - 20;
                var offsetX = event.touches[0].clientY - 65;

                // 完成初始化以后才响应鼠标事件
                if (hadInit) {

                    // 悬浮提示
                    if (offsetX > grid.top && offsetX < mycontent.clientHeight - grid.bottom && offsetY > grid.left && offsetY < mycontent.clientWidth - grid.right) {

                        var index = Math.floor((offsetX - grid.top) / itemWidth);

                        updateView(1, {
                            xAxis: {
                                index: index,
                                left: (index + 0.5) * itemWidth + grid.top
                            },
                            yAxis: {
                                value: ((1 - (mycontent.clientWidth - offsetY - grid.right) / (mycontent.clientWidth - grid.left - grid.right)) * rulerData[rulerData.length - 1]).toFixed(2),
                                top: offsetY
                            }
                        });
                        hasCurrent = true;
                    }

                    // 出悬浮区域，隐藏悬浮提示
                    else if (hasCurrent) {
                        updateView(1);
                        hasCurrent = false;
                    }

                }
            };

            mycanvas.addEventListener('touchstart', doMove);
            mycanvas.addEventListener('touchmove', doMove);

        }
    };
};