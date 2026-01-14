
/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['88']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('322');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('323');


__pkg__scope_args__=window.__pkg__getBundle('30');
var urlFormat =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('324');

__pkg__scope_args__=window.__pkg__getBundle('325');
var lazyDialogs =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "code-example",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "代码例子" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './code-example.png');
        },
        methods: {
            openExamples: function (event, target) {
                this.openDialog(target.getAttribute('tag'));
            },
            openDialog: function (pagename, isInit) {

                // 打开
                if (!isInit) window.location.href = "#/code-example/" + pagename;
                this.$openDialog(lazyDialogs[pagename], {
                    srcUrl: "https://github.com/zxl20070701/zxl20070701.github.io/edit/master/src/pages/code-example/dialogs/" + pagename
                }).then(function () {

                    // 关闭后恢复路由
                    window.location.href = "#/code-example";
                });
            },
        },
        mounted: function () {
            var urlObj = urlFormat(), _this = this;

            if (urlObj.router.length >= 2 && urlObj.router[1] in lazyDialogs) {
                this.openDialog(urlObj.router[1], true);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['322']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"代码例子","childNodes":[]},{"type":"tag","name":"ul","attrs":{"class":"content"},"childNodes":[10,12]},{"type":"tag","name":"li","attrs":{"class":"button","ui-on:click":"openExamples","tag":"textarea-eraser"},"childNodes":[11]},{"type":"text","content":"一个简单的多行文本擦除显示动画效果","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"button","ui-on:click":"openExamples","tag":"colorful-dice"},"childNodes":[13]},{"type":"text","content":"一个旋转的3D彩色骰子","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['323']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"code-example\"]{\n\nwidth: 400px;\n\nleft: calc(50vw - 200px);\n\ntop: 25px;\n\nfont-family: cursive;\n\n}\n\n [page-view=\"code-example\"][focus=\"no\"]>header{\n\nbackground-color: #d0b56d;\n\n}\n\n [page-view=\"code-example\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #c0a354;\n\n}\n\n [page-view=\"code-example\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./code-example.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"code-example\"]>.content{\n\nheight: calc(100vh - 150px);\n\noverflow: auto;\n\n}\n\n [page-view=\"code-example\"]>.content>.button{\n\nborder: 1px solid rgb(69, 69, 69);\n\npadding:7px 10px;\n\nmargin: 5px;\n\nborder-radius: 5px;\n\ncolor: black;\n\ncursor: pointer;\n\n}\n\n [page-view=\"code-example\"]>.content>.button::before{\n\ncontent: \"</>\";\n\ndisplay: inline-block;\n\nmargin-right: 5px;\n\nfont-weight: 800;\n\ncolor: #4b4a4a;\n\n}\n\n [page-view=\"code-example\"]>.content>.button:hover{\n\ntext-decoration: underline;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['324']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view=\"code-example\"]{\n\nleft: 20px;\n\ntop: 20px;\n\nuser-select: none;\n\nwidth: calc(100vw - 40px);\n\nheight: calc(100vh - 40px);\n\nbackground-color: white;\n\n}\n\n [dialog-view=\"code-example\"] > header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nborder-bottom: 1px solid rgb(187, 184, 184);\n\nwhite-space: nowrap;\n\noverflow: hidden;\n\n}\n\n [dialog-view=\"code-example\"] > header > h2{\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./code-example.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\ndisplay: inline-block;\n\nfont-family: sans-serif;\n\n}\n\n [dialog-view=\"code-example\"] > header > h2 > a{\n\ncolor: #000000;\n\n}\n\n [dialog-view=\"code-example\"] > header > h2 > a:hover{\n\ntext-decoration: underline;\n\n}\n\n [dialog-view=\"code-example\"] > div.content{\n\ntext-align: center;\n\noverflow: hidden;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['325']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {
    "textarea-eraser": function () {
        return window.__pkg__getLazyBundle('./dist/bundle80.js','326')
    },
    "colorful-dice": function () {
        return window.__pkg__getLazyBundle('./dist/bundle81.js','327')
    }
};

    return __pkg__scope_bundle__;
}
