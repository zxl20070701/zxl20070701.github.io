
/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['33']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('126');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('127');


__pkg__scope_args__=window.__pkg__getBundle('128');
var getListByFileHandle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('87');
var getKeyCode =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('129');
var pushNavEditor =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('130');
var getTypeName =__pkg__scope_args__.default;


var currentInfo = null;
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
        mounted: function () {

            // 启动键盘监听
            var _this = this;
            getKeyCode(function (keyCode, event) {

                var handler = {
                    'ctrl+shift+o': _this.openFolder,
                    'ctrl+o': _this.openFile,
                    'ctrl+n': _this.newFile,
                    'ctrl+s': _this.saveFile
                }[keyCode];

                if (handler) {
                    event.preventDefault();
                    handler();
                }

            });

        },
        methods: {

            // 切换功能
            changeNav: function (event) {
                this.nav = event.target.getAttribute('tag');
            },

            // 打开文件夹
            openFolder: function () {
                window.showDirectoryPicker({
                    mode: "readwrite"
                }).then(function (handle) {

                    var el = document.getElementById('folder-root');
                    el.innerHTML = "";

                    var initMenu = function (el, handle) {
                        getListByFileHandle(handle).then(function (list) {
                            var ulEl = document.createElement('ul');
                            el.appendChild(ulEl);

                            for (var i = 0; i < list.length; i++) {
                                (function (list, i) {
                                    var liEl = document.createElement('li');
                                    ulEl.appendChild(liEl);

                                    var textEl = document.createElement('div');
                                    liEl.appendChild(textEl);

                                    textEl.innerText = list[i].name;
                                    textEl.setAttribute('is-directory', list[i].isDirectory);

                                    textEl.setAttribute('load', 'no'); // 目录是否加载或文件是否已经打开
                                    if (list[i].isDirectory == 'yes') {
                                        textEl.setAttribute('open', 'no'); // 目录是否打开
                                    } else {

                                        var typeName = getTypeName(list[i].name);
                                        if (typeName) textEl.setAttribute('type', typeName); //  文件类型

                                    }

                                    textEl.addEventListener('click', function () {

                                        // 如果是文件夹
                                        if (list[i].isDirectory == 'yes') {

                                            // 如果没有加载过
                                            if (textEl.getAttribute('load') == 'no') {

                                                textEl.setAttribute('load', 'yes');
                                                initMenu(liEl, list[i].handle);
                                            }

                                            // 展开闭合切换
                                            textEl.setAttribute('open', textEl.getAttribute('open') == 'yes' ? 'no' : 'yes');

                                        }

                                        // 如果是文件
                                        else {
                                            if (textEl.getAttribute('load') == 'yes') {
                                                textEl._navItem_.click();
                                            } else {
                                                list[i].handle.getFile().then(function (file) {
                                                    var reader = new FileReader();
                                                    reader.onload = function () {
                                                        pushNavEditor(textEl.innerText, textEl.getAttribute('type'), reader.result, function (_currentInfo) {
                                                            currentInfo = _currentInfo;
                                                        }, list[i].handle, textEl);
                                                    };
                                                    reader.readAsText(file);
                                                });
                                            }
                                        }

                                    });
                                })(list, i);
                            }

                        });
                    }

                    initMenu(el, handle);
                }).catch(function (error) {
                    console.debug(error);
                });
            },

            // 打开文件
            openFile: function () {

                window.showOpenFilePicker().then(function (handles) {
                    handles[0].getFile().then(function (file) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            pushNavEditor(handles[0].name, getTypeName(handles[0].name), reader.result, function (_currentInfo) {
                                currentInfo = _currentInfo;
                            }, handles[0]);
                        };
                        reader.readAsText(file);
                    });
                });
            },

            // 新建文件
            newFile: function () {
                window.showSaveFilePicker().then(function (handle) {
                    pushNavEditor(handle.name, getTypeName(handle.name), "", function (_currentInfo) {
                        currentInfo = _currentInfo;
                    }, handle);
                });
            },

            // 保存文件
            saveFile: function () {
                // 判断是否需要保存
                if (currentInfo && currentInfo.nav.getAttribute('modify') == 'yes') {
                    // 创建写入对象
                    currentInfo.handle.createWritable().then(function (writable) {
                        // 写入内容
                        writable.write(currentInfo.editor.valueOf()).then(function () {
                            // 关闭并确认写入
                            writable.close().then(function () {
                                // 修改记录，标记写入完毕
                                currentInfo.nav.setAttribute('modify', 'no');
                            });
                        });
                    });
                }
            }

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['126']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,33,98]},{"type":"tag","name":"header","attrs":{},"childNodes":[2]},{"type":"tag","name":"ul","attrs":{},"childNodes":[3]},{"type":"tag","name":"li","attrs":{},"childNodes":[4,5]},{"type":"text","content":"文件","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[6,10,11,15,19,28,29]},{"type":"tag","name":"li","attrs":{"ui-on:click":"newFile"},"childNodes":[7,8]},{"type":"text","content":"新建文件","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[9]},{"type":"text","content":"Ctrl+N","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-on:click":"openFile"},"childNodes":[12,13]},{"type":"text","content":"打开文件","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[14]},{"type":"text","content":"Ctrl+O","childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-on:click":"openFolder"},"childNodes":[16,17]},{"type":"text","content":"打开文件夹","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[18]},{"type":"text","content":"Ctrl+Shift+O","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[20,21,22]},{"type":"text","content":"最近打开","childNodes":[]},{"type":"tag","name":"em","attrs":{"class":"more"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[23,25,26]},{"type":"tag","name":"li","attrs":{},"childNodes":[24]},{"type":"text","content":"无文件夹","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[27]},{"type":"text","content":"无文件","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-on:click":"saveFile"},"childNodes":[30,31]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[32]},{"type":"text","content":"Ctrl+S","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[34,39,53]},{"type":"tag","name":"div","attrs":{"class":"nav"},"childNodes":[35,36,37,38]},{"type":"tag","name":"span","attrs":{"tag":"folder","ui-on:click":"changeNav","ui-bind:active":"nav=='folder'?'yes':'no'","title":"浏览打开的文件"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"search","ui-on:click":"changeNav","ui-bind:active":"nav=='search'?'yes':'no'","title":"查找文件"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"plug","ui-on:click":"changeNav","ui-bind:active":"nav=='plug'?'yes':'no'","title":"安装插件"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"tag":"set","title":"配置系统"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"platform"},"childNodes":[40,51,52]},{"type":"tag","name":"div","attrs":{"class":"folder","ui-bind:active":"nav=='folder'?'yes':'no'","id":"folder-root"},"childNodes":[41]},{"type":"tag","name":"p","attrs":{"class":"noFolder"},"childNodes":[42,44,45,50]},{"type":"tag","name":"p","attrs":{},"childNodes":[43]},{"type":"text","content":"还没有打开任何文件夹或项目。","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"button","value":"打开文件夹","ui-on:click":"openFolder"},"childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[46,47,49]},{"type":"text","content":"或者你可以创建一个文件进行编辑，更多细节请进入我们的","childNodes":[]},{"type":"tag","name":"a","attrs":{"href":"https://github.com/zxl20070701/toolbox/issues","target":"_blank"},"childNodes":[48]},{"type":"text","content":"issue","childNodes":[]},{"type":"text","content":"进行讨论交流，也欢迎你加入我们。","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"button","value":"创建一个文件","ui-on:click":"newFile"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"search","ui-bind:active":"nav=='search'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"plug","ui-bind:active":"nav=='plug'?'yes':'no'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"view"},"childNodes":[54,55]},{"type":"tag","name":"ul","attrs":{"class":"nav","id":"nav"},"childNodes":[]},{"type":"tag","name":"ul","attrs":{"class":"editor","id":"editor"},"childNodes":[56]},{"type":"tag","name":"li","attrs":{"class":"welcome"},"childNodes":[57]},{"type":"tag","name":"div","attrs":{},"childNodes":[58,59,68,77,89]},{"type":"tag","name":"p","attrs":{"class":"logo"},"childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"cmd"},"childNodes":[60,62]},{"type":"tag","name":"span","attrs":{},"childNodes":[61]},{"type":"text","content":"新建文件","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[63,65,66]},{"type":"tag","name":"em","attrs":{},"childNodes":[64]},{"type":"text","content":"Ctrl","childNodes":[]},{"type":"text","content":"+","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[67]},{"type":"text","content":"N","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"cmd"},"childNodes":[69,71]},{"type":"tag","name":"span","attrs":{},"childNodes":[70]},{"type":"text","content":"打开文件","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[72,74,75]},{"type":"tag","name":"em","attrs":{},"childNodes":[73]},{"type":"text","content":"Ctrl","childNodes":[]},{"type":"text","content":"+","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[76]},{"type":"text","content":"O","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"cmd"},"childNodes":[78,80]},{"type":"tag","name":"span","attrs":{},"childNodes":[79]},{"type":"text","content":"打开文件夹","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[81,83,84,86,87]},{"type":"tag","name":"em","attrs":{},"childNodes":[82]},{"type":"text","content":"Ctrl","childNodes":[]},{"type":"text","content":"+","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[85]},{"type":"text","content":"Shift","childNodes":[]},{"type":"text","content":"+","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[88]},{"type":"text","content":"O","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"cmd"},"childNodes":[90,92]},{"type":"tag","name":"span","attrs":{},"childNodes":[91]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[93,95,96]},{"type":"tag","name":"em","attrs":{},"childNodes":[94]},{"type":"text","content":"Ctrl","childNodes":[]},{"type":"text","content":"+","childNodes":[]},{"type":"tag","name":"em","attrs":{},"childNodes":[97]},{"type":"text","content":"S","childNodes":[]},{"type":"tag","name":"footer","attrs":{},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['127']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 40px);\n\nmargin-left: 80px;\n\nmargin-top: 20px;\n\noutline: 1px solid #e9e9e9;\n\nborder-radius: 5px;\n\n}\n/* 滚动条 */\n [page-view] ::-webkit-scrollbar{\n\nwidth: 0px;\n\nheight: 0px;\n\n}\n\n [page-view]>header{\n\nheight: 30px;\n\nline-height: 30px;\n\nbackground-color: #e6e2ec;\n\nbackground-image: url('./code-editor.png');\n\nbackground-size: auto 90%;\n\npadding-left: 40px;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 10px center;\n\n}\n\n [page-view]>header>ul>li{\n\ndisplay: inline-block;\n\nvertical-align: top;\n\nposition: relative;\n\npadding: 0 10px;\n\nfont-size: 12px;\n\ncursor: pointer;\n\n}\n\n [page-view]>header>ul>li:hover{\n\nbackground-color: rgb(186, 190, 194);\n\n}\n\n [page-view]>header>ul>li:hover>ul{\n\ndisplay: block;\n\n}\n\n [page-view]>header>ul>li:hover>ul>li:hover>ul{\n\ndisplay: block;\n\n}\n\n [page-view]>header>ul>li ul{\n\nbackground-color: rgb(237, 239, 241);\n\nborder: 1px solid rgb(230, 216, 216);\n\nwidth: 260px;\n\nbox-shadow: 0px 1px 3px #c5c5c7;\n\ndisplay: none;\n\n}\n\n [page-view]>header>ul>li ul li{\n\nline-height: 26px;\n\nmargin-top: 5px;\n\npadding: 0 20px;\n\nposition: relative;\n\n}\n\n [page-view]>header>ul>li ul li>em{\n\nposition: absolute;\n\nright: 20px;\n\nfont-style: normal;\n\n}\n\n [page-view]>header>ul>li ul li>em.more{\n\nwidth: 20px;\n\nheight: 100%;\n\nbackground-image: url(./toRight.png);\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\n}\n\n [page-view]>header>ul>li ul li:last-child{\n\nmargin-bottom: 5px;\n\n}\n\n [page-view]>header>ul>li ul li:hover:not(.line){\n\nbackground-color: rgb(205, 218, 186);\n\n}\n\n [page-view]>header>ul>li ul li.line{\n\nheight: 1px;\n\nwidth: 240px;\n\nmargin-left: 10px;\n\nbackground-color: #c5c5c7;\n\n}\n\n [page-view]>header>ul>li>ul{\n\nposition: absolute;\n\nleft: -1px;\n\nz-index: 1;\n\n}\n\n [page-view]>header>ul>li>ul>li>ul{\n\nposition: absolute;\n\ntop: 0;\n\nleft: 258px;\n\n}\n\n [page-view]>div.content{\n\nheight: calc(100% - 60px);\n\nwhite-space: nowrap;\n\nfont-size: 12px;\n\n}\n\n [page-view]>div.content>div{\n\nheight: 100%;\n\nvertical-align: top;\n\nwhite-space: normal;\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.nav{\n\nbackground-color: #ededf5;\n\nwidth: 50px;\n\npadding-top: 20px;\n\nposition: relative;\n\n}\n\n [page-view]>div.content>div.nav>span{\n\ndisplay: inline-block;\n\nheight: 50px;\n\nwidth: 100%;\n\nbackground-image: url('./editor@switch.png');\n\ncursor: pointer;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='folder']{\n\nbackground-position-y: 0px;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='search']{\n\nbackground-position-y: -63px;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='plug']{\n\nbackground-position-y: -134px;\n\n}\n\n [page-view]>div.content>div.nav>span[tag='set']{\n\nbackground-position-y: -196px;\n\nposition: absolute;\n\nleft: 0;\n\nbottom: 0;\n\n}\n\n [page-view]>div.content>div.nav>span[active='yes']{\n\nborder-left: 2px solid #9d91af;\n\nbackground-color: #cecbd238;\n\nbackground-image: url('./editor@switch_hover.png');\n\n}\n\n [page-view]>div.content>div.nav>span:hover{\n\nbackground-image: url('./editor@switch_hover.png');\n\n}\n\n [page-view]>div.content>div.platform{\n\nbackground-color: #f2f2f2;\n\nwidth: 240px;\n\noverflow: auto;\n\n}\n\n [page-view]>div.content>div.platform>div{\n\ndisplay: none;\n\n}\n\n [page-view]>div.content>div.platform>div[active='yes']{\n\ndisplay: block;\n\n}\n\n/* // 无文件时\r */\n\n [page-view]>div.content>div.platform>div.folder .noFolder{\n\npadding: 20px;\n\n}\n\n [page-view]>div.content>div.platform>div.folder .noFolder>p{\n\nline-height: 2em;\n\nmargin-top: 20px;\n\ncolor: #747179;\n\n}\n\n [page-view]>div.content>div.platform>div.folder .noFolder>p>a{\n\nfont-size: 14px;\n\nfont-family: cursive;\n\ntext-decoration: underline;\n\nmargin: 0 5px;\n\n}\n\n [page-view]>div.content>div.platform>div.folder .noFolder>input[type='button']{\n\nline-height: 26px;\n\nwidth: 100%;\n\nmargin-top: 10px;\n\ncolor: white;\n\nfont-size: 12px;\n\ncursor: pointer;\n\nborder: none;\n\noutline: none;\n\nbackground-color: #816e9e;\n\n}\n\n [page-view]>div.content>div.platform>div.folder .noFolder>input[type='button']:hover{\n\nbackground-color: #705697;\n\n}\n\n/* // 菜单目录\r */\n\n [page-view]>div.content>div.platform>div.folder>ul ul{\n\nmargin-left: 1em;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div{\n\nbackground-image: url('./editor@icon.png');\n\nbackground-repeat: no-repeat;\n\npadding-left: 25px;\n\nline-height: 2em;\n\ncolor: #828181;\n\ncursor: pointer;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[is-directory='no']{\n\nbackground-position-y: 5px;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[is-directory='yes'][open='yes']{\n\nbackground-position-y: -80px;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[is-directory='yes'][open='no']{\n\nbackground-position-y: -40px;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[is-directory='yes'][open='no']+ul{\n\ndisplay: none;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type]{\n\nbackground-position: 4px center;\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='html']{\n\nbackground-image: url('./file-icons/HTML.png');\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='css']{\n\nbackground-image: url('./file-icons/CSS.png');\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='js']{\n\nbackground-image: url('./file-icons/JavaScript.png');\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='json']{\n\nbackground-image: url('./file-icons/JSON.png');\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='sass']{\n\nbackground-image: url('./file-icons/SASS.png');\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='scss']{\n\nbackground-image: url('./file-icons/SASS.png');\n\n}\n\n [page-view]>div.content>div.platform>div.folder ul div[type='image']{\n\nbackground-image: url('./file-icons/Image.png');\n\n}\n\n [page-view]>div.content>div.view{\n\nbackground-color: #f5f5f5;\n\nwidth: calc(100% - 290px);\n\n}\n\n [page-view]>div.content>div.view>ul.nav{\n\nline-height: 34px;\n\nheight: 34px;\n\nbackground-color: #f0f0f1;\n\nwidth: calc(100% + 5px);\n\nmargin-left: -5px;\n\noverflow-x: auto;\n\noverflow-y: hidden;\n\nwhite-space: nowrap;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li{\n\ndisplay: inline-block;\n\npadding: 0 30px;\n\nposition: relative;\n\ncursor: pointer;\n\nbackground-color: #e6e6e6;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li:not(:first-child){\n\nborder-left: 1px solid #f5f5f5;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li>em, [page-view]>div.content>div.view>ul.nav>li>span{\n\nfont-style: normal;\n\nposition: absolute;\n\ndisplay: none;\n\nwidth: 30px;\n\nright: 0;\n\ntext-align: center;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li>span{\n\nfont-size: 12px;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li:hover>em{\n\ndisplay: inline-block;\n\n}\n\n/* // 当前活动\r */\n\n [page-view]>div.content>div.view>ul.nav>li[active='yes']{\n\nbackground-color: #f5f5f5;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li[active='yes']>em{\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li[active='yes']>span{\n\ndisplay: none;\n\n}\n\n/* // 有改动未保存\r */\n\n [page-view]>div.content>div.view>ul.nav>li[modify='yes']>em{\n\ndisplay: none;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li[modify='yes']>span{\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li[modify='yes']:hover>em{\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.view>ul.nav>li[modify='yes']:hover>span{\n\ndisplay: none;\n\n}\n\n [page-view]>div.content>div.view>ul.editor{\n\nposition: relative;\n\nheight: calc(100% - 34px);\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li{\n\nleft: 0;\n\ntop: 0;\n\noverflow: auto;\n\nposition: absolute;\n\nwidth: 100%;\n\nheight: calc(100vh - 134px);\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome{\n\ndisplay: none;\n\nbackground: #f5f5f5;\n\ntop: -34px;\n\nheight: calc(100vh - 100px);\n\nline-height: calc(100vh - 100px);\n\ntext-align: center;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome:first-child:last-child{\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div{\n\nline-height: 1em;\n\nvertical-align: middle;\n\ndisplay: inline-block;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div>p.logo{\n\nheight: 300px;\n\nbackground-image: url('./code-editor@welcome.png');\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nbackground-size: auto 90%;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div>p.cmd{\n\nwhite-space: nowrap;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div>p.cmd>span{\n\ndisplay: inline-block;\n\nwidth: 200px;\n\nfont-size: 14px;\n\nline-height: 2em;\n\ncolor: rgb(128, 123, 123);\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div>p.cmd>span:first-child{\n\ntext-align: right;\n\npadding-right: 10px;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div>p.cmd>span:last-child{\n\ntext-align: left;\n\npadding-left: 10px;\n\n}\n\n [page-view]>div.content>div.view>ul.editor>li.welcome>div>p.cmd>span:last-child>em{\n\nfont-style: normal;\n\nbackground-color: #eae7e7;\n\ncolor: #2d2b2b;\n\npadding: 0 5px;\n\nfont-size: 12px;\n\nmargin: 0 10px;\n\n}\n\n [page-view]>footer{\n\nheight: 30px;\n\nbackground-color: #9c86bd;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/getListByFileHandle
/*****************************************************************/
window.__pkg__bundleSrc__['128']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (handle) {

    var folderLst = [], fileLst = [];
    return new Promise(function (resolve, reject) {
        var asyncIterable = handle.entries();

        // 或者使用： for await (const entry of handle.entries()) { }
        (function doNext() {
            asyncIterable.next().then(function (data) {
                if (!data.done) {

                    // 文件夹
                    if (data.value[1].kind == 'directory') {
                        folderLst.push({
                            name: data.value[0],
                            isDirectory: "yes",
                            handle: data.value[1]
                        });
                    }

                    // 文件
                    else {
                        fileLst.push({
                            name: data.value[0],
                            isDirectory: "no",
                            handle: data.value[1]
                        });
                    }


                    doNext();
                } else {
                    var list = folderLst;
                    for (var index = 0; index < fileLst.length; index++) {
                        list.push(fileLst[index]);
                    }
                    resolve(list);
                }
            });
        })();

    });
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['87']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 字典表
var dictionary = {

    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",

    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],

    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",

    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    224: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear",
    19: "pause",

    // 功能键
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",

    // 余下键
    189: ["-", "_"],
    187: ["=", "+"],
    219: ["[", "{"],
    221: ["]", "}"],
    220: ["\\", "|"],
    186: [";", ":"],
    222: ["'", '"'],
    188: [",", "<"],
    190: [".", ">"],
    191: ["/", "?"],
    192: ["`", "~"]

};

// 非独立键字典
var help_key = ["shift", "ctrl", "alt"];

// 返回键盘此时按下的键的组合结果
var keyCode = function (event) {
    event = event || window.event;

    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];

    var _key = key[0];

    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";

    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
        key[0] = key[1] = "";
    }

    // 判断是否按下了caps lock
    var lockPress = event.code == "Key" + event.key && !shift;

    // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写
    resultKey = (preKey + ((preKey == '' && lockPress) ? key[1] : key[0]));

    if (key[0] == "") {
        resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey == '' ? _key : resultKey;
};

__pkg__scope_bundle__.getKeyString = keyCode;

/**
 * 获取键盘此时按下的键的组合结果
 * @param {Function} callback 回调，键盘有键被按下的时候触发
 * @return {Function} 返回一个函数，执行此函数可以取消键盘监听
 * @examples
 *  keyCode(function (data) {
 *      console.log(data);
 *  });
 */
__pkg__scope_bundle__.default= function (callback) {

    // 记录MacOS的command是否被按下
    var macCommand = false;

    var doKeydown = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = true;

        if (macCommand && !/command/.test(keyStringCode) && !/ctrl/.test(keyStringCode)) keyStringCode = "ctrl+" + keyStringCode;
        callback(keyStringCode.replace(/command/g, 'ctrl').replace('ctrl+ctrl', 'ctrl'), event);
    };

    var doKeyup = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = false;
    };

    // 在body上注册
    document.body.addEventListener('keydown', doKeydown, false);
    document.body.addEventListener('keyup', doKeyup, false);

    // 返回取消监听函数
    return function () {
        document.body.removeEventListener('keydown', doKeydown, false);
        document.body.removeEventListener('keyup', doKeyup, false);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/pushNavEditor
/*****************************************************************/
window.__pkg__bundleSrc__['129']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('81');
var editorRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('44');
var xhtml =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (fileName, fileType, fileContent, setCurrentInfo, handle, menuEl) {

    if (menuEl) menuEl.setAttribute('load', 'yes');

    var navRootEl = document.getElementById('nav');
    var editorRootEl = document.getElementById('editor');

    //  导航
    var navItem = document.createElement('li');
    navRootEl.appendChild(navItem);

    navItem.innerText = fileName;

    var navItem_close = document.createElement('em');
    navItem.appendChild(navItem_close);

    navItem_close.innerText = 'X';

    var navItem_unsave = document.createElement('span');
    navItem.appendChild(navItem_unsave);

    navItem_unsave.innerText = '●';

    // 编辑界面
    var editorItem = document.createElement('li');
    editorRootEl.appendChild(editorItem);


    var options = {
        el: editorItem,
        content: fileContent
    };

    if (['html', 'svg', 'xml'].indexOf(fileType) > -1) {
        options.shader = ['html']
    } else if (['css', 'scss', 'sass'].indexOf(fileType) > -1) {
        options.shader = ['css']
    } else if (['js', 'json'].indexOf(fileType) > -1) {
        options.shader = ['javascript']
    }

    var editor = new editorRender(options);

    // 编辑器管理的文本发生改变后会主动触发
    editor.updated(function () {
        navItem.setAttribute('modify', 'yes');
    });

    // 关闭
    navItem_close.addEventListener('click', function (event) {
        event.stopPropagation();

        if (navItem.getAttribute('modify') == 'yes') {
            if (!window.confirm('有修改内容未保存，是否确认关闭？')) return;
        }

        // 如果当前是活动窗口
        if (navItem.getAttribute('active') == 'yes') {

            // 如果存在前兄弟
            if (navItem.previousElementSibling) {
                navItem.previousElementSibling.click();
            }

            // 如果存在后兄弟
            else if (navItem.nextElementSibling) {
                navItem.nextElementSibling.click();
            }

            // 否则就需要重置一个参数
            else {
                setCurrentInfo(null);
            }
        }

        // 关闭自己
        if (menuEl) menuEl.setAttribute('load', 'no');
        xhtml.remove(navItem);
        xhtml.remove(editorItem);
    });

    // 切换
    navItem.addEventListener('click', function () {
        var j;

        // 导航切换
        var navNodes = navRootEl.children;
        for (j = 0; j < navNodes.length; j++) {
            navNodes[j].setAttribute('active', 'no');
        }
        navItem.setAttribute('active', 'yes');

        // 内容切换
        var editorNodes = editorRootEl.children;
        for (j = 1; j < editorNodes.length; j++) {
            editorNodes[j].style.display = 'none';
        }
        editorItem.style.display = '';

        // 记录
        setCurrentInfo({
            nav: navItem,
            editor: editor,
            handle: handle
        });

    });
    navItem.click();

    // 菜单记录对应的导航
    if (menuEl) menuEl._navItem_ = navItem;

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/index
/*****************************************************************/
window.__pkg__bundleSrc__['81']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
__pkg__scope_args__=window.__pkg__getBundle('44');
var xhtml =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('82');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('23');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('45');
var isFunction =__pkg__scope_args__.default;


// 核心方法和工具方法

__pkg__scope_args__=window.__pkg__getBundle('83');
var textWidth=__pkg__scope_args__.textWidth;
var bestLeftNum=__pkg__scope_args__.bestLeftNum;
var calcCanvasXY=__pkg__scope_args__.calcCanvasXY;
var selectIsNotBlank=__pkg__scope_args__.selectIsNotBlank;
var toTemplate=__pkg__scope_args__.toTemplate;


__pkg__scope_args__=window.__pkg__getBundle('84');
var initDom=__pkg__scope_args__.initDom;
var initView=__pkg__scope_args__.initView;

__pkg__scope_args__=window.__pkg__getBundle('85');
var updateView=__pkg__scope_args__.updateView;
var updateSelectView=__pkg__scope_args__.updateSelectView;
var updateCursorPosition=__pkg__scope_args__.updateCursorPosition;
var updateCanvasSize=__pkg__scope_args__.updateCanvasSize;
var cancelSelect=__pkg__scope_args__.cancelSelect;
var deleteSelect=__pkg__scope_args__.deleteSelect;

__pkg__scope_args__=window.__pkg__getBundle('86');
var bindEvent =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('88');
var diff =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('89');
var filterText =__pkg__scope_args__.default;


// 内置着色器方法

__pkg__scope_args__=window.__pkg__getBundle('90');
var innerShader =__pkg__scope_args__.default;


var editor = function (options) {

    if (!(this instanceof editor)) {
        throw new Error('Editor is a constructor and should be called with the `new` keyword');
    }

    /**
     *
     * [格式化配置]
     *
     * 所有的配置校验和默认值设置等都应该在这里进行
     * 经过这里处理以后，后续不需要再进行校验了
     * 因此这里的内容的更改一定要慎重
     *
     */

    // 编辑器挂载点
    if (isElement(options.el)) {

        // 着色器
        var shader = () => {
            var resultData = [];
            this._contentArray.forEach(text => { resultData.push([{ content: text, color: this._colorText }]); });
            return resultData;
        };

        // 格式化
        var format = textString => textString;

        this._el = options.el;
        this._el.editor_terminal = 'none';

        // 公共配置
        options.color = options.color || {};
        this._colorBackground = options.color.background || "#f5f5f5"; /*编辑器背景*/
        this._colorText = options.color.text || "#000000"; /*普通文本颜色*/
        this._colorNumber = options.color.number || "#888484"; /*行号颜色*/
        this._colorEdit = options.color.edit || "#eaeaf1"; /*编辑行颜色*/
        this._colorCursor = options.color.cursor || "#ff0000"; /*光标颜色*/
        this._colorSelect = options.color.select || "#6c6cf1"; /*选择背景*/
        this._fontFamily = options["font-family"] || "新宋体"; /*字体*/
        this._fontWeight = options["font-weight"] || 600;/*字重*/
        this._tabSpace = options.tabSpace || 4;/*设置一个tab表示多少个空格*/
        this._readonly = options.readonly || false;/*是否只读*/
        this._noLineNumber = options.noLineNumber || false;/*是否隐藏行号*/

        // 文本
        this._contentArray = isString(options.content) ? (this.$$filterText(options.content) + "").replace(/\r/g, '').split("\n") : [""];

        // 着色方法
        this.$shader = isFunction(options.shader) ? options.shader : (Array.isArray(options.shader) ? innerShader.apply(null, options.shader) : shader);

        // 格式化方法
        this.$format = isFunction(options.format) ? options.format : format;

        // 辅助输入
        this.$input = isFunction(options.input) ? options.input : null;

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

    // 先初始化DOM
    this.$$initDom();

    // 初始化控制变量
    this.__needUpdate = true;
    this.__lineNum = this._contentArray.length - 1;
    this.__leftNum = this._contentArray[this.__lineNum].length;
    this.__cursor1 = this.__cursor2 = { leftNum: 0, lineNum: 0 };
    this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));

    // 初始化视图
    this.$$initView();

    // 更新视图
    this.$$updateView();

    // 绑定操作
    this.$$bindEvent();

    this.__updated__ = () => { };
    // 编辑器管理的文本发生改变后会主动触发callback方法
    this.updated = callback => {
        this.__updated__ = callback;
    };

    // 获取当前编辑器代码
    this.valueOf = (content) => {

        if (content || content == '') {

            // 先删除内容
            this._contentArray = null;

            // 输入以触发更新
            this.__focusDOM.value = content;
            xhtml.trigger(this.__focusDOM, 'input');
            this.__focusDOM.focus();

        }

        return this._contentArray.join('\n');
    };

    // 在当前光标位置输入新的内容
    this.input = (content = "", cursor = 0, number = 0) => {

        // 先删除多余的内容

        if (cursor != 0) {

            if (number != 0) {
                this._contentArray[this.__lineNum] =
                    this._contentArray[this.__lineNum].substring(0, this.__leftNum + cursor) +
                    this._contentArray[this.__lineNum].substring(this.__leftNum + cursor + number);
            }

            // 修改光标位置
            this.__leftNum += cursor;

        }

        // 输入以触发更新
        this.__focusDOM.value = content;
        xhtml.trigger(this.__focusDOM, 'input');
        this.__focusDOM.focus();

    };

    // 格式化代码
    this.format = () => {

        // 格式化内容
        this._contentArray = this.$format(this._contentArray.join('\n'), this._tabSpace).split('\n');

        this.__lineNum = this._contentArray.length - 1;
        this.__leftNum = this._contentArray[this.__lineNum].length;

        // 着色
        this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));

        // 更新视图
        this.$$updateView();

        // 更新光标位置
        this.$$initView();

    };

    // 复制当前编辑器代码到电脑剪切板
    this.copy = (callback, errorback) => {
        xhtml.copy(this.valueOf(), callback, errorback);
    };

};

// 挂载辅助方法
editor.prototype.$$textWidth = textWidth;
editor.prototype.$$bestLeftNum = bestLeftNum;
editor.prototype.$$calcCanvasXY = calcCanvasXY;
editor.prototype.$$selectIsNotBlank = selectIsNotBlank;
editor.prototype.$$filterText = filterText;
editor.prototype.$$toTemplate = toTemplate;

// 挂载核心方法

editor.prototype.$$initDom = initDom;
editor.prototype.$$initView = initView;

editor.prototype.$$updateView = updateView;
editor.prototype.$$updateSelectView = updateSelectView;
editor.prototype.$$updateCursorPosition = updateCursorPosition;
editor.prototype.$$updateCanvasSize = updateCanvasSize;
editor.prototype.$$cancelSelect = cancelSelect;
editor.prototype.$$deleteSelect = deleteSelect;

editor.prototype.$$bindEvent = bindEvent;

// 性能优化系列方法

editor.prototype.$$diff = diff;

__pkg__scope_bundle__.default= editor;


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/type/isElement
/*****************************************************************/
window.__pkg__bundleSrc__['82']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (dom) {
    return dom !== null && typeof dom === 'object' &&
        [1, 9, 11].indexOf(dom.nodeType) > -1
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/tool
/*****************************************************************/
window.__pkg__bundleSrc__['83']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 计算文字长度

__pkg__scope_bundle__.textWidth=function(text) {
    this.__helpCalcDOM.innerText = text;
    return this.__helpCalcDOM.offsetWidth;
};

// 计算最佳光标左边位置

__pkg__scope_bundle__.bestLeftNum=function(x, lineNum) {

    if (arguments.length < 2) lineNum = lineNum || this.__lineNum;

    var text = this._contentArray[lineNum];

    if (x <= 40) return 0;
    if (x - 40 >= this.$$textWidth(text)) return text.length;

    var dist = x - 40, i = 1;

    for (; i < text.length; i++) {

        var tempDist = Math.abs(x - 40 - this.$$textWidth(text.substr(0, i)));

        if (tempDist > dist) break;

        dist = tempDist;

    }

    return i - 1;
};

// 计算光标对应的x,y值

__pkg__scope_bundle__.calcCanvasXY=function(leftNum, lineNum) {

    return {
        x: this.$$textWidth(this._contentArray[lineNum].substr(0, leftNum)),
        y: lineNum * 21
    };

};

// 判断选区是否为空

__pkg__scope_bundle__.selectIsNotBlank=function() {
    return this.__cursor1.lineNum != this.__cursor2.lineNum || this.__cursor1.leftNum != this.__cursor2.leftNum;
};

// 根据内容生成模板

__pkg__scope_bundle__.toTemplate=function(line, index, noLineNumber) {
    var template = "";

    template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;'>";

    var lineStyle = noLineNumber ? "font-size:0;" : "";

    template += "<em style='" + lineStyle + "color:" + this._colorNumber + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";

    line.forEach(text => {

        var contentText = text.content;

        // 提前对特殊字符进行处理
        contentText = contentText.replace(/\&/g, "&amp;");/*[&]*/
        contentText = contentText.replace(/</g, "&lt;"); contentText = contentText.replace(/>/g, "&gt;");/*[<,>]*/

        template += "<span style='user-select: none;font-weight:" + this._fontWeight + ";white-space: pre;color:" + text.color + "'>" + contentText + "</span>";

    });

    return template + "</div>";
};

// 整理当前输入框信息

__pkg__scope_bundle__.getInputMessage=function(editor) {
    return {

        // 光标前面有多少个字符
        leftNum: editor.__leftNum,

        // 当前行之前有多少行
        lineNum: editor.__lineNum,

        // 光标left坐标
        x: editor.__cursorLeft,

        // 光标top坐标
        y: editor.__cursorTop,

        // 一行文本的高
        lineHeight: 21

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/init
/*****************************************************************/
window.__pkg__bundleSrc__['84']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('44');
var xhtml =__pkg__scope_args__.default;


// 初始化结点

__pkg__scope_bundle__.initDom=function() {

    this._el.innerHTML = "";

    xhtml.css(this._el, {
        "font-size": "12px",
        position: "relative",
        cursor: "text",
        "font-family": this._fontFamily,
        "background": this._colorBackground,
        overflow: "auto"
    });

    xhtml.bind(this._el, 'click', () => {

        // 由于有时候点击屏幕的时候，是滚动导致的，因此位置可能没有计算好前聚焦了，导致光标错位
        setTimeout(() => {
            this.__focusDOM.focus();
        });

    })

    // 辅助计算标签
    this.__helpCalcDOM = xhtml.appendTo(this._el, "<span></span>");

    xhtml.css(this.__helpCalcDOM, {
        position: "absolute",
        "z-index": "-1",
        "white-space": "pre",
        "top": 0,
        "left": 0,
        "color": "rgba(0,0,0,0)",
        "font-weight": this._fontWeight
    });

    // 辅助输入标签
    this.__helpInputDOM = xhtml.appendTo(this._el, "<div></div>");

    xhtml.css(this.__helpInputDOM, {
        position: "absolute",
        "z-index": 1
    });

    xhtml.bind(this.__helpInputDOM, 'click', event => {

        xhtml.stopPropagation(event);
        xhtml.preventDefault(event);

        this.__focusDOM.focus();

    });

    // 光标
    this.__focusDOM = xhtml.appendTo(this._el, "<textarea></textarea>");

    xhtml.css(this.__focusDOM, {
        position: "absolute",
        width: "6px",
        "margin-top": "3px",
        height: "15px",
        "line-height": "15px",
        resize: "none",
        overflow: "hidden",
        padding: "0",
        outline: "none",
        border: "none",
        background: "rgba(0,0,0,0)",
        color: this._colorCursor
    });

    xhtml.attr(this.__focusDOM, {
        wrap: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false"
    });

    if (this._readonly) {
        xhtml.attr(this.__focusDOM, {
            readonly: true
        });
    }

    // 显示区域
    this.__showDOM = xhtml.appendTo(this._el, "<div></div>");

    xhtml.css(this.__showDOM, {
        padding: "10px 0"
    });

    // 选中区域
    this.__selectCanvas = xhtml.appendTo(this._el, "<canvas></canvas>");

    xhtml.css(this.__selectCanvas, {
        position: "absolute",
        left: "40px",
        top: "10px",
        opacity: "0.5"
    });

    this.$$updateCanvasSize(1, 1);

};

// 初始化视图

__pkg__scope_bundle__.initView=function() {

    // 初始化定位光标位置
    xhtml.css(this.__focusDOM, {
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
        top: (10 + this.__lineNum * 21) + "px"
    });

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/update
/*****************************************************************/
window.__pkg__bundleSrc__['85']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('44');
var xhtml =__pkg__scope_args__.default;


// 更新编辑器内容视图

__pkg__scope_bundle__.updateView=function() {

    // 如果有重复利用的行(可复用的过少就不选择这种方法了)
    if (this.__diff && this.__diff.beginNum + this.__diff.endNum > 10) {

        var lineDoms = this.__showDOM.childNodes;
        var lineDoms_length = lineDoms.length;

        // 先删除无用的行

        /**
         * 这里的删除需要稍微注意一下
         * 因为结点删除以后就没有了，这会导致lineDoms的更新，这也是为什么备份数组长度的原因
         * 倒着删除同样是因为这个原因
         */

        for (var i = lineDoms_length - this.__diff.endNum - 1; i >= this.__diff.beginNum; i--) {
            xhtml.remove(lineDoms[i]);
        }

        // 追加不足的行
        if (this.__diff.beginNum > 0) {
            for (var i = this.__formatData.length - 1 - this.__diff.endNum; i >= this.__diff.beginNum; i--) {
                xhtml.after(lineDoms[this.__diff.beginNum - 1], this.$$toTemplate(this.__formatData[i], i, this._noLineNumber));
            }
        } else {

            // 如果开头没有结点保留，为了简单，我们直接采用prependTo方法追加
            for (var i = this.__formatData.length - this.__diff.endNum - 1; i >= 0; i--) {
                xhtml.prependTo(this.__showDOM, this.$$toTemplate(this.__formatData[i], i, this._noLineNumber));
            }

        }

        // 更新行号
        lineDoms = this.__showDOM.childNodes;
        for (var i = this.__diff.beginNum; i < this.__formatData.length; i++) {
            lineDoms[i].getElementsByTagName('em')[0].innerText = i + 1;
        }

    }

    // 有时候，可能直接替换更快
    else if (this.__diff != "not update") {
        var template = "";
        this.__formatData.forEach((line, index) => { template += this.$$toTemplate(line, index, this._noLineNumber); });
        this.__showDOM.innerHTML = template;
    }

    this.__diff = "not update";

    var tempLineDom = this.__showDOM.childNodes[this.__lineNum];
    // 修改当前编辑的行
    if (!this._readonly && this.__lineDom) {
        this.__lineDom.style.backgroundColor = "rgba(0, 0, 0, 0)";
        tempLineDom.style.backgroundColor = this._colorEdit;
    }
    this.__lineDom = tempLineDom;


};

// 更新编辑器选中视图

__pkg__scope_bundle__.updateSelectView=function() {

    var ctx = this.__selectCanvas.getContext('2d');
    ctx.fillStyle = this._colorSelect;
    ctx.clearRect(0, 0, this.__selectCanvas.scrollWidth, this.__selectCanvas.scrollHeight);

    // 绘制二个区间
    var drawerSelect = (beginLeftNum, endLeftNum, lineNum) => {

        var xy1 = this.$$calcCanvasXY(beginLeftNum, lineNum);
        var xy2 = this.$$calcCanvasXY(endLeftNum, lineNum);

        // 如何一行过少，前置一点点选中显示
        if (beginLeftNum == endLeftNum && beginLeftNum == 0) {
            ctx.fillRect(xy1.x, xy1.y, 5, 21);
        } else {
            ctx.fillRect(xy1.x, xy1.y, xy2.x - xy1.x, 21);
        }

    };

    // 如果选中区域为空，不用绘制
    if (this.__cursor1.lineNum == this.__cursor2.lineNum && this.__cursor1.leftNum == this.__cursor2.leftNum) return;

    ctx.beginPath();

    // 如果在一行
    if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

        drawerSelect(this.__cursor1.leftNum, this.__cursor2.leftNum, this.__cursor1.lineNum);

    }

    // 如果选中的多于一行
    else {

        var beginCursor, endCursor;

        if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
            beginCursor = this.__cursor1; endCursor = this.__cursor2;
        } else {
            beginCursor = this.__cursor2; endCursor = this.__cursor1;
        }

        // 绘制开始的结尾
        drawerSelect(beginCursor.leftNum, this._contentArray[beginCursor.lineNum].length, beginCursor.lineNum);

        // 绘制结束的开头
        drawerSelect(0, endCursor.leftNum, endCursor.lineNum);

        // 绘制两行之间
        for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
            drawerSelect(0, this._contentArray[lineNum].length, lineNum);
        }

    }

};

// 输入的时候更新光标位置

__pkg__scope_bundle__.updateCursorPosition=function() {

    this.__cursorTop = this.__lineNum * 21 + 10;
    this.__cursorLeft = 40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum));

    xhtml.css(this.__focusDOM, {
        top: this.__cursorTop + "px",
        left: this.__cursorLeft + "px",
    });

};

// 更新画布尺寸

__pkg__scope_bundle__.updateCanvasSize=function(width, height) {

    if (arguments.length < 2) {
        width = this._el.scrollWidth - 40;
        height = this._el.scrollHeight - 10;
    }

    xhtml.css(this.__selectCanvas, {
        width: width + "px",
        height: height + "px",
    });

    xhtml.attr(this.__selectCanvas, {
        width,
        height
    });

};

// 取消选区

__pkg__scope_bundle__.cancelSelect=function() {

    this.$$updateCanvasSize(1, 1);
    this.__cursor1 = { leftNum: 0, lineNum: 0 };
    this.__cursor2 = { leftNum: 0, lineNum: 0 };

};

// 删除选区

__pkg__scope_bundle__.deleteSelect=function() {

    // 假定cursor2是结束光标
    var beginCursor = this.__cursor2, endCursor = this.__cursor1;

    // 根据行号来校对
    if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
        beginCursor = this.__cursor1; endCursor = this.__cursor2;
    } else if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

        // 根据列号来校对
        if (this.__cursor1.leftNum < this.__cursor2.leftNum) {
            beginCursor = this.__cursor1; endCursor = this.__cursor2;
        }
    }

    var newLineText =
        this._contentArray[beginCursor.lineNum].substr(0, beginCursor.leftNum) +
        this._contentArray[endCursor.lineNum].substr(endCursor.leftNum)

    this._contentArray.splice(beginCursor.lineNum, endCursor.lineNum - beginCursor.lineNum + 1, newLineText);

    // 校对光标和选区
    this.__leftNum = this.__cursor1.leftNum = this.__cursor2.leftNum = beginCursor.leftNum;
    this.__lineNum = this.__cursor1.lineNum = this.__cursor2.lineNum = beginCursor.lineNum;

    this.$$cancelSelect();
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/bind
/*****************************************************************/
window.__pkg__bundleSrc__['86']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('87');
var getKeyString=__pkg__scope_args__.getKeyString;

__pkg__scope_args__=window.__pkg__getBundle('45');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('44');
var xhtml =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('83');
var getInputMessage=__pkg__scope_args__.getInputMessage;


// 绑定键盘和鼠标等交互事件处理

__pkg__scope_bundle__.default= function () {

    // 鼠标是否按下
    var mouseDown = false;

    // shift是否按下
    var shiftDown = false;

    // 辅助计算选择光标位置
    var calcCursor = (event) => {
        var position = xhtml.position(this._el, event);
        var topIndex = Math.round((position.y - 20.5) / 21);

        if (topIndex < 0) topIndex = 0;
        if (topIndex >= this._contentArray.length) topIndex = this._contentArray.length - 1;

        return {
            leftNum: this.$$bestLeftNum(position.x, topIndex),
            lineNum: topIndex
        };
    };

    // 获取光标之间的内容
    var calcTwoCursor = () => {

        // 假定cursor2是结束光标
        var beginCursor = this.__cursor2,
            endCursor = this.__cursor1;

        // 根据行号来校对
        if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
            beginCursor = this.__cursor1;
            endCursor = this.__cursor2;
        } else if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

            // 根据列号来校对
            if (this.__cursor1.leftNum < this.__cursor2.leftNum) {
                beginCursor = this.__cursor1;
                endCursor = this.__cursor2;
            }

            return this._contentArray[beginCursor.lineNum].substring(beginCursor.leftNum, endCursor.leftNum);
        }

        // 余下的一定是多行
        var resultData = "";
        resultData += this._contentArray[beginCursor.lineNum].substr(beginCursor.leftNum) + "\n";
        for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
            resultData += this._contentArray[lineNum] + "\n";
        }
        resultData += this._contentArray[endCursor.lineNum].substr(0, endCursor.leftNum);

        return resultData;

    };

    // 鼠标按下的时候，记录开始光标位置并标记鼠标按下动作
    xhtml.bind(this._el, 'mousedown', event => {
        mouseDown = true;
        this.__cursor2 = this.__cursor1 = calcCursor(event);

        this.$$updateCanvasSize();

        // 绘制选中效果
        this.$$updateSelectView();

    });

    // 移动的时候不停的同步结束光标位置
    xhtml.bind(this._el, 'mousemove', event => {
        if (!mouseDown) return;
        this.__cursor2 = calcCursor(event);

        // 绘制选中效果
        this.$$updateSelectView();
    });

    // 鼠标放开或移出的时候，标记鼠标放开
    xhtml.bind(this._el, 'mouseup', () => mouseDown = false);

    // 点击编辑界面
    xhtml.bind(this._el, 'click', event => {

        this.__helpInputDOM.innerHTML = '';

        var position = xhtml.position(this._el, event);
        var topIndex = Math.round((position.y - 20.5) / 21);

        // 如果超过了内容区域
        if (topIndex < 0 || topIndex >= this._contentArray.length) return;

        var __lineNum = topIndex;
        var __leftNum = this.$$bestLeftNum(position.x, __lineNum);

        // 多选
        if (shiftDown) {
            this.__cursor1 = {
                leftNum: this.__leftNum,
                lineNum: this.__lineNum
            };
            this.__cursor2 = {
                leftNum: __leftNum,
                lineNum: __lineNum
            };

            // 绘制选中效果
            this.$$updateSelectView();
        }

        // 普通点击
        else {
            this.__lineNum = __lineNum;
            this.__leftNum = __leftNum;
            this.$$updateCursorPosition();
            this.$$updateView();
        }

    });

    // 双击编辑器界面
    xhtml.bind(this._el, 'dblclick', event => {
        var formateData = this.__formatData[this.__lineNum];

        // 求解左边边界
        var _left;
        for (var i = 0, leftLen = 0; i < formateData.length; i++) {
            if (leftLen + formateData[i].content.length > this.__leftNum) {
                _left = leftLen;
                break;
            } else {
                leftLen += formateData[i].content.length;
            }
        }

        // 求解右边界
        var _right;
        for (var i = 0, leftLen = 0; i < formateData.length; i++) {
            if (leftLen + formateData[i].content.length > this.__leftNum) {
                _right = leftLen + formateData[i].content.length;
                break;
            } else {
                leftLen += formateData[i].content.length;
            }
        }

        /**
         * 由于前置cursor1和cursor2是对象，直接修改leftNum无法成功
         */

        this.__cursor1 = {
            leftNum: _left,
            lineNum: this.__lineNum
        };
        this.__cursor2 = {
            leftNum: _right,
            lineNum: this.__lineNum
        };

        // 绘制选中效果
        this.$$updateSelectView();
    });

    var update = text => {

        // 获取输入内容
        text = text || this.__focusDOM.value;

        text = this.$$filterText(text);

        this.__focusDOM.value = "";

        // 如果有选区，先删除选区
        if (this.$$selectIsNotBlank()) this.$$deleteSelect();

        // 如果输入的是回车，切割文本
        if (/^\n$/.test(text)) {

            if (this.__leftNum >= this._contentArray[this.__lineNum].length) {
                this._contentArray.splice(this.__lineNum + 1, 0, "");
            } else {
                this._contentArray.splice(this.__lineNum + 1, 0, this._contentArray[this.__lineNum].substring(this.__leftNum));
                this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum);
            }
            this.__lineNum += 1;
            this.__leftNum = 0;

        }

        // 否则就是一堆文本（包括复制来的）
        else {

            var textArray = text.split(/\n/);

            if (this._contentArray == null) {
                this._contentArray = textArray;
                this.__lineNum = this._contentArray.length - 1;
                this.__leftNum = this._contentArray[this.__lineNum].length;
            }

            // 如果只有一行文本(分开是为了加速)
            else if (textArray.length <= 1) {
                this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + text + this._contentArray[this.__lineNum].substring(this.__leftNum);
                this.__leftNum += text.length;
            }

            // 如果是复制的多行文本
            else {

                // 需要切割的行两边文本
                var leftText = this._contentArray[this.__lineNum].substring(0, this.__leftNum);
                var rightText = this._contentArray[this.__lineNum].substring(this.__leftNum);

                // 旧行文本拼接进来
                textArray[0] = leftText + textArray[0];
                textArray[textArray.length - 1] += rightText;

                // 新内容记录下来
                this._contentArray.splice(this.__lineNum, 1, ...textArray);

                this.__lineNum += (textArray.length - 1);
                this.__leftNum = textArray[textArray.length - 1].length - rightText.length;

            }

        }

        // 着色并更新视图

        this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));
        this.$$updateCursorPosition();
        this.$$updateView();

        // 通知文本改动
        this.__updated__();

    };

    // 中文输入开始
    xhtml.bind(this.__focusDOM, 'compositionstart', () => {
        this.__needUpdate = false;
        this.__focusDOM.style.color = "rgba(0,0,0,0)";
        this.__focusDOM.style.borderLeft = '1px solid ' + this._colorCursor;
    });

    // 中文输入结束
    xhtml.bind(this.__focusDOM, 'compositionend', () => {
        this.__needUpdate = true;
        this.__focusDOM.style.color = this._colorCursor;
        this.__focusDOM.style.borderLeft = "none";
        update();

        // 辅助输入
        if (this.$input != null) this.__helpInputEvent = this.$input(this.__helpInputDOM, getInputMessage(this), this._contentArray) || {};
    });

    // 输入
    xhtml.bind(this.__focusDOM, 'input', () => {
        // 如果是中文输入开始，不应该更新
        if (this.__needUpdate) {
            update();

            // 辅助输入
            if (this.$input != null) this.__helpInputEvent = this.$input(this.__helpInputDOM, getInputMessage(this), this._contentArray) || {};
        }
    });

    // 记录此刻MAC电脑的Command是否按下
    var macCommand = false;

    xhtml.bind(this._el, 'keyup', event => {

        var keyStringCode = getKeyString(event);

        if (keyStringCode == 'command') macCommand = false;

        // 取消shift被按下标志
        shiftDown = false;

    });

    // 处理键盘控制
    xhtml.bind(this._el, 'keydown', event => {

        var keyStringCode = getKeyString(event);

        if (keyStringCode == 'command') macCommand = true;

        // 如果Command被按下，就需要补充ctrl以兼容MAC电脑
        if (macCommand && ['a', 'c', 'x'].indexOf(keyStringCode) > -1) {
            keyStringCode = "ctrl+" + keyStringCode;
        }

        // 辅助输入前置拦截

        if (this.__helpInputDOM.innerHTML != '') {
            var __helpInputEvent = this.__helpInputEvent[keyStringCode];

            if (isFunction(__helpInputEvent)) {

                // 如果返回true表示继续调用，否则此快捷键结束
                if (!__helpInputEvent()) return;
            } else {
                this.__helpInputDOM.innerHTML = '';
            }
        }

        // 只读模式需要拦截部分快捷键
        // 命令行不拦截
        if (this._readonly && ['ctrl+a', 'ctrl+c'].indexOf(keyStringCode) < 0) return;

        if (keyStringCode == 'shift') shiftDown = true;

        // 进入常规快捷键

        switch (keyStringCode) {

            // 全选
            case "ctrl+a":
                {

                    // 修改选区范围
                    this.__cursor1 = { leftNum: 0, lineNum: 0 };
                    this.__cursor2 = { lineNum: this._contentArray.length - 1, leftNum: this._contentArray[this._contentArray.length - 1].length };

                    // 绘制选中效果
                    this.$$updateSelectView();

                    break;
                }

            // 复制
            case "ctrl+c":
                {
                    if (this.$$selectIsNotBlank()) {
                        xhtml.copy(calcTwoCursor());
                        this.__focusDOM.focus();
                    }
                    break;
                }

            // 剪切
            case "ctrl+x":
                {
                    if (this.$$selectIsNotBlank()) {

                        xhtml.copy(calcTwoCursor());
                        this.__focusDOM.focus();
                        this.$$deleteSelect();

                        // 由于内容改变，需要重新调用着色
                        this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));

                        // 更新视图
                        this.$$updateCursorPosition();
                        this.$$updateView();
                        this.$$cancelSelect();

                        // 通知文本改动
                        this.__updated__();

                    }
                    break;
                }

            // 多空格输入或多行移位
            case "tab":
                {

                    // tab用来控制输入多个空格，默认事件需要禁止
                    xhtml.stopPropagation(event);
                    xhtml.preventDefault(event);

                    // 计算空格
                    var blanks = "";
                    for (var i = 0; i < this._tabSpace; i++) blanks += " ";

                    // 如果有选区，特殊处理
                    if (this.$$selectIsNotBlank()) {

                        var beginLineNum = this.__cursor1.lineNum,
                            endLineNum = this.__cursor2.lineNum;
                        if (beginLineNum > endLineNum) {
                            beginLineNum = this.__cursor2.lineNum;
                            endLineNum = this.__cursor1.lineNum;
                        }

                        // 在开头追究tab
                        for (var lineNum = beginLineNum; lineNum <= endLineNum; lineNum++) {
                            this._contentArray[lineNum] = blanks + this._contentArray[lineNum];
                        }

                        // 校对选择区域
                        this.__cursor1.leftNum += this._tabSpace;
                        this.__cursor2.leftNum += this._tabSpace;

                        // 校对光标
                        this.__leftNum += this._tabSpace;

                        this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));
                        this.$$updateCursorPosition();
                        this.$$updateView();
                        this.$$updateCanvasSize();
                        this.$$updateSelectView();

                        // 通知文本改动
                        this.__updated__();

                    } else {
                        update(blanks);
                    }

                    break;
                }

            // 光标向上
            case "up":
                {

                    // 如果是第一行不需要任何处理
                    if (this.__lineNum <= 0) return;

                    // 向上一行
                    this.__lineNum -= 1;

                    this.__leftNum = this.$$bestLeftNum(this.$$textWidth(this._contentArray[this.__lineNum + 1].substr(0, this.__leftNum)) + 40);

                    this.$$updateCursorPosition();
                    this.$$updateView();
                    this.$$cancelSelect();

                    this._el.scrollTop -= 21;

                    break;
                }

            // 光标向下
            case "down":
                {

                    if (this.__lineNum >= this._contentArray.length - 1) return;

                    // 向下一行
                    this.__lineNum += 1;

                    this.__leftNum = this.$$bestLeftNum(this.$$textWidth(this._contentArray[this.__lineNum - 1].substr(0, this.__leftNum)) + 40);

                    this.$$updateCursorPosition();
                    this.$$updateView();
                    this.$$cancelSelect();

                    this._el.scrollTop += 21;

                    break;
                }

            // 光标向左
            case "left":
                {

                    if (this.__leftNum <= 0) {
                        if (this.__lineNum <= 0) return;
                        this.__lineNum -= 1;
                        this.__leftNum = this._contentArray[this.__lineNum].length;
                    } else {
                        this.__leftNum -= 1;
                    }

                    this.$$updateCursorPosition();
                    this.$$cancelSelect();

                    break;
                }

            // 光标向右
            case "right":
                {

                    if (this.__leftNum >= this._contentArray[this.__lineNum].length) {
                        if (this.__lineNum >= this._contentArray.length - 1) return;
                        this.__lineNum += 1;
                        this.__leftNum = 0;
                    } else {
                        this.__leftNum += 1;
                    }

                    this.$$updateCursorPosition();
                    this.$$cancelSelect();

                    break;
                }

            // 删除
            case "backspace":
                {

                    // 如果有选区
                    if (this.$$selectIsNotBlank()) {

                        // 删除选区
                        this.$$deleteSelect();

                    }

                    // 无选区的常规操作
                    else {
                        if (this.__leftNum <= 0) {
                            if (this.__lineNum <= 0) return;

                            this.__lineNum -= 1;
                            this.__leftNum = this._contentArray[this.__lineNum].length;

                            // 一行的开头应该删除本行（合并到前一行）
                            this._contentArray[this.__lineNum] += this._contentArray[this.__lineNum + 1];
                            this._contentArray.splice(this.__lineNum + 1, 1);

                        } else {
                            this.__leftNum -= 1;
                            this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + this._contentArray[this.__lineNum].substring(this.__leftNum + 1);
                        }
                    }

                    // 由于内容改变，需要重新调用着色
                    this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));

                    // 更新视图
                    this.$$updateCursorPosition();
                    this.$$updateView();
                    this.$$cancelSelect();

                    // 通知文本改动
                    this.__updated__();

                    break;
                }
        }

    });

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/diff
/*****************************************************************/
window.__pkg__bundleSrc__['88']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 判断一行是否匹配

var euqalLine = function (line1, line2) {
    if (line1.length != line2.length) return false;
    for (var i = 0; i < line1.length; i++) {
        if (line1[i].content != line2[i].content || line1[i].color != line2[i].color) return false;
    }
    return true;
};

/**
 * 为了加速页面渲染，我们引入差异对比
 * 简单的理解就是：
 * 原本在数据改变的时候直接更新整个DOM的方式替换成只功能必要的DOM
 */

__pkg__scope_bundle__.default= function (newFormatData) {

    /**
     * 思路：
     * 
     * 从开始匹配无法匹配的，匹配条个数记作beginNum
     * 再从结尾匹配无法匹配的，匹配条个数记作endNum
     * 只有begin和end之间的数据需要更新DOM
     * 
     * 当然，也有特殊情况，因此在进行回归前，先把特殊情况提取处理
     * 
     */

    var oldFormatData = this.__formatData;

    if (oldFormatData) {
        // 寻找开始匹配行数
        var beginNum = 0;
        for (var i = 0; i < oldFormatData.length && i < newFormatData.length; i++) {
            if (!euqalLine(oldFormatData[i], newFormatData[i])) {
                break;
            }
            beginNum += 1;
        }

        // 寻找结束匹配行数
        var endNum = 0;
        for (var i = 1; i <= oldFormatData.length && i <= newFormatData.length; i++) {
            if (!euqalLine(oldFormatData[oldFormatData.length - i], newFormatData[newFormatData.length - i])) {
                break;
            }
            endNum += 1;
        }

        var minLength = Math.min(oldFormatData.length, newFormatData.length);

        // 校对(如果复用重叠了)
        if (beginNum + endNum >= minLength) {
            endNum = minLength - beginNum - 1;

            // 由于不知道是删除还是增加，因此可能出现负数
            if (endNum < 0) endNum = 0;
        }

        // 对比以后的差异信息
        this.__diff = {
            beginNum,
            endNum
        };

    }

    return newFormatData;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/filter
/*****************************************************************/
window.__pkg__bundleSrc__['89']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 外来文本统一过滤处理

__pkg__scope_bundle__.default= function (oralStr) {

    // 把tab统一变成空格
    var tab = "";
    for (var i = 0; i < this._tabSpace; i++) {
        tab += " ";
    }

    return oralStr.replace(/\t/g, tab);
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/index
/*****************************************************************/
window.__pkg__bundleSrc__['90']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 代码着色计算
 */

// 合并内容

var toShaderReult = function (words) {

    var resultData = [[]], lineNum = 0;

    words.forEach(function (word) {

        var codeArray = word.content.split(/\n/), index;

        resultData[lineNum].push({
            color: word.color,
            content: codeArray[0]
        });

        for (index = 1; index < codeArray.length; index++) {
            lineNum += 1;
            resultData.push([]);

            resultData[lineNum].push({
                color: word.color,
                content: codeArray[index]
            });

        }

    });

    return resultData;
};

// 初始化配置文件

var initConfig = function (init, data) {
    var key;
    for (key in data)
        try {
            init[key] = data[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    return init;
};

__pkg__scope_args__=window.__pkg__getBundle('91');
var _inner_HTML_shader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('92');
var _inner_CSS_shader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('93');
var _inner_ES_shader =__pkg__scope_args__.default;


var _deafultColors_html = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#555",/*符号颜色*/
    "node": "#1e50b3",/*结点颜色*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e",/*属性值颜色*/
};
var _deafultColors_css = {
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#555",/*符号颜色*/
    "selector": "#1e50b3",/*选择器*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e"/*属性值颜色*/
};
var _deafultColors_javascript = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#555",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

__pkg__scope_bundle__.default= function (lang, colors) {
    colors = colors || {};

    var _inner_shader, _inner_colors;

    if (lang == 'html') {

        colors._css = initConfig(_deafultColors_css, colors.css);
        colors._javascript = initConfig(_deafultColors_javascript, colors.javascript);
        _inner_colors = initConfig(_deafultColors_html, colors);

        _inner_shader = _inner_HTML_shader;

    } else if (lang == 'css') {

        _inner_colors = initConfig(_deafultColors_css, colors);

        _inner_shader = _inner_CSS_shader;

    } else if (lang == 'javascript') {

        _inner_colors = initConfig(_deafultColors_javascript, colors);

        _inner_shader = _inner_ES_shader;

    } else {
        throw new Error('Language not supported:' + lang + ",The languages available include: html、css、javascript!");
    }

    return function (textString) {

        return toShaderReult(_inner_shader(textString, _inner_colors));

    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/html
/*****************************************************************/
window.__pkg__bundleSrc__['91']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('92');
var _inner_CSS_shader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('93');
var _inner_ES_shader =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (textString, colors) {

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    // 匹配属性值模板
    var getAttrValueTemplate = function () {
        var endStr = " ";
        // 寻找属性值边界
        if (nextNValue(1) == '"') endStr = '"';
        if (nextNValue(1) == "'") endStr = "'";

        // 到达边界前一直寻找下一个
        do {
            template += textString[i++];
        } while (nextNValue(1) != endStr && i < textString.length);

        // 如果是匹配成功而不是匹配到末尾
        if (endStr != " " && i < textString.length) {
            template += endStr;
            i += 1;
        }

        shaderArray.push({
            color: colors.attrValue,
            content: template
        });
        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(4) == '<!--') {

            initTemplate();
            while (nextNValue(3) !== '-->' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(3)
            });
            i += 3;
            template = "";

        }

        /* 2.</ */

        else if (nextNValue(2) == '</') {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "</"
            });
            i += 2;

            while (nextNValue(1) !== '>' && i < textString.length) {
                template += textString[i++];
            }

            if (template != "") {
                shaderArray.push({
                    color: colors.node,
                    content: template
                });
                template = "";

                if (i < textString.length) {
                    shaderArray.push({
                        color: colors.insign,
                        content: ">"
                    });
                    i += 1;
                }

            }
        }

        /* 3.< */

        else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {

            var specialTag = "";

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "<"
            });
            i += 1;

            // 寻找标签名称
            while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }
            if (template != '') {

                // 针对style和script这样特殊的标签，内部需要调用对应的着色器着色
                if (template == "style" || template == 'script') {
                    specialTag = "</" + template + ">";
                }

                shaderArray.push({
                    color: colors.node,
                    content: template
                });

                template = '';
                if (i < textString.length) {

                    // 寻找标签属性
                    while (i < textString.length) {

                        // 遇到这个表示标签结束了
                        // 也就意味着标签匹配结束
                        if (nextNValue(1) == ">") {

                            initTemplate();
                            shaderArray.push({
                                color: colors.insign,
                                content: ">"
                            });
                            i += 1;
                            break;
                        }

                        // 如果是空格，表示是属性之间，接着查看下一个即可
                        else if (nextNValue(1) != ' ') {

                            initTemplate();

                            // 匹配属性名称
                            if (nextNValue(1) != '"' && nextNValue(1) != "'") {

                                // 如果不是=或>和空格就继续
                                while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length && nextNValue(1) != " ") {
                                    template += textString[i++];
                                }
                                if (template != "") {
                                    shaderArray.push({
                                        color: colors.attrKey,
                                        content: template
                                    });
                                    template = "";

                                    // 如果下一个是=，就接着找属性值
                                    if (nextNValue(1) == '=') {
                                        shaderArray.push({
                                            color: colors.insign,
                                            content: "="
                                        });
                                        i += 1;


                                        if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                                            // 寻找属性值
                                            getAttrValueTemplate();

                                        }
                                    }
                                } else {
                                    template += textString[i++];
                                }
                            } else if (nextNValue(1) == '=') {
                                shaderArray.push({
                                    color: colors.insign,
                                    content: "="
                                });
                                i += 1;
                            } else {
                                if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {

                                    getAttrValueTemplate();

                                }
                            }

                        } else {
                            template += textString[i++];
                        }

                    }

                }

            }

            if (specialTag != "") {

                var oldI = i, oldTemplate = template, langHelp, innerShaderArray;
                while (nextNValue(specialTag.length) != specialTag && i < textString.length) {
                    template += textString[i++];
                }

                if (i < textString.length) {

                    langHelp = specialTag.replace(/<\//, '');

                    innerShaderArray = {
                        "style>": _inner_CSS_shader,
                        "script>": _inner_ES_shader
                    }[langHelp](template, {
                        "style>": colors._css,
                        "script>": colors._javascript
                    }[langHelp]);

                    innerShaderArray.forEach(function (innerShader) {
                        shaderArray.push(innerShader);
                    });

                    template = "";
                } else {
                    template = oldTemplate;
                    i = oldI;
                }

            }

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;

}


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/css
/*****************************************************************/
window.__pkg__bundleSrc__['92']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (textString, colors) {
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 1:选择器 tag
    // 2:属性名 attr
    // 3:属性值 string
    var state = "tag";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: {
                    tag: colors.selector,
                    attr: colors.attrKey,
                    string: colors.attrValue
                }[state],
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.attrValue,
                content: template + strBorder
            });
            template = "";

        }

        /* 3.边界 */

        else if ([":", '{', '}', ";"].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";

            if (nextNValue(1) == '{' || nextNValue(1) == ';') {
                state = 'attr';
            } else if (nextNValue(1) == '}') {
                state = 'tag';
            } else {
                state = 'string';
            }

            i += 1;
        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }
    return shaderArray;
}


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/javascript
/*****************************************************************/
window.__pkg__bundleSrc__['93']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // JS关键字
var keyWords = [
    "abstract", "arguments", "boolean", "break", "byte",
    "case", "catch", "char", "class", "const",
    "continue", "debugger", "default", "delete", "do",
    "double", "else", "enum", "eval", "export",
    "extends", "false", "final", "finally", "float",
    "for", "function", "goto", "if", "implements",
    "import", "in", "instanceof", "int", "interface",
    "let", "long", "native", "new", "null",
    "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized",
    "this", "throw", "throws", "transient", "true",
    "try", "typeof", "var", "void", "volatile",
    "while", "with", "yield"
];

__pkg__scope_bundle__.default= function (textString, colors) {
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substr(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }


        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
}


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-editor/getTypeName
/*****************************************************************/
window.__pkg__bundleSrc__['130']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('131');
var mimeTypes =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (name) {
    var typeName = name.split('.').pop().toLowerCase();

    // 特殊类型
    if (['html', 'css', 'js', 'json', 'scss', 'sass'].indexOf(typeName) > -1) {
        return typeName;
    }

    // 余下的由类型文件判断
    else {

        typeName = (mimeTypes[typeName] || "").split('/')[0];
        if (['image'].indexOf(typeName) > -1) {
            return typeName;
        }

    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./nodejs/mime.types
/*****************************************************************/
window.__pkg__bundleSrc__['131']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    

                var module={
                    exports:{}
                };
                var exports=module.exports;
        
                module.exports = {
  "html": "text/html",
  "htm": "text/html",
  "shtml": "text/html",
  "css": "text/css",
  "xml": "text/xml",
  "gif": "image/gif",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "application/javascript",
  "atom": "application/atom+xml",
  "rss": "application/rss+xml",

  "mml": "text/mathml",
  "txt": "text/plain",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "wml": "text/vnd.wap.wml",
  "htc": "text/x-component",

  "png": "image/png",
  "tif": "image/tiff",
  "tiff": "image/tiff",
  "wbmp": "image/vnd.wap.wbmp",
  "ico": "image/x-icon",
  "jng": "image/x-jng",
  "bmp": "image/x-ms-bmp",
  "svg": "image/svg+xml",
  "svgz": "image/svg+xml",
  "webp": "image/webp",

  "woff": "application/font-woff",
  "jar": "application/java-archive",
  "war": "application/java-archive",
  "ear": "application/java-archive",
  "json": "application/json",
  "hqx": "application/mac-binhex40",
  "doc": "application/msword",
  "pdf": "application/pdf",
  "ps": "application/postscript",
  "eps": "application/postscript",
  "ai": "application/postscript",
  "rtf": "application/rtf",
  "m3u8": "application/vnd.apple.mpegurl",
  "xls": "application/vnd.ms-excel",
  "eot": "application/vnd.ms-fontobject",
  "ppt": "application/vnd.ms-powerpoint",
  "wmlc": "application/vnd.wap.wmlc",
  "kml": "application/vnd.google-earth.kml+xml",
  "kmz": "application/vnd.google-earth.kmz",
  "7z": "application/x-7z-compressed",
  "cco": "application/x-cocoa",
  "jardiff": "application/x-java-archive-diff",
  "jnlp": "application/x-java-jnlp-file",
  "run": "application/x-makeself",
  "pl": "application/x-perl",
  "pm": "application/x-perl",
  "prc": "application/x-pilot",
  "pdb": "application/x-pilot",
  "rar": "application/x-rar-compressed",
  "rpm": "application/x-redhat-package-manager",
  "sea": "application/x-sea",
  "swf": "application/x-shockwave-flash",
  "sit": "application/x-stuffit",
  "tcl": "application/x-tcl",
  "tk": "application/x-tcl",
  "der": "application/x-x509-ca-cert",
  "pem": "application/x-x509-ca-cert",
  "crt": "application/x-x509-ca-cert",
  "xpi": "application/x-xpinstall",
  "xhtml": "application/xhtml+xml",
  "xspf": "application/xspf+xml",
  "zip": "application/zip",

  "bin": "application/octet-stream",
  "exe": "application/octet-stream",
  "dll": "application/octet-stream",
  "deb": "application/octet-stream",
  "dmg": "application/octet-stream",
  "iso": "application/octet-stream",
  "img": "application/octet-stream",
  "msi": "application/octet-stream",
  "msp": "application/octet-stream",
  "msm": "application/octet-stream",

  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  "mid": "audio/midi",
  "midi": "audio/midi",
  "kar": "audio/midi",
  "mp3": "audio/mpeg",
  "ogg": "audio/ogg",
  "m4a": "audio/x-m4a",
  "ra": "audio/x-realaudio",

  "3gpp": "video/3gpp",
  "3gp": "video/3gpp",
  "ts": "video/mp2t",
  "mp4": "video/mp4",
  "mpeg": "video/mpeg",
  "mpg": "video/mpeg",
  "mov": "video/quicktime",
  "webm": "video/webm",
  "flv": "video/x-flv",
  "m4v": "video/x-m4v",
  "mng": "video/x-mng",
  "asx": "video/x-ms-asf",
  "asf": "video/x-ms-asf",
  "wmv": "video/x-ms-wmv",
  "avi": "video/x-msvideo"
};
        
                __pkg__scope_bundle__.default= module.exports;
        
                

    return __pkg__scope_bundle__;
}
