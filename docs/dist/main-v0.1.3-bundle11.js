
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/debugger/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['34']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('107');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('108');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "debugger",
        render: template,
        data: {

        },
        methods: {

        },
        mounted: function () {
            var index;

            // 初始化console
            for (index = 0; index < window._consoleArray_.length; index++) {
                window._consoleAppend_(window._consoleArray_[index]);
            }

        }
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/debugger/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['107']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,5]},{"type":"tag","name":"header","attrs":{"ui-dragdrop":""},"childNodes":[2,3]},{"type":"text","content":"调试窗口","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"$closeDialog"},"childNodes":[4]},{"type":"text","content":"X","childNodes":[]},{"type":"tag","name":"ul","attrs":{"id":"console-el"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/debugger/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['108']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='debugger']{\n\nwidth: 340px;\n\nheight: calc(100vh - 60px);\n\nposition: fixed;\n\nleft: calc(50vw - 170px);\n\ntop: 30px;\n\nbackground-color: white;\n\nbox-shadow: 0 0 12px 0px #607d8b;\n\n}\n\n [dialog-view='debugger']>header{\n\nbackground-color: #f44336;\n\ncolor: white;\n\nfont-size: 12px;\n\npadding-left: 10px;\n\nline-height: 30px;\n\nposition: relative;\n\n}\n\n [dialog-view='debugger']>header>span{\n\nfont-style: normal;\n\nwidth: 30px;\n\nheight: 30px;\n\nfloat: right;\n\ntext-align: center;\n\ncursor: pointer;\n\n}\n\n [dialog-view='debugger']>ul{\n\nheight: calc(100% - 30px);\n\noverflow: auto;\n\nfont-size: 14px;\n\nfont-weight: 200;\n\n}\n\n [dialog-view='debugger']>ul>li{\n\nborder-bottom: 1px solid #e2e1e1;\n\npadding: 5px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
