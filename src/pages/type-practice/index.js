import template from './index.html';
import './index.scss';

import urlFormat from '../../tool/urlFormat';

import './dialogs/index.scss';
import lazyDialogs from './dialogs/lazy-load';

export default function (obj) {

    return {
        name: "type-practice",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "金山打字通" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './type-practice/logo.png');
        },
        methods: {
            openPage: function (event, target) {
                this.openDialog(target.getAttribute('tag'));
            },
            openDialog: function (pagename, isInit) {

                // 打开
                if (!isInit) window.location.href = "#/type-practice/" + pagename;
                this.$openDialog(lazyDialogs[pagename], {
                    dialogs: lazyDialogs
                }).then(function () {

                    // 关闭后恢复路由
                    window.location.href = "#/type-practice";
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