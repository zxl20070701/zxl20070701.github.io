import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "贪吃蛇";
            document.getElementById('icon-logo').setAttribute('href', './snake-eating.png');
        },
        methods: {
        }
    };
};