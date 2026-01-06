import template from './index.html';
import './index.scss';

import snipping from '../../tool/snipping/index';

export default function (obj) {

    return {
        name: "snipping-tool",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "截图工具" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './snipping.png');
        },
        methods: {

            // 本系统截图
            snippingWebsite: function () {
                var _this = this;

                snipping(document.getElementsByTagName("body")[0]).then(function (base64) {
                    var img = new Image();
                    img.onload = function () {
                        var mycanvas = _this._refs.mycanvas.value;

                        mycanvas.width = img.width;
                        mycanvas.height = img.height;

                        mycanvas.style.width = (img.width * 0.5) + "px";
                        mycanvas.style.height = (img.height * 0.5) + "px";

                        mycanvas.getContext('2d').drawImage(img, 0, 0);
                    };
                    img.src = base64;
                });
            },

            // 真机截图
            snippingComputer: function () {
                var _this = this;
                var videoEl = document.createElement('video');

                // 获取屏幕内容
                navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: false
                }).then(function (stream) {

                    // 视频流及时播放
                    videoEl.srcObject = stream;
                    videoEl.onloadedmetadata = function () {
                        videoEl.play();
                    };

                    stream.getVideoTracks()[0].onended = function () {

                        var mycanvas = _this._refs.mycanvas.value;

                        mycanvas.width = videoEl.videoWidth;
                        mycanvas.height = videoEl.videoHeight;

                        mycanvas.style.width = (videoEl.videoWidth * 0.5) + "px";
                        mycanvas.style.height = (videoEl.videoHeight * 0.5) + "px";

                        mycanvas.getContext('2d').drawImage(videoEl, 0, 0);
                    };


                }).catch(function (event) {
                    alert("取消录制或遇到错误\n\n" + event);
                });
            },

            // 下载
            download: function () {
                var btn = document.createElement('a');
                btn.href = this._refs.mycanvas.value.toDataURL();
                btn.download = "屏幕截图-" + new Date().valueOf() + ".png";
                btn.click();
            },

            // 去编辑
            goImageEditor: function () {
                this.$openView("image-editor", {
                    image: this._refs.mycanvas.value,
                    name: "屏幕截图-" + new Date().valueOf() + ".png"
                });
            }
        }
    };
};