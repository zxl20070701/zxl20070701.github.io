import template from './index.html';
import './index.scss';

import regexpToJson from './regexpToJson/index';
import drawImage from './drawImage/index';
import canvasRender from '../../tool/canvas/index';
import urlFormat from '../../tool/urlFormat';

var urlObj = urlFormat();
export default function (obj) {
    return {
        render: template,
        data: {
            expressVal: obj.ref(decodeURIComponent(urlObj.params.express || "") || "\\w{1,5}[a-e0-8]|4(534)5(35{3}|d)d(?=123)\\1"),
            isString: obj.ref(urlObj.params.isString || "no")
        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "正则表达式可视化";
            document.getElementById('icon-logo').setAttribute('href', './regexper-visualization.png');
        },
        mounted: function () {

            // 调用显示
            this.doDisplay("load");

            document.getElementById('is-string-' + this.isString).setAttribute('checked', 'checked');

        },
        methods: {
            doIsString(event, target) {
                this.isString = target.getAttribute('tag');
                this.doDisplay();
            },
            doDisplay: function (flag) {

                // 如果不是初始化打开时候触发的，需要更新地址进行记录
                if (flag != 'load') {
                    window.location.href = "#/regexper-visualization?express=" + encodeURIComponent(this.expressVal) + "&isString=" + this.isString;
                }

                // 求解绘制需要的信息
                var imageData = regexpToJson(this.expressVal, this.isString == 'yes');

                // 设置画布大小
                var canvas = document.getElementsByTagName('canvas')[0];
                canvas.setAttribute('width', imageData.width + 60);
                canvas.setAttribute('height', imageData.height + 20);

                // 获取画笔并进行初始化
                var painter = canvasRender(canvas).config({
                    textAlign: "center",
                    "font-family": "sans-serif"
                });

                // 绘制
                window.group_index = 1;
                drawImage(painter, imageData, 30, 10);

                // 绘制开头和结尾

                painter.beginPath().moveTo(20, imageData.height * 0.5 + 10).lineTo(30, imageData.height * 0.5 + 10).stroke();
                painter.beginPath().moveTo(imageData.width + 40, imageData.height * 0.5 + 10).lineTo(imageData.width + 30, imageData.height * 0.5 + 10).stroke();

                painter.fillCircle(15, imageData.height * 0.5 + 10, 5);
                painter.fillCircle(imageData.width + 45, imageData.height * 0.5 + 10, 5);

            }
        }

    };
};