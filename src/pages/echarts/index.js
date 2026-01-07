import template from './index.html';
import './index.scss';

import urlFormat from '../../tool/urlFormat';
import animation from '../../tool/animation';

import './dialogs/index.scss';
import lazyDialogs from './dialogs/lazy-load';

export default function (obj) {

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
                this.$openDialog(lazyDialogs[pagename], {
                    srcUrl: "https://github.com/zxl20070701/zxl20070701.github.io/edit/master/src/pages/echarts/dialogs/" + pagename
                }).then(function () {

                    // 关闭后恢复路由
                    window.location.href = "#/echarts";
                });
            },
        },
        mounted: function () {
            var urlObj = urlFormat(), _this = this;

            if (urlObj.router.length >= 2 && urlObj.router[1] in lazyDialogs) {
                this.openDialog(urlObj.router[1], true);
            }

            // 生成导航
            var h4s = this._refs.mymenu.value.getElementsByTagName("h4"), i, navName, navLabel, navEl;
            for (i = 0; i < h4s.length; i++) {
                navName = h4s[i].getElementsByTagName('span')[0].innerText.trim();
                navLabel = h4s[i].innerText.replace(navName, "").trim();

                navEl = document.createElement("h4");
                this._refs.mynav.value.appendChild(navEl);

                navEl.innerText = navLabel;
                navEl.setAttribute('class', navName);

                (function (i) {
                    navEl.addEventListener("click", function () {

                        var offsetTop = h4s[i].offsetTop - 70;
                        var currentScrollTop = _this._refs.mymenu.value.scrollTop || 0;

                        animation(
                            function (deep) {
                                _this._refs.mymenu.value.scrollTop =
                                    (offsetTop - currentScrollTop) * deep + currentScrollTop;
                            },
                            500,
                            function () {
                                _this._refs.mymenu.value.scrollTop = offsetTop;
                            }
                        );

                    });
                })(i);

            }
        }
    };
};