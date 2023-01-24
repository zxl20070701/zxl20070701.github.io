import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "录屏软件";
            document.getElementById('icon-logo').setAttribute('href', './recorder-screen.png');
        },
        data: {
            isRun: false
        },
        methods: {

            // 屏幕录制
            screenRecorder: function () {
                if (!this.isRun) {
                    var _this = this, videoEl = document.getElementById("video-id");

                    // 获取屏幕内容
                    navigator.mediaDevices.getDisplayMedia({
                        video: true,
                        audio: true
                    }).then(function (stream) {
                        _this.isRun = true;

                        // 视频流及时播放
                        videoEl.srcObject = stream;
                        videoEl.onloadedmetadata = function () {
                            videoEl.play();
                        };

                        // 创建一个对指定的 MediaStream 进行录制的 MediaRecorder 对象
                        var mediaRecorder = new MediaRecorder(stream, {
                            mimeType: MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
                        });

                        // 录制
                        var chunks = [];
                        mediaRecorder.addEventListener("dataavailable", function (event) {
                            chunks.push(event.data);
                        });

                        // 停止的时候下载
                        mediaRecorder.addEventListener("stop", function () {
                            var blob = new Blob(chunks, {
                                type: chunks[0].type
                            });
                            var url = URL.createObjectURL(blob);
                            var downEl = document.createElement("a");
                            downEl.href = url;
                            downEl.download = "屏幕录制.webm";
                            downEl.click();
                            _this.isRun = false;
                        });

                        // 启动
                        mediaRecorder.start();

                    }).catch(function (event) {
                        alert("取消录制或遇到错误\n\n" + event);
                    });

                } else {
                    alert("正在录制中，请结束后再启动新的录制程序！");
                }

            }
        }
    };
};