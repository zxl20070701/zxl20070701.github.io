
/*************************** [bundle] ****************************/
// Original file:./src/pages/application/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['45']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('175');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('176');


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "application",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "应用中心" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './application.png');
        },
        mounted: function () {

        },
        methods: {
            openApp: function (event, target) {
                this.$openView(target.getAttribute('tag'));
            },
            openDialog: function (event, target) {
                this.$openDialog(target.getAttribute('tag'));
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/application/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['175']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,4]},{"type":"tag","name":"div","attrs":{"class":"left"},"childNodes":[2]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[3]},{"type":"text","content":"应用中心","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right"},"childNodes":[5,12]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[6,7]},{"type":"tag","name":"input","attrs":{"type":"text","placeholder":"搜索功能维护中..."},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8,10]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[9]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[11]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[13,15,17,19,21,23,25,27,29,31,33,35,37,39,41]},{"type":"tag","name":"div","attrs":{"tag":"model-editor","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[14]},{"type":"text","content":"3D模型编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"code-editor","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[16]},{"type":"text","content":"代码编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"format-json","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[18]},{"type":"text","content":"格式化JSON字符串","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"geo-json","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[20]},{"type":"text","content":"geoJSON查看器","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"browser","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[22]},{"type":"text","content":"Internet Explorer","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"scss","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[24]},{"type":"text","content":"scss转css","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"image-editor","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[26]},{"type":"text","content":"图片编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"regexper-visualization","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[28]},{"type":"text","content":"正则表达式可视化","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"api","ui-on:dblclick":"openDialog","ui-right-menu:app":"dialog"},"childNodes":[30]},{"type":"text","content":"开发文档","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"snake-eating","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[32]},{"type":"text","content":"贪吃蛇","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"audio-editor","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[34]},{"type":"text","content":"音频编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"debugger","ui-on:dblclick":"openDialog","ui-right-menu:app":"dialog"},"childNodes":[36]},{"type":"text","content":"调试工具","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"recorder-screen","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[38]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"computer","ui-on:dblclick":"openApp","ui-right-menu:app":""},"childNodes":[40]},{"type":"text","content":"资源管理器","childNodes":[]},{"type":"tag","name":"div","attrs":{"tag":"snipping-tool","ui-on:dblclick":"openDialog","ui-right-menu:app":"dialog"},"childNodes":[42]},{"type":"text","content":"截图工具","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/application/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['176']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"application\"]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 70px);\n\nleft: 80px;\n\ntop: 20px;\n\nfont-size: 0;\n\nwhite-space: nowrap;\n\nbackground-color: white;\n\nuser-select: none;\n\n}\n\n [page-view=\"application\"][focus=\"no\"]>.left{\n\nbackground-color: rgba(158, 196, 233, 0.85);\n\n}\n\n [page-view=\"application\"]>div{\n\nheight: 100%;\n\nvertical-align: top;\n\nfont-size: 16px;\n\nwhite-space: normal;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"application\"]>div.left{\n\nbackground-color: rgba(183, 218, 253, 0.85);\n\nwidth: 260px;\n\n}\n\n [page-view=\"application\"]>div.left>header{\n\nbackground-repeat: no-repeat;\n\nbackground-position: 5px center;\n\nbackground-size: auto 20px;\n\nbackground-image: url('./application.png');\n\nline-height: 40px;\n\npadding-left: 30px;\n\ncursor: pointer;\n\ncolor: #4b4a4a;\n\nfont-weight: 800;\n\nmargin: 10px;\n\nfont-size: 14px;\n\nfont-weight: 200;\n\n}\n\n [page-view=\"application\"]>div.right{\n\nwidth: calc(100% - 260px);\n\n}\n\n [page-view=\"application\"]>div.right>header{\n\nline-height: 40px;\n\nmargin: 10px;\n\n}\n\n [page-view=\"application\"]>div.right>header>input{\n\nbackground-color: rgb(230 230 230);\n\nwidth: 260px;\n\nheight: 30px;\n\nborder-radius: 15px;\n\npadding: 0 10px;\n\nfont-size: 12px;\n\nborder: none;\n\noutline: none;\n\n}\n\n [page-view=\"application\"]>div.right>div.content{\n\nwidth: 100%;\n\nheight: calc(100% - 60px);\n\noverflow: auto;\n\n}\n\n [page-view=\"application\"]>div.right>div.content>div{\n\nwidth: 70px;\n\npadding-top: 60px;\n\nmargin: 10px;\n\nfont-size: 12px;\n\ncolor: rgb(0, 0, 0);\n\nbackground-size: 45px auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center 10px;\n\ntext-align: center;\n\nline-height: 1.6em;\n\nheight: 100px;\n\nvertical-align: top;\n\ncursor: pointer;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"application\"]>div.right>div.content>div:hover{\n\noutline: 1px dashed rgb(185, 183, 183);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
