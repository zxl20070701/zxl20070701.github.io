import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/index';
import getKeyCode from '../../tool/keyCode';

export default function (obj) {
    var painter;

    return {
        name: "snake-eating",
        render: template,
        data: {

            // 提示内容
            tips: obj.ref("温馨提示：点击「开始游戏」启动运行！"),

            // 记录是否游戏中
            isRuning: obj.ref(false),

            // 食物
            foodBlock: [],

            // 记录小蛇
            blocks: [],

            // 下一步走法
            mulpD: ""

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "贪吃蛇" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './snake-eating.png');
        },
        mounted: function () {
            var canvas = this._refs.mycanvas.value;

            // 获取画笔
            painter = canvasRender(canvas, canvas.clientWidth, canvas.clientHeight, {}, true);

            this.updateView();

            // 启动键盘监听
            var _this = this;
            getKeyCode(function (keyCode) {
                switch (keyCode) {
                    case 'up': {
                        _this.mulpD = [0, -1];
                        break;
                    }
                    case 'down': {
                        _this.mulpD = [0, 1];
                        break;
                    }
                    case 'left': {
                        _this.mulpD = [-1, 0];
                        break;
                    }
                    case 'right': {
                        _this.mulpD = [1, 0];
                        break;
                    }
                }
            });
        },
        methods: {

            // 刷新视图
            updateView: function () {
                var i;

                painter.clearRect(0, 0, 500, 500);

                // 先绘制格子
                painter.config({
                    strokeStyle: "white"
                });
                for (i = 0; i < 25; i++) {
                    painter

                        // 横线条
                        .beginPath().moveTo(0, i * 20).lineTo(500, i * 20).stroke()

                        // 纵线条
                        .beginPath().moveTo(i * 20, 0).lineTo(i * 20, 500).stroke();

                }

                //  然后绘制小格子
                for (i = 0; i < this.blocks.length; i++) {
                    painter.config({
                        fillStyle: i == 0 ? "#aaaaaa" : "white"
                    }).fillRect(this.blocks[i][0] * 20, this.blocks[i][1] * 20, 20, 20);
                }

                // 最后绘制食物
                painter.config('fillStyle', 'red').fillRect(this.foodBlock[0] * 20, this.foodBlock[1] * 20, 20, 20);

            },

            // 开始游戏
            beginGame: function () {

                // 初始化参数
                this.isRuning = true;
                this.mulpD = [0, -1];
                this.foodBlock = [20, 20];
                this.blocks = [
                    [10, 10],
                    [10, 11],
                    [10, 12],
                    [10, 13],
                    [11, 13],
                    [12, 13],
                    [13, 13],
                    [14, 13]
                ];

                this.updateView();

                // 轮询修改数据
                var _this = this;
                var interval = setInterval(function () {

                    var newBlock = [
                        _this.blocks[0][0] + _this.mulpD[0],
                        _this.blocks[0][1] + _this.mulpD[1]
                    ];

                    // 判断是否合法
                    if (!_this.isValidBlock(newBlock)) {

                        _this.isRuning = false;
                        clearInterval(interval);
                        _this.tips = "[分数：" + (_this.blocks.length - 8) + "]小蛇出界或者撞到自己了。";

                        return;
                    }

                    _this.blocks.unshift(newBlock);

                    // 判断是否吃到食物了
                    if (
                        newBlock[0] == _this.foodBlock[0] &&
                        newBlock[1] == _this.foodBlock[1]
                    ) {
                        _this.foodBlock = _this.newFood();
                    } else {
                        _this.blocks.pop();
                    }

                    _this.updateView();
                }, 200);

            },

            // 判断是否合法
            isValidBlock: function (block) {

                // 如果越界了
                if (block[0] < 0 || block[0] >= 25 || block[1] < 0 || block[1] >= 25) return false;

                for (var i = 0; i < this.blocks.length; i++) {

                    // 如果撞到自己了
                    if (this.blocks[i][0] == block[0] && this.blocks[i][1] == block[1]) return false;
                }

                return true;
            },

            // 产生新的事物
            newFood: function () {
                var newFood, tryNum = 1;
                do {

                    if (tryNum >= 10000) {
                        this.isRuning = false;
                        this.tips = '意外终止，系统内部错误。';
                    }

                    newFood = [
                        +(Math.random() * 24).toFixed(0),
                        +(Math.random() * 24).toFixed(0)
                    ];
                    tryNum += 1;
                } while (!this.isValidBlock(newFood));

                return newFood;
            }
        }
    };
};