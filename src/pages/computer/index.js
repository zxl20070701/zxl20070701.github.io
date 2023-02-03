import template from './index.html';
import './index.scss';

export default function (obj) {

    return {
        name: "computer",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "资源管理器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './computer.png');
        },
        mounted: function () {

        },
        methods: {

        }
    };
};