
/*************************** [bundle] ****************************/
// Original file:./src/pages/browser/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['80']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('250');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('251');


__pkg__scope_args__=window.__pkg__getBundle('33');
var remove =__pkg__scope_args__.default;


var blank = "browser://blank"; // 空白启动页

__pkg__scope_bundle__.default= function (obj, props) {
    props = props || {};
    if (!("url" in props)) props.url = blank;

    // 记录需要的所有的页签信息
    var pageinfos = {};
    var current = "";

    return {
        name: "browser",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Internet Explorer" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './browser.png');
        },
        mounted: function () {
            this.openPage(props.url);
        },
        methods: {

            // 打开新页面
            newNav: function () {
                this.openPage(blank);
            },

            // 刷新
            doRefresh: function () {
                var urlVal = this._refs.urlInput.value.value.trim();

                // 空白页
                if (blank == urlVal) {
                    pageinfos[current].iframeEl.setAttribute('src', "");
                }

                // 合法的地址
                else if (/^https*\:\/\//.test(urlVal) || /^file*\:\/\/\//.test(urlVal)) {
                    pageinfos[current].iframeEl.setAttribute('src', urlVal);
                }

                // 否则直接查询
                else {
                    urlVal = "https://cn.bing.com/search?q=" + encodeURIComponent(urlVal);
                    pageinfos[current].iframeEl.setAttribute('src', urlVal);

                    pageinfos[current].url = urlVal;
                    this._refs.urlInput.value.value = urlVal;
                }

            },

            // 打开页面
            openPage: function (url) {
                var _this = this;

                var uniqueHash = new Date().valueOf();

                var navEl = document.createElement('span');
                this._refs.navRoot.value.appendChild(navEl);

                navEl.innerText = url;
                this._refs.urlInput.value.value = url;

                var closeNavEl = document.createElement('i');
                navEl.appendChild(closeNavEl);

                closeNavEl.innerText = "×";

                this._refs.navRoot.value.insertBefore(navEl, this._refs.addBtn.value);

                var iframeEl = document.createElement('iframe');
                this._el.appendChild(iframeEl);

                iframeEl.setAttribute('frameborder', '0');

                pageinfos[uniqueHash] = {
                    navEl: navEl,
                    iframeEl: iframeEl,
                    url: url
                };

                current = uniqueHash;
                this.doRefresh();

                /**
                 * 绑定事件
                 */

                // 点击页签
                navEl.addEventListener('click', function () {
                    current = uniqueHash;
                    for (var key in pageinfos) {

                        // 应该显示的
                        // 当然，肯定就是自己了
                        if (key == uniqueHash) {
                            navEl.setAttribute('active', 'yes');
                            iframeEl.style.display = "";

                            _this._refs.urlInput.value.value = pageinfos[key].url;
                        }

                        // 需要隐藏的
                        else {
                            pageinfos[key].navEl.setAttribute('active', 'no');
                            pageinfos[key].iframeEl.style.display = "none";
                        }
                    }
                });

                // 关闭页签
                closeNavEl.addEventListener("click", function (event) {
                    event.stopPropagation();

                    remove(navEl);
                    remove(iframeEl);
                    delete pageinfos[uniqueHash];

                    // 如果当前页签内容的显示的
                    // 需要先确定新的过会显示谁
                    if (navEl.getAttribute('active') == 'yes') {
                        var _key;
                        for (var key in pageinfos) _key = key;
                        if (_key) {
                            pageinfos[_key].navEl.click();
                            return;
                        }

                        // 如果没有可以切换的，打开新的空页签
                        _this.newNav();
                    }
                });

                navEl.click();
            }

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/browser/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['250']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"top"},"childNodes":[8,13]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[9,10,11]},{"type":"tag","name":"span","attrs":{"class":"logo"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"spellcheck":"false","type":"text","ref":"urlInput","ui-on:keydown.enter":"doRefresh"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doRefresh"},"childNodes":[12]},{"type":"text","content":"刷新","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"navs","ref":"navRoot"},"childNodes":[14]},{"type":"tag","name":"button","attrs":{"ui-on:click":"newNav","ref":"addBtn"},"childNodes":[15]},{"type":"text","content":"＋","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/browser/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['251']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"browser\"]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 70px);\n\nleft: 80px;\n\ntop: 20px;\n\n}\n\n [page-view=\"browser\"][focus=\"no\"]>div.top{\n\nbackground-color: rgba(158, 196, 233, 0.85);\n\n}\n\n [page-view=\"browser\"]>header{\n\nheight: 30px;\n\nbackground-color: transparent;\n\nposition: absolute;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 100%;\n\n}\n\n [page-view=\"browser\"]>div.top{\n\nbackground-color: rgba(183, 218, 253, 0.85);\n\nborder-bottom: 1px solid gray;\n\n}\n\n [page-view=\"browser\"]>div.top>div.content{\n\nheight: 55px;\n\n}\n\n [page-view=\"browser\"]>div.top>div.content>*{\n\nvertical-align: bottom;\n\n}\n\n [page-view=\"browser\"]>div.top>div.content>span{\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"browser\"]>div.top>div.content>span.logo{\n\nwidth: 50px;\n\nheight: 55px;\n\nbackground-image: url(\"./browser.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-position: center bottom;\n\nbackground-size: 90% auto;\n\n}\n\n [page-view=\"browser\"]>div.top>div.content>input{\n\nwidth: calc(100% - 100px);\n\noutline: none;\n\nborder: 1px solid rgb(208, 207, 207);\n\nborder-radius: 5px;\n\nheight: 24px;\n\npadding: 0 5px;\n\n}\n\n [page-view=\"browser\"]>div.top>div.content>button{\n\nheight: 24px;\n\nwidth: 40px;\n\nbackground-image: url(\"./refresh.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nbackground-size: auto 20px;\n\noutline: none;\n\nborder: none;\n\nbackground-color: transparent;\n\nfont-size: 0;\n\n}\n\n [page-view=\"browser\"]>div.top>div.navs{\n\npadding-top: 10px;\n\nheight: 40px;\n\ndisplay: flex;\n\n}\n\n [page-view=\"browser\"]>div.top>div.navs>span{\n\nline-height: 30px;\n\nbackground-image: radial-gradient(rgba(255, 255, 255, 0), rgba(236, 230, 230, 0.489));\n\nfont-size: 12px;\n\nflex-basis: 200px;\n\nwhite-space: nowrap;\n\ntext-overflow: ellipsis;\n\noverflow: hidden;\n\npadding-left: 10px;\n\npadding-right: 20px;\n\nposition: relative;\n\nborder: 1px solid rgb(197, 195, 195);\n\nmargin-left: 2px;\n\ncursor: pointer;\n\n}\n\n [page-view=\"browser\"]>div.top>div.navs>span[active='yes']{\n\nbackground-image: radial-gradient(white, white);\n\n}\n\n [page-view=\"browser\"]>div.top>div.navs>span>i{\n\nposition: absolute;\n\ntop: 0;\n\nright: 0;\n\nwidth: 20px;\n\nline-height: 30px;\n\ntext-align: center;\n\nfont-style: normal;\n\n}\n\n [page-view=\"browser\"]>div.top>div.navs>button{\n\nborder: none;\n\noutline: none;\n\nfont-size: 14px;\n\nwidth: 30px;\n\nheight: 20px;\n\nvertical-align: top;\n\nmargin-top: 5px;\n\nbackground-color: transparent;\n\ncursor: pointer;\n\n}\n\n [page-view=\"browser\"]>iframe{\n\nwidth: 100%;\n\nheight: calc(100% - 95px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
