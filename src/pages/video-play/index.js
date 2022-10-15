import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "视频播放器";
            document.getElementById('icon-logo').setAttribute('href', './video-play.png');
        },
        methods: {
        }
    };
};