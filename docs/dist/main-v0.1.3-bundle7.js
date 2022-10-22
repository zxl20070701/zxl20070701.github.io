
/*************************** [bundle] ****************************/
// Original file:./src/pages/video-play/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['29']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('98');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('99');


__pkg__scope_bundle__.default= function (obj) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/video-play/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['98']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"div","attrs":{"class":"video","ui-bind:is-null":"videoSrc==\"\"?\"yes\":\"no\""},"childNodes":[2,3,7]},{"type":"tag","name":"video","attrs":{"ui-bind:src":"videoSrc","width":"960px","height":"540px","id":"video"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"open"},"childNodes":[4,6]},{"type":"tag","name":"label","attrs":{"for":"file","title":"点击我选择打开的视频"},"childNodes":[5]},{"type":"text","content":"选择视频","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"file","ui-on:change":"selectVideo","accept":"video/*","id":"file"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"controls"},"childNodes":[8,10,12]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doPlay","class":"play","ui-bind:is-hidden":"isPlay?\"yes\":\"no\""},"childNodes":[9]},{"type":"text","content":"播放","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doPause","class":"pause","ui-bind:is-hidden":"isPlay?\"no\":\"yes\""},"childNodes":[11]},{"type":"text","content":"暂停","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doFull","class":"full"},"childNodes":[13]},{"type":"text","content":"最大化","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/video-play/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['99']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\ntext-align: center;\n\npadding-top: calc(50vh - 300px);\n\n}\n\n [page-view] .video{\n\nwidth: 960px;\n\ndisplay: inline-block;\n\nposition: relative;\n\n}\n\n [page-view] .video>video{\n\nbackground-color: black;\n\n}\n\n [page-view] .video>.open{\n\nposition: absolute;\n\nz-index: 1;\n\n}\n\n [page-view] .video>.open>label{\n\ndisplay: inline-block;\n\nfont-size: 0;\n\nbackground-image: url('./video-play.png');\n\nbackground-size: 100% auto;\n\ncursor: pointer;\n\n}\n\n [page-view] .video>.open>input{\n\ndisplay: none;\n\n}\n\n [page-view] .video>.controls{\n\ndisplay: inline-block;\n\nwidth: 960px;\n\nheight: 50px;\n\nbackground-color: white;\n\ntext-align: left;\n\npadding-left: 60px;\n\nposition: relative;\n\ntop: -3px;\n\noutline: 1px solid #607d8b;\n\n}\n\n [page-view] .video>.controls>button{\n\nheight: 100%;\n\nwidth: 50px;\n\nbackground-color: transparent;\n\noutline: none;\n\nborder: none;\n\ncursor: pointer;\n\nbackground-size: 100% auto;\n\nfont-size: 0;\n\n}\n\n [page-view] .video>.controls>button.play{\n\nbackground-image: url('./start.png');\n\n}\n\n [page-view] .video>.controls>button.pause{\n\nbackground-image: url('./pause.png');\n\n}\n\n [page-view] .video>.controls>button.full{\n\nfloat: right;\n\nbackground-image: url('./full.png');\n\nfont-size: 0;\n\nbackground-repeat: no-repeat;\n\nbackground-size: 65% auto;\n\nbackground-position: center center;\n\n}\n\n [page-view] .video>.controls>button.full:hover{\n\nbackground-size: 70% auto;\n\n}\n\n [page-view] .video>.controls>[is-hidden='yes']{\n\ndisplay: none;\n\n}\n\n [page-view] .video[is-null='yes']>.controls{\n\ndisplay: none;\n\n}\n\n [page-view] .video[is-null='yes']>.open{\n\nleft: 405px;\n\ntop: 195px;\n\n}\n\n [page-view] .video[is-null='yes']>.open>label{\n\nwidth: 150px;\n\nheight: 150px;\n\n}\n\n [page-view] .video[is-null='no']>.open{\n\nleft: 5px;\n\ntop: 525px;\n\n}\n\n [page-view] .video[is-null='no']>.open>label{\n\nwidth: 50px;\n\nheight: 50px;\n\nborder-right: 1px solid #9e9e9e;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
