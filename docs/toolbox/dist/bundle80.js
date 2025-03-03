
/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/textarea-eraser/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['326']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('433');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('434');



__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "code-example",
        render: template,
        data: {
            srcUrl: props.srcUrl,
            text: "嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！"
        },
        mounted: function () {


        }

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/textarea-eraser/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['433']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,8,12]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,5]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","target":"_blank"},"childNodes":[4]},{"type":"text","content":"一个简单的多行文本擦除显示动画效果","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[6]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[7]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content textarea-eraser","ref":"mycontent"},"childNodes":[9,10]},{"type":"tag","name":"p","attrs":{"ui-bind":"text"},"childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"help"},"childNodes":[11]},{"type":"tag","name":"span","attrs":{"ui-bind":"text"},"childNodes":[]},{"type":"tag","name":"style","attrs":{},"childNodes":[13]},{"type":"text","content":"@property --p {\r\n    syntax: '<percentage>';\r\n    initial-value: 0%;\r\n    inherits: false;\r\n}\r\n\r\n@keyframes erase_animation {\r\n    to {\r\n        --p: 100%;\r\n    }\r\n}","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/textarea-eraser/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['434']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view=\"code-example\"]{\n\nheight: 400px;\n\nwidth: 600px;\n\ntop: calc(50vh - 200px);\n\nleft: calc(50vw - 300px);\n\n}\n\n [dialog-view=\"code-example\"] > div.textarea-eraser{\n\nwidth: 400px;\n\nmargin: auto;\n\nposition: relative;\n\n}\n\n [dialog-view=\"code-example\"] > div.textarea-eraser > p{\n\ntext-align: left;\n\ntext-indent: 2em;\n\nline-height: 1.8em;\n\npadding-top: 75px;\n\ncolor: #212332;\n\nfont-weight: 800;\n\nfont-style: italic;\n\nfont-family: system-ui;\n\ntext-decoration: overline;\n\n}\n\n [dialog-view=\"code-example\"] > div.textarea-eraser > p.help{\n\nposition: absolute;\n\ntop: 0;\n\n}\n\n [dialog-view=\"code-example\"] > div.textarea-eraser > p.help > span{\n\nbackground: linear-gradient(\r\n            to right,\r\n            transparent var(--p),\r\n            #fff calc(var(--p) + 30px)\r\n          );\n\ncolor: transparent;\n\nanimation: erase_animation 5s linear forwards;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
