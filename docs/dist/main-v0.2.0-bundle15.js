
/*************************** [bundle] ****************************/
// Original file:./src/pages/computer/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['44']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('173');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('174');


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "computer",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "资源管理器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './computer.png');
        },
        mounted: function () {

        },
        methods: {

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/computer/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['173']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"资源管理器","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/computer/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['174']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"computer\"]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 70px);\n\nleft: 80px;\n\ntop: 20px;\n\n}\n\n [page-view=\"computer\"][focus=\"no\"]>header{\n\nbackground-color: rgba(158, 196, 233, 0.85);\n\n}\n\n [page-view=\"computer\"]>header{\n\nbackground-color: rgba(183, 218, 253, 0.85);\n\nborder-bottom: 1px solid gray;\n\n}\n\n [page-view=\"computer\"]>header>h2{\n\nfont-size: 12px;\n\nline-height: 30px;\n\npadding-left: 45px;\n\nbackground-image: url('./computer.png');\n\nbackground-repeat: no-repeat;\n\nbackground-position: 10px center;\n\nbackground-size: auto 90%;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
