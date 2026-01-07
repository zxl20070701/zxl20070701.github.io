
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/layer/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['147']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('226');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('227');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "layer",
        render: template,
        data: {
            dragdropPadding: [30, 0, 0, 0]
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/layer/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['226']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":"dragdropPadding"},"childNodes":[2]},{"type":"text","content":"图层","childNodes":[]},{"type":"tag","name":"ul","attrs":{"class":"list","ref":"layerList"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/wins/layer/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['227']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [win-view='layer']{\n\nright: 30px;\n\ntop: 140px;\n\nborder: 1px solid gray;\n\nmin-height: 300px;\n\nwidth: 160px;\n\nbackground-color: white;\n\n}\n\n [win-view='layer']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./image-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nborder-bottom: 1px solid gray;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\n}\n\n [win-view='layer']>.list{\n\nmax-height: 300px;\n\noverflow: auto;\n\n}\n\n [win-view='layer']>.list>li{\n\nborder-bottom: 1px solid #d7d6d6;\n\ncursor: pointer;\n\nposition: relative;\n\n}\n\n [win-view='layer']>.list>li[active='yes']{\n\nbackground-color: #607d8b40;\n\n}\n\n [win-view='layer']>.list>li>i, [win-view='layer']>.list>li>span{\n\ndisplay: inline-block;\n\nvertical-align: top;\n\n}\n\n [win-view='layer']>.list>li::before{\n\nwidth: 26px;\n\nheight: 26px;\n\ndisplay: inline-block;\n\nbackground-image: url(\"./mosaic.png\");\n\nbackground-size: 10px auto;\n\ncontent: \" \";\n\nposition: absolute;\n\nleft: 2px;\n\ntop: 2px;\n\n}\n\n [win-view='layer']>.list>li>i{\n\nwidth: 26px;\n\nheight: 26px;\n\nbackground-size: contain;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nmargin: 2px;\n\nborder: 1px solid #d7d6d6;\n\nposition: relative;\n\n}\n\n [win-view='layer']>.list>li>span{\n\nfont-size: 12px;\n\nheight: 30px;\n\nline-height: 30px;\n\nwidth: calc(100% - 30px);\n\nwhite-space: nowrap;\n\ntext-overflow: ellipsis;\n\noverflow: hidden;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
