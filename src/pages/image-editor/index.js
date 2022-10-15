import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "图片编辑器";
            document.getElementById('icon-logo').setAttribute('href', './image-editor.png');
        },
        methods: {
        }
    };
};