import template from './index.html';
import './index.scss';

import xhr from '../../tool/xhr/index';
import urlFormat from '../../tool/urlFormat';
import ruler from '../../tool/ruler';
import toValue from './toValue';
import getLoopColors from '../../tool/getLoopColors';
import ResizeObserver from '../../tool/ResizeObserver';
import canvasRender from '../../tool/canvas/index';

export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "npm download";
            document.getElementById('icon-logo').setAttribute('href', './npm.png');
        },
        data: {
            url: ""
        },
        mounted: function () {

            var date = new Date();
            var year = date.getFullYear();
            var month_day = "-" + (date.getMonth() - (-1)) + "-" + date.getDate();

            this.url = "https://api.npmjs.org/downloads/range/" + (year - 1) + month_day + ":" + year + month_day + "/";

            this.updateView();

        },
        methods: {

            // 更新视图
            updateView: function () {

                var _this = this;
                var urlObj = urlFormat();

                // 校对参数
                if (!urlObj.params.packages || !urlObj.params.interval) {

                    urlObj.params.packages = 'jsdoor';
                    urlObj.params.interval = 7;
                    window.location.href = "#/npm-download?interval=7&packages=jsdoor";

                }

                // 发送请求
                xhr({
                    method: "GET",
                    url: this.url + urlObj.params.packages,
                }, function (data) {
                    if (data.status == 200) {

                        var npmOralData = JSON.parse(data.data);
                        if (!/,/.test(urlObj.params.packages)) {
                            var _npmOralData = {};
                            _npmOralData[urlObj.params.packages] = npmOralData;
                            npmOralData = _npmOralData;
                        }

                        // 对npm数据解析
                        var npmData = {}, max = 0, len = 0;
                        for (var pkgName in npmOralData) {
                            if (npmOralData[pkgName]) {
                                npmData[pkgName] = toValue(npmOralData[pkgName].downloads, +urlObj.params.interval);

                                if (max < npmData[pkgName].max) max = npmData[pkgName].max;
                                len += 1;
                            }
                        }

                        if (len <= 0) {
                            return;
                        }

                        // 求解刻度尺
                        var rulerData = ruler(max, 0, 10);
                        var colors = getLoopColors(len);

                        var canvas = document.getElementsByTagName('canvas')[0];
                        var chartEl = document.getElementById('chart');
                        ResizeObserver(chartEl, function () {
                            _this.drawView(canvasRender(canvas, chartEl.clientWidth, chartEl.clientHeight), npmData, rulerData, colors, chartEl.clientWidth, chartEl.clientHeight);
                        });

                    }
                });

            },

            // 绘制视图
            drawView: function (painter, npmData, rulerData, colors, width, height) {
                var max = rulerData[rulerData.length - 1];

                // 先绘制刻度尺
                painter.config({
                    textAlign: "right"
                });
                for (var index = 0; index < rulerData.length; index++) {

                    var y = (height - 50) - rulerData[index] / max * (height - 100);
                    painter
                        .config({
                            strokeStyle: "black"
                        })
                        .beginPath()
                        .moveTo(140, y)
                        .lineTo(150, y)
                        .stroke()
                        .fillText(rulerData[index].toFixed(0), 130, y)
                        .config({
                            strokeStyle: "#a5a5a5"
                        })
                        .beginPath()
                        .moveTo(150, y)
                        .lineTo(width - 150, y)
                        .stroke();
                }

                painter
                    .config({
                        strokeStyle: "black"
                    })
                    .beginPath()
                    .moveTo(150, 50)
                    .lineTo(150, height - 50)
                    .stroke();

                // 绘制连线
                var k = -1;
                for (var pkgName in npmData) {
                    var item = npmData[pkgName];
                    var dist = (width - 300) / (item.value.length - 1);

                    // 绘制连线
                    painter.config({
                        strokeStyle: colors[++k]
                    })
                        .beginPath();
                    for (var index = 0; index < item.value.length; index++) {

                        var x = index * dist + 150;
                        var y = (height - 50) - item.value[index] / max * (height - 100);

                        painter.lineTo(x, y);

                    }
                    painter.stroke();

                    // 绘制点
                    painter.config({
                        fillStyle: "white"
                    });
                    for (var index = 0; index < item.value.length; index++) {

                        var x = index * dist + 150;
                        var y = (height - 50) - item.value[index] / max * (height - 100);

                        painter.fullCircle(x, y, 2);
                    }

                    // 绘制右边提示
                    painter
                        .config({
                            fillStyle: colors[k]
                        })
                        .fillRect(width - 140, k * 20 + 50, 20, 10)
                        .config({
                            fillStyle: "black",
                            textAlign: "left"
                        })
                        .fillText(pkgName, width - 115, k * 20 + 55);

                }

            }

        }
    };
};