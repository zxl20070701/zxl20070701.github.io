import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/region';
import urlFormat from '../../tool/urlFormat';
import getValue from '../../pages/npm-download/getValue';
import toValue from '../../pages/npm-download/toValue';

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

                    var width = +_this._refs.mycanvas.value.getAttribute('width');
                    var height = +_this._refs.mycanvas.value.getAttribute('height');

                    // 绘制背景网格（横向方向）
                    painter.config({
                        strokeStyle: '#e0e0e0',
                        lineWidth: 1
                    });

                    // 绘制垂直网格线（数值方向）
                    for (var i = 0; i <= 5; i++) {
                        var x = 50 + (i / 5) * (width - 70);
                        painter.beginPath()
                            .moveTo(x, 20)
                            .lineTo(x, height - 30)
                            .stroke();
                    }

                    // 绘制水平网格线（时间方向）
                    for (var i = 0; i <= 6; i++) {
                        var y = 20 + (i / 6) * (height - 50);
                        painter.beginPath()
                            .moveTo(50, y)
                            .lineTo(width - 20, y)
                            .stroke();
                    }

                    // 绘制 X 轴（数值轴）
                    painter.config({
                        strokeStyle: '#999',
                        lineWidth: 2
                    }).beginPath()
                        .moveTo(50, height - 30)
                        .lineTo(width - 20, height - 30)
                        .stroke();

                    // 绘制 Y 轴（时间轴）
                    painter.beginPath()
                        .moveTo(50, 20)
                        .lineTo(50, height - 30)
                        .stroke();

                    // 绘制 X 轴刻度和标签（数值）
                    painter.config({
                        fillStyle: '#666',
                        fontSize: 10,
                        fontFamily: 'Arial'
                    });
                    for (var i = 0; i <= 5; i++) {
                        var x = 50 + (i / 5) * (width - 70);
                        var value = Math.round((i / 5) * max);
                        painter.fillText(value.toString(), x - 15, height - 10);

                        // 绘制刻度标记
                        painter.beginPath()
                            .moveTo(x, height - 30)
                            .lineTo(x, height - 33)
                            .stroke();
                    }

                    // 绘制 Y 轴日期标签
                    painter.config({
                        textAlign: "center"
                    })
                    for (var i = 0; i < dates.length; i += Math.ceil(dates.length / 6)) {
                        var y = 20 + (i / (dates.length - 1)) * (height - 50);
                        var dateText = dates[i].length > 10 ? dates[i].substring(0, 10) : dates[i];
                        painter.fillText(dateText, 40, y + 15, Math.PI * 0.5);

                        // 绘制刻度标记
                        painter.beginPath()
                            .moveTo(47, y)
                            .lineTo(50, y)
                            .stroke();
                    }

                    // 绘制数据区域填充和折线（横向方向）
                    for (var pkgName in npmData) {
                        painter.config({
                            strokeStyle: '#4a4a4a',
                            fillStyle: 'rgba(240, 240, 240, 0.5)',
                            lineWidth: 2,
                            lineJoin: "round"
                        }).beginPath();

                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            var px = 50 + (npmData[pkgName].value[index] / max) * (width - 70);
                            var py = 20 + (index / (npmData[pkgName].value.length - 1)) * (height - 50);
                            if (index === 0) {
                                painter.moveTo(px, py);
                            } else {
                                painter.lineTo(px, py);
                            }
                        }

                        // 填充区域
                        painter.lineTo(50, 20 + ((npmData[pkgName].value.length - 1) / (npmData[pkgName].value.length - 1)) * (height - 50));
                        painter.lineTo(50, 20);
                        painter.closePath()
                            .fill()
                            .stroke();

                        // 绘制数据点
                        painter.config({
                            fillStyle: '#4a4a4a'
                        });
                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            var px = 50 + (npmData[pkgName].value[index] / max) * (width - 70);
                            var py = 20 + (index / (npmData[pkgName].value.length - 1)) * (height - 50);
                            painter.painter().draw.beginPath();
                            painter.painter().draw.arc(px, py, 3, 0, Math.PI * 2);
                            painter.painter().draw.fill();
                        }
                    }

                });

            }
        }
    };
};