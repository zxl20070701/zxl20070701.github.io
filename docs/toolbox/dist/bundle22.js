
/*************************** [bundle] ****************************/
// Original file:./src/pages/recorder-screen/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['78']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('240');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('241');


__pkg__scope_bundle__.default= function (obj) {
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
// Original file:./src/pages/recorder-screen/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['240']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,11]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,6]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"startRecorder","ui-bind:active":"isRun?'no':'yes'"},"childNodes":[5]},{"type":"text","content":"启动","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[7,9]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[8]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[10]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"video","attrs":{"ref":"video"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/recorder-screen/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['241']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"recorder-screen\"]{\n\nleft: 80px;\n\ntop: 10px;\n\nfont-size: 0;\n\n}\n\n [page-view=\"recorder-screen\"][focus=\"no\"]>header{\n\nbackground-color: #e8eaed;\n\n}\n\n [page-view=\"recorder-screen\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nborder-bottom: 1px solid black;\n\n}\n\n [page-view=\"recorder-screen\"]>header>h2{\n\ncolor: #49b4f1;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./recorder-screen.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"recorder-screen\"]>header>button{\n\nfloat: right;\n\nheight: 30px;\n\npadding: 0 30px;\n\nborder: none;\n\nmargin-top: 10px;\n\ncursor: pointer;\n\nbackground-color: red;\n\ncolor: white;\n\nborder-radius: 15px;\n\nmargin-right: 200px;\n\n}\n\n [page-view=\"recorder-screen\"]>header>button[active='no']{\n\nbackground-color: rgb(239, 139, 139);\n\ncursor: not-allowed;\n\n}\n\n [page-view=\"recorder-screen\"]>video{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 105px);\n\nbackground-color: black;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
