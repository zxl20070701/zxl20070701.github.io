
/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/colorful-dice/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['327']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('435');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('436');



__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "code-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {


        }

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/colorful-dice/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['435']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,8,22]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,5]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","target":"_blank"},"childNodes":[4]},{"type":"text","content":"一个旋转的3D彩色骰子","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[6]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[7]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content colorful-dice","ref":"mycontent"},"childNodes":[9]},{"type":"tag","name":"ul","attrs":{},"childNodes":[10,12,14,16,18,20]},{"type":"tag","name":"li","attrs":{},"childNodes":[11]},{"type":"text","content":"1","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[13]},{"type":"text","content":"2","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[15]},{"type":"text","content":"3","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[17]},{"type":"text","content":"4","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[19]},{"type":"text","content":"5","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[21]},{"type":"text","content":"6","childNodes":[]},{"type":"tag","name":"style","attrs":{},"childNodes":[23]},{"type":"text","content":"@keyframes rotate_animation {\r\n        0% {\r\n            transform: rotateY(0) rotateX(360deg);\r\n        }\r\n\r\n        16.7% {\r\n            transform: rotateY(60deg) rotateX(300deg);\r\n        }\r\n\r\n        33.3% {\r\n            transform: rotateY(100deg) rotateX(240deg);\r\n        }\r\n\r\n        50% {\r\n            transform: rotateY(180deg) rotateX(100deg);\r\n        }\r\n\r\n        66.7% {\r\n            transform: rotateY(240deg) rotateX(120deg);\r\n        }\r\n\r\n        83.3% {\r\n            transform: rotateY(330deg) rotateX(60deg);\r\n        }\r\n\r\n        100% {\r\n            transform: rotateY(360deg) rotateX(0deg);\r\n        }\r\n    }","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/colorful-dice/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['436']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view=\"code-example\"]{\n\nheight: 400px;\n\nwidth: 600px;\n\ntop: calc(50vh - 200px);\n\nleft: calc(50vw - 300px);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice{\n\nwidth: 400px;\n\nmargin: auto;\n\nposition: relative;\n\nheight: 350px;\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul{\n\nposition: absolute;\n\ntransform-style: preserve-3d;\n\ntransform: rotateX(45deg);\n\nborder: 1px solid red;\n\nanimation: rotate_animation 3s cubic-bezier(0.34, 0.29, 1, 1) infinite;\n\nmargin-left: calc(50% - 10px);\n\nmargin-top: calc(50% - 60px);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li{\n\nwidth: 120px;\n\nline-height: 100px;\n\nheight: 120px;\n\ntext-align: center;\n\nborder-radius: 20px;\n\nposition: absolute;\n\nborder: 20px solid #f3f5f6;\n\ncolor: white;\n\nfont-size: 30px;\n\nleft: -60px;\n\ntop: -60px;\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li:nth-child(1){\n\ntransform: rotateY(0) translateZ(50px);\n\nbackground: rgb(149, 149, 218);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li:nth-child(2){\n\ntransform: rotateX(-90deg) translateZ(50px);\n\nbackground: rgb(235, 184, 107);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li:nth-child(3){\n\ntransform: rotateY(-90deg) translateZ(50px);\n\nbackground: rgb(90, 218, 31);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li:nth-child(4){\n\ntransform: rotateY(90deg) translateZ(50px);\n\nbackground: rgb(38, 228, 228);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li:nth-child(5){\n\ntransform: rotateX(90deg) translateZ(50px);\n\nbackground: rgb(191, 24, 233);\n\n}\n\n [dialog-view=\"code-example\"] > div.colorful-dice > ul > li:nth-child(6){\n\ntransform: rotateY(180deg) translateZ(50px);\n\nbackground: rgb(236, 9, 20);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
