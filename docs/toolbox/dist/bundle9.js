
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['41']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('81');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('82');


__pkg__scope_args__=window.__pkg__getBundle('83');
var formatColor=__pkg__scope_args__.formatColor;

__pkg__scope_args__=window.__pkg__getBundle('84');
var drawColorCanvas =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('86');
var mousePosition =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('85');
var getColorByPosition =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('87');
var getColorByDeep =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('88');
var calcDeepWidthColor =__pkg__scope_args__.default;


var painter, isDown = false;
__pkg__scope_bundle__.default= function (obj, props) {
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
                var position = mousePosition(targetEl, event);

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

            // 吸取颜色
            absorbColor: function () {
                var _this = this;

                var dropper = new EyeDropper();
                dropper.open().then(function (res) {
                    _this.color = formatColor(res.sRGBHex);

                    // 更新色彩大块
                    drawColorCanvas(painter, _this.color[0], _this.color[1], _this.color[2]);
                }).catch(function (err) {
                    console.log(err);
                });
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['81']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,2,5,14]},{"type":"tag","name":"header","attrs":{"ui-dragdrop":"","ui-bind":"title"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"canvas","ui-on:click":"selectColor","ui-on:mousemove":"selectColor"},"childNodes":[3,4]},{"type":"tag","name":"canvas","attrs":{"id":"color-picker-canvas"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"drap"},"childNodes":[6,7]},{"type":"tag","name":"div","attrs":{"class":"left","ui-bind:style":"'background-color:rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + color[3] + ')'","ui-on:click":"absorbColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right"},"childNodes":[8,11]},{"type":"tag","name":"div","attrs":{"class":"color","ui-on:click":"updateColor","ui-on:mousemove":"updateColor"},"childNodes":[9,10]},{"type":"tag","name":"div","attrs":{"ui-on:click":"updateColor"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"id":"color-cursor-id"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"alpha","ui-on:click":"updateAlpha","ui-on:mousemove":"updateAlpha"},"childNodes":[12,13]},{"type":"tag","name":"div","attrs":{"ui-on:click":"updateAlpha","ui-bind:style":"'background-image:linear-gradient(to right, #f000, rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-bind:style":"'left:'+(color[3]*200-6)+'px;'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btns"},"childNodes":[15,17]},{"type":"tag","name":"button","attrs":{"class":"cancel","ui-on:click":"doClose"},"childNodes":[16]},{"type":"text","content":"取消","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"submit","ui-on:click":"doSubmit"},"childNodes":[18]},{"type":"text","content":"确定","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['82']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='color-picker']{\n\nbox-shadow: rgb(147, 147, 160) 0px 0px 7px 1px;\n\nborder-radius: 5px;\n\nfont-size: 0px;\n\nuser-select: none;\n\nleft: calc(50vw - 150px);\n\ntop: calc(50vh - 150px);\n\n}\n\n [dialog-view='color-picker']>header{\n\nfont-size: 16px;\n\ntext-align: center;\n\nborder-radius: 5px 5px 0 0;\n\nline-height: 30px;\n\nbackground-color: #ffffff;\n\ncolor: #252020;\n\n}\n\n [dialog-view='color-picker']>div.canvas{\n\nposition: relative;\n\noverflow: hidden;\n\n}\n\n [dialog-view='color-picker']>div.canvas>canvas, [dialog-view='color-picker']>div.canvas>span{\n\npointer-events: none;\n\n}\n\n [dialog-view='color-picker']>div.canvas>canvas{\n\nwidth: 300px;\n\nheight: 160px;\n\n}\n\n [dialog-view='color-picker']>div.canvas>span{\n\nposition: absolute;\n\nwidth: 12px;\n\nheight: 12px;\n\nborder-radius: 50%;\n\nright: -6px;\n\ntop: -6px;\n\nbox-shadow: 0 0 5px 3px #75757e;\n\ncursor: pointer;\n\n}\n\n [dialog-view='color-picker']>div.drap{\n\ntext-align: center;\n\nmargin: 20px 0;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.left{\n\ndisplay: inline-block;\n\nwidth: 40px;\n\nheight: 40px;\n\nbox-shadow: rgb(117 117 126) 0px 0px 9px 0px;\n\nborder-radius: 50%;\n\nmargin-right: 25px;\n\ncursor: crosshair;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right{\n\ndisplay: inline-block;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right>div{\n\nposition: relative;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right>div>div, [dialog-view='color-picker']>div.drap>div.right>div>span{\n\npointer-events: none;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right>div.color>div{\n\nbackground-image: linear-gradient(to right, #f00, #f0f, #00f, #0ff, #0f0, #ff0, #f00);\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right>div.alpha{\n\nmargin-top: 10px;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right>div>div{\n\nwidth: 200px;\n\nheight: 16px;\n\n}\n\n [dialog-view='color-picker']>div.drap>div.right>div>span{\n\nposition: absolute;\n\nwidth: 22px;\n\nheight: 22px;\n\ndisplay: inline-block;\n\nborder-radius: 50%;\n\ntop: -3.5px;\n\ncursor: pointer;\n\nbox-shadow: grey 0px 0px 2px 0px;\n\nbackground: rgb(250, 248, 248);\n\n}\n\n [dialog-view='color-picker']>div.btns{\n\ntext-align: center;\n\npadding: 10px;\n\n}\n\n [dialog-view='color-picker']>div.btns>button{\n\nwidth: 90px;\n\nborder-radius: 5px;\n\ncursor: pointer;\n\nborder: none;\n\nline-height: 26px;\n\n}\n\n [dialog-view='color-picker']>div.btns>button.cancel{\n\nmargin-right: 30px;\n\nbackground-color: #e0e0e0;\n\n}\n\n [dialog-view='color-picker']>div.btns>button.submit{\n\nbackground-color: #449cf6;\n\ncolor: white;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/formatColor
/*****************************************************************/
window.__pkg__bundleSrc__['83']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('24');
var getStyle =__pkg__scope_args__.default;


// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
var _formatColor = function (color) {
    var colorNode = document.getElementsByTagName('head')[0];
    colorNode.style['color'] = color;
    var rgba = getStyle(colorNode, 'color');
    var rgbaArray = rgba.replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,[\\x20\\t\\r\\n\\f]'));
    return [+rgbaArray[0], +rgbaArray[1], +rgbaArray[2], rgbaArray[3] == undefined ? 1 : +rgbaArray[3]];
};

__pkg__scope_bundle__.formatColor = _formatColor;

// 提供给 webgl 使用
__pkg__scope_bundle__.format3DColor = function (color) {
    var colorArray = _formatColor(color);
    return [
        colorArray[0] / 255,
        colorArray[1] / 255,
        colorArray[2] / 255,
        colorArray[3]
    ];
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/drawColorCanvas
/*****************************************************************/
window.__pkg__bundleSrc__['84']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('85');
var getColorByPosition =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (painter, r, g, b) {
    var width = 300, height = 160;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {

            var rgb = getColorByPosition(r, g, b, i, j);

            painter.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            painter.fillRect(i, j, 1, 1);

        }
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/getColorByPosition
/*****************************************************************/
window.__pkg__bundleSrc__['85']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (r, g, b, x, y) {

    var width = 300, height = 160;

    // X方向
    var _r = x / width * (r - 255) + 255;
    var _g = x / width * (g - 255) + 255;
    var _b = x / width * (b - 255) + 255;

    // Y方向
    _r = (160 - y) / height * _r;
    _g = (160 - y) / height * _g;
    _b = (160 - y) / height * _b;

    return [_r.toFixed(0), _g.toFixed(0), _b.toFixed(0)];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/mousePosition
/*****************************************************************/
window.__pkg__bundleSrc__['86']=function(){
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

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/getColorByDeep
/*****************************************************************/
window.__pkg__bundleSrc__['87']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (deep) {

    var distDeep = 1 / 6;

    var r, g, b;
    if (deep <= distDeep) {

        r = 255;
        g = 0;
        b = deep / distDeep * 255;

    } else if (deep <= 2 * distDeep) {

        r = (distDeep * 2 - deep) / distDeep * 255;
        g = 0;
        b = 255;

    } else if (deep <= 3 * distDeep) {

        r = 0;
        g = (deep - 2 * distDeep) / distDeep * 255;
        b = 255;

    } else if (deep <= 4 * distDeep) {

        r = 0;
        g = 255;
        b = (distDeep * 4 - deep) / distDeep * 255;

    } else if (deep <= 5 * distDeep) {

        r = (deep - distDeep * 4) / distDeep * 255;
        g = 255;
        b = 0;

    } else {

        r = 255;
        g = (distDeep * 6 - deep) / distDeep * 255;
        b = 0;

    }

    return [+r.toFixed(0), +g.toFixed(0), +b.toFixed(0)];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/color-picker/calcDeepWidthColor
/*****************************************************************/
window.__pkg__bundleSrc__['88']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (r, g, b) {

    var distDeep = 1 / 6;

    if (r == 255 && g == 0) {
        return b / 255 * distDeep;
    } else if (g == 0 && b == 255) {
        return 2 * distDeep - r / 255 * distDeep;
    } else if (r == 0 && b == 255) {
        return 2 * distDeep + g / 255 * distDeep;
    } else if (r == 0 && g == 255) {
        return 4 * distDeep - b / 255 * distDeep;
    } else if (g == 255 && b == 0) {
        return 4 * distDeep + r / 255 * distDeep;
    } else {
        return 6 * distDeep - g / 255 * distDeep;
    }

};


    return __pkg__scope_bundle__;
}
