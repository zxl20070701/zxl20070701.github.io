import template from './index.html';
import './index.scss';

import { formatColor } from '../../tool/formatColor';
import drawColorCanvas from './drawColorCanvas';
import xhtml from '../../tool/xhtml';
import getColorByPosition from './getColorByPosition';
import getColorByDeep from './getColorByDeep';
import calcDeepWidthColor from './calcDeepWidthColor';

var painter, isDown = false;
export default function (obj, props) {
    return {
        name: "color-picker",
        render: template,
        data: {
            title: props.title,
            color: obj.ref(formatColor(props.color))
        },
        mounted: function () {
            painter = document.getElementById('color-picker-canvas').getContext('2d');

            // 更新色彩大块
            drawColorCanvas(painter, this.color[0], this.color[1], this.color[2]);

            // 更新悬浮位置
            document.getElementById('color-cursor-id').style.left = (calcDeepWidthColor(this.color[0], this.color[1], this.color[2]) * 200 - 6) + 'px';

            document.body.addEventListener('mousedown', function () {
                isDown = true;
            });

            document.body.addEventListener('mouseup', function () {
                isDown = false;
            });
        },

        methods: {

            // 确定
            doSubmit: function () {
                this.$closeDialog("rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.color[3] + ")");
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            },

            // 获取并更新位置
            calcByPosition: function (event, updateTop) {
                if (event.type != 'click' && !isDown) return;

                // 求解出鼠标的相对位置
                var targetEl = event.target;
                var position = xhtml.mousePosition(targetEl, event);

                // 修改悬浮球位置
                var spanEl = targetEl.getElementsByTagName('span')[0];
                spanEl.style.left = (position.x - 6) + 'px';
                if (updateTop) spanEl.style.top = (position.y - 6) + 'px';

                if (updateTop) {
                    return position;
                } else {
                    return (position.x + 1) * 0.005;
                }
            },

            // 选择颜色
            selectColor: function (event) {
                var position = this.calcByPosition(event, true);
                if (position) {

                    // 设置颜色(很明显，这里不应该修改透明度)
                    var rgb = getColorByPosition(this.color[0], this.color[1], this.color[2], position.x, position.y);
                    this.color = [rgb[0], rgb[1], rgb[2], this.color[3]];

                }
            },

            // 修改颜色
            updateColor: function (event) {
                var val = this.calcByPosition(event);
                if (val) {
                    var rgb = getColorByDeep(val);

                    // 修改颜色
                    this.color = [rgb[0], rgb[1], rgb[2], this.color[3]];

                    // 更新色彩大块
                    drawColorCanvas(painter, this.color[0], this.color[1], this.color[2]);

                }
            },

            // 修改透明度
            updateAlpha: function (event) {
                var val = this.calcByPosition(event);
                if (val) {
                    this.color = [this.color[0], this.color[1], this.color[2], val];
                }
            }

        }
    };
};