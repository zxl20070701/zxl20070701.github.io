
/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/wins/geometry/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['254']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('375');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('376');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "geometry",
        render: template,
        data: {
            dragdropPadding: [0, 0, 0, 0]
        },
        methods: {
            addGeometry: function (event, target) {
                props.addGeometry(target.parentElement.getAttribute("name"), 0, 0, 0);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/wins/geometry/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['375']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":"dragdropPadding"},"childNodes":[2]},{"type":"text","content":"立方体","childNodes":[]},{"type":"tag","name":"ul","attrs":{"class":"list"},"childNodes":[4,7,10]},{"type":"tag","name":"li","attrs":{"title":"球体","class":"sphere","name":"sphere"},"childNodes":[5,6]},{"type":"text","content":"球体","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"add","title":"点击我添加球体","ui-on:click":"addGeometry"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"棱柱体","class":"prism","name":"prism"},"childNodes":[8,9]},{"type":"text","content":"棱柱体","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"add","title":"点击我添加棱柱体","ui-on:click":"addGeometry"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"title":"圆柱体","class":"cylinder","name":"cylinder"},"childNodes":[11,12]},{"type":"text","content":"圆柱体","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"add","title":"点击我添加圆柱体","ui-on:click":"addGeometry"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/wins/geometry/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['376']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [win-view='geometry']{\n\nleft: 30px;\n\ntop: 60px;\n\nheight: 500px;\n\nwidth: 100px;\n\nbackground-color: white;\n\n}\n\n [win-view='geometry']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./model-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\nbackground-color: #cad6db;\n\n}\n\n [win-view='geometry']>.list{\n\npadding: 5px 0;\n\n}\n\n [win-view='geometry']>.list>li{\n\ndisplay: inline-block;\n\nwidth: 55px;\n\nline-height: 30px;\n\nmargin: 5px 10px;\n\ntext-align: center;\n\noutline: 1px solid rgb(185, 182, 182);\n\nvertical-align: top;\n\nbackground-size: contain;\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\ncursor: move;\n\nposition: relative;\n\nfont-size: 12px;\n\n}\n\n [win-view='geometry']>.list>li:hover{\n\nbackground-color: #f2f5f6;\n\n}\n\n [win-view='geometry']>.list>li>.add{\n\ndisplay: inline-block;\n\nwidth: 30px;\n\nheight: 30px;\n\nposition: absolute;\n\nright: -30px;\n\nbackground-image: url(\"./add.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-size: 100% auto;\n\nbackground-position: center center;\n\ncursor: pointer;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
