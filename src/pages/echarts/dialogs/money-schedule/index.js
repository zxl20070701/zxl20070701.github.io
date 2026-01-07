import template from './index.html';

import svgRender from '../../../../tool/svg/index';
import animation from '../../../../tool/animation';
import rotate from '../../../../tool/transform/rotate';

var stop = function () { };
export default function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var _this = this;

            var painter = svgRender(this._refs.mysvg.value);

            // 进度条
            var rate = 0.73;

            painter

                // 绘制三个背景圆
                .config({
                    'fillStyle': '#fff7e9'
                }).appendEl("circle").fillCircle(250, 250, 250)
                .config({
                    'fillStyle': '#ffe1b1'
                }).appendEl("circle").fillCircle(250, 250, 220)
                .config({
                    'fillStyle': '#ffffff'
                }).appendEl("circle").fillCircle(250, 250, 180);

            // 准备好用来绘制动画wave的两个标签和进度弧
            var innerWave = svgRender(this._refs.mysvg.value).appendEl('path');
            var outerWave = svgRender(this._refs.mysvg.value).appendEl('path');
            var arcNode = svgRender(this._refs.mysvg.value).appendEl('path');

            // 绘制三行文字
            painter.config({
                'fontSize': 40,
                'fillStyle': '#272727',
                'textAlign': 'center'
            })
                .appendEl("text").fillText('￥100,000', 250, 210)
                .config({
                    'fontSize': 30,
                    'fillStyle': '#595757'
                })
                .appendEl("text").fillText('可借', 250, 160)
                .config({
                    'fontSize': 24,
                    'fillStyle': '#a4a1a1'
                })
                .appendEl("text").fillText('总额度150,000', 250, 260);

            // 配置进度条
            arcNode.config({
                'arcStartCap': 'round',
                'arcEndCap': 'round',
                'fillStyle': '#ff7f08'
            });

            // 启动动画并绘制进度条
            animation(function (deep) {

                // 根据当前进度deep更新弧形进度
                arcNode.fillArc(250, 250, 180, 200, -90, -360 * (1 - rate) * deep);

                // 初始化wave
                _this.fullWave(rate * deep, deep, innerWave, outerWave);

            }, 2000, function () {

                // 初始化显示完毕以后，启动wave动画
                _this.renderWave(rate, innerWave, outerWave);
            });

        },

        beforeDestory: function () {
            stop();
        },

        methods: {

            /**
            * 绘制波浪（完整的两条）
            * @param {number} rate 比率
            * @param {number} deep 动画进度
            * @param {node} innerWave 内wave结点
            * @param {node} outerWave 外wave结点
            */
            fullWave: function (rate, deep, innerWave, outerWave) {
                var help = 1;

                if (deep > 0.5) {
                    deep = deep - 0.5;
                    help = -1;
                }
                deep *= 2;

                // 绘制内弧
                this.drawerWave(innerWave.config({
                    'fillStyle': '#ff7f08'
                }), rate, deep, help);

                // 绘制外弧
                this.drawerWave(outerWave.config({
                    'fillStyle': '#fead2e'
                }), rate, deep, -help);
            },

            /**
            * 启动wave动画
            * @param {number} rate 比率
            * @param {number} deep 动画进度
            * @param {node} innerWave 内wave结点
            * @param {node} outerWave 外wave结点
            */
            renderWave: function (rate, innerWave, outerWave) {
                var _this = this;

                stop = animation(function (deep) {
                    _this.fullWave(rate, deep, innerWave, outerWave);
                }, 2000, function () {
                    _this.renderWave(rate, innerWave, outerWave);
                });
            },

            /**
            * 绘制具体的一条wave
            * @param {painter} painter 画笔
            * @param {number} rate 比率
            * @param {number} deep 动画进度
            * @param {number} help wave类型，去1或-1，分两种：开始上波和开始下波
            */
            drawerWave: function (painter, rate, deep, help) {

                // wave的起点和终点
                var beginPoint = rotate(250, 250, (0.5 - rate) * Math.PI, 410, 250);
                var endPoint = rotate(250, 250, (1.5 - rate) * Math.PI, 410, 250);

                // wave由下半圆和波浪组成
                painter
                    .beginPath()
                    .moveTo(beginPoint[0], beginPoint[1])

                    // 绘制半圆部分
                    .arc(250, 250, 160, (0.5 - rate) * 180, 2 * rate * 180)

                    // 绘制波浪部分
                    .bezierCurveTo(

                        // rate > 0.5 ? 1 - rate : rate是用来控制波动大小的，为了好看，0-0.5和0.5-1取对称
                        endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * deep, beginPoint[1] + 200 * deep * help * (rate > 0.5 ? 1 - rate : rate),
                        endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * (1 + deep), beginPoint[1] - 200 * (1 - deep) * help * (rate > 0.5 ? 1 - rate : rate),

                        // 上面是第一和第二个看着点，最后这个是终点，加上画笔开始位置作为起点
                        beginPoint[0], beginPoint[1]
                    )

                    // 填充
                    .fill();

            }
        }

    };

};