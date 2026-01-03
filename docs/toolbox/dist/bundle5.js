
/*************************** [bundle] ****************************/
// Original file:./src/mobile/desktop/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['36']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('67');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('68');


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "desktop",
        render: template,
        data: {
            view: obj.ref(false) // 是否显示悬浮区域，默认false，显示小球
        },
        mounted: function () {
            var i, node;

            // 补充辅助标签
            var helpCount = Math.ceil(Math.max(window.innerWidth, window.innerHeight) / 60);
            for (i = 0; i < helpCount; i++) {
                node = document.createElement('li');
                this._refs.desktopApplication.value.appendChild(node);
            }

        },
        methods: {
            toggleView: function () {
                this.view = !this.view;
            },

            // 打开应用
            goto: function (event, target) {
                var winName = target.getAttribute('tag');

                var index, items = document.getElementById('wins-line-id').children;
                for (index = 0; index < items.length; index++) {
                    if (items[index].children[0].getAttribute('tag') == winName) {
                        items[index].click();
                        return;
                    }
                }

                this.$openView(winName);
            },

            // 打开弹框
            openDialog: function (event, target) {
                this.$openDialog(target.getAttribute('tag'));
            },
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/desktop/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['67']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7,9,17]},{"type":"tag","name":"div","attrs":{"class":"desktop"},"childNodes":[2]},{"type":"tag","name":"ul","attrs":{"class":"application","ref":"desktopApplication"},"childNodes":[3,5]},{"type":"tag","name":"li","attrs":{"tag":"regexper-visualization","ui-on:click":"goto"},"childNodes":[4]},{"type":"text","content":"正则表达式可视化","childNodes":[]},{"type":"tag","name":"li","attrs":{"tag":"recorder-screen","ui-on:click":"goto"},"childNodes":[6]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"taskline"},"childNodes":[8]},{"type":"tag","name":"ul","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"handler"},"childNodes":[10,11]},{"type":"tag","name":"div","attrs":{"class":"drap","ui-dragdrop":"","ui-bind:active":"view?'no':'yes'","ui-on:click.stop":"toggleView"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"view","ui-bind:active":"view?'yes':'no'","ui-on:click.stop":"toggleView"},"childNodes":[12]},{"type":"tag","name":"div","attrs":{},"childNodes":[13,15]},{"type":"tag","name":"span","attrs":{"tag":"debugger","ui-on:click":"openDialog"},"childNodes":[14]},{"type":"text","content":"调试工具","childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"what","ui-on:click":"openDialog"},"childNodes":[16]},{"type":"text","content":"说明","childNodes":[]},{"type":"tag","name":"span","attrs":{"id":"wins-line-id"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/desktop/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['68']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"desktop\"]{\n\nbackground-color: transparent;\n\nbox-shadow: 0 0 0 0 transparent;\n\nposition: static;\n\n}\n\n [page-view=\"desktop\"] #wins-line-id{\n\ndisplay: none;\n\n}\n\n [page-view=\"desktop\"]>div.desktop>ul.application{\n\ndisplay: flex;\n\nflex-wrap: wrap;\n\n}\n\n [page-view=\"desktop\"]>div.desktop>ul.application>li{\n\nwidth: 60px;\n\nheight: 60px;\n\npadding-top: 65px;\n\nfont-size: 12px;\n\nbackground-position: center top;\n\nbackground-repeat: no-repeat;\n\nbackground-size: 50px auto;\n\ntext-align: center;\n\nmargin: 15px 10px;\n\ncolor: white;\n\nflex-grow: 1;\n\n}\n\n [page-view=\"desktop\"]>div.taskline{\n\nposition: fixed;\n\nwidth: 100vw;\n\nleft: 0;\n\nbottom: 20px;\n\ntext-align: center;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>ul{\n\ndisplay: inline-block;\n\nbackground-color: rgba(199, 197, 197, 0.317);\n\nborder-radius: 20px;\n\npadding: 5px;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>ul>li{\n\ndisplay: inline-block;\n\nwidth: 50px;\n\nheight: 50px;\n\nmargin: 10px;\n\nbackground-repeat: no-repeat;\n\nbackground-size: 100% auto;\n\nbackground-position: center;\n\nfont-size: 0;\n\nvertical-align: top;\n\n}\n\n [page-view=\"desktop\"]>div.handler{\n\nposition: fixed;\n\nright: 20px;\n\nbottom: 300px;\n\nz-index: 10;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div{\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div[active='no']{\n\ndisplay: none;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.drap{\n\nbackground-image: url(\"./iphone-task.png\");\n\nbackground-position: center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: 100% auto;\n\nwidth: 50px;\n\nheight: 50px;\n\nfilter: drop-shadow(0px 0px 6px white);\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 100vw;\n\nheight: 100vh;\n\nbackground-color: rgba(0, 0, 0, 0.2);\n\nfilter: grayscale(100%);\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div{\n\nposition: absolute;\n\nwidth: 300px;\n\nheight: 300px;\n\nleft: calc(50vw - 150px);\n\ntop: calc(50vh - 150px);\n\nbackground-color: #1b2145;\n\nborder-radius: 10px;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span{\n\nposition: absolute;\n\nwidth: 70px;\n\nheight: 70px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center top;\n\npadding-top: 55px;\n\ncolor: rgb(255, 255, 255);\n\nfont-size: 12px;\n\ntext-align: center;\n\n}\n\n/* // 位置\r */\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span:nth-child(1){\n\nleft: 115px;\n\ntop: 20px;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span:nth-child(2){\n\nleft: 115px;\n\nbottom: 20px;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span:nth-child(3){\n\nleft: 20px;\n\ntop: 65px;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span:nth-child(4){\n\nleft: 20px;\n\nbottom: 65px;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span:nth-child(5){\n\nright: 20px;\n\ntop: 65px;\n\n}\n\n [page-view=\"desktop\"]>div.handler>div.view>div>span:nth-child(6){\n\nright: 20px;\n\nbottom: 65px;\n\n}\n\n #view-root [page-view]{\n\nleft: 0;\n\ntop: 0;\n\nwidth: 100vw;\n\nbottom: 0;\n\noverflow: auto;\n\n}\n\n header.top-title{\n\nheight: 45px;\n\n}\n\n header.top-title>div{\n\nbackground-color: #fafafa;\n\ncolor: #040404;\n\nline-height: 45px;\n\nwidth: 100vw;\n\ntext-align: center;\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nbox-shadow: 0px -4px 18px 2px #45464657;\n\n}\n\n header.top-title>div>h2{\n\nfont-size: 16px;\n\n}\n\n header.top-title>div>button{\n\nposition: absolute;\n\ntop: 0;\n\nwidth: 45px;\n\nheight: 45px;\n\noutline: none;\n\nborder: none;\n\nbackground-color: transparent;\n\nfont-size: 0;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\n}\n\n header.top-title>div>button:first-child{\n\nleft: 0;\n\n}\n\n header.top-title>div>button:last-child{\n\nright: 0;\n\n}\n\n header.top-title>div>button.goback{\n\nbackground-image: url('./left.png');\n\n}\n\n header.top-title>div>button.close{\n\nbackground-image: url('./close.png');\n\n}\n\n [tag=\"debugger\"]{\n\nbackground-image: url('./debugger.png');\n\n}\n\n [tag=\"what\"]{\n\nbackground-image: url('./what.png');\n\n}\n\n [tag=\"recorder-screen\"]{\n\nbackground-image: url('./recorder-screen.png');\n\n}\n\n [tag=\"regexper-visualization\"]{\n\nbackground-image: url('./regexper-visualization.png');\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
