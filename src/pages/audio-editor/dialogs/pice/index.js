import template from './index.html';
import './index.scss';

import canvasRender from '../../../../tool/canvas/index';
import formatTime from '../../../../tool/formatTime';

var painter;
export default function (obj, props) {
    return {
        name: "pice",
        render: template,
        data: {

            // 时长
            duration: props.duration,

            // 片段
            piceData: props.piceData,

            //  新的切割点
            newTime: obj.ref("00:00.000")
        },
        methods: {
            // 确定
            doSubmit: function () {
                this.$closeDialog(this.piceData);
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            },

            // 更新片段选中
            updatePiceSelected: function () {
                var trs = document.getElementById('table-list').getElementsByTagName('tr'), index;
                for (index = 0; index < trs.length; index++) {
                    this.piceData.value[index] = trs[index].getElementsByTagName('input')[0].checked ? true : false;
                }
            },

            // 更新片段
            updatePice: function () {

                var template = "", index;
                for (index = 1; index < this.piceData.split.length; index++) {
                    template += "<tr>" +
                        "    <th>" +
                        "        <input type='checkbox' " + (this.piceData.value[index - 1] ? "checked='checked'" : "") + ">" +
                        "    </th>" +
                        "    <th>" + index + "</th>" +
                        "    <th>" + formatTime(this.piceData.split[index - 1]) + "</th>" +
                        "    <th>" + formatTime(this.piceData.split[index]) + "</th>" +
                        "</tr>";
                }

                document.getElementById('table-list').innerHTML = template;

            },

            // 重置切割点
            resetSplit: function () {

                this.piceData = {
                    split: [0, this.duration],
                    value: [true]
                };

                this.drawTimeLine();
                this.updatePice();
            },

            // 新增切割点
            addSplit: function () {

                //  求解出新的切割点的值
                var temp = this.newTime.split(':');
                var val = (+temp[0]) * 60 - -temp[1];

                if (val > this.duration) {
                    alert('非法输入，因为输入的时间（' + formatTime(val) + '）大于时长(（' + formatTime(this.duration) + '）');
                    return;
                }

                // 寻找新的切割点的保存位置
                var index;
                for (index = 0; index < this.piceData.split.length - 1; index++) {

                    // 如果应该存放在 index ～ index+1 之间
                    if (val >= this.piceData.split[index] && val <= this.piceData.split[index + 1]) {
                        if (val == this.piceData.split[index] || val == this.piceData.split[index + 1]) return;

                        // 插入新的切割点
                        this.piceData.split.splice(index, 1, this.piceData.split[index], val);

                        // 插入新的片段是否保存标记
                        this.piceData.value.splice(index, 1, this.piceData.value[index], this.piceData.value[index]);

                        break;
                    }
                }

                this.drawTimeLine();
                this.updatePice();
            },

            // 绘制时间轴方法
            drawTimeLine: function () {

                // 绘制前，先清空画布
                painter.clearRect(0, 0, 900, 100);

                var index;

                painter.config({
                    'textAlign': 'center',
                    'font-size': 14,
                    'fillStyle': 'black'
                })

                // 每一秒的间距
                // (上下左右留白30)
                var dist = (900 - 60) / this.duration;

                for (index = 0; index < this.duration; index += 10) {

                    if (index % 60 == 0) {
                        painter
                            .fillRect(index * dist + 29.5, 100 - 30, 1, -25)
                            .fillText(index / 60 + ":00", index * dist + 29, 30)
                    } else {
                        painter.fillRect(index * dist + 29.5, 100 - 30, 1, -10)
                    }

                }

                // 绘制底下线条
                painter.beginPath()
                    .moveTo(30, 100 - 30)
                    .lineTo(900 - 30, 100 - 30)
                    .stroke()


                // 绘制切割标志
                painter.config({
                    'fillStyle': 'red'
                })

                var split;
                for (index = 0; index < this.piceData.split.length; index++) {
                    split = this.piceData.split[index];

                    // 绘制底部的箭头
                    painter.beginPath()
                        .moveTo(30 + split * dist, 100 - 30)
                        .lineTo(35 + split * dist, 100 - 20)
                        .lineTo(25 + split * dist, 100 - 20)
                        .fill()

                    // 绘制底部的时间
                    painter.fillText(formatTime(split), 30 + split * dist, 100 - 10)
                }
            }
        },
        mounted: function () {

            // 获取画笔
            painter = canvasRender(document.getElementById('time-line'));

            // 绘制时间轴承
            this.drawTimeLine();

            // 初始化片段视图
            this.updatePice();

        }
    }
};