
/*************************** [bundle] ****************************/
// Original file:./src/mobile/video-play/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['95']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('327');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('328');


__pkg__scope_bundle__.default= function (obj) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/video-play/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['327']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,11,13]},{"type":"tag","name":"header","attrs":{"class":"top-title"},"childNodes":[2]},{"type":"tag","name":"div","attrs":{},"childNodes":[3,5,7]},{"type":"tag","name":"button","attrs":{"class":"goback","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"返回","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"视频播放器","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"label","attrs":{"for":"videoFile"},"childNodes":[10]},{"type":"text","content":"选择文件","childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:active":"videoSrc?'yes':'no'"},"childNodes":[12]},{"type":"tag","name":"video","attrs":{"ui-bind:src":"videoSrc","controls":""},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"no-view"},"childNodes":[14]},{"type":"tag","name":"input","attrs":{"id":"videoFile","type":"file","accept":"video/*","ui-on:change":"openVideo"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/video-play/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['328']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"video-play\"]>label{\n\nposition: absolute;\n\nheight: 30px;\n\nline-height: 30px;\n\npadding: 0 10px;\n\nborder: none;\n\ncursor: pointer;\n\nbackground-color: red;\n\ncolor: white;\n\nborder-radius: 15px;\n\ntop: 7.5px;\n\nright: 45px;\n\nfont-size: 13px;\n\n}\n\n [page-view=\"video-play\"]>div.no-view{\n\ndisplay: none;\n\n}\n\n [page-view=\"video-play\"]>div[active=\"no\"]{\n\ndisplay: none;\n\n}\n\n [page-view=\"video-play\"]>div>video{\n\nwidth: 100vw;\n\nheight: calc(var(--height) - 45px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
