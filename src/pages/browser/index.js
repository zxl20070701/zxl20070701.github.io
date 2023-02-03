import template from './index.html';
import './index.scss';

import remove from '../../tool/xhtml/remove';

var blank = "browser://blank"; // 空白启动页

export default function (obj, props) {
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