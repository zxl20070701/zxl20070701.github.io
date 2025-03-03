
/*************************** [bundle] ****************************/
// Original file:./src/mobile/notepad/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['93']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('336');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('337');


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "notepad",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "记事本" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './note.png');
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/notepad/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['336']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"header","attrs":{"class":"top-title"},"childNodes":[2]},{"type":"tag","name":"div","attrs":{},"childNodes":[3,5,7]},{"type":"tag","name":"button","attrs":{"class":"goback","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"返回","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"记事本","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/notepad/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['337']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
