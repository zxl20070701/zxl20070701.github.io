import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        name: "browser",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "浏览器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './safari.png');
        }
    };
};