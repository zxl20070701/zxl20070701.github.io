
/*************************** [bundle] ****************************/
// Original file:./src/mobile/file-manager/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['99']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('336');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('337');


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "file-manager",
        render: template,
        data: {

        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "资源管理器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './file-manager.png');
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/file-manager/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['336']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"class":"top-title"},"childNodes":[2]},{"type":"tag","name":"div","attrs":{},"childNodes":[3,5,7]},{"type":"tag","name":"button","attrs":{"class":"goback","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"返回","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"资源管理器","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"developing-notice"},"childNodes":[10]},{"type":"tag","name":"div","attrs":{"class":"notice-content"},"childNodes":[11,13]},{"type":"tag","name":"h3","attrs":{},"childNodes":[12]},{"type":"text","content":"开发中，敬请期待","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[14]},{"type":"text","content":"该功能正在开发中，敬请期待后续版本。","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/mobile/file-manager/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['337']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"file-manager\"] .developing-notice{\n\ndisplay: flex;\n\njustify-content: center;\n\nalign-items: center;\n\nmin-height: calc(100vh - 60px);\n\npadding: 20px;\n\ntext-align: center;\n\n}\n\n [page-view=\"file-manager\"] .developing-notice .notice-content{\n\nmax-width: 280px;\n\nwidth: 100%;\n\n}\n\n [page-view=\"file-manager\"] .developing-notice .notice-content h3{\n\ncolor: #666;\n\nfont-size: 18px;\n\nmargin: 0 0 10px 0;\n\nfont-weight: 500;\n\n}\n\n [page-view=\"file-manager\"] .developing-notice .notice-content p{\n\ncolor: #999;\n\nfont-size: 14px;\n\nmargin: 0;\n\nline-height: 1.4;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
