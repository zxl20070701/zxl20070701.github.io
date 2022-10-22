
/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['32']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('105');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('106');


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template,
        data: {
            nav: obj.ref('folder')
        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "代码编辑器";
            document.getElementById('icon-logo').setAttribute('href', './code-editor.png');
        },
        methods: {

            // 切换功能
            changeNav: function (event) {
                this.nav = event.target.getAttribute('tag');
            },

            // 打开文件夹
            openFolder: function () {

            },

            // 打开文件
            openFile: function () {

            }

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['105']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,33,44]},{"type":"tag","name":"header","attrs":{},"childNodes":[2]},{"type":"tag","name":"ul","attrs":{},"childNodes":[3]},{"type":"tag","name":"li","attrs":{},"childNodes":[4,5]},{"type":"text","content":"文件","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[6,10,11,15,19,28,29]},{"type":"tag","name":"li","attrs":{},"childNodes":[7,8]},{"type":"text","content":"新建文件","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[9]},{"type":"text","content":"Ctrl+N","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-on:click":"openFile"},"childNodes":[12,13]},{"type":"text","content":"打开文件","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[14]},{"type":"text","content":"Ctrl+O","childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-on:click":"openFolder"},"childNodes":[16,17]},{"type":"text","content":"打开文件夹","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[18]},{"type":"text","content":"Ctrl+Shift+O","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[20,21,22]},{"type":"text","content":"最近打开","childNodes":[]},{"type":"tag","name":"em","attrs":{"class":"more"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[23,25,26]},{"type":"tag","name":"li","attrs":{},"childNodes":[24]},{"type":"text","content":"无文件夹","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[27]},{"type":"text","content":"无文件","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[30,31]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[32]},{"type":"text","content":"Ctrl+S","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[34,39,43]},{"type":"tag","name":"div","attrs":{"class":"nav"},"childNodes":[35,36,37,38]},{"type":"tag","name":"span","attrs":{"tag":"folder","ui-on:click":"changeNav","ui-bind:active":"nav=='folder'?'yes':'no'","title":"浏览打开的文件"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"search","ui-on:click":"changeNav","ui-bind:active":"nav=='search'?'yes':'no'","title":"查找文件"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"plug","ui-on:click":"changeNav","ui-bind:active":"nav=='plug'?'yes':'no'","title":"安装插件"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"set","ui-on:click":"changeNav","ui-bind:active":"nav=='set'?'yes':'no'","title":"配置系统"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"platform"},"childNodes":[40,41,42]},{"type":"tag","name":"div","attrs":{"class":"folder","ui-bind:active":"nav=='folder'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"search","ui-bind:active":"nav=='search'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"plug","ui-bind:active":"nav=='plug'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"view"},"childNodes":[]},{"type":"tag","name":"footer","attrs":{},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['106']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 40px);\n\nmargin-left: 80px;\n\nmargin-top: 20px;\n\noutline: 1px solid #e9e9e9;\n\nborder-radius: 5px;\n\n}\n\n [page-view]>header{\n\nheight: 30px;\n\nline-height: 30px;\n\nbackground-color: #e6e2ec;\n\nbackground-image: url('./code-editor.png');\n\nbackground-size: auto 90%;\n\npadding-left: 40px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 10px center;\n\n}\n\n [page-view]>header>ul>li{\n\ndisplay: inline-block;\n\nvertical-align: top;\n\nposition: relative;\n\npadding: 0 10px;\n\nfont-size: 12px;\n\ncursor: pointer;\n\n}\n\n [page-view]>header>ul>li:hover{\n\nbackground-color: rgb(186, 190, 194);\n\n}\n\n [page-view]>header>ul>li:hover>ul{\n\ndisplay: block;\n\n}\n\n [page-view]>header>ul>li:hover>ul>li:hover>ul{\n\ndisplay: block;\n\n}\n\n [page-view]>header>ul>li ul{\n\nbackground-color: rgb(237, 239, 241);\n\nborder: 1px solid rgb(230, 216, 216);\n\nwidth: 260px;\n\nbox-shadow: 0px 1px 3px #c5c5c7;\n\ndisplay: none;\n\n}\n\n [page-view]>header>ul>li ul li{\n\nline-height: 26px;\n\nmargin-top: 5px;\n\npadding: 0 20px;\n\nposition: relative;\n\n}\n\n [page-view]>header>ul>li ul li>em{\n\nposition: absolute;\n\nright: 20px;\n\nfont-style: normal;\n\n}\n\n [page-view]>header>ul>li ul li>em.more{\n\nwidth: 20px;\n\nheight: 100%;\n\nbackground-image: url(./toRight.png);\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\n}\n\n [page-view]>header>ul>li ul li:last-child{\n\nmargin-bottom: 5px;\n\n}\n\n [page-view]>header>ul>li ul li:hover:not(.line){\n\nbackground-color: rgb(205, 218, 186);\n\n}\n\n [page-view]>header>ul>li ul li.line{\n\nheight: 1px;\n\nwidth: 240px;\n\nmargin-left: 10px;\n\nbackground-color: #c5c5c7;\n\n}\n\n [page-view]>header>ul>li>ul{\n\nposition: absolute;\n\nleft: -1px;\n\nz-index: 1;\n\n}\n\n [page-view]>header>ul>li>ul>li>ul{\n\nposition: absolute;\n\ntop: 0;\n\nleft: 258px;\n\n}\n\n [page-view]>div.content{\n\nheight: calc(100% - 60px);\n\nwhite-space: nowrap;\n\n}\n\n [page-view]>div.content>div{\n\nheight: 100%;\n\nvertical-align: top;\n\nwhite-space: normal;\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.nav{\n\nbackground-color: #ededf5;\n\nwidth: 50px;\n\npadding-top: 20px;\n\nposition: relative;\n\n}\n\n [page-view]>div.content>div.nav>span{\n\ndisplay: inline-block;\n\nheight: 50px;\n\nwidth: 100%;\n\nbackground-image: url('./editor@switch.png');\n\ncursor: pointer;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='folder']{\n\nbackground-position-y: 0px;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='search']{\n\nbackground-position-y: -63px;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='plug']{\n\nbackground-position-y: -134px;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='set']{\n\nbackground-position-y: -196px;\n\nposition: absolute;\n\nleft: 0;\n\nbottom: 0;\n\n}\n\n [page-view]>div.content>div.nav>span[active='yes']{\n\nborder-left: 2px solid #9d91af;\n\nbackground-color: #cecbd238;\n\nbackground-image: url('./editor@switch_hover.png');\n\n}\n\n [page-view]>div.content>div.nav>span:hover{\n\nbackground-image: url('./editor@switch_hover.png');\n\n}\n\n [page-view]>div.content>div.platform{\n\nbackground-color: #f2f2f2;\n\nwidth: 240px;\n\n}\n\n [page-view]>div.content>div.platform>div{\n\ndisplay: none;\n\n}\n\n [page-view]>div.content>div.platform>div[active='yes']{\n\ndisplay: block;\n\n}\n\n [page-view]>div.content>div.view{\n\nbackground-color: #f5f5f5;\n\nwidth: calc(100% - 290px);\n\n}\n\n [page-view]>footer{\n\nheight: 30px;\n\nbackground-color: #9c86bd;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
