import template from './index.html';
import './index.scss';

import urlFormat from '../../tool/urlFormat';

import './dialogs/index.scss';
import lazyDialogs from './dialogs/lazy-load';

export default function (obj, props) {
    return {
        name: "code-example",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "代码例子" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './code-example.png');
        },
        methods: {
            openExamples: function (event, target) {
                this.openDialog(target.getAttribute('tag'));
            },
            openDialog: function (pagename, isInit) {

                // 打开
                if (!isInit) window.location.href = "#/code-example/" + pagename;
                this.$openDialog(lazyDialogs[pagename], {
                    srcUrl: "https://github.com/zxl20070701/zxl20070701.github.io/edit/master/src/pages/code-example/dialogs/" + pagename
                }).then(function () {

                    // 关闭后恢复路由
                    window.location.href = "#/code-example";
                });
            },
        },
        mounted: function () {
            var urlObj = urlFormat(), _this = this;

            if (urlObj.router.length >= 2 && urlObj.router[1] in lazyDialogs) {
                this.openDialog(urlObj.router[1], true);
            }
        }
    };
};