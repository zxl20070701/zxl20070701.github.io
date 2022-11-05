
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['28']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('89');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('90');


__pkg__scope_args__=window.__pkg__getBundle('91');
var lazyDialogs =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('94');
var lazyWins =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('97');
var imageToCanvas =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('60');
var canvasRender =__pkg__scope_args__.default;


var wins = [], painter;
__pkg__scope_bundle__.default= function (obj) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['89']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,4,61,79]},{"type":"tag","name":"div","attrs":{"class":"no-view"},"childNodes":[2,3]},{"type":"tag","name":"input","attrs":{"type":"file","id":"img-file1","flag":"import","ui-on:change":"openImage","accept":"image/*"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"file","id":"img-file2","flag":"append","ui-on:change":"openImage","accept":"image/*"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"menu"},"childNodes":[5,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"图片编辑器","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[8,21,31,45]},{"type":"tag","name":"li","attrs":{},"childNodes":[9,11]},{"type":"tag","name":"label","attrs":{},"childNodes":[10]},{"type":"text","content":"文件","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[12,15,18]},{"type":"tag","name":"li","attrs":{},"childNodes":[13]},{"type":"tag","name":"label","attrs":{"for":"img-file1"},"childNodes":[14]},{"type":"text","content":"打开","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[16]},{"type":"tag","name":"label","attrs":{"ui-on:click":"saveImage"},"childNodes":[17]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[19]},{"type":"tag","name":"label","attrs":{"for":"img-file2"},"childNodes":[20]},{"type":"text","content":"置入","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[22,24]},{"type":"tag","name":"label","attrs":{},"childNodes":[23]},{"type":"text","content":"图像","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[25,28]},{"type":"tag","name":"li","attrs":{},"childNodes":[26]},{"type":"tag","name":"label","attrs":{"ui-on:click":"editCanvasSize"},"childNodes":[27]},{"type":"text","content":"画布大小","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[29]},{"type":"tag","name":"label","attrs":{"ui-on:click":"editImageSize"},"childNodes":[30]},{"type":"text","content":"图像大小","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[32,34]},{"type":"tag","name":"label","attrs":{},"childNodes":[33]},{"type":"text","content":"选择","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[35,38,41,42]},{"type":"tag","name":"li","attrs":{},"childNodes":[36]},{"type":"tag","name":"label","attrs":{},"childNodes":[37]},{"type":"text","content":"取消选择","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[39]},{"type":"tag","name":"label","attrs":{},"childNodes":[40]},{"type":"text","content":"反选","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"split-line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[43]},{"type":"tag","name":"label","attrs":{},"childNodes":[44]},{"type":"text","content":"色彩范围","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[46,48]},{"type":"tag","name":"label","attrs":{},"childNodes":[47]},{"type":"text","content":"窗口","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[49,52,55,58]},{"type":"tag","name":"li","attrs":{},"childNodes":[50]},{"type":"tag","name":"label","attrs":{"ui-on:click":"toggleWin","tag":"layer","ui-bind:active":"isMenuOpen.layer?'yes':'no'"},"childNodes":[51]},{"type":"text","content":"图层","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[53]},{"type":"tag","name":"label","attrs":{"ui-on:click":"toggleWin","tag":"tool","ui-bind:active":"isMenuOpen.tool?'yes':'no'"},"childNodes":[54]},{"type":"text","content":"工具箱","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[56]},{"type":"tag","name":"label","attrs":{},"childNodes":[57]},{"type":"text","content":"通道","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[59]},{"type":"tag","name":"label","attrs":{},"childNodes":[60]},{"type":"text","content":"画笔","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-config"},"childNodes":[62,66,70,74,75,76,77,78]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='move'?'yes':'no'"},"childNodes":[63]},{"type":"tag","name":"li","attrs":{},"childNodes":[64,65]},{"type":"text","content":"移动距离：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"move_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='eraser'?'yes':'no'"},"childNodes":[67]},{"type":"tag","name":"li","attrs":{},"childNodes":[68,69]},{"type":"text","content":"大小：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"eraser_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='eraser-bg'?'yes':'no'"},"childNodes":[71]},{"type":"tag","name":"li","attrs":{},"childNodes":[72,73]},{"type":"text","content":"大小：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"eraser_bg_size"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='drap'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='painter'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='resize'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='text'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:active":"activeTool=='geometry'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"image"},"childNodes":[80]},{"type":"tag","name":"canvas","attrs":{"id":"image-root","ui-bind:style":"'width:'+width+'px;height:'+height+'px;margin-top:calc(50vh - 40px - ' + height * 0.5 + 'px);margin-left:calc(50vw - ' + width * 0.5 + 'px);'"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['90']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view] .no-view{\n\ndisplay: none;\n\n}\n\n [page-view]>div.menu{\n\nborder-bottom: 1px solid gray;\n\nposition: fixed;\n\nz-index: 7;\n\ntop: 0;\n\nleft: 0;\n\nwidth: 100vw;\n\n}\n\n [page-view]>div.menu>h2, [page-view]>div.menu ul{\n\nvertical-align: top;\n\n}\n\n [page-view]>div.menu>h2{\n\nfont-size: 12px;\n\ndisplay: inline-block;\n\nheight: 30px;\n\nline-height: 30px;\n\nbackground-image: url('./image-editor.png');\n\nbackground-size: auto 70%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 5px center;\n\npadding-left: 30px;\n\npadding-right: 10px;\n\nborder-right: 1px solid #cccccc;\n\n}\n\n [page-view]>div.menu>ul{\n\ndisplay: inline-block;\n\nline-height: 30px;\n\nfont-size: 12px;\n\n}\n\n [page-view]>div.menu>ul label{\n\ncursor: pointer;\n\npadding: 0 5px;\n\ndisplay: block;\n\n}\n\n [page-view]>div.menu>ul label>span{\n\nfloat: right;\n\n}\n\n [page-view]>div.menu>ul ul label{\n\npadding-left: 20px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: left center;\n\n}\n\n [page-view]>div.menu>ul ul label[active='yes']{\n\nbackground-image: url('./right.png');\n\n}\n\n [page-view]>div.menu>ul li:hover{\n\nbackground-color: #cfd3d5;\n\n}\n\n [page-view]>div.menu>ul li:hover>ul{\n\ndisplay: block;\n\n}\n\n [page-view]>div.menu>ul li.split-line{\n\nbackground-color: #ebedee;\n\nheight: 1px;\n\nmargin: 2px 0;\n\n}\n\n [page-view]>div.menu>ul ul{\n\ndisplay: none;\n\n}\n\n [page-view]>div.menu>ul>li{\n\ndisplay: inline-block;\n\nmargin-left: 10px;\n\nposition: relative;\n\n}\n\n [page-view]>div.menu>ul>li>ul{\n\nposition: absolute;\n\nborder: 1px solid gray;\n\nborder-radius: 5px;\n\nwidth: 100px;\n\ntop: 25px;\n\nleft: -5px;\n\nbackground-color: white;\n\npadding: 5px 0;\n\n}\n\n [page-view]>div.tool-config{\n\nborder-bottom: 1px solid #ccc;\n\nheight: 50px;\n\nline-height: 50px;\n\nposition: fixed;\n\ntop: 30px;\n\nwidth: 100vw;\n\nfont-size: 12px;\n\n}\n\n [page-view]>div.tool-config>ul{\n\ndisplay: none;\n\n}\n\n [page-view]>div.tool-config>ul[active='yes']{\n\ndisplay: block;\n\n}\n\n [page-view]>div.tool-config>ul>li{\n\npadding: 0 5px;\n\n}\n\n [page-view]>div.tool-config>ul>li>input{\n\nwidth: 50px;\n\n}\n\n [page-view]>div.image{\n\nwidth: 100vw;\n\nheight: calc(100vh - 80px);\n\noverflow: hidden;\n\nposition: relative;\n\ntop: 80px;\n\n}\n\n [page-view]>div.image>canvas{\n\nposition: absolute;\n\noutline: 1px solid #ccc;\n\n/* // cursor: none;\r */\n\nbackground-image: url('./mosaic.png');\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['91']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 画布或图像大小
    size: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.4-bundle15.js','92')
    },

    // 保存
    save: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.4-bundle16.js','93')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['94']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 工具箱
    tool: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.4-bundle17.js','95')
    },

    // 图层
    layer: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.4-bundle18.js','96')
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/imageToCanvas
/*****************************************************************/
window.__pkg__bundleSrc__['97']=function(){
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
window.__pkg__bundleSrc__['60']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('61');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('63');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('61');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', height);
    }

    var painter = canvas.getContext("2d");

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {};

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (["font-size", "font-family", "arc-start-cap", "arc-end-cap"].indexOf(key) > -1) {
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

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') return painter[arguments[0]];
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
        "moveTo": function (x, y) { painter.moveTo(x, y); return enhancePainter; },
        "lineTo": function (x, y) { painter.lineTo(x, y); return enhancePainter; },
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
        "createRadialGradient": function (cx, cy, r) {
            return radialGradient(painter, cx, cy, r);
        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['61']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('62');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

    // 文字大小
    "font-size": 16,

    // 字体，默认"sans-serif"
    "font-family": "sans-serif",

    // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
    "arc-start-cap": 'butt',

    // 圆弧结束端闭合方式，和上一个类似
    "arc-end-cap": 'butt',

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

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
    painter.font = config['font-size'] + "px " + config['font-family'];
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
        if (config["arc-end-cap"] != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config["arc-start-cap"] != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config["arc-start-cap"] == 'butt') painter.closePath();
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
window.__pkg__bundleSrc__['62']=function(){
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
window.__pkg__bundleSrc__['63']=function(){
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
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r) {
    var gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r);
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
