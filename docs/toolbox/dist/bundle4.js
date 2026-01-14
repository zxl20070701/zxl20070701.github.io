
/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['35']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('63');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('64');


__pkg__scope_args__=window.__pkg__getBundle('31');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('65');
var lazyWins =__pkg__scope_args__.default;


var formatTimeItem = function (val) {
    if (val < 10) return "0" + val;
    return val;
};

var wins = {}, isWinOpen = {};
__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "desktop",
        render: template,
        data: {

            // 当前时间
            time: obj.ref(""),
            date: obj.ref(""),

            // 记录谁被选中
            select: obj.ref("")
        },
        methods: {

            // 打开应用
            goto: function (event, target) {
                this.select = "";
                this.$openView(target.getAttribute('tag'));
            },

            // 打开弹框
            openDialog: function (event, target) {
                if (isWinOpen.begin) this.toggleWin("begin");
                if (isWinOpen.tools) this.toggleWin("tools");

                this.$openDialog(target.getAttribute('tag'));
            },

            // 修改当前选中应用
            doSelect: function (event, target) {
                this.select = target.getAttribute('tag');
            },

            // 窗口控制
            toggleWin: function (event, target) {
                var _this = this, winName = isString(event) ? event : target.getAttribute('tag');

                // 如果已经加载，切换
                if (wins[winName]) {

                    if (isWinOpen[winName]) {
                        if (!isFunction(wins[winName].instance._hidden) || !wins[winName].instance._hidden()) {
                            wins[winName].el.style.display = "none";
                        }
                    } else {
                        if (!isFunction(wins[winName].instance._show) || !wins[winName].instance._show()) {
                            wins[winName].el.style.display = "";
                        }
                    }

                    isWinOpen[winName] = !isWinOpen[winName];
                }

                // 否则打开
                else {
                    this.$openWin(lazyWins[winName]).then(function (data) {
                        wins[winName] = data;
                        isWinOpen[winName] = true;

                        if (isFunction(wins[winName].instance._show) && wins[winName].instance._show()) { }

                        // 补充方法
                        data.instance.$openView = _this.$openView;
                        data.instance.openDialog = function (event, target) {
                            _this.openDialog(event, target);
                        }

                    });
                }
            },
        },
        mounted: function () {
            var _this = this, updateTime = function () {
                var curDate = new Date();

                _this.time = formatTimeItem(curDate.getHours()) + ":" + formatTimeItem(curDate.getMinutes()) + ":" + formatTimeItem(curDate.getSeconds());
                _this.date = curDate.getFullYear() + "年" + (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日"
            };

            setInterval(updateTime, 1000);
            updateTime();

            document.getElementsByTagName("body")[0].addEventListener('click', function () {
                if (isWinOpen.begin) _this.toggleWin("begin");
                if (isWinOpen.tools) _this.toggleWin("tools");
            });
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['63']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,22]},{"type":"tag","name":"ul","attrs":{"class":"content","ui-right-menu:system":"","ui-on:click":"doSelect","tag":""},"childNodes":[2,4,6,8,10,12,14,16,18,20]},{"type":"tag","name":"li","attrs":{"ui-bind:select":"select=='computer'?'yes':'no'","ui-on:click.stop":"doSelect","title":"包含所有应用的地方","tag":"computer","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[3]},{"type":"text","content":"我的电脑","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='recorder-screen'?'yes':'no'","ui-on:click.stop":"doSelect","title":"一个H5版本的电脑屏幕录制软件","tag":"recorder-screen","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[5]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='image-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以对图片进行编辑，包括合并、修改大小、美化等","tag":"image-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[7]},{"type":"text","content":"图片编辑器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='code-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"支持图片、代码等查看和编辑，支持文件或目录打开、编辑、新建和保存","tag":"code-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[9]},{"type":"text","content":"代码编辑器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='snake-eating'?'yes':'no'","ui-on:click.stop":"doSelect","title":"一个经典的贪吃蛇小游戏","tag":"snake-eating","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[11]},{"type":"text","content":"贪吃蛇","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='snipping-tool'?'yes':'no'","ui-on:click.stop":"doSelect","title":"一个H5版本的截图工具","tag":"snipping-tool","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[13]},{"type":"text","content":"截图工具","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='regexper-visualization'?'yes':'no'","ui-on:click.stop":"doSelect","title":"输入一个正则表达式后可以把其变成可视化的图表来快速读懂意义","tag":"regexper-visualization","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[15]},{"type":"text","content":"正则表达式可视化","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='geo-json'?'yes':'no'","ui-on:click.stop":"doSelect","title":"主要用于快速了解一份geoJSON地理数据的内容","tag":"geo-json","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[17]},{"type":"text","content":"geoJSON查看器","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='type-practice'?'yes':'no'","ui-on:click.stop":"doSelect","title":"一个打字练习软件","tag":"type-practice","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[19]},{"type":"text","content":"金山打字通","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"link","ui-bind:select":"select=='audio-editor'?'yes':'no'","ui-on:click.stop":"doSelect","title":"可以对音频文件进行切割、合并等操作，支持多种格式","tag":"audio-editor","ui-on:dblclick":"goto","ui-right-menu:app":""},"childNodes":[21]},{"type":"text","content":"音频编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"taskline","ui-right-menu:desktop-line":""},"childNodes":[23,24,25,26]},{"type":"tag","name":"span","attrs":{"class":"begin","title":"快速开始","tag":"begin","ui-on:click.stop":"toggleWin"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"what","tag":"what","ui-on:click":"openDialog"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"wins","id":"wins-line-id"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"time","tag":"tools","ui-on:click.stop":"toggleWin"},"childNodes":[27,28]},{"type":"tag","name":"div","attrs":{"ui-bind":"time"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind":"date"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['64']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"desktop\"]{\n\nuser-select: none;\n\nbackground-color: transparent;\n\nposition: static;\n\n}\n\n [page-view=\"desktop\"]>ul.content{\n\nwidth: 100vw;\n\nheight: calc(100vh - 35px);\n\noverflow: hidden;\n\ndisplay: flex;\n\nflex-direction: column;\n\nflex-wrap: wrap;\n\nalign-items: flex-start;\n\nalign-content: flex-start;\n\npadding: 20px 0;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li{\n\nwidth: 70px;\n\npadding-top: 60px;\n\nmargin: 0 5px;\n\nfont-size: 12px;\n\ncolor: white;\n\nbackground-size: 45px auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center 10px;\n\ntext-align: center;\n\nline-height: 1.6em;\n\nheight: 100px;\n\nvertical-align: top;\n\ncursor: pointer;\n\nposition: relative;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li:hover{\n\nfilter: drop-shadow(0px -1px 9px #f9f9f94a);\n\nbackground-size: 47px auto;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li.link::before{\n\ncontent: \" \";\n\nposition: absolute;\n\nwidth: 17px;\n\nheight: 17px;\n\nbackground-image: url(\"./rt.jpeg\");\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nleft: 12px;\n\ntop: 38px;\n\n}\n\n [page-view=\"desktop\"]>ul.content>li[select=\"yes\"]{\n\nbackground-color: rgba(228, 228, 228, 0.294);\n\n}\n\n [page-view=\"desktop\"]>div.taskline{\n\nposition: fixed;\n\nleft: 0;\n\nbottom: 0;\n\nwidth: 100%;\n\nheight: 35px;\n\nbackground-color: rgba(3, 71, 126, 0.6);\n\nborder-top: 1px solid #313333;\n\nz-index: 10;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span{\n\nposition: absolute;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.begin{\n\ncursor: pointer;\n\nwidth: 45px;\n\nheight: 45px;\n\nleft: 5px;\n\nbottom: 5px;\n\nbackground-image: url(\"./windows7.png\");\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nborder-radius: 50%;\n\nbox-shadow: 3px 3px 20px 0px rgba(96, 125, 139, 0.754);\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.what{\n\ncursor: pointer;\n\nwidth: 35px;\n\nheight: 35px;\n\nbackground-image: url(\"./what.png\");\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nleft: 55px;\n\nbottom: 0;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins{\n\nleft: 90px;\n\nbottom: 0;\n\nwidth: calc(100% - 185px);\n\nheight: 35px;\n\noverflow: hidden;\n\npadding: 0 5px;\n\ndisplay: flex;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins>span{\n\nline-height: 31px;\n\nfont-size: 12px;\n\nborder: 1px solid #607d8b;\n\npadding-right: 5px;\n\nborder-radius: 3px;\n\nmargin-top: 1px;\n\ncolor: white;\n\nbackground-image: radial-gradient(rgba(255, 255, 255, 0),\r\n                rgba(189, 187, 187, 0.489));\n\nflex-basis: 120px;\n\nwhite-space: nowrap;\n\ntext-overflow: ellipsis;\n\noverflow: hidden;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins>span[focus=\"yes\"]{\n\nbackground-image: radial-gradient(rgba(255, 255, 255, 0.141),\r\n                  rgba(189, 187, 187, 0.675));\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.wins>span>span{\n\ndisplay: inline-block;\n\nwidth: 30px;\n\nheight: 31px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nbackground-size: 80% auto;\n\nvertical-align: top;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.time{\n\nright: 0;\n\nwidth: 100px;\n\ntext-align: center;\n\ntop: 2px;\n\nheight: 100%;\n\ncolor: white;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.time>div:first-child{\n\nfont-size: 12px;\n\nline-height: 15px;\n\n}\n\n [page-view=\"desktop\"]>div.taskline>span.time>div:last-child{\n\nfont-size: 12px;\n\nline-height: 15px;\n\n}\n\n/* // 窗口按钮\r */\n\n .win-btns{\n\nposition: absolute;\n\nright: 20px;\n\ntop: -0.5px;\n\nfont-size: 0;\n\n}\n\n .win-btns>button{\n\nfont-size: 0;\n\nheight: 24px;\n\nvertical-align: top;\n\noutline: none;\n\nborder: none;\n\nbackground-repeat: no-repeat;\n\nbackground-position-y: center;\n\nbackground-size: auto 100%;\n\ncursor: pointer;\n\nmargin: 0 !important;\n\nbackground-color: transparent !important;\n\n}\n\n .win-btns>button.min{\n\nbackground-image: url(\"./min-btn.png\");\n\nwidth: 36px;\n\n}\n\n .win-btns>button.close{\n\nbackground-image: url(\"./close-btn.png\");\n\nwidth: 59px;\n\n}\n\n #contextmenu-root{\n\nposition: fixed;\n\nz-index: 10;\n\n}\n\n #contextmenu-root ul{\n\nwidth: 220px;\n\npadding: 5px;\n\nborder-radius: 5px;\n\nbackground-color: #e5e8ea;\n\nborder: 1px solid #c3c3c3;\n\nfont-size: 14px;\n\nline-height: 1.4em;\n\n}\n\n #contextmenu-root ul li[notshow=\"yes\"]{\n\ndisplay: none;\n\n}\n\n #contextmenu-root ul li.line{\n\nheight: 1px;\n\nbackground-color: #d5d9db;\n\nmargin-left: 50px;\n\n}\n\n #contextmenu-root ul li.btn{\n\nline-height: 2em;\n\nfont-size: 14px;\n\npadding-left: 60px;\n\nposition: relative;\n\ncursor: pointer;\n\n}\n\n #contextmenu-root ul li.btn::before{\n\ncontent: \" \";\n\nposition: absolute;\n\nwidth: 50px;\n\nheight: 100%;\n\ntext-align: center;\n\nleft: 0;\n\ntop: 0;\n\nborder-right: 1px solid #d5d9db;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 70%;\n\nbackground-position: center center;\n\n}\n\n #contextmenu-root ul li.btn:hover{\n\noutline: 1px solid rgba(207, 208, 208, 0.72);\n\nbackground-color: rgba(228, 252, 254, 0.538);\n\nborder-radius: 3px;\n\n}\n\n/* // 不可用的\r */\n\n #contextmenu-root ul li.btn.gray{\n\ncolor: #c2c2ca;\n\ncursor: not-allowed;\n\n}\n\n/* // 应用logo\r */\n\n [tag=\"model-editor\"]{\n\nbackground-image: url(\"./model-editor.png\");\n\n}\n\n [tag=\"regexper-visualization\"]{\n\nbackground-image: url(\"./regexper-visualization.png\");\n\n}\n\n [tag=\"audio-editor\"]{\n\nbackground-image: url(\"./audio-editor.png\");\n\n}\n\n [tag=\"format-json\"]{\n\nbackground-image: url(\"./format-json.png\");\n\n}\n\n [tag=\"image-editor\"]{\n\nbackground-image: url(\"./image-editor.png\");\n\n}\n\n [tag=\"snake-eating\"]{\n\nbackground-image: url(\"./snake-eating.png\");\n\n}\n\n [tag=\"scss\"]{\n\nbackground-image: url(\"./scss.png\");\n\n}\n\n [tag=\"code-editor\"]{\n\nbackground-image: url(\"./code-editor.png\");\n\n}\n\n [tag=\"recorder-screen\"]{\n\nbackground-image: url(\"./recorder-screen.png\");\n\n}\n\n [tag=\"api\"]{\n\nbackground-image: url(\"./api.png\");\n\n}\n\n [tag=\"debugger\"]{\n\nbackground-image: url(\"./debugger.png\");\n\n}\n\n [tag=\"browser\"]{\n\nbackground-image: url(\"./browser.png\");\n\n}\n\n [tag=\"geo-json\"]{\n\nbackground-image: url(\"./geoJSON.png\");\n\n}\n\n [tag=\"snipping-tool\"]{\n\nbackground-image: url(\"./snipping.png\");\n\n}\n\n [tag=\"computer\"]{\n\nbackground-image: url(\"./computer.png\");\n\n}\n\n [tag=\"echarts\"]{\n\nbackground-image: url(\"./echarts/logo.png\");\n\n}\n\n [tag=\"type-practice\"]{\n\nbackground-image: url(\"./type-practice/logo.png\");\n\n}\n\n [tag=\"excel\"]{\n\nbackground-image: url(\"./excel.png\");\n\n}\n\n [tag=\"npm-download\"]{\n\nbackground-image: url(\"./npm.png\");\n\n}\n\n [tag=\"drawio\"]{\n\nbackground-image: url(\"./drawio.png\");\n\n}\n\n [tag=\"code-example\"]{\n\nbackground-image: url(\"./code-example.png\");\n\n}\n\n [tag=\"draft\"]{\n\nbackground-image: url(\"./draft.png\");\n\n}\n\n [tag=\"job-resume\"]{\n\nbackground-image: url(\"./job-resume.png\");\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/desktop/wins/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['65']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 快速开始
    begin: function () {
        return window.__pkg__getLazyBundle('./dist/bundle12.js','66')
    },

    // 右侧工具
    tools: function () {
        return window.__pkg__getLazyBundle('./dist/bundle13.js','67')
    }
};

    return __pkg__scope_bundle__;
}
