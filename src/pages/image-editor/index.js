import template from './index.html';
import './index.scss';

import lazyDialogs from './dialogs/lazy-load';
import lazyWins from './wins/lazy-load';

import imageToCanvas from '../../tool/imageToCanvas';
import canvasRender from '../../tool/canvas/index';
import getKeyCode from '../../tool/keyCode';
import bind from '../../tool/xhtml/bind';
import remove from '../../tool/xhtml/remove';
import isString from '../../tool/type/isString';
import mousePosition from '../../tool/xhtml/mousePosition';

export default function (obj, props) {
    var i;

    var wins = {}, painter, cursorPainter, layerRootEl;

    // 记录鼠标是否按下
    var mouseIsDown = false;

    // 辅助画布
    var helpImg = {
        canvas: document.createElement('canvas'),
        painter: null
    }

    // 标记当前窗口是否处于聚焦状态
    var isFocus = false;

    // 标记当前无弹框
    var noDialog = true;

    return {
        name: "image-editor",
        render: template,
        data: {

            width: obj.ref(700), // 画布的大小
            height: obj.ref(500),

            left: obj.ref(0), // 画布的位置
            top: obj.ref(0),

            scale: obj.ref(1), // 画布缩放倍数

            activeTool: obj.ref('move'), // 当前的工具
            isMenuOpen: obj.reactive({}), // 菜单是否打开

            // 图层
            layers: [],

            // 颜色
            forecolor: obj.ref('red'), // 前景色
            backcolor: obj.ref('black'), // 背景色

            // 移动工具
            move_size: obj.ref(5), // 单次移动距离

            // 橡皮擦
            eraser_size: obj.ref(10), // 橡皮擦大小

            // 背景橡皮擦
            eraser_bg_size: obj.ref(10), // 橡皮擦大小

            // 抓手工具
            drap_size: obj.ref(50), // 单次移动距离

            // 画笔
            painter_size: obj.ref(10), // 画笔大小

            // 缩放工具
            resize_direction: obj.ref("amplify"), // 放大（amplify）还是缩小（reduce）
            resize_velocity: obj.ref(0.1), // 改变速度

            // 文字
            text_size: obj.ref(16) // 文字大小
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "图片编辑器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './image-editor.png');
        },
        mounted: function () {
            var _this = this;

            //  由别的软件触发打开并有初始值
            if (props.image) {
                this.width = props.image.width;
                this.height = props.image.height;
            }

            painter = canvasRender(this._refs.mycanvas.value, this.width, this.height);

            // 调整辅助画布大小
            helpImg.painter = canvasRender(helpImg.canvas, this.width, this.height);
            cursorPainter = canvasRender(this._refs.mycursor.value, this.width, this.height);

            Promise.all([
                this.$openWin(lazyWins.layer),
                this.$openWin(lazyWins.tool)
            ]).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    _this.initWin(data[i].instance._name, data[i]);
                }

                // 添加背景图层
                var newLayerCanvas = document.createElement('canvas');
                newLayerCanvas.width = _this.width;
                newLayerCanvas.height = _this.height;

                if (props.image) {
                    newLayerCanvas.getContext("2d").drawImage(props.image, 0, 0);
                }

                _this.appendLayer(newLayerCanvas, props.image ? props.name : '背景');
            });

            // 启动键盘监听
            getKeyCode(function (keyCode, event) {
                if (isFocus && noDialog) {

                    // 移动
                    if (_this.activeTool == 'move') {
                        var leftTop = {
                            "up": [0, -_this.move_size],
                            "down": [0, _this.move_size],
                            "left": [-_this.move_size, 0],
                            "right": [_this.move_size, 0]
                        }[keyCode] || false;

                        // 如果不是方向键，不需要任何操作
                        if (leftTop) _this.doMove(leftTop[0], leftTop[1]);
                    }

                    // 抓手工具
                    else if (_this.activeTool == 'drap') {

                        if (keyCode == 'up') _this.top -= _this.drap_size;
                        else if (keyCode == 'down') _this.top += _this.drap_size;
                        else if (keyCode == 'left') _this.left -= _this.drap_size;
                        else if (keyCode == 'right') _this.left += _this.drap_size;

                    }

                }
            });

            // 鼠标按下
            bind(_this._refs.editorView.value, 'mousedown', function (event) {
                mouseIsDown = true;
                var position = mousePosition(_this._refs.mycanvas.value, event);

                // 橡皮擦
                if (_this.activeTool == 'eraser') {

                    // 先擦除画布
                    painter.clearRect(0, 0, _this.width, _this.height);

                    for (i = _this.layers.length - 1; i >= 0; i--) {

                        // 被选中的需要修改记录的canvas内容
                        if (_this.layers[i].rootEl.getAttribute('active') == 'yes') {
                            _this.layers[i].painter.clearCircle(position.x, position.y, +_this.eraser_size);
                        }

                        painter.drawImage(_this.layers[i].canvas);
                    }
                }

                // 画笔
                else if (_this.activeTool == 'painter') {

                    // 先擦除画布
                    painter.clearRect(0, 0, _this.width, _this.height);

                    for (i = _this.layers.length - 1; i >= 0; i--) {

                        // 被选中的需要修改记录的canvas内容
                        if (_this.layers[i].rootEl.getAttribute('active') == 'yes') {
                            _this.layers[i].painter.config({
                                fillStyle: _this.forecolor
                            }).fillCircle(position.x, position.y, +_this.painter_size);
                        }

                        painter.drawImage(_this.layers[i].canvas);
                    }
                }

            });

            // 鼠标移动
            bind(document.body, 'mousemove', function (event) {
                cursorPainter.clearRect(0, 0, _this.width, _this.height);

                var position = mousePosition(_this._refs.mycanvas.value, event);

                cursorPainter.config({
                    fillStyle: "black",
                    strokeStyle: "black",
                    shadowColor: "white",
                    shadowBlur: 2
                });

                // 移动
                if (_this.activeTool == 'move') {
                    if (mouseIsDown) {

                    }

                    // 鼠标
                    cursorPainter.beginPath()
                        .moveTo(position.x, position.y)
                        .lineTo(position.x + 15, position.y + 5)
                        .lineTo(position.x + 8, position.y + 8)
                        .lineTo(position.x + 5, position.y + 15)
                        .closePath().fill();
                }

                // 抓手工具
                else if (_this.activeTool == 'drap') {
                    if (mouseIsDown) {

                    }
                }

                // 橡皮擦
                else if (_this.activeTool == 'eraser') {
                    if (mouseIsDown) {
                        // 先擦除画布
                        painter.clearRect(0, 0, _this.width, _this.height);

                        for (i = _this.layers.length - 1; i >= 0; i--) {

                            // 被选中的需要修改记录的canvas内容
                            if (_this.layers[i].rootEl.getAttribute('active') == 'yes') {
                                _this.layers[i].painter.clearCircle(position.x, position.y, +_this.eraser_size);
                            }

                            painter.drawImage(_this.layers[i].canvas);
                        }
                    }

                    // 鼠标
                    cursorPainter.strokeCircle(position.x, position.y, +_this.eraser_size);
                }

                // 画笔
                else if (_this.activeTool == 'painter') {
                    if (mouseIsDown) {
                        // 先擦除画布
                        painter.clearRect(0, 0, _this.width, _this.height);

                        for (i = _this.layers.length - 1; i >= 0; i--) {

                            // 被选中的需要修改记录的canvas内容
                            if (_this.layers[i].rootEl.getAttribute('active') == 'yes') {
                                _this.layers[i].painter.config({
                                    fillStyle: _this.forecolor
                                }).fillCircle(position.x, position.y, +_this.painter_size);
                            }

                            painter.drawImage(_this.layers[i].canvas);
                        }
                    }

                    // 鼠标
                    cursorPainter.strokeCircle(position.x, position.y, +_this.painter_size);
                }

                // 背景橡皮擦
                else if (_this.activeTool == 'eraser-bg') {
                    if (mouseIsDown) {

                    }
                }

            });

            // 鼠标松开
            bind(document.body, 'mouseup', function () {
                mouseIsDown = false;
            });

            // 鼠标点击
            bind(_this._refs.mycanvas.value, 'click', function (event) {

                // 缩放
                if (_this.activeTool == 'resize') {
                    _this.scale += {
                        amplify: 1,
                        reduce: -1
                    }[_this.resize_direction] * _this.resize_velocity;
                }

            });

        },
        beforeDestory: function () {

            // 销毁所有的win窗口
            for (var winName in wins) {
                remove(wins[winName].el);
            }
            this.isMenuOpen = {};
            wins = {};
        },
        beforeUnfocus: function () {
            isFocus = false;

            // 关闭所有的win窗口
            for (var winName in wins) {
                if (this.isMenuOpen[winName]) {
                    wins[winName].el.style.display = "none";
                }
            }
        },
        focused: function () {
            isFocus = true;

            // 显示本来应该打开的窗口
            for (var winName in wins) {
                if (this.isMenuOpen[winName]) {
                    wins[winName].el.style.display = "";
                }
            }
        },
        methods: {
            triggleBtn: function (event, target) {
                this._refs[target.getAttribute('tag')].value.click();
            },

            // 移动内容
            doMove: function (dx, dy) {
                // 先擦除画布
                painter.clearRect(0, 0, this.width, this.height);

                for (i = this.layers.length - 1; i >= 0; i--) {

                    // 被选中的需要修改记录的canvas内容
                    if (this.layers[i].rootEl.getAttribute('active') == 'yes') {

                        helpImg.painter.clearRect(0, 0, this.width, this.height);
                        helpImg.painter.drawImage(this.layers[i].canvas);

                        this.layers[i].painter.clearRect(0, 0, this.width, this.height);
                        this.layers[i].painter.drawImage(helpImg.canvas, 0, 0, this.width, this.height, dx, dy, this.width, this.height);

                        this.layers[i].iconEl.style.backgroundImage = "url(" + this.layers[i].painter.toDataURL() + ")";
                    }

                    painter.drawImage(this.layers[i].canvas);
                }
            },

            // 恢复缩放
            resetSize: function () {
                this.scale = 1;
            },

            // 新窗口初始化处理
            initWin: function (name, data) {
                wins[name] = data;
                this.isMenuOpen[name] = true;

                // 统一的数据反馈
                var _this = this;
                data.instance.callback = function (key, value) {
                    _this[key] = value;
                }

                if (name == 'layer') {
                    layerRootEl = data.instance._refs.layerList.value;
                }

            },

            // 窗口控制
            toggleWin: function (event, target) {
                var winName = isString(event) ? event : target.getAttribute('tag');

                // 如果已经加载，切换
                if (wins[winName]) {
                    wins[winName].el.style.display = this.isMenuOpen[winName] ? "none" : "";
                    this.isMenuOpen[winName] = !this.isMenuOpen[winName];
                }

                // 否则打开
                else {

                    var _this = this;
                    this.$openWin(lazyWins[winName]).then(function (data) {
                        _this.initWin(winName, data);
                    });
                }
            },

            // 图像 / 画布大小
            editCanvasSize: function () {
                var _this = this;
                noDialog = false;

                this.$openDialog(lazyDialogs.size, {
                    title: "画布大小",
                    width: this.width,
                    height: this.height
                }).then(function (data) {

                    // 计算图片的对齐方式

                    var _left, _top;
                    var changeType = data.changeType.split('-');

                    // 水平方向
                    if (changeType[0] == 'left') {
                        _left = 0;
                    } else if (changeType[0] == 'right') {
                        _left = data.width - _this.width;
                    } else {
                        _left = (data.width - _this.width) * 0.5;
                    }

                    // 垂直方向
                    if (changeType[1] == 'top') {
                        _top = 0;
                    } else if (changeType[1] == 'bottom') {
                        _top = data.height - _this.height;
                    } else {
                        _top = (data.height - _this.height) * 0.5;
                    }

                    // 先调整画布
                    _this.width = data.width;
                    _this.height = data.height;
                    painter = canvasRender(_this._refs.mycanvas.value, _this.width, _this.height);

                    // 调整辅助画布大小
                    helpImg.painter = canvasRender(helpImg.canvas, _this.width, _this.height);
                    cursorPainter = canvasRender(_this._refs.mycursor.value, _this.width, _this.height);

                    // 一个个图层调整好
                    (function doit(layerIndex) {
                        if (layerIndex < _this.layers.length) {

                            var img = new Image();
                            img.src = _this.layers[layerIndex].painter.toDataURL();
                            img.onload = function () {

                                // 调整图层画布和画笔
                                _this.layers[layerIndex].painter = canvasRender(_this.layers[layerIndex].canvas, _this.width, _this.height);
                                _this.layers[layerIndex].painter.drawImage(img, 0, 0, img.width, img.height, _left, _top, img.width, img.height);

                                _this.layers[layerIndex].iconEl.style.backgroundImage = "url(" + _this.layers[layerIndex].painter.toDataURL() + ")";

                                // 在画布中绘制
                                painter.drawImage(_this.layers[layerIndex].canvas);

                            };

                            doit(layerIndex + 1);
                        }
                    })(0);
                }).finally(function () {
                    noDialog = true;
                });
            },

            // 图像 / 图像大小
            editImageSize: function () {
                var _this = this;
                noDialog = false;

                this.$openDialog(lazyDialogs.size, {
                    title: "图像大小",
                    width: this.width,
                    height: this.height
                }).then(function (data) {

                    // 先调整画布
                    _this.width = data.width;
                    _this.height = data.height;
                    painter = canvasRender(_this._refs.mycanvas.value, _this.width, _this.height);

                    // 调整辅助画布大小
                    helpImg.painter = canvasRender(helpImg.canvas, _this.width, _this.height);
                    cursorPainter = canvasRender(_this._refs.mycursor.value, _this.width, _this.height);

                    // 一个个图层调整好
                    (function doit(layerIndex) {
                        if (layerIndex < _this.layers.length) {

                            var img = new Image();
                            img.src = _this.layers[layerIndex].painter.toDataURL();
                            img.onload = function () {

                                // 调整图层画布和画笔
                                _this.layers[layerIndex].painter = canvasRender(_this.layers[layerIndex].canvas, _this.width, _this.height);
                                _this.layers[layerIndex].painter.drawImage(img, 0, 0, img.width, img.height, 0, 0, _this.width, _this.height);

                                // 在画布中绘制
                                painter.drawImage(_this.layers[layerIndex].canvas);

                            };

                            doit(layerIndex + 1);
                        }
                    })(0);

                }).finally(function () {
                    noDialog = true;
                });
            },

            // 追加新图层
            appendLayer: function (newLayerCanvas, name) {

                var newLayer = {
                    canvas: newLayerCanvas
                };

                newLayer.painter = canvasRender(newLayer.canvas);
                this.layers.unshift(newLayer);

                // 在画布中绘制
                painter.drawImage(newLayer.canvas);

                // 追加图层节点
                var layerEl = document.createElement('li');
                var iconEl = document.createElement('i');
                var textEl = document.createElement('span');

                layerRootEl.insertBefore(layerEl, layerRootEl.childNodes[0]);
                layerEl.appendChild(iconEl);
                layerEl.appendChild(textEl);

                textEl.innerText = name;
                iconEl.style.backgroundImage = "url(" + newLayer.painter.toDataURL() + ")";

                newLayer.rootEl = layerEl;
                newLayer.iconEl = iconEl;
                newLayer.textEl = textEl;

                var _this = this;
                layerEl.addEventListener('click', function () {

                    for (var index = 0; index < _this.layers.length; index++) {
                        _this.layers[index].rootEl.setAttribute('active', 'no');
                    }
                    layerEl.setAttribute('active', 'yes');

                });
                layerEl.click();
            },

            // 导入或打开图片
            openImage: function (event, target) {
                var i, _this = this;
                for (i = 0; i < target.files.length; i++) {
                    (function (i) {
                        var file = target.files[i];
                        var reader = new FileReader();

                        reader.onload = function () {
                            var image = new Image();

                            image.onload = function () {

                                var newLayerCanvas;

                                // 置入
                                // 置入就是在原来的基础上新增内容
                                // 然后会居中展开，不会修改画布大小
                                if (target.getAttribute('flag') == 'append') {

                                    var _left = (_this.width - image.width) * 0.5;
                                    var _top = (_this.height - image.height) * 0.5;
                                    newLayerCanvas = imageToCanvas(image, _left, _top, _this.width, _this.height);
                                }

                                // 打开
                                // 就是把当前环境改为打开的内容
                                // 然后会根据图片大小修改画布大小
                                else {
                                    newLayerCanvas = imageToCanvas(image);

                                    // 图层重置
                                    layerRootEl.innerHTML = "";
                                    _this.layers = [];

                                    // 画布大小重置
                                    _this.width = image.width;
                                    _this.height = image.height;

                                    // 画笔和内容
                                    painter = canvasRender(_this._refs.mycanvas.value, _this.width, _this.height);
                                    painter.clearRect(0, 0, image.width, image.height);

                                    cursorPainter = canvasRender(_this._refs.mycursor.value, _this.width, _this.height);

                                }
                                _this.appendLayer(newLayerCanvas, file.name);
                            }
                            image.src = reader.result;
                        }
                        reader.readAsDataURL(file);
                    })(i);
                }
            },

            // 保存图片
            saveImage: function () {
                noDialog = false;
                this.$openDialog(lazyDialogs.save, {
                    painter: painter,
                    name: this.layers.length > 1 ? this.layers[1].textEl.innerText : "未命名",
                    width: this.width,
                    height: this.height
                }).then(function (data) {

                    var btn = document.createElement('a');
                    btn.href = painter.toDataURL(data.format[0]);

                    btn.download = data.name + "." + data.format[1];
                    btn.click();

                }).finally(function () {
                    noDialog = true;
                });
            }
        }
    };
};