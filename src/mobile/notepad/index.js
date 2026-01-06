import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        name: "notepad",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "记事本" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './note.png');
        }
    };
};