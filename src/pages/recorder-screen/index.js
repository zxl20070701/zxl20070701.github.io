import template from './index.html';
import './index.scss';

export default function (obj) {
    var mediaRecorder;
    return {
        name: "recorder-screen",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "录屏软件" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './recorder-screen.png');
        },
        data: {
            isRun: obj.ref(false)
        },
        methods: {

            // 开始录制
            startRecorder: function () {
                var _this = this;

                if (!this.isRun) {
                    var videoEl = this._refs.video.value;

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
                        mediaRecorder = new MediaRecorder(stream, {
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
                                type: "video/mp4"
                            });
                            var url = URL.createObjectURL(blob);
                            var downEl = document.createElement("a");
                            downEl.href = url;
                            downEl.download = "屏幕录制.mp4";
                            downEl.click();
                            _this.isRun = false;
                            mediaRecorder = null;
                        });

                        // 启动
                        mediaRecorder.start();

                    }).catch(function (event) {
                        alert("取消录制或遇到错误\n\n" + event);
                    });

                } else {
                    alert("正在录制中，请点击‘完成’按钮结束后再启动新的录制程序！");
                }

            },

            // 结束录制
            stopRecorder: function () {
                if (this.isRun) {
                    mediaRecorder.stop();
                } else {
                    alert("没有正在录制的内容，请先点击‘启动’按钮开始录制程序！");
                }
            }
        }
    };
};
