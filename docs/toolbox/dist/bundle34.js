
/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['90']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('330');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('331');


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "job-resume",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Job Resume" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './job-resume.png');
        },
        mounted: function () {

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['330']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"简历制作","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['331']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"job-resume\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 20px;\n\n}\n\n [page-view=\"job-resume\"][focus=\"no\"]>header{\n\nbackground-color: #fafafa;\n\n}\n\n [page-view=\"job-resume\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nbox-shadow: -3px 3px 20px #d2d2db;\n\n}\n\n [page-view=\"job-resume\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./job-resume.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"job-resume\"]>div.content{\n\nheight: calc(100vh - 120px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
