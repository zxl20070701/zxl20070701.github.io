import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        name: "file-manager",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "资源管理器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './file-manager.png');
        }
    };
};