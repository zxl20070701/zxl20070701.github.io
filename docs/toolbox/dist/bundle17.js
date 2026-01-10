
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['73']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('155');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('156');


__pkg__scope_args__=window.__pkg__getBundle('157');
var lazyDialogs =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('160');
var lazyWins =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('163');
var imageToCanvas =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('125');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('164');
var getKeyCode =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('33');
var remove =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('31');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('99');
var mousePosition =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['155']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,4,46,85]},{"type":"tag","name":"div","attrs":{"class":"no-view"},"childNodes":[2,3]},{"type":"tag","name":"input","attrs":{"type":"file","ref":"imgFile1","flag":"import","ui-on:change":"openImage","accept":"image/*"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"file","ref":"imgFile2","flag":"append","ui-on:change":"openImage","accept":"image/*","multiple":""},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"menu","ui-dragdrop:desktop":""},"childNodes":[5,7,41]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"图片编辑器","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[8,21,31]},{"type":"tag","name":"li","attrs":{},"childNodes":[9,11]},{"type":"tag","name":"label","attrs":{},"childNodes":[10]},{"type":"text","content":"文件","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[12,15,18]},{"type":"tag","name":"li","attrs":{},"childNodes":[13]},{"type":"tag","name":"label","attrs":{"tag":"imgFile1","ui-on:click":"triggleBtn"},"childNodes":[14]},{"type":"text","content":"打开","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[16]},{"type":"tag","name":"label","attrs":{"ui-on:click":"saveImage"},"childNodes":[17]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[19]},{"type":"tag","name":"label","attrs":{"tag":"imgFile2","ui-on:click":"triggleBtn"},"childNodes":[20]},{"type":"text","content":"置入","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[22,24]},{"type":"tag","name":"label","attrs":{},"childNodes":[23]},{"type":"text","content":"图像","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[25,28]},{"type":"tag","name":"li","attrs":{},"childNodes":[26]},{"type":"tag","name":"label","attrs":{"ui-on:click":"editCanvasSize"},"childNodes":[27]},{"type":"text","content":"画布大小","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[29]},{"type":"tag","name":"label","attrs":{"ui-on:click":"editImageSize"},"childNodes":[30]},{"type":"text","content":"图像大小","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[32,34]},{"type":"tag","name":"label","attrs":{},"childNodes":[33]},{"type":"text","content":"窗口","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[35,38]},{"type":"tag","name":"li","attrs":{},"childNodes":[36]},{"type":"tag","name":"label","attrs":{"ui-on:click":"toggleWin","tag":"layer","ui-bind:active":"isMenuOpen.layer?'yes':'no'"},"childNodes":[37]},{"type":"text","content":"图层","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[39]},{"type":"tag","name":"label","attrs":{"ui-on:click":"toggleWin","tag":"tool","ui-bind:active":"isMenuOpen.tool?'yes':'no'"},"childNodes":[40]},{"type":"text","content":"工具箱","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[42,44]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[43]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[45]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-config"},"childNodes":[47,51,55,59,63,67,80,84]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='move'?'yes':'no'"},"childNodes":[48]},{"type":"tag","name":"li","attrs":{},"childNodes":[49,50]},{"type":"text","content":"移动距离：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"move_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='eraser'?'yes':'no'"},"childNodes":[52]},{"type":"tag","name":"li","attrs":{},"childNodes":[53,54]},{"type":"text","content":"半径：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"eraser_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='eraser-bg'?'yes':'no'"},"childNodes":[56]},{"type":"tag","name":"li","attrs":{},"childNodes":[57,58]},{"type":"text","content":"半径：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"eraser_bg_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='drap'?'yes':'no'"},"childNodes":[60]},{"type":"tag","name":"li","attrs":{},"childNodes":[61,62]},{"type":"text","content":"移动距离：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"drap_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='painter'?'yes':'no'"},"childNodes":[64]},{"type":"tag","name":"li","attrs":{},"childNodes":[65,66]},{"type":"text","content":"半径：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"painter_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='resize'?'yes':'no'"},"childNodes":[68,74,77]},{"type":"tag","name":"li","attrs":{},"childNodes":[69,70,71,72,73]},{"type":"text","content":"方向：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"resize_direction","type":"radio","name":"resize_direction","value":"amplify"},"childNodes":[]},{"type":"text","content":"放大","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"resize_direction","type":"radio","name":"resize_direction","value":"reduce"},"childNodes":[]},{"type":"text","content":"缩小","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[75,76]},{"type":"text","content":"速度：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"resize_velocity"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[78]},{"type":"tag","name":"button","attrs":{"ui-on:click":"resetSize"},"childNodes":[79]},{"type":"text","content":"恢复尺寸","childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='text'?'yes':'no'"},"childNodes":[81]},{"type":"tag","name":"li","attrs":{},"childNodes":[82,83]},{"type":"text","content":"文字大小：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"text_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='geometry'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"image","ref":"editorView"},"childNodes":[86,87]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas","ui-bind:style":"'transform:scale('+scale+');left:'+left+'px;top:'+top+'px;width:'+width+'px;height:'+height+'px;'"},"childNodes":[]},{"type":"tag","name":"canvas","attrs":{"ref":"mycursor","ui-bind:style":"'pointer-events:none;transform:scale('+scale+');left:'+left+'px;top:'+top+'px;width:'+width+'px;height:'+height+'px;'"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['156']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"image-editor\"]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 70px);\n\nleft: 80px;\n\ntop: 20px;\n\n}\n\n [page-view=\"image-editor\"] .no-view{\n\ndisplay: none;\n\n}\n\n [page-view=\"image-editor\"][focus=\"no\"]>div.menu{\n\nbackground-color: #afbabe;\n\n}\n\n [page-view=\"image-editor\"]>div.menu{\n\nbackground-color: #cad6db;\n\nborder-bottom: 1px solid gray;\n\nposition: relative;\n\ntop: 0;\n\nleft: 0;\n\nwidth: 100%;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>h2, [page-view=\"image-editor\"]>div.menu ul{\n\nvertical-align: top;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>h2{\n\nfont-size: 12px;\n\ndisplay: inline-block;\n\nheight: 30px;\n\nline-height: 30px;\n\nbackground-image: url('./image-editor.png');\n\nbackground-size: auto 70%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 5px center;\n\npadding-left: 30px;\n\npadding-right: 10px;\n\nborder-right: 1px solid #cccccc;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul{\n\ndisplay: inline-block;\n\nline-height: 30px;\n\nfont-size: 12px;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul label{\n\ncursor: pointer;\n\npadding: 0 5px;\n\ndisplay: block;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul label>span{\n\nfloat: right;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul ul label{\n\npadding-left: 20px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: left center;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul ul label[active='yes']{\n\nbackground-image: url('./right.png');\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul li:hover{\n\nbackground-color: #cfd3d5;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul li:hover>ul{\n\ndisplay: block;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul li.split-line{\n\nbackground-color: #ebedee;\n\nheight: 1px;\n\nmargin: 2px 0;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul ul{\n\ndisplay: none;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul>li{\n\ndisplay: inline-block;\n\nmargin-left: 10px;\n\nposition: relative;\n\n}\n\n [page-view=\"image-editor\"]>div.menu>ul>li>ul{\n\nposition: absolute;\n\nborder: 1px solid gray;\n\nborder-radius: 5px;\n\nwidth: 100px;\n\ntop: 25px;\n\nleft: -5px;\n\nbackground-color: white;\n\npadding: 5px 0;\n\nz-index: 1;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config{\n\nborder-bottom: 1px solid #ccc;\n\nheight: 50px;\n\nline-height: 50px;\n\nposition: relative;\n\ntop: 0;\n\nwidth: 100%;\n\nfont-size: 12px;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config>ul{\n\ndisplay: none;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config>ul[active='yes']{\n\ndisplay: block;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config>ul>li{\n\npadding-left: 20px;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config>ul>li>input[type=\"text\"]{\n\nwidth: 50px;\n\nborder-radius: 5px;\n\npadding:3px 5px;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config>ul>li>input[type='radio']{\n\nvertical-align: sub;\n\nmargin-left: 10px;\n\n}\n\n [page-view=\"image-editor\"]>div.tool-config>ul>li>button{\n\noutline: none;\n\nborder: none;\n\nbackground-color: black;\n\ncolor: white;\n\nfont-size: 12px;\n\nborder-radius: 5px;\n\ncursor: pointer;\n\n}\n\n [page-view=\"image-editor\"]>div.image{\n\nwidth: 100%;\n\nheight: calc(100% - 80px);\n\noverflow: auto;\n\nposition: relative;\n\ntop: 0;\n\n}\n\n [page-view=\"image-editor\"]>div.image>canvas{\n\nposition: absolute;\n\noutline: 1px solid #ccc;\n\ncursor: none;\n\n}\n\n [page-view=\"image-editor\"]>div.image>canvas:first-child{\n\nbackground-image: url('./mosaic.png');\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['157']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 画布或图像大小
    size: function () {
        return window.__pkg__getLazyBundle('./dist/bundle37.js','158')
    },

    // 保存
    save: function () {
        return window.__pkg__getLazyBundle('./dist/bundle38.js','159')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['160']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 工具箱
    tool: function () {
        return window.__pkg__getLazyBundle('./dist/bundle39.js','161')
    },

    // 图层
    layer: function () {
        return window.__pkg__getLazyBundle('./dist/bundle40.js','162')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/imageToCanvas
/*****************************************************************/
window.__pkg__bundleSrc__['163']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (image, left, top, width, height) {
    left = left || 0;
    top = top || 0;
    width = width || image.width;
    height = height || image.height;

    var canvas = document.createElement('canvas');

    canvas.setAttribute('width', width + "");
    canvas.setAttribute('height', height + "");

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    var painter = canvas.getContext('2d');
    painter.drawImage(image, 0, 0, image.width, image.height, left, top, image.width, image.height);

    return canvas;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['125']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('126');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('128');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('126');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height, opts, isScale) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', (isScale ? 2 : 1) * width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', (isScale ? 2 : 1) * height);
    }

    var painter = canvas.getContext("2d", opts || {});
    if (isScale) painter.scale(2, 2);

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {

        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": 'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcWndCap": 'butt',
    };

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            if (painter.setLineDash) painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (key in config) {
            config[key] = value;
        }

        // 其它情况直接生效即可
        else if (key in initPainterConfig) {
            painter[key] = value;
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !");
        }
    };

    // 画笔
    var enhancePainter = {
        __only__painter__: true,

        // 原生画笔
        painter: painter,

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') {

                    // 暂存的
                    if (arguments[0] in config) return config[arguments[0]];

                    // lineDash
                    if ('lineDash' == arguments[0]) return painter.getLineDash();

                    // 普通的
                    return painter[arguments[0]];
                }
                for (var key in arguments[0]) {
                    useConfig(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                useConfig(arguments[0], arguments[1]);
            }
            return enhancePainter;
        },

        // 文字
        "fillText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).fillText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "strokeText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "fullText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0);
            painter.fillText(text, 0, 0);
            painter.strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },

        // 路径
        "beginPath": function () { painter.beginPath(); return enhancePainter; },
        "closePath": function () { painter.closePath(); return enhancePainter; },
        "moveTo": function (x, y) {

            // 解决1px模糊问题，别的地方类似原因
            painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
            return enhancePainter;
        },
        "lineTo": function (x, y) { painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5); return enhancePainter; },
        "arc": function (x, y, r, beginDeg, deg) {
            painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
            return enhancePainter;
        },
        "fill": function () { painter.fill(); return enhancePainter; },
        "stroke": function () { painter.stroke(); return enhancePainter; },
        "full": function () { painter.fill(); painter.stroke(); return enhancePainter; },

        "save": function () { painter.save(); return enhancePainter; },
        "restore": function () { painter.restore(); return enhancePainter; },

        // 路径 - 贝塞尔曲线
        "quadraticCurveTo": function (cpx, cpy, x, y) {
            painter.quadraticCurveTo(cpx, cpy, x, y); return enhancePainter;
        },
        "bezierCurveTo": function (cp1x, cp1y, cp2x, cp2y, x, y) {
            painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y); return enhancePainter;
        },

        // 擦除画面
        "clearRect": function (x, y, w, h) { painter.clearRect(x, y, w, h); return enhancePainter; },
        "clearCircle": function (cx, cy, r) {
            painter.beginPath();
            painter.globalCompositeOperation = "destination-out";
            painter.arc(cx, cy, r, 0, Math.PI * 2); // 绘制圆形
            painter.fill(); // 填充圆形，这将会清除这个圆形区域
            painter.globalCompositeOperation = "source-over";
            painter.closePath();
            return enhancePainter;
        },

        // 弧
        "fillArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).fill(); return enhancePainter;
        },
        "strokeArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).stroke(); return enhancePainter;
        },
        "fullArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 圆形
        "fillCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).fill(); return enhancePainter;
        },
        "strokeCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).stroke(); return enhancePainter;
        },
        "fullCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 矩形
        "fillRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).fill(); return enhancePainter;
        },
        "strokeRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).stroke(); return enhancePainter;
        },
        "fullRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // base64
        "toDataURL": function (type) {
            type = type || 'image/png';
            return canvas.toDataURL(type);
        },

        // 获取指定位置颜色
        "getColor": function (x, y) {
            var currentRGBA = painter.getImageData(x - 0.5, y - 0.5, 1, 1).data;
            return "rgba(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + "," + currentRGBA[3] + ")";
        },

        // image
        "drawImage": function (img, sx, sy, sw, sh, x, y, w, h) {
            sx = sx || 0;
            sy = sy || 0;
            x = x || 0;
            y = y || 0;
            w = w ? w : canvas.getAttribute('width');
            h = h ? h : canvas.getAttribute('height');

            if (img.nodeName == 'CANVAS') {
                sw = sw ? sw : canvas.getAttribute('width');
                sh = sh ? sh : canvas.getAttribute('height');
            } else {
                // 默认类型是图片
                sw = sw || img.width;
                sh = sh || img.height;
            }

            painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);
            return enhancePainter;
        },

        /**
        * 渐变
        * -------------
        */

        //  线性渐变
        "createLinearGradient": function (x0, y0, x1, y1) {
            return linearGradient(painter, x0, y0, x1, y1);
        },

        // 环形渐变
        "createRadialGradient": function (cx, cy, r1, r2) {
            if (arguments.length < 4) {
                return radialGradient(painter, cx, cy, 0, r1);
            } else {
                return radialGradient(painter, cx, cy, r1, r2);
            }

        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['126']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('127');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线的端点类型，（"butt"平直边缘、"round"半圆和"square"矩形）
    "lineCap": "butt",

    // 线的拐角连接方式，（"miter"连接处边缘延长相接、"bevel"对角线斜角和"round"圆）
    "lineJoin": "miter",

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

    // 阴影的模糊系数，默认0，也就是无阴影
    "shadowBlur": 0,

    // 阴影的颜色
    "shadowColor": "black"

};

// 文字统一设置方法
__pkg__scope_bundle__.initText = function (painter, config, x, y, deg) {

    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font = config.fontStyle + " " + config.fontWeight + " " + config.fontSize + "px " + config.fontFamily;
    return painter;
};

// 画弧统一设置方法
__pkg__scope_bundle__.initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {

    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }

    beginDeg = beginDeg % (Math.PI * 2);

    // 当|deg|>=2π的时候都认为是一个圆环
    // 为什么不取2π比较，是怕部分浏览器浮点不精确
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2;
    } else {
        deg = deg % (Math.PI * 2);
    }

    arc(beginDeg, deg, cx, cy, r1, r2, function (
        beginA, endA,
        begInnerX, begInnerY,
        begOuterX, begOuterY,
        endInnerX, endInnerY,
        endOuterX, endOuterY,
        r
    ) {
        if (r < 0) r = -r;
        painter.beginPath();
        painter.moveTo(begInnerX, begInnerY);
        painter.arc(
            // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
            cx, cy, r1, beginA, endA, false);
        // 结尾
        if (config.arcEndCap != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config.arcStartCap != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config.arcStartCap == 'butt') painter.closePath();
    return painter;
};

// 画圆统一设置方法
__pkg__scope_bundle__.initCircle = function (painter, cx, cy, r) {
    painter.beginPath();
    painter.moveTo(cx + r, cy);
    painter.arc(cx, cy, r, 0, Math.PI * 2);
    return painter;
};

// 画矩形统一设置方法
__pkg__scope_bundle__.initRect = function (painter, x, y, width, height) {
    painter.beginPath();
    painter.rect(x, y, width, height);
    return painter;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/arc
/*****************************************************************/
window.__pkg__bundleSrc__['127']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 点（x,y）围绕中心（cx,cy）旋转deg度

var rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

// r1和r2，内半径和外半径
// beginA起点弧度，rotateA旋转弧度式

__pkg__scope_bundle__.default= function (beginA, rotateA, cx, cy, r1, r2, doback) {

    // 保证逆时针也是可以的
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }

    var temp = [], p;

    // 内部
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];

    // 外部
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];

    doback(
        beginA, beginA + rotateA,
        temp[0] + cx, temp[1] + cy,
        temp[4] + cx, temp[5] + cy,
        temp[2] + cx, temp[3] + cy,
        temp[6] + cx, temp[7] + cy,
        (r2 - r1) * 0.5
    );

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/Gradient
/*****************************************************************/
window.__pkg__bundleSrc__['128']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 线性渐变
__pkg__scope_bundle__.linearGradient = function (painter, x0, y0, x1, y1) {
    var gradient = painter.createLinearGradient(x0, y0, x1, y1);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};

// 环形渐变
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r1, r2) {
    var gradient = painter.createRadialGradient(cx, cy, r1, cx, cy, r2);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['164']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 字典表
var dictionary = {

    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",

    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],

    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",

    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    224: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear",
    19: "pause",

    // 功能键
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",

    // 余下键
    189: ["-", "_"],
    187: ["=", "+"],
    219: ["[", "{"],
    221: ["]", "}"],
    220: ["\\", "|"],
    186: [";", ":"],
    222: ["'", '"'],
    188: [",", "<"],
    190: [".", ">"],
    191: ["/", "?"],
    192: ["`", "~"]

};

// 非独立键字典
var help_key = ["shift", "ctrl", "alt"];

// 返回键盘此时按下的键的组合结果
var keyCode = function (event) {
    event = event || window.event;

    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];

    var _key = key[0];

    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";

    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
        key[0] = key[1] = "";
    }

    // 判断是否按下了caps lock
    var lockPress = event.code == "Key" + event.key && !shift;

    // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写
    resultKey = (preKey + ((preKey == '' && lockPress) ? key[1] : key[0]));

    if (key[0] == "") {
        resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey == '' ? _key : resultKey;
};

__pkg__scope_bundle__.getKeyString = keyCode;

/**
 * 获取键盘此时按下的键的组合结果
 * @param {Function} callback 回调，键盘有键被按下的时候触发
 * @return {Function} 返回一个函数，执行此函数可以取消键盘监听
 * @examples
 *  keyCode(function (data) {
 *      console.log(data);
 *  });
 */
__pkg__scope_bundle__.default= function (callback) {

    // 记录MacOS的command是否被按下
    var macCommand = false;

    var doKeydown = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = true;

        if (macCommand && !/command/.test(keyStringCode) && !/ctrl/.test(keyStringCode)) keyStringCode = "ctrl+" + keyStringCode;
        callback(keyStringCode.replace(/command/g, 'ctrl').replace('ctrl+ctrl', 'ctrl'), event);
    };

    var doKeyup = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = false;
    };

    // 在body上注册
    document.body.addEventListener('keydown', doKeydown, false);
    document.body.addEventListener('keyup', doKeyup, false);

    // 返回取消监听函数
    return function () {
        document.body.removeEventListener('keydown', doKeydown, false);
        document.body.removeEventListener('keyup', doKeyup, false);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/mousePosition
/*****************************************************************/
window.__pkg__bundleSrc__['99']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 获取鼠标相对特定元素左上角位置
__pkg__scope_bundle__.default= function (el, event) {

    event = event || window.event;

    // 返回元素的大小及其相对于视口的位置
    var bounding = el.getBoundingClientRect();

    if (!event || !event.clientX)
        throw new Error('Event is necessary!');
    var temp = {

        // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
        "x": event.clientX - bounding.left + el.scrollLeft,
        "y": event.clientY - bounding.top + el.scrollTop
    };

    return temp;
};

    return __pkg__scope_bundle__;
}
