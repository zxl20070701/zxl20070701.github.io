
/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/system/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['25']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('69');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('70');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "system",
        render: template,
        methods: {

            // 刷新
            doReload: function () {
                window.location.reload(true);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/system/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['69']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"ul","attrs":{},"childNodes":[2,4,5,7,8,10,12]},{"type":"tag","name":"li","attrs":{"class":"btn","ui-on:click":"doReload"},"childNodes":[3]},{"type":"text","content":"刷新","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[6]},{"type":"text","content":"粘贴","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray desktop"},"childNodes":[9]},{"type":"text","content":"修改桌面壁纸","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[11]},{"type":"text","content":"系统信息","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray tool"},"childNodes":[13]},{"type":"text","content":"小工具","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/system/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['70']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [contextmenu-view='system'] .desktop::before{\n\nbackground-image: url('./desktop.jpeg');\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
