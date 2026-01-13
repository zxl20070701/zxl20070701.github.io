
/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/dialogs/save/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['265']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('406');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('407');


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "save",
        render: template,
        data: {
            name: obj.ref(props.name),
        },
        methods: {

            // 确定
            doSubmit: function () {

                this.$closeDialog({
                    name: this.name
                });
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/dialogs/save/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['406']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":""},"childNodes":[2]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right-btn"},"childNodes":[4,13]},{"type":"tag","name":"div","attrs":{},"childNodes":[5]},{"type":"tag","name":"fieldset","attrs":{},"childNodes":[6,8]},{"type":"tag","name":"legend","attrs":{},"childNodes":[7]},{"type":"text","content":"基础","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[9]},{"type":"tag","name":"li","attrs":{},"childNodes":[10,12]},{"type":"tag","name":"label","attrs":{},"childNodes":[11]},{"type":"text","content":"名称：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"name"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[14,16]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doSubmit"},"childNodes":[15]},{"type":"text","content":"确定","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doClose"},"childNodes":[17]},{"type":"text","content":"取消","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/dialogs/save/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['407']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='save']{\n\nleft: calc(50vw - 150px);\n\ntop: 100px;\n\nmin-height: 300px;\n\nwidth: 300px;\n\nbackground-color: white;\n\n}\n\n [dialog-view='save']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./model-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\nbackground-color: #cad6db;\n\n}\n\n [dialog-view='save']>div.right-btn{\n\ndisplay: flex;\n\n}\n\n [dialog-view='save']>div.right-btn>div:first-child{\n\nflex-grow: 1;\n\npadding: 10px 0 10px 10px;\n\n}\n\n [dialog-view='save']>div.right-btn>div:last-child{\n\ntext-align: center;\n\nflex-grow: 0;\n\nflex-shrink: 0;\n\nflex-basis: 70px;\n\n}\n\n [dialog-view='save']>div.right-btn>div:last-child>button{\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\nmargin-top: 10px;\n\n}\n\n [dialog-view='save']>div.right-btn>div:last-child>button:hover{\n\nbackground-color: rgb(127, 131, 131);\n\ncursor: pointer;\n\n}\n\n [dialog-view='save'] fieldset{\n\nmargin-top: 10px;\n\nfont-size: 12px;\n\n}\n\n [dialog-view='save'] ul>li{\n\nline-height: 2em;\n\nmargin-top: 5px;\n\nwhite-space: nowrap;\n\n}\n\n [dialog-view='save'] ul>li>label{\n\nwidth: 40px;\n\ndisplay: inline-block;\n\ntext-align: right;\n\n}\n\n [dialog-view='save'] ul>li>input{\n\nwidth: 150px;\n\nmargin-right: 5px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
