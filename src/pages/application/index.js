import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        name: "application",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "应用中心" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './application.png');
        },
        mounted: function () {

        },
        methods: {
            openApp: function (event, target) {
                this.$openView(target.getAttribute('tag'));
            },
            openDialog: function (event, target) {
                this.$openDialog(target.getAttribute('tag'));
            }
        }
    };
};