
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/tool/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['100']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('163');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('164');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "tool",
        render: template,
        data: {
            active: obj.ref('move'),
            dragdropPadding: [30, 0, 0, 0]
        },
        methods: {

            // 选择工具
            changeTool: function (event) {
                this.active = event.target.getAttribute('name');
                this.callback('activeTool', this.active);
            },

            // 选择颜色
            selectColor: function (event) {

                this.$openDialog('color-picker', {
                    title: event.target.getAttribute('title'),
                    color: event.target.style.backgroundColor
                }).then(function (data) {
                    event.target.style.backgroundColor = data;
                    this.callback(event.target.getAttribute('tag'), data);
                });

            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/tool/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['163']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3,12]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":"dragdropPadding"},"childNodes":[2]},{"type":"text","content":"工具箱","childNodes":[]},{"type":"tag","name":"ul","attrs":{"class":"list"},"childNodes":[4,5,6,7,8,9,10,11]},{"type":"tag","name":"li","attrs":{"title":"移动工具","class":"move","ui-on:click":"changeTool","name":"move","ui-bind:active":"active=='move'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"橡皮擦","class":"eraser","ui-on:click":"changeTool","name":"eraser","ui-bind:active":"active=='eraser'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"背景橡皮擦","class":"eraser-bg","ui-on:click":"changeTool","name":"eraser-bg","ui-bind:active":"active=='eraser-bg'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"抓手工具","class":"drap","ui-on:click":"changeTool","name":"drap","ui-bind:active":"active=='drap'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"画笔","class":"painter","ui-on:click":"changeTool","name":"painter","ui-bind:active":"active=='painter'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"缩放工具","class":"resize","ui-on:click":"changeTool","name":"resize","ui-bind:active":"active=='resize'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"文字","class":"text","ui-on:click":"changeTool","name":"text","ui-bind:active":"active=='text'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"几何绘制","class":"geometry","ui-on:click":"changeTool","name":"geometry","ui-bind:active":"active=='geometry'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"color"},"childNodes":[13,14]},{"type":"tag","name":"span","attrs":{"tag":"forecolor","ui-on:click":"selectColor","title":"背景色","style":"background-color: white;"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"backcolor","ui-on:click":"selectColor","title":"前景色","style":"background-color: black;"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/tool/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['164']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [win-view='tool']{\n\nwidth: 82px;\n\nleft: 70px;\n\ntop: 100px;\n\nposition: fixed;\n\nborder: 1px solid gray;\n\nmin-height: 300px;\n\nbackground-color: white;\n\n}\n\n [win-view='tool']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./image-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nborder-bottom: 1px solid gray;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\n}\n\n [win-view='tool']>.list>li{\n\ndisplay: inline-block;\n\nwidth: 30px;\n\nheight: 30px;\n\nmargin: 5px;\n\noutline: 1px solid rgb(185, 182, 182);\n\nfont-size: 0;\n\nvertical-align: top;\n\nbackground-size: contain;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\ncursor: pointer;\n\n}\n\n [win-view='tool']>.list>li[active='yes']{\n\nbackground-color: #e6e1e1;\n\n}\n\n [win-view='tool']>.list>li.move{\n\nbackground-image: url('./move.png');\n\n}\n\n [win-view='tool']>.list>li.eraser{\n\nbackground-image: url('./eraser.png');\n\n}\n\n [win-view='tool']>.list>li.eraser-bg{\n\nbackground-image: url('./eraser-bg.png');\n\n}\n\n [win-view='tool']>.list>li.drap{\n\nbackground-image: url('./drap.png');\n\n}\n\n [win-view='tool']>.list>li.painter{\n\nbackground-image: url('./painter.png');\n\n}\n\n [win-view='tool']>.list>li.resize{\n\nbackground-image: url('./resize.png');\n\n}\n\n [win-view='tool']>.list>li.text{\n\nbackground-image: url('./text.png');\n\n}\n\n [win-view='tool']>.list>li.geometry{\n\nbackground-image: url('./geometry.png');\n\n}\n\n [win-view='tool']>.color{\n\nheight: 40px;\n\nposition: absolute;\n\nbottom: 5px;\n\nleft: 0;\n\n}\n\n [win-view='tool']>.color>span{\n\nposition: absolute;\n\ndisplay: inline-block;\n\noutline: 1px solid rgb(201, 201, 202);\n\nwidth: 30px;\n\nheight: 30px;\n\ncursor: pointer;\n\n}\n\n [win-view='tool']>.color>span[tag='forecolor']{\n\nleft: 15px;\n\ntop: 0;\n\n}\n\n [win-view='tool']>.color>span[tag='backcolor']{\n\nleft: 35px;\n\ntop: 10px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
