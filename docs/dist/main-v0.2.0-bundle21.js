
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/snipping-tool/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['51']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('198');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('199');


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "snipping-tool",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "截图工具" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './snipping.png');
        },
        methods: {

            // 本系统截图
            snippingWebsite: function () {
                alert('此功能未完成，敬请期待！');
            },

            // 真机截图
            snippingComputer: function () {
                alert('此功能未完成，敬请期待！');
            },

            // 下载
            download: function () {
                alert('此功能未完成，敬请期待！');
            },

            // 去编辑
            goImageEditor: function () {
                alert('此功能未完成，敬请期待！');
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/snipping-tool/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['198']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7,12,14]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"截图工具","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btns"},"childNodes":[8,10]},{"type":"tag","name":"button","attrs":{"ui-on:click":"snippingWebsite","title":"点击我可以截取本网站内的内容"},"childNodes":[9]},{"type":"text","content":"本系统截图","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"snippingComputer","title":"点击我可以截取电脑（真机）屏幕内容"},"childNodes":[11]},{"type":"text","content":"真机截图","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"canvas"},"childNodes":[13]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btns right"},"childNodes":[15,17]},{"type":"tag","name":"button","attrs":{"class":"link","ui-on:click":"goImageEditor"},"childNodes":[16]},{"type":"text","content":"导入图片编辑器进一步编辑？","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"download","ui-on:click":"download"},"childNodes":[18]},{"type":"text","content":"下载","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/snipping-tool/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['199']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view=\"snipping-tool\"]{\n\nright: 20px;\n\ntop: 20px;\n\nfont-size: 0;\n\nuser-select: none;\n\nmin-width: 300px;\n\n}\n\n [dialog-view=\"snipping-tool\"][focus=\"no\"]>header{\n\nbackground-color: #e8eaed;\n\n}\n\n [dialog-view=\"snipping-tool\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nborder-bottom: 1px solid rgb(187, 184, 184);\n\n}\n\n [dialog-view=\"snipping-tool\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./snipping.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.btns>button{\n\nmargin: 10px;\n\nfont-size: 12px;\n\ncolor: white;\n\nbackground-color: #2196f3;\n\npadding: 2px 5px;\n\ncursor: pointer;\n\nborder: none;\n\noutline: none;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.btns>button:not(:last-child){\n\nmargin-right: 0;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.btns>button.link{\n\nbackground-color: transparent;\n\ncolor: #607d8b;\n\ntext-decoration: underline;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.btns>button.download{\n\nbackground-color: red;\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.btns.right{\n\ntext-align: right;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.btns{\n\nborder-bottom: 1px solid rgb(187, 184, 184);\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.canvas{\n\npadding: 10px;\n\ntext-align: center;\n\n}\n\n [dialog-view=\"snipping-tool\"]>div.canvas>canvas{\n\noutline: 1px solid rgb(244, 162, 162);\n\nbackground-image: url('./mosaic.png');\n\nbackground-size: 10px auto;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
