
/*************************** [bundle] ****************************/
// Original file:./src/pages/snake-eating/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['28']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('90');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('91');


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "贪吃蛇";
            document.getElementById('icon-logo').setAttribute('href', './snake-eating.png');
        },
        methods: {
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/snake-eating/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['90']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/snake-eating/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['91']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
