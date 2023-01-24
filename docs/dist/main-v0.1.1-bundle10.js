
/*************************** [bundle] ****************************/
// Original file:./src/pages/recorder-screen/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['35']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('144');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('145');


__pkg__scope_bundle__.default= function (obj) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/recorder-screen/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,6]},{"type":"tag","name":"header","attrs":{},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"录屏软件","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"screenRecorder"},"childNodes":[5]},{"type":"text","content":"启动录制","childNodes":[]},{"type":"tag","name":"video","attrs":{"id":"video-id"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/recorder-screen/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\ntext-align: center;\n\n}\n\n [page-view]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbox-shadow: rgb(213 221 225) 0px 4px 6px;\n\nbackground-color: white;\n\n}\n\n [page-view]>header>h2{\n\ncolor: #49b4f1;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./recorder-screen.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view]>header>button{\n\nfloat: right;\n\nheight: 30px;\n\nborder-radius: 15px;\n\npadding: 0 10px;\n\nborder: 1px solid #ffffff;\n\nmargin-top: 10px;\n\nmargin-right: 20px;\n\ncursor: pointer;\n\nbackground-color: red;\n\ncolor: white;\n\n}\n\n [page-view]>video{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 70px);\n\nbackground-color: black;\n\nmargin-top: 10px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
