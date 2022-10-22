import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
        data: {
            videoSrc: obj.ref(""),
            isPlay: obj.ref(false)
        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "视频播放器";
            document.getElementById('icon-logo').setAttribute('href', './video-play.png');
        },
        methods: {
            selectVideo: function () {
                this.videoSrc = window.URL.createObjectURL(document.getElementById('file').files[0]);
                this.isPlay = false;
            },
            doPlay: function () {
                document.getElementById('video').play();
                this.isPlay = true;
            },
            doPause: function () {
                document.getElementById('video').pause();
                this.isPlay = false;
            },
            doFull: function () {
                document.getElementById('video').requestFullscreen();
            }
        }
    };
};