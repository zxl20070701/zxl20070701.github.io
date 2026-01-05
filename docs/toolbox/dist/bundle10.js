
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/what/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['42']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('88');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('89');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "what",
        render: template,
        data: {
            project: window._project_,
            systemBtn: window.systeNameEn == "pc" ? "切换成手机模式" : "切换成电脑模式"
        },
        methods: {
            changeSystem: function () {
                localStorage.setItem("systeNameEn", window.systeNameEn == "pc" ? "mobile" : "pc");
                window.location.reload();
            },
            resetSystem: function () {
                localStorage.removeItem("systeNameEn");
                window.location.reload();
            }
        }
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/what/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['88']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"div","attrs":{"ui-dragdrop":""},"childNodes":[2,3,7,9,13,15,26]},{"type":"tag","name":"div","attrs":{"class":"logo"},"childNodes":[]},{"type":"tag","name":"header","attrs":{},"childNodes":[4,5]},{"type":"tag","name":"span","attrs":{"ui-bind":"project.name"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[6]},{"type":"text","content":"(内部版本)","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tips"},"childNodes":[8]},{"type":"text","content":"使用电脑或手机浏览器访问会获得不一样的界面~","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"system-btn"},"childNodes":[10,11]},{"type":"tag","name":"button","attrs":{"ui-bind":"systemBtn","ui-on:click":"changeSystem"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"resetSystem"},"childNodes":[12]},{"type":"text","content":"重置","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"current-tips"},"childNodes":[14]},{"type":"text","content":"由于时间问题，部分功能处于完善中，敬请理解","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[16,20,24]},{"type":"tag","name":"div","attrs":{},"childNodes":[17,19]},{"type":"tag","name":"h2","attrs":{},"childNodes":[18]},{"type":"text","content":"介绍","childNodes":[]},{"type":"text","content":"：本项目内置自定义的小型打包工具和前端框架，完全基于原生HTML、CSS和JavaScript开发。","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[21,23]},{"type":"tag","name":"h2","attrs":{},"childNodes":[22]},{"type":"text","content":"初衷","childNodes":[]},{"type":"text","content":"：致力于尝试各种前端基础技术的探索和积累。","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[25]},{"type":"text","content":"欢迎任何人加入我们！","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btn-list"},"childNodes":[27,29]},{"type":"tag","name":"a","attrs":{"href":"javascript:void(0)","ui-on:click":"$closeDialog"},"childNodes":[28]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"project.repository","target":"_blank"},"childNodes":[30]},{"type":"text","content":"访问源码","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/what/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['89']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='what']{\n\nleft: calc(50vw - 130px);\n\ntop: calc(50vh - 200px);\n\nbackground-color: transparent;\n\nuser-select: none;\n\nborder-radius: 10px;\n\n}\n\n [dialog-view='what']>div{\n\nwidth: 260px;\n\nheight: 370px;\n\nbackground-color: #dbdde0;\n\nborder-radius: 10px;\n\ntext-align: center;\n\npadding-top: 20px;\n\n}\n\n [dialog-view='what']>div>header{\n\nfont-weight: 800;\n\npadding-top: 20px;\n\n}\n\n [dialog-view='what']>div>header>div{\n\nfont-size: 12px;\n\nline-height: 2em;\n\nfont-weight: 200;\n\n}\n\n [dialog-view='what']>div>div.tips{\n\nfont-size: 12px;\n\ncolor: #ffffff;\n\nbackground-color: #e91e63;\n\nposition: fixed;\n\nz-index: -1;\n\nuser-select: none;\n\nwidth: 90vw;\n\nline-height: 30px;\n\nheight: 30px;\n\nleft: 5vw;\n\ntop: 10px;\n\ntext-align: center;\n\n}\n\n [dialog-view='what']>div>div.system-btn{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 50px;\n\nwidth: 100vw;\n\ntext-align: center;\n\n}\n\n [dialog-view='what']>div>div.system-btn>button{\n\nborder-radius: 5px;\n\nfont-size: 12px;\n\nbackground-color: black;\n\ncolor: white;\n\noutline: none;\n\nborder: none;\n\npadding: 5px 10px;\n\nbox-shadow: 0 0 10px 3px white;\n\nmargin: 0 10px;\n\n}\n\n [dialog-view='what']>div>div.current-tips{\n\nposition: fixed;\n\nz-index: -1;\n\nwidth: 100vw;\n\nbottom: 10px;\n\nleft: 0;\n\nfont-size: 14px;\n\ncolor: white;\n\ntext-align: center;\n\nfont-family: cursive;\n\n}\n\n [dialog-view='what']>div>div.logo{\n\nbackground-image: url('./logo.png');\n\nbackground-size: 70% auto;\n\nbackground-position: center center;\n\nbackground-repeat: no-repeat;\n\nwidth: 60px;\n\nheight: 60px;\n\nmargin: auto;\n\nbackground-color: white;\n\nborder-radius: 10px;\n\n}\n\n [dialog-view='what']>div>div.content{\n\npadding: 0 30px;\n\nfont-size: 12px;\n\nline-height: 1.4em;\n\n}\n\n [dialog-view='what']>div>div.content>div{\n\nmargin-top: 20px;\n\ntext-align: left;\n\ntext-indent: 2em;\n\ncolor: rgb(56, 55, 55);\n\n}\n\n [dialog-view='what']>div>div.content>div>h2{\n\ndisplay: inline-block;\n\nfont-size: inherit;\n\ntext-indent: 0;\n\n}\n\n [dialog-view='what']>div>div.btn-list{\n\nposition: absolute;\n\nleft: 0;\n\nbottom: 15px;\n\nwidth: 100%;\n\n}\n\n [dialog-view='what']>div>div.btn-list>a{\n\ncolor: #363737;\n\nwidth: 110px;\n\nline-height: 30px;\n\nborder-radius: 5px;\n\ndisplay: inline-block;\n\nfont-size: 13px;\n\n}\n\n [dialog-view='what']>div>div.btn-list>a:first-child{\n\nbackground-color: #c1c3c6;\n\n}\n\n [dialog-view='what']>div>div.btn-list>a:last-child{\n\nmargin-left: 10px;\n\nbackground-color: #b5b7ba;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
