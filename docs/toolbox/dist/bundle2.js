
/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/desktop-line/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['28']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('58');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('59');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "desktop-line",
        render: template,
        methods: {

            // 回到桌面
            goDesktop: function () {
                window._minAllView_();
            }

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/desktop-line/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['58']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"ul","attrs":{},"childNodes":[2,4,6,8,9]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[3]},{"type":"text","content":"设置工具栏","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[5]},{"type":"text","content":"层叠显示所有窗口","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[7]},{"type":"text","content":"退出所有应用","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn","ui-on:click":"goDesktop"},"childNodes":[10]},{"type":"text","content":"回到桌面","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/desktop-line/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['59']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
