import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        name: "video-play",
        render: template,
        data: {
            videoSrc: obj.ref("")
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "视频播放器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './video-play.png');
        },
        methods: {
            openVideo: function (event, target) {
                this.videoSrc = window.URL.createObjectURL(target.files[0]);
            }
        }
    };
};