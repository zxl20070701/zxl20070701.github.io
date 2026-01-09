
/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['78']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('212');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('213');


__pkg__scope_args__=window.__pkg__getBundle('30');
var urlFormat =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('214');

__pkg__scope_args__=window.__pkg__getBundle('215');
var lazyDialogs =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "type-practice",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "金山打字通" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './type-practice/logo.png');
        },
        methods: {
            openPage: function (event, target) {
                this.openDialog(target.getAttribute('tag'));
            },
            openDialog: function (pagename, isInit) {

                // 打开
                if (!isInit) window.location.href = "#/type-practice/" + pagename;
                this.$openDialog(lazyDialogs[pagename], {
                    dialogs: lazyDialogs
                }).then(function () {

                    // 关闭后恢复路由
                    window.location.href = "#/type-practice";
                });
            }
        },
        mounted: function () {
            var urlObj = urlFormat();

            if (urlObj.router.length >= 2 && urlObj.router[1] in lazyDialogs) {
                this.openDialog(urlObj.router[1], true);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['212']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"金山打字通","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5,7]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[6]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[10]},{"type":"tag","name":"span","attrs":{"class":"keyboard btn","ui-on:click":"openPage","tag":"keyboard"},"childNodes":[11]},{"type":"text","content":"键盘练习","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['213']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"type-practice\"]{\n\npadding-bottom: 20px;\n\nwidth: 800px;\n\nleft: calc(50vw - 400px);\n\ntop: calc(50vh - 200px);\n\n}\n\n [page-view=\"type-practice\"][focus=\"no\"]>header{\n\nbackground-color: #fafafa;\n\n}\n\n [page-view=\"type-practice\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nmargin-bottom: 30px;\n\nbox-shadow: -3px 3px 20px #d2d2db;\n\n}\n\n [page-view=\"type-practice\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./type-practice/logo.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"type-practice\"]>div.content{\n\ntext-align: center;\n\npadding: 50px 0;\n\n}\n\n [page-view=\"type-practice\"]>div.content>span.btn{\n\ndisplay: inline-block;\n\nwidth: 100px;\n\nheight: 100px;\n\nbox-shadow: -3px 3px 20px #d2d2db;\n\nmargin: 50px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\npadding-top: 100px;\n\nline-height: 2em;\n\ncursor: pointer;\n\n}\n\n [page-view=\"type-practice\"]>div.content>span.btn:hover{\n\noutline: 1px solid white;\n\ntext-decoration: underline;\n\n}\n\n [page-view=\"type-practice\"]>div.content>span.btn.keyboard{\n\nbackground-image: url('./type-practice/keyboard.png');\n\n}\n\n [page-view=\"type-practice\"]>div.content>span.btn.english{\n\nbackground-image: url('./type-practice/english.png');\n\n}\n\n [page-view=\"type-practice\"]>div.content>span.btn.pinyin{\n\nbackground-image: url('./type-practice/pinyin.png');\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['214']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='type-practice']{\n\nleft: calc(50vw - 450px);\n\ntop: calc(50vh - 300px);\n\nuser-select: none;\n\nwidth: 900px;\n\nheight: 550px;\n\n}\n\n [dialog-view='type-practice']>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground: linear-gradient(45deg, #6fb5ec, #d2e4f2, #0b71c1);\n\nwhite-space: nowrap;\n\nbox-shadow: -3px 3px 20px #5f5f62;\n\nposition: relative;\n\n}\n\n [dialog-view='type-practice']>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./type-practice/logo.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\ndisplay: inline-block;\n\nfont-family: cursive;\n\n}\n\n [dialog-view='type-practice']>header>div.src-url{\n\nline-height: 17px;\n\nfont-size: 12px;\n\ndisplay: inline-block;\n\npadding-left: 50px;\n\npadding-top: 8px;\n\nvertical-align: top;\n\n}\n\n [dialog-view='type-practice']>header>div.src-url>a{\n\ndisplay: block;\n\ntext-decoration: underline;\n\ncolor: rgb(3, 136, 230);\n\n}\n\n [dialog-view='type-practice']>div.content{\n\nheight: calc(100% - 50px);\n\ntext-align: center;\n\nbackground-color: #fafafa;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['215']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 键盘练习
    "keyboard": function () {
        return window.__pkg__getLazyBundle('./dist/bundle54.js','216')
    },

    // 英文打字
    "english": function () {
        return window.__pkg__getLazyBundle('./dist/bundle55.js','217')
    },

    // 拼音打字
    "pinyin": function () {
        return window.__pkg__getLazyBundle('./dist/bundle56.js','218')
    }
};

    return __pkg__scope_bundle__;
}
