
/*************************** [bundle] ****************************/
// Original file:./src/mobile/recorder-screen/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['84']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('225');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('226');


__pkg__scope_bundle__.default= function (obj) {
    var mediaRecorder;

    return {
        name: "recorder-screen",
        render: template,
        data: {
            isRun: obj.ref(false)
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "录屏软件" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './recorder-screen.png');
        },
        methods: {

            // 开始录制
            startRecorder: function () {
                var _this = this;

                if (!this.isRun) {
                    var videoEl = this._refs.video.value;

                    // 静音播放
                    videoEl.muted = true;

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

                        stream.getVideoTracks()[0].onended = function () {
                            mediaRecorder.stop();
                        };

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

            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/recorder-screen/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['225']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,11]},{"type":"tag","name":"header","attrs":{"class":"top-title"},"childNodes":[2]},{"type":"tag","name":"div","attrs":{},"childNodes":[3,5,7]},{"type":"tag","name":"button","attrs":{"class":"goback","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"返回","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"startRecorder","ui-bind:active":"isRun?'no':'yes'"},"childNodes":[10]},{"type":"text","content":"启动","childNodes":[]},{"type":"tag","name":"video","attrs":{"ref":"video"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/recorder-screen/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['226']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"recorder-screen\"]{\n\nfont-size: 0;\n\n}\n\n [page-view=\"recorder-screen\"]>button{\n\nposition: absolute;\n\nheight: 30px;\n\nline-height: 30px;\n\npadding: 0 10px;\n\nborder: none;\n\ncursor: pointer;\n\nbackground-color: red;\n\ncolor: white;\n\nborder-radius: 15px;\n\ntop: 7.5px;\n\nright: 45px;\n\nfont-size: 13px;\n\n}\n\n [page-view=\"recorder-screen\"]>button[active='no']{\n\nbackground-color: rgb(239, 139, 139);\n\ncursor: not-allowed;\n\n}\n\n [page-view=\"recorder-screen\"]>video{\n\nwidth: 100vw;\n\nheight: calc(var(--height) - 45px);\n\nbackground-color: black;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
