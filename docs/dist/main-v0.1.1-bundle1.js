
/*************************** [bundle] ****************************/
// Original file:./src/pages/home/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['21']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('35');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('36');


__pkg__scope_bundle__.default= function (obj) {
    return {

        // 模板
        render: template,

        // 数据
        data: {

        },

        // 挂载前
        beforeMount: function () {

        },

        // 挂载后
        mounted: function () {

        },

        // 数据改变前
        beforeUpdate: function () {

        },

        // 数据改变后
        updated: function () {

        },

        // 方法
        methods: {
            goto(event, target) {
                var el = document.createElement('a');
                el.setAttribute('target', '_blank');
                el.setAttribute('href', "#/" + target.getAttribute('tag'));
                el.click();
            }
        }

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/home/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['35']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,4,6,12,14,30,32,38,40,51,53]},{"type":"tag","name":"header","attrs":{},"childNodes":[2]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"清单&列表","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[5]},{"type":"text","content":"代码可视化","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[7]},{"type":"tag","name":"li","attrs":{"tag":"regexper-visualization","ui-on:click":"goto"},"childNodes":[8,10]},{"type":"tag","name":"h4","attrs":{},"childNodes":[9]},{"type":"text","content":"正则表达式可视化","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[11]},{"type":"text","content":"输入一个正则表达式后可以把其变成可视化的图表来快速读懂意义","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[13]},{"type":"text","content":"剪辑工具","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[15,20,25]},{"type":"tag","name":"li","attrs":{"tag":"audio-editor","ui-on:click":"goto"},"childNodes":[16,18]},{"type":"tag","name":"h4","attrs":{},"childNodes":[17]},{"type":"text","content":"音频编辑器","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[19]},{"type":"text","content":"可以对音频文件进行切割、合并等操作，支持多种格式","childNodes":[]},{"type":"tag","name":"li","attrs":{"tag":"image-editor","ui-on:click":"goto","class":"dev"},"childNodes":[21,23]},{"type":"tag","name":"h4","attrs":{},"childNodes":[22]},{"type":"text","content":"图片编辑器","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[24]},{"type":"text","content":"可以对图片进行编辑，包括合并、修改大小、美化等","childNodes":[]},{"type":"tag","name":"li","attrs":{"tag":"model-editor","ui-on:click":"goto","class":"dev"},"childNodes":[26,28]},{"type":"tag","name":"h4","attrs":{},"childNodes":[27]},{"type":"text","content":"3D模型编辑器","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[29]},{"type":"text","content":"可以编辑3D模型，支持格式包括：stl、obj、fbx、mtl、ply、gltf、mod等","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[31]},{"type":"text","content":"经典小游戏","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[33]},{"type":"tag","name":"li","attrs":{"tag":"snake-eating","ui-on:click":"goto","class":"dev"},"childNodes":[34,36]},{"type":"tag","name":"h4","attrs":{},"childNodes":[35]},{"type":"text","content":"贪吃蛇","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[37]},{"type":"text","content":"控制前进的小蛇，注意不要出界或撞到自己，看看你可以吃多少食物","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[39]},{"type":"text","content":"代码转义","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[41,46]},{"type":"tag","name":"li","attrs":{"tag":"format-json","ui-on:click":"goto"},"childNodes":[42,44]},{"type":"tag","name":"h4","attrs":{},"childNodes":[43]},{"type":"text","content":"格式化JSON字符串","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[45]},{"type":"text","content":"可以对一个JSON字符串进行格式化，支持非严格模式","childNodes":[]},{"type":"tag","name":"li","attrs":{"tag":"scss","ui-on:click":"goto"},"childNodes":[47,49]},{"type":"tag","name":"h4","attrs":{},"childNodes":[48]},{"type":"text","content":"scss转css","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[50]},{"type":"text","content":"可以把scss变成css，目前只支持注释和嵌套语法","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[52]},{"type":"text","content":"播放器","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[54]},{"type":"tag","name":"li","attrs":{"tag":"video-play","ui-on:click":"goto","class":"dev"},"childNodes":[55,57]},{"type":"tag","name":"h4","attrs":{},"childNodes":[56]},{"type":"text","content":"视频播放器","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[58]},{"type":"text","content":"支持各种格式，非常简单方便的操作界面。","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/home/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['36']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nwidth: 750px;\n\nbackground-color: white;\n\nmin-height: 100vh;\n\nmargin: 0 auto;\n\nbox-shadow: 0 0 7px 0px #9e9e9e;\n\npadding-bottom: 50px;\n\n}\n\n [page-view]>header{\n\nposition: relative;\n\nline-height: 50px;\n\nbackground-color: #000000;\n\n}\n\n [page-view]>header>h2{\n\ncolor: white;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(./logo.png);\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\n}\n\n [page-view]>h3{\n\nmargin: 40px 0 0 60px;\n\nborder-left: 3px solid red;\n\npadding: 5px 10px;\n\n}\n\n [page-view]>ul{\n\nfont-size: 0;\n\nmargin-left: 45px;\n\n}\n\n [page-view]>ul>li{\n\ndisplay: inline-block;\n\nwidth: 300px;\n\nheight: 70px;\n\nbackground-color: #dcdcdc;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 50px;\n\nbackground-position: 10px center;\n\npadding: 10px;\n\npadding-left: 70px;\n\nmargin: 20px 0 0 20px;\n\ncursor: pointer;\n\nvertical-align: top;\n\nposition: relative;\n\n}\n\n [page-view]>ul>li::after{\n\nposition: absolute;\n\nright: -9px;\n\ntop: 5px;\n\nfont-size: 12px;\n\ncolor: white;\n\npadding: 2px 5px;\n\nborder-radius: 5px;\n\n}\n\n/* // 标记开发中 */\n\n/* // 如果一个产品未开发完毕 */\n\n/* // 可以用此进行说明 */\n\n [page-view]>ul>li.dev::after{\n\ncontent: \"开发中\";\n\nbackground-color: #8bc34a;\n\noutline: 1px dashed #8bc34a;\n\n}\n\n [page-view]>ul>li:hover{\n\ntext-decoration: underline;\n\n}\n\n [page-view]>ul>li>h4{\n\nfont-size: 14px;\n\n}\n\n [page-view]>ul>li>p{\n\nfont-size: 12px;\n\nline-height: 1.2em;\n\nmargin-top: 5px;\n\n}\n\n [page-view]>ul>li[tag=\"regexper-visualization\"]{\n\nbackground-image: url('./regexper-visualization.png');\n\n}\n\n [page-view]>ul>li[tag=\"audio-editor\"]{\n\nbackground-image: url('./audio-editor.png');\n\n}\n\n [page-view]>ul>li[tag=\"format-json\"]{\n\nbackground-image: url('./format-json.png');\n\n}\n\n [page-view]>ul>li[tag=\"image-editor\"]{\n\nbackground-image: url('./image-editor.png');\n\n}\n\n [page-view]>ul>li[tag=\"model-editor\"]{\n\nbackground-image: url('./model-editor.png');\n\n}\n\n [page-view]>ul>li[tag=\"video-play\"]{\n\nbackground-image: url('./video-play.png');\n\n}\n\n [page-view]>ul>li[tag=\"snake-eating\"]{\n\nbackground-image: url('./snake-eating.png');\n\n}\n\n [page-view]>ul>li[tag=\"scss\"]{\n\nbackground-image: url('./scss.png');\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
