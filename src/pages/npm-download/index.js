import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/region';
import urlFormat from '../../tool/urlFormat';
import getValue from './getValue';
import toValue from './toValue';

export default function (obj) {

    return {
        name: "npm-download",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Npm Download" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './npm.png');
        },
        mounted: function () {
            var _this = this;

            var urlObj = urlFormat();
            if (!urlObj.params.packages || !urlObj.params.interval) {
                alert("参数错误");
                return;
            } else {

                getValue(urlObj.params.packages).then(function (npmOralData) {

                    // 对npm数据解析
                    var npmData = {}, max = 0, len = 0, dates = [];
                    for (var pkgName in npmOralData) {
                        if (npmOralData[pkgName]) {
                            var result = toValue(npmOralData[pkgName].downloads, +urlObj.params.interval);
                            npmData[pkgName] = result;
                            dates = result.time;

                            if (max < npmData[pkgName].max) max = npmData[pkgName].max;
                            len += 1;
                        }
                    }

                    if (len <= 0) {
                        return;
                    }

                    // 获取第一个包名称作为图例显示
                    var pkgNames = Object.keys(npmData);
                    var legendTextEl = document.querySelector('.legend-text');
                    if (legendTextEl) {
                        legendTextEl.textContent = pkgNames[0];
                    }

                    // 获取画笔
                    var painter = canvasRender(_this._refs.mycanvas.value);

                    // 绘制背景网格
                    painter.config({
                        strokeStyle: '#e0e0e0',
                        lineWidth: 1
                    });

                    // 绘制水平网格线
                    for (var i = 0; i < 10; i++) {
                        var y = 400 - (i / 10) * 400;
                        painter.beginPath()
                            .moveTo(80, y)
                            .lineTo(820, y)
                            .stroke();
                    }

                    // 绘制垂直网格线
                    for (var i = 0; i <= 12; i++) {
                        var x = 80 + (i / 12) * 740;
                        painter.beginPath()
                            .moveTo(x, 40)
                            .lineTo(x, 400)
                            .stroke();
                    }

                    // 绘制 Y 轴
                    painter.config({
                        strokeStyle: '#999',
                        lineWidth: 2
                    }).beginPath()
                        .moveTo(80, 40)
                        .lineTo(80, 400)
                        .stroke();

                    // 绘制 X 轴
                    painter.beginPath()
                        .moveTo(80, 400)
                        .lineTo(820, 400)
                        .stroke();

                    // 绘制 Y 轴刻度和标签
                    painter.config({
                        fillStyle: '#666',
                        fontSize: 11,
                        fontFamily: 'Arial'
                    });
                    for (var i = 0; i < 10; i++) {
                        var y = 400 - (i / 10) * 400;
                        var value = Math.round((i / 10) * max);
                        painter.fillText(value.toString(), 50, y + 4);

                        // 绘制刻度标记
                        painter.beginPath()
                            .moveTo(75, y)
                            .lineTo(80, y)
                            .stroke();
                    }

                    // 绘制 X 轴日期标签
                    painter.config({
                        textAlign: "center"
                    })
                    for (var i = 0; i < dates.length; i += Math.ceil(dates.length / 12)) {
                        if (i % 2 == 0) continue
                        var x = 80 + (i / (dates.length - 1)) * 740;
                        painter.fillText(dates[i], x, 425);

                        // 绘制刻度标记
                        painter.beginPath()
                            .moveTo(x, 400)
                            .lineTo(x, 405)
                            .stroke();
                    }

                    // 绘制数据区域填充和折线
                    for (var pkgName in npmData) {
                        painter.config({
                            strokeStyle: '#4a4a4a',
                            fillStyle: 'rgba(240, 240, 240, 0.5)',
                            lineWidth: 2,
                            lineJoin: "round"
                        }).beginPath();

                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            var px = 80 + (index / (npmData[pkgName].value.length - 1)) * 740;
                            var py = 400 - (npmData[pkgName].value[index] / max) * 360;
                            if (index === 0) {
                                painter.moveTo(px, py);
                            } else {
                                painter.lineTo(px, py);
                            }
                        }

                        // 填充区域
                        painter.lineTo(80 + ((npmData[pkgName].value.length - 1) / (npmData[pkgName].value.length - 1)) * 740, 400);
                        painter.lineTo(80, 400);
                        painter.closePath()
                            .fill()
                            .stroke();

                        // 绘制数据点
                        painter.config({
                            fillStyle: '#4a4a4a'
                        });
                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            var px = 80 + (index / (npmData[pkgName].value.length - 1)) * 740;
                            var py = 400 - (npmData[pkgName].value[index] / max) * 360;
                            // 使用原生painter绘制圆形
                            painter.painter().draw.beginPath();
                            painter.painter().draw.arc(px, py, 4, 0, Math.PI * 2);
                            painter.painter().draw.fill();
                        }
                    }

                });

            }
        }
    };
};