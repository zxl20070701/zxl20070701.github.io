import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/region';

var painter;
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var currentColor = '#000000';
var currentWidth = 2;
var isEraser = false;

export default function (obj, props) {
    return {
        name: "draft",
        render: template,
        data: {
            currentColor: obj.ref('#000000'),
            currentPenSize: obj.ref(1),
            isEraserMode: obj.ref(false)
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "草稿纸" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './draft.png');
        },
        mounted: function () {
            // 获取画笔
            painter = canvasRender(this._refs.mycanvas.value);

            // 设置画布背景为白色
            var canvas = this._refs.mycanvas.value;
            painter.config({
                fillStyle: '#FFFFFF'
            }).fillRect(0, 0, canvas.width, canvas.height);

            // 绑定鼠标事件
            this.bindEvents();
        },
        methods: {
            bindEvents: function () {
                var canvas = this._refs.mycanvas.value;
                var self = this;

                // 鼠标按下事件
                canvas.addEventListener('mousedown', function (e) {
                    isDrawing = true;
                    var rect = canvas.getBoundingClientRect();
                    lastX = e.clientX - rect.left;
                    lastY = e.clientY - rect.top;
                });

                // 鼠标移动事件
                canvas.addEventListener('mousemove', function (e) {
                    if (!isDrawing) return;

                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;

                    self.drawLine(lastX, lastY, x, y);

                    lastX = x;
                    lastY = y;
                });

                // 鼠标释放事件
                canvas.addEventListener('mouseup', function () {
                    isDrawing = false;
                });

                // 鼠标离开画布事件
                canvas.addEventListener('mouseout', function () {
                    isDrawing = false;
                });

                // 触摸事件支持
                canvas.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    isDrawing = true;
                    var rect = canvas.getBoundingClientRect();
                    var touch = e.touches[0];
                    lastX = touch.clientX - rect.left;
                    lastY = touch.clientY - rect.top;
                });

                canvas.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    if (!isDrawing) return;

                    var rect = canvas.getBoundingClientRect();
                    var touch = e.touches[0];
                    var x = touch.clientX - rect.left;
                    var y = touch.clientY - rect.top;

                    self.drawLine(lastX, lastY, x, y);

                    lastX = x;
                    lastY = y;
                });

                canvas.addEventListener('touchend', function () {
                    isDrawing = false;
                });
            },

            drawLine: function (x1, y1, x2, y2) {
                painter.config({
                    strokeStyle: isEraser ? '#FFFFFF' : currentColor,
                    lineWidth: currentWidth,
                    lineCap: 'round',
                    lineJoin: 'round'
                }).beginPath().moveTo(x1, y1).lineTo(x2, y2).stroke();
            },

            setColor: function (event) {
                var color = event.target.getAttribute('data-value');
                currentColor = color;
                isEraser = false;
                this.currentColor = color;
                this.isEraserMode = false;
            },

            setPenSize: function (event) {
                var size = parseInt(event.target.getAttribute('data-value'));
                currentWidth = size;
                this.currentPenSize = size;
            },

            toggleEraser: function () {
                isEraser = !isEraser;
                this.isEraserMode = isEraser;
            },

            clearCanvas: function () {
                var canvas = this._refs.mycanvas.value;
                painter.config({
                    fillStyle: '#FFFFFF'
                }).fillRect(0, 0, canvas.width, canvas.height);
            },

            saveCanvas: function () {
                var canvas = this._refs.mycanvas.value;
                var link = document.createElement('a');
                link.download = '草稿纸_' + new Date().getTime() + '.png';
                link.href = canvas.toDataURL();
                link.click();
            }
        }
    };
};