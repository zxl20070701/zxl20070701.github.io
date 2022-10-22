import template from './index.html';
import './index.scss';

import lazyDialogs from './dialogs/lazy-load';
import lazyWins from './wins/lazy-load';

import imageToCanvas from '../../tool/imageToCanvas';
import canvasRender from '../../tool/canvas/index';

var wins = [], painter;
export default function (obj) {
    return {
        render: template,
        data: {

            width: obj.ref(700), // 画布的大小
            height: obj.ref(500),

            activeTool: obj.ref('move'), // 当前的工具
            isMenuOpen: obj.reactive({}), // 菜单是否打开

            // 图层
            layers: [],

            // 颜色
            forecolor: obj.ref('white'), // 前景色
            backcolor: obj.ref('black'), // 背景色

            // 移动工具
            move_size: obj.ref(1), // 单次移动距离

            // 橡皮擦
            eraser_size: obj.ref(10), // 橡皮擦大小

            // 背景橡皮擦
            eraser_bg_size: obj.ref(10) // 橡皮擦大小

            // 抓手工具

            // 画笔

            // 缩放工具

            // 文字
        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "图片编辑器";
            document.getElementById('icon-logo').setAttribute('href', './image-editor.png');
        },
        mounted: function () {
            painter = canvasRender(document.getElementById('image-root'), this.width, this.height);

            var _this = this;
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
                _this.appendLayer(newLayerCanvas, '背景');
            });

        },
        methods: {

            // 新窗口初始化处理
            initWin: function (name, data) {
                wins[name] = data;
                this.isMenuOpen[name] = true;

                // 统一的数据反馈
                var _this = this;
                data.instance.callback = function (key, value) {
                    _this[key] = value;
                }

            },

            // 窗口控制
            toggleWin: function (event) {
                var winName = event.target.getAttribute('tag');

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
                this.$openDialog(lazyDialogs.size, {
                    title: "画布大小",
                    width: this.width, // 先写死，后续获取
                    height: this.height
                }).then(function (data) {
                    console.log(data);
                });
            },

            // 图像 / 图像大小
            editImageSize: function () {
                this.$openDialog(lazyDialogs.size, {
                    title: "图像大小",
                    width: this.width,
                    height: this.height
                }).then(function (data) {
                    console.log(data);
                });
            },

            // 追加新图层
            appendLayer: function (newLayerCanvas, name) {
                var layerRootEl = document.getElementById('layer-list');

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
            openImage: function (event) {

                var file = event.target.files[0];
                var reader = new FileReader();

                var _this = this;
                reader.onload = function () {
                    var image = new Image();

                    image.onload = function () {
                        var layerRootEl = document.getElementById('layer-list');

                        var newLayerCanvas;

                        // 置入
                        // 置入就是在原来的基础上新增内容
                        // 然后会居中展开，不会修改画布大小
                        if (event.target.getAttribute('flag') == 'append') {

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
                            painter = canvasRender(document.getElementById('image-root'), _this.width, _this.height);
                            painter.clearRect(0, 0, image.width, image.height);

                        }
                        _this.appendLayer(newLayerCanvas, file.name);
                    }
                    image.src = reader.result;
                }
                reader.readAsDataURL(file)
            },

            // 保存图片
            saveImage: function () {
                this.$openDialog(lazyDialogs.save, {
                    painter: painter,
                    name: this.layers.length > 1 ? this.layers[1].textEl.innerText : "未命名",
                    width: this.width,
                    height: this.height
                }).then(function (data) {

                    var btn = document.createElement('a');
                    btn.href = painter.toDataURL();
                    btn.download = data.name + ".png";
                    btn.click();

                });
            }
        }
    };
};