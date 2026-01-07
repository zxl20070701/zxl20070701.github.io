
/*************************** [bundle] ****************************/
// Original file:./src/pages/snipping-tool/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['76']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('185');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('186');


__pkg__scope_args__=window.__pkg__getBundle('187');
var snipping =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/snipping-tool/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['185']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,14,16]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"截图工具","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5,7]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[6]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btns"},"childNodes":[10,12]},{"type":"tag","name":"button","attrs":{"ui-on:click":"snippingWebsite","title":"点击我可以截取本网站内的内容"},"childNodes":[11]},{"type":"text","content":"本系统截图","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"snippingComputer","title":"点击我可以截取电脑（真机）屏幕内容"},"childNodes":[13]},{"type":"text","content":"真机截图","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"canvas"},"childNodes":[15]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btns right"},"childNodes":[17,19]},{"type":"tag","name":"button","attrs":{"class":"link","ui-on:click":"goImageEditor"},"childNodes":[18]},{"type":"text","content":"导入图片编辑器进一步编辑？","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"download","ui-on:click":"download"},"childNodes":[20]},{"type":"text","content":"下载","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/snipping-tool/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['186']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"snipping-tool\"]{\n\nright: 20px;\n\ntop: 20px;\n\nfont-size: 0;\n\nuser-select: none;\n\nmin-width: 300px;\n\n}\n\n [page-view=\"snipping-tool\"][focus=\"no\"]>header{\n\nbackground-color: #e8eaed;\n\n}\n\n [page-view=\"snipping-tool\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nborder-bottom: 1px solid rgb(187, 184, 184);\n\n}\n\n [page-view=\"snipping-tool\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./snipping.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"snipping-tool\"]>div.btns>button{\n\nmargin: 10px;\n\nfont-size: 12px;\n\ncolor: white;\n\nbackground-color: #2196f3;\n\npadding: 2px 5px;\n\ncursor: pointer;\n\nborder: none;\n\noutline: none;\n\n}\n\n [page-view=\"snipping-tool\"]>div.btns>button:not(:last-child){\n\nmargin-right: 0;\n\n}\n\n [page-view=\"snipping-tool\"]>div.btns>button.link{\n\nbackground-color: transparent;\n\ncolor: #607d8b;\n\ntext-decoration: underline;\n\n}\n\n [page-view=\"snipping-tool\"]>div.btns>button.download{\n\nbackground-color: red;\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\n}\n\n [page-view=\"snipping-tool\"]>div.btns.right{\n\ntext-align: right;\n\n}\n\n [page-view=\"snipping-tool\"]>div.btns{\n\nborder-bottom: 1px solid rgb(187, 184, 184);\n\n}\n\n [page-view=\"snipping-tool\"]>div.canvas{\n\npadding: 10px;\n\ntext-align: center;\n\n}\n\n [page-view=\"snipping-tool\"]>div.canvas>canvas{\n\noutline: 1px solid rgb(244, 162, 162);\n\nbackground-image: url('./mosaic.png');\n\nbackground-size: 10px auto;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/snipping/index
/*****************************************************************/
window.__pkg__bundleSrc__['187']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('188');
var elToTemplate =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (el) {
    return new Promise(function (resolve, reject) {
        elToTemplate(el).then(function (template) {

            var width = el.offsetWidth;
            var height = el.offsetHeight;

            var img = document.createElement('img');

            img.setAttribute('width', width);
            img.setAttribute('height', height);
            img.setAttribute('src', "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'><foreignObject width='" + width + "' height='" + height + "' ><body style='margin:0px;' xmlns='http://www.w3.org/1999/xhtml'>" + template + "</body></foreignObject></svg>");

            document.getElementsByTagName('body')[0].appendChild(img);

            setTimeout(function () {

                // 准备画布
                var canvas = document.createElement('canvas');
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);

                var painter = canvas.getContext('2d');

                // 绘制
                painter.drawImage(img, 0, 0);

                img.parentNode.removeChild(img);

                resolve(canvas.toDataURL());
            }, 100);
        });
    });
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/snipping/elToTemplate
/*****************************************************************/
window.__pkg__bundleSrc__['188']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('24');
var getStyle =__pkg__scope_args__.default;


var imgUrlWill = {};
var elToTemplate = function (el) {
    var tagName = el.tagName.toLowerCase();

    var styleTemplate = "";
    var elStyles = getStyle(el);

    for (var index = 0; index < elStyles.length; index++) {
        var keyName = elStyles[index];
        var keyValue = elStyles[keyName];

        // 背景图片
        if (/^background\-image/.test(keyName)) {
            if (/^url\(\".+\"\)$/.test(keyValue)) {
                var imgUrl = keyValue.replace(/^url\(\"/, "").replace(/\"\)$/, "");
                keyValue = encodeURIComponent("@@@@" + imgUrl + "@@@@");
                imgUrlWill[keyValue] = imgUrl;
            }
        }

        styleTemplate += keyName + ":" + keyValue + ";";
    }

    var template = "<" + tagName + " style='" + styleTemplate + "'>";

    for (var index = 0; index < el.childNodes.length; index++) {

        // 排除掉一些特殊的标签和截图工具本身
        if (["SCRIPT", "#comment"].indexOf(el.childNodes[index].nodeName) > -1 || (el.childNodes[index].getAttribute && el.childNodes[index].getAttribute('page-view') == 'snipping-tool')) {
            continue;
        }

        if (el.childNodes[index].nodeType == '3') {
            template += el.childNodes[index].textContent;
        } else if (el.childNodes[index].nodeType == '1') {
            template += elToTemplate(el.childNodes[index]);
        }

    }

    template += "</" + tagName + ">";
    return template;
};

__pkg__scope_bundle__.default= function (el) {
    imgUrlWill = {};
    var template = elToTemplate(el);

    return new Promise(function (resolve, reject) {
        var promises = [];

        for (var key in imgUrlWill) {
            (function (key) {
                promises.push(new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.onload = function () {

                        var canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;

                        var context = canvas.getContext('2d');
                        context.drawImage(img, 0, 0);

                        var base64 = canvas.toDataURL();
                        while (template.match(key)) {
                            template = template.replace(key, "url(" + base64 + ")");
                        }

                        resolve();
                    };
                    img.src = imgUrlWill[key];
                }));
            })(key);
        }

        Promise.all(promises).then(function () {
            resolve(template);
        });
    });
};

    return __pkg__scope_bundle__;
}
