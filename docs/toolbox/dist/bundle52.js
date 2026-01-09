
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/single-wave/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['210']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('337');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('338');


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
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
// Original file:./src/pages/echarts/dialogs/single-wave/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['337']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"旭日图使用视觉编码","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"mycontent"},"childNodes":[11]},{"type":"tag","name":"div","attrs":{"class":"circle"},"childNodes":[12,13]},{"type":"tag","name":"div","attrs":{"class":"wave"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"value"},"childNodes":[14]},{"type":"text","content":"25%","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/single-wave/index.css
/*****************************************************************/
window.__pkg__bundleSrc__['338']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = ".circle {\r\n  width: 400px;\r\n  height: 400px;\r\n  background-color: aliceblue;\r\n  margin: 100px auto;\r\n  border-radius: 50%;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.wave {\r\n  position: absolute;\r\n  left: calc(50% - 400px);\r\n  width: 800px;\r\n  height: 800px;\r\n  background-color: aqua;\r\n  border-radius: 300px;\r\n  top: calc(300px);\r\n  animation: rotate_animation 10s infinite;\r\n}\r\n\r\n.value {\r\n  line-height: 400px;\r\n  font-size: 60px;\r\n}\r\n\r\n@keyframes rotate_animation {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
