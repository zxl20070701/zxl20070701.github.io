import template from './index.html';

import ResizeObserver from '../../../../tool/ResizeObserver';
import data from './data';
import canvasRender from '../../../../tool/canvas/index';
import ruler from '../../../../tool/ruler';
import throttle from '../../../../tool/throttle';
import PointIn from '../../../../tool/pointin/index';
import bindEvent from '../../../../tool/xhtml/bind';

export default function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            var color = "#e94782";
            var gradient = ['rgb(255, 158, 68)', 'rgb(255, 70, 131)'];

            var boxWidth, boxHeight;

            var grid = {
                left: 55,
                top: 20,
                right: 55,
                bottom: 30
            };

            var zoom = {
                x: 0,
                y: 0,
                height: 26,
                width: 0,
                bottom: 10,
                beginIndex: Math.round((data.length - 1) * 0.3),
                endIndex: Math.round((data.length - 1) * 0.7)
            };

            var min = data[0].value, max = data[0].value;
            for (var item of data) {
                if (item.value > max) max = item.value;
                if (item.value < min) min = item.value;
            }

            var pointIn = new PointIn(), zoomPosition = 0, zoomHandler = "", handler1x = 0, handler2x = 0, zoomIndexOne = 0, zoomValueOne = 0, updateView = null;

            var helpCache = { beginIndex: 0, endIndex: 0 };

            bindEvent(mycontent, "mousedown", function (event) {
                if (!updateView) return;
                pointIn.setPoint(event.offsetX, event.offsetY);

                if (pointIn.rect(handler1x - 3, zoom.y, 6, zoom.height)) zoomHandler = "beginIndex";
                else if (pointIn.rect(handler2x - 3, zoom.y, 6, zoom.height)) zoomHandler = "endIndex";
                else if (pointIn.rect(handler1x, zoom.y - 7, handler2x - handler1x, 7)) {
                    zoomPosition = event.offsetX;
                    helpCache.beginIndex = zoom.beginIndex;
                    helpCache.endIndex = zoom.endIndex;
                }
            });

            bindEvent(mycontent, "mousemove", function (event) {
                // 修改边界
                if (zoomHandler) {
                    var x;
                    if (event.offsetX <= zoom.x) x = 0;
                    else if (event.offsetX >= zoom.x + zoom.width) x = zoom.width;
                    else x = event.offsetX - zoom.x;

                    var index = Math.round(x / zoomIndexOne);

                    if (zoom[zoomHandler] != index) {
                        zoom[zoomHandler] = index

                        if (zoom.beginIndex > zoom.endIndex) {
                            var temp = zoom.beginIndex;
                            zoom.beginIndex = zoom.endIndex;
                            zoom.endIndex = temp;
                            zoomHandler = zoomHandler == "beginIndex" ? "endIndex" : "beginIndex";
                        }
                        updateView(true);
                    }
                }

                // 移动
                else if (zoomPosition) {
                    var indexChange = Math.round((event.offsetX - zoomPosition) / zoomIndexOne);
                    if (helpCache.beginIndex + indexChange < 0) indexChange = -helpCache.beginIndex;
                    else if (helpCache.endIndex + indexChange >= data.length) indexChange = data.length - helpCache.endIndex - 1;

                    zoom.beginIndex = helpCache.beginIndex + indexChange;
                    zoom.endIndex = helpCache.endIndex + indexChange;
                    updateView(true);
                }
            });

            bindEvent(mycontent, "mouseup", function (event) {
                if (zoomHandler || zoomPosition) {
                    zoomHandler = "";
                    zoomPosition = 0;
                    updateView(false);
                }
            });

            var zoomCache = null;
            var getZoomBackground = function (painter) {
                return new Promise(function (resolve) {
                    if (zoomCache) resolve(zoomCache)
                    else {

                        // 轮廓
                        painter.config({
                            strokeStyle: "#e8ecf6"
                        }).strokeRect(zoom.x, zoom.y, zoom.width, zoom.height);

                        // 内容
                        painter.config({
                            fillStyle: "#ebeff8",
                            lineWidth: 2,
                            lineJoin: "round"
                        }).beginPath();
                        for (var index = 0; index < data.length; index++) {
                            var item = data[index];
                            painter.lineTo(zoom.x + index * zoomIndexOne, zoom.y + zoom.height - zoomValueOne * (item.value - min));
                        }
                        painter.stroke().lineTo(zoom.x + zoom.width, zoom.y + zoom.height).lineTo(zoom.x, zoom.y + zoom.height).fill();

                        var imgInstance = new Image()
                        imgInstance.onload = function () {
                            zoomCache = imgInstance;
                            resolve(zoomCache);
                        }
                        imgInstance.src = painter.toDataURL();

                    }
                });
            };

            var painter = null;

            updateView = throttle(function (isMoving) {
                painter.config({
                    fillStyle: "white"
                }).fillRect(0, 0, boxWidth, boxHeight);

                getZoomBackground(painter).then(function (zoomBackground) {

                    /**
                     * 绘制zoom
                     */
                    handler1x = zoom.x + zoom.beginIndex * zoomIndexOne;
                    handler2x = zoom.x + zoom.endIndex * zoomIndexOne;

                    painter.drawImage(zoomBackground, 0, 0, boxWidth, boxHeight);

                    // 选中区域
                    painter.config({
                        fillStyle: "rgba(33,150,240,0.2)"
                    }).fillRect(handler1x, zoom.y, handler2x - handler1x, zoom.height);

                    // 控制移动区域
                    var hdist = handler2x - handler1x;
                    if (hdist > 20) {
                        painter.config({
                            fillStyle: "#dfe5f3"
                        }).fillRect(handler1x, zoom.y, hdist, -7)
                            .config({
                                fillStyle: "white"
                            }).fillRect(handler1x + hdist * 0.5 - 5, zoom.y - 2, 10, -3);
                    }

                    // 2个把柄
                    painter.config({
                        strokeStyle: "#bbc8e3",
                        fillStyle: "white"
                    })
                        .beginPath().moveTo(handler1x, zoom.y).lineTo(handler1x, zoom.y + zoom.height).stroke()
                        .beginPath().moveTo(handler2x, zoom.y).lineTo(handler2x, zoom.y + zoom.height).stroke()
                        .fullRect(handler1x - 3, zoom.y + 5, 6, zoom.height - 10)
                        .fullRect(handler2x - 3, zoom.y + 5, 6, zoom.height - 10);

                    // 边界文字
                    if (isMoving) {
                        painter.config({
                            fillStyle: "#aaa",
                            textAlign: "right",
                            textBaseline: "middle",
                            fontSize: 10
                        })
                            .fillText(data[zoom.beginIndex].name, handler1x - 5, zoom.y + zoom.height * 0.5)
                            .config({
                                textAlign: "left"
                            })
                            .fillText(data[zoom.endIndex].name, handler2x + 5, zoom.y + zoom.height * 0.5);
                    }

                    /**
                     * 绘制折线图
                     */

                    var _min = data[zoom.beginIndex].value, _max = data[zoom.beginIndex].value;
                    for (var index = zoom.beginIndex + 1; index <= zoom.endIndex; index++) {
                        var item = data[index];
                        if (item.value > _max) _max = item.value;
                        if (item.value < _min) _min = item.value;
                    }

                    if (gradient) {
                        if (_min > 0) _min = 0;
                        if (_max < 0) _max = 0;
                    }

                    var rulerData = ruler(_max, _min, 5);
                    _min = rulerData[0];
                    _max = rulerData[rulerData.length - 1];

                    var bootomPosition = boxHeight - grid.bottom - zoom.bottom - zoom.height;

                    var getYByValue = function (value) {
                        return bootomPosition - (value - _min) / (_max - _min) * (bootomPosition - grid.top);
                    };

                    var getXByIndex = function (index) {
                        return grid.left + (boxWidth - grid.left - grid.right) * (index - zoom.beginIndex) / (zoom.endIndex - zoom.beginIndex);
                    };

                    // 绘制Y刻度尺
                    painter.config({
                        fillStyle: "#75777f",
                        strokeStyle: "#e0e6f1",
                        textAlign: "right",
                        textBaseline: "middle",
                        fontSize: 10,
                        lineWidth: 0.5
                    });
                    for (var rulerValue of rulerData) {
                        var y = getYByValue(rulerValue);
                        painter.fillText(rulerValue, grid.left - 2, y)
                            .beginPath().moveTo(grid.left, y).lineTo(boxWidth - grid.right, y).stroke();
                    }

                    // 绘制X刻度尺
                    painter.config({
                        textBaseline: "top"
                    }).fillText(data[zoom.endIndex].name, boxWidth - grid.right, bootomPosition + 5)
                        .config({
                            textAlign: "left"
                        }).fillText(data[zoom.beginIndex].name, grid.left, bootomPosition + 5);

                    if (gradient) {

                        // 绘制填充区域
                        var zeroY = getYByValue(0);
                        var deep = (zeroY - grid.top) / (bootomPosition - grid.top);
                        painter.beginPath();
                        for (var index = zoom.beginIndex; index <= zoom.endIndex; index++) {
                            painter.lineTo(getXByIndex(index), getYByValue(data[index].value));
                        }
                        painter.config({
                            fillStyle: painter.createLinearGradient(0, grid.top, 0, bootomPosition)
                                .addColorStop(0, gradient[0])
                                .addColorStop(deep, gradient[1])
                                .addColorStop(1, gradient[0])
                                .value()
                        }).lineTo(boxWidth - grid.right, zeroY)
                            .lineTo(grid.left, zeroY).fill();
                    }

                    // 绘制线条
                    painter.config({
                        lineWidth: 2,
                        strokeStyle: color
                    }).beginPath();
                    for (var index = zoom.beginIndex; index <= zoom.endIndex; index++) {
                        painter.lineTo(getXByIndex(index), getYByValue(data[index].value));
                    }
                    painter.stroke();

                });
            }, {
                time: 50
            });

            ResizeObserver(mycontent, function () {
                boxWidth = mycontent.clientWidth, boxHeight = mycontent.clientHeight;
                zoomCache = null;

                zoom.x = grid.left;
                zoom.y = boxHeight - zoom.height - zoom.bottom;
                zoom.width = boxWidth - grid.left - grid.right;

                zoomIndexOne = zoom.width / (data.length - 1);
                zoomValueOne = zoom.height / (max - min);

                painter = canvasRender(mycanvas, boxWidth, boxHeight, {}, true);

                updateView();
            });

        }
    };
};