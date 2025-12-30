import template from './index.html';
import './index.scss';


import canvasRender from '../../tool/canvas/region';
import urlFormat from '../../tool/urlFormat';
import getValue from './getValue';
import toValue from './toValue';
import ruler from '../../tool/ruler';
import getLoopColors from '../../tool/getLoopColors';
import drawRuler from '../../tool/canvas/extend/ruler';

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

                    // 获取画笔
                    var painter = canvasRender(_this._refs.mycanvas.value);

                    // 求解刻度尺
                    var rulerData = ruler(max, 0, 10);
                    var colors = getLoopColors(len);

                    // 绘制刻度尺
                    drawRuler(painter, {
                        x: 100,
                        y: 450,
                        value: rulerData,
                        direction: 'BT',
                        "mark-direction": 'left',
                        length: 400
                    });

                    for (var pkgName in npmData) {
                        painter.config({
                            strokeStyle: colors.shift()
                        }).beginPath();
                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            painter.lineTo(100 + (index / (npmData[pkgName].value.length - 1)) * 750, 450 - (npmData[pkgName].value[index] / max) * 400);
                        }
                        painter.stroke();
                    }

                });

            }
        }
    };
};