
/*************************** [bundle] ****************************/
// Original file:./src/mobile/echarts/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['82']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('217');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('218');


__pkg__scope_args__=window.__pkg__getBundle('30');
var urlFormat =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('219');

__pkg__scope_args__=window.__pkg__getBundle('220');
var lazyDialogs =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "echarts",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "可视化图表" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './echarts/logo.png');
        },
        methods: {
            openExamples: function (event, target) {
                this.openDialog(target.getAttribute('tag'));
            },
            openDialog: function (pagename, isInit) {

                // 打开
                if (!isInit) window.location.href = "#/echarts/" + pagename;

                this.$openDialog(lazyDialogs[pagename]).then(function () {

                    // 关闭后恢复路由
                    window.location.href = "#/echarts";
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
// Original file:./src/mobile/echarts/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['217']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"class":"top-title"},"childNodes":[2]},{"type":"tag","name":"div","attrs":{},"childNodes":[3,5,7]},{"type":"tag","name":"button","attrs":{"class":"goback","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"返回","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"可视化图表","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[10]},{"type":"tag","name":"div","attrs":{"class":"menu","ref":"mymenu"},"childNodes":[11,15,20,24,26,30,32,36,38,42,44,48,50,54,56,60,62,66,68,72,74,78,80,84,86,90,92,96,98,102,107,111,113,117,119,123]},{"type":"tag","name":"h4","attrs":{},"childNodes":[12,13]},{"type":"text","content":"折线图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[14]},{"type":"text","content":"line","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[16]},{"type":"tag","name":"li","attrs":{"ui-on:click":"openExamples","tag":"line-multiple-x-axis"},"childNodes":[17,18]},{"type":"tag","name":"div","attrs":{"class":"line-multiple-x-axis"},"childNodes":[]},{"type":"tag","name":"h6","attrs":{},"childNodes":[19]},{"type":"text","content":"多X轴折线图","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[21,22]},{"type":"text","content":"柱状图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[23]},{"type":"text","content":"bar","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[25]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[27,28]},{"type":"text","content":"饼图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[29]},{"type":"text","content":"pie","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[31]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[33,34]},{"type":"text","content":"散点图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[35]},{"type":"text","content":"scatter","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[37]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[39,40]},{"type":"text","content":"地理坐标/地图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[41]},{"type":"text","content":"map","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[43]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[45,46]},{"type":"text","content":"K线图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[47]},{"type":"text","content":"candlestick","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[49]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[51,52]},{"type":"text","content":"雷达图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[53]},{"type":"text","content":"radar","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[55]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[57,58]},{"type":"text","content":"关系图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[59]},{"type":"text","content":"graph","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[61]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[63,64]},{"type":"text","content":"树图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[65]},{"type":"text","content":"tree","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[67]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[69,70]},{"type":"text","content":"矩形树图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[71]},{"type":"text","content":"treemap","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[73]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[75,76]},{"type":"text","content":"旭日图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[77]},{"type":"text","content":"sunburst","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[79]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[81,82]},{"type":"text","content":"平行坐标系","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[83]},{"type":"text","content":"parallel","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[85]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[87,88]},{"type":"text","content":"桑基图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[89]},{"type":"text","content":"sankey","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[91]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[93,94]},{"type":"text","content":"漏斗图","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[95]},{"type":"text","content":"funnel","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[97]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[99,100]},{"type":"text","content":"仪表盘","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[101]},{"type":"text","content":"gauge","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[103]},{"type":"tag","name":"li","attrs":{"ui-on:click":"openExamples","tag":"gauge-barometer"},"childNodes":[104,105]},{"type":"tag","name":"div","attrs":{"class":"gauge-barometer"},"childNodes":[]},{"type":"tag","name":"h6","attrs":{},"childNodes":[106]},{"type":"text","content":"气压表","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[108,109]},{"type":"text","content":"数据区域缩放","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[110]},{"type":"text","content":"dataZoom","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[112]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[114,115]},{"type":"text","content":"自定义系列","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[116]},{"type":"text","content":"custom","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[118]},{"type":"tag","name":"li","attrs":{},"childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[120,121]},{"type":"text","content":"三维图形","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[122]},{"type":"text","content":"WebGL","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[124]},{"type":"tag","name":"li","attrs":{},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/echarts/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['218']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"echarts\"]>div.content{\n\ndisplay: flex;\n\nheight: calc(100% - 50px);\n\n}\n\n [page-view=\"echarts\"]>div.content>div{\n\noverflow: auto;\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu{\n\nflex-grow: 1;\n\npadding: 30px 0;\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>h4{\n\nmargin: 5px 10px;\n\npadding-bottom: 10px;\n\nfont-weight: normal;\n\ncolor: rgb(70, 70, 70);\n\nfont-size: 14px;\n\nborder-bottom: 1px solid rgb(225, 229, 242);\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>h4>span{\n\nfont-size: 13px;\n\npadding-left: 5px;\n\ncolor: rgb(148, 156, 177);\n\nfont-weight: 200;\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>ul{\n\npadding-left: 10px;\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>ul>li{\n\nmargin-bottom: 10px;\n\npadding: 0 5px;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>ul>li>div{\n\nwidth: calc(50vw - 20px);\n\nheight: 133px;\n\nbackground-position: center center;\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\ncursor: pointer;\n\ntransition: 0.3s ease-in-out;\n\nborder-radius: 5px;\n\nbox-shadow: 0 0 20px rgb(0 0 0 / 5%);\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>ul>li>div.line-multiple-x-axis{\n\nbackground-image: url(\"./echarts/examples/line-multiple-x-axis.webp\");\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>ul>li>div.gauge-barometer{\n\nbackground-image: url(\"./echarts/examples/gauge-barometer.webp\");\n\n}\n\n [page-view=\"echarts\"]>div.content>div.menu>ul>li>h6{\n\ntext-align: center;\n\nline-height: 40px;\n\nfont-size: 14px;\n\nfont-weight: 200;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/echarts/dialogs/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['219']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='echarts-example']{\n\nleft: 20px;\n\ntop: 20px;\n\nuser-select: none;\n\nwidth: calc(100vw - 40px);\n\nheight: calc(100% - 40px);\n\nbackground-color: white;\n\n}\n\n [dialog-view='echarts-example']>header>h2{\n\nfont-size: 20px;\n\nfont-weight: 200;\n\ntext-align: center;\n\nline-height: 45px;\n\n}\n\n [dialog-view='echarts-example']>header>button{\n\nbackground-image: url(./close.png);\n\nposition: absolute;\n\ntop: 0;\n\nright: 0;\n\nwidth: 45px;\n\nheight: 45px;\n\noutline: none;\n\nborder: none;\n\nbackground-color: transparent;\n\nfont-size: 0;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\n}\n\n [dialog-view='echarts-example']>div.content{\n\nheight: calc(100% - 45px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/echarts/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['220']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 多X轴折线图
    "line-multiple-x-axis": function () {
        return window.__pkg__getLazyBundle('./dist/bundle51.js','221')
    },

    // 气压表
    "gauge-barometer": function () {
        return window.__pkg__getLazyBundle('./dist/bundle52.js','222')
    }

};

    return __pkg__scope_bundle__;
}
