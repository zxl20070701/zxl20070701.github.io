
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['25']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('66');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('67');


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "图片编辑器";
            document.getElementById('icon-logo').setAttribute('href', './image-editor.png');
        },
        methods: {
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['66']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['67']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
