
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/dialogs/save/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['129']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('208');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('209');


__pkg__scope_bundle__.default= function (obj, props) {

    var width = props.width < 218 ? props.width : 218;
    var height = width / props.width * props.height;

    if (height > 300) {
        height = 300;
        width = 300 / props.height * props.width;
    }

    return {
        name: "save",
        render: template,
        data: {
            name: obj.ref(props.name),
            base64: obj.ref(props.painter.toDataURL()),
            height: height,
            width: width
        },
        methods: {

            // 确定
            doSubmit: function () {
                var formatEl = this._refs.format.value;

                this.$closeDialog({
                    name: this.name,
                    format: [formatEl.value, formatEl.value.replace("image\/", "")]
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
// Original file:./src/pages/image-editor/dialogs/save/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['208']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":""},"childNodes":[2]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right-btn"},"childNodes":[4,23]},{"type":"tag","name":"div","attrs":{},"childNodes":[5,21]},{"type":"tag","name":"fieldset","attrs":{},"childNodes":[6,8]},{"type":"tag","name":"legend","attrs":{},"childNodes":[7]},{"type":"text","content":"基础","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[9,13]},{"type":"tag","name":"li","attrs":{},"childNodes":[10,12]},{"type":"tag","name":"label","attrs":{},"childNodes":[11]},{"type":"text","content":"名称：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"name"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[14,16]},{"type":"tag","name":"label","attrs":{},"childNodes":[15]},{"type":"text","content":"格式：","childNodes":[]},{"type":"tag","name":"select","attrs":{"ref":"format"},"childNodes":[17,19]},{"type":"tag","name":"option","attrs":{"value":"image/png"},"childNodes":[18]},{"type":"text","content":"png","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"image/jpeg"},"childNodes":[20]},{"type":"text","content":"jpeg","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"review","title":"预览","ui-bind:style":"'width:'+width+'px;height:'+height+'px;'"},"childNodes":[22]},{"type":"tag","name":"span","attrs":{"ui-bind:style":"'background-image:url('+base64+');'"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[24,26]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doSubmit"},"childNodes":[25]},{"type":"text","content":"确定","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doClose"},"childNodes":[27]},{"type":"text","content":"取消","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/dialogs/save/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['209']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='save']{\n\nleft: calc(50vw - 150px);\n\ntop: 100px;\n\nborder: 1px solid gray;\n\nmin-height: 300px;\n\nwidth: 300px;\n\nbackground-color: white;\n\n}\n\n [dialog-view='save']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./image-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nborder-bottom: 1px solid gray;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\n}\n\n [dialog-view='save']>div.right-btn{\n\ndisplay: flex;\n\n}\n\n [dialog-view='save']>div.right-btn>div:first-child{\n\nflex-grow: 1;\n\npadding: 10px 0 10px 10px;\n\n}\n\n [dialog-view='save']>div.right-btn>div:last-child{\n\ntext-align: center;\n\nflex-grow: 0;\n\nflex-shrink: 0;\n\nflex-basis: 70px;\n\n}\n\n [dialog-view='save']>div.right-btn>div:last-child>button{\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\nmargin-top: 10px;\n\n}\n\n [dialog-view='save']>div.right-btn>div:last-child>button:hover{\n\nbackground-color: rgb(127, 131, 131);\n\ncursor: pointer;\n\n}\n\n [dialog-view='save'] fieldset{\n\nmargin-top: 10px;\n\nfont-size: 12px;\n\n}\n\n [dialog-view='save'] ul>li{\n\nline-height: 2em;\n\nmargin-top: 5px;\n\nwhite-space: nowrap;\n\n}\n\n [dialog-view='save'] ul>li>label{\n\nwidth: 40px;\n\ndisplay: inline-block;\n\ntext-align: right;\n\n}\n\n [dialog-view='save'] ul>li>input, [dialog-view='save'] ul>li select{\n\nwidth: 150px;\n\nmargin-right: 5px;\n\n}\n\n [dialog-view='save'] .review{\n\nmargin: 9px auto;\n\noutline: 1px solid gray;\n\nposition: relative;\n\n}\n\n [dialog-view='save'] .review::before{\n\nwidth: 100%;\n\nheight: 100%;\n\ndisplay: inline-block;\n\nbackground-image: url(./mosaic.png);\n\nbackground-size: 10px auto;\n\ncontent: \" \";\n\nposition: absolute;\n\nleft: 0;\n\ntop: 0;\n\n}\n\n [dialog-view='save'] .review>span{\n\ndisplay: inline-block;\n\nwidth: 100%;\n\nheight: 100%;\n\nbackground-position: center center;\n\nbackground-size: contain;\n\nbackground-repeat: no-repeat;\n\nposition: relative;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
