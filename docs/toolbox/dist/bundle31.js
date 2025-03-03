
/*************************** [bundle] ****************************/
// Original file:./src/pages/drawio/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['87']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('320');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('321');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "drawio",
        render: template,
        data: {
            
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "draw.io" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './drawio.png');
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
// Original file:./src/pages/drawio/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['320']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"draw.io","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/drawio/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['321']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"draft\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 25px;\n\n}\n\n [page-view=\"draft\"][focus=\"no\"] > header{\n\nbackground-color: #cad5da;\n\n}\n\n [page-view=\"draft\"] > header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #b8c9d1;\n\n}\n\n [page-view=\"draft\"] > header > h2{\n\ncolor: #d5582d;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./draft.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: fangsong;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"draft\"] > .content{\n\nheight: calc(100vh - 150px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
