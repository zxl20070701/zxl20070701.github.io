import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/region';
import urlFormat from '../../tool/urlFormat';
import getValue from '../../pages/npm-download/getValue';
import toValue from '../../pages/npm-download/toValue';
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

                    var width = +_this._refs.mycanvas.value.getAttribute('width');
                    var height = +_this._refs.mycanvas.value.getAttribute('height');

                    // 求解刻度尺
                    var rulerData = ruler(max, 0, 5);
                    var colors = getLoopColors(len);

                    // 绘制刻度尺
                    drawRuler(painter, {
                        x: 20,
                        y: 50,
                        value: rulerData,
                        direction: 'LR',
                        "mark-direction": 'left',
                        length: width - 70
                    });

                    for (var pkgName in npmData) {
                        painter.config({
                            strokeStyle: colors.shift()
                        }).beginPath();
                        for (var index = 0; index < npmData[pkgName].value.length; index++) {
                            painter.lineTo(20 + (npmData[pkgName].value[index] / max) * (width - 70), 50 + (index / (npmData[pkgName].value.length - 1)) * (height - 70));
                        }
                        painter.stroke();
                    }


                });

            }
        }
    };
};