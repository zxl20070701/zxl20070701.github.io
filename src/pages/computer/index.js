import template from './index.html';
import './index.scss';

import urlFormat from '../../tool/urlFormat';

export default function (obj, props) {
    return {
        name: "computer",
        render: template,
        data: {
            nav: obj.ref("")
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "我的电脑" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './computer.png');
        },
        mounted: function () {
            if (props.init) {
                this.changeNav(props.init);
            } else {
                var urlObj = urlFormat();
                this.changeNav(urlObj.router[1] || "application", true);
            }
        },
        methods: {
            openApp: function (event, target) {
                this.$openView(target.getAttribute('tag'));
            },
            openDialog: function (event, target) {
                this.$openDialog(target.getAttribute('tag'));
            },
            clickNav: function (event, target) {
                this.changeNav(target.getAttribute('tag'));
            },
            changeNav: function (navname, isInit) {
                if (!isInit) window.location.href = "#/computer/" + navname;
                this.nav = navname;
            }
        }
    };
};