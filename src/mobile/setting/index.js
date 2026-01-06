import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        name: "setting",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "设置" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './setting.png');
        }
    };
};