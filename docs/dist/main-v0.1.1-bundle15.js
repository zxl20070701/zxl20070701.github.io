
/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/dialogs/size/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['109']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('167');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('168');


__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "size",
        render: template,
        data: {
            title: props.title,
            width: props.width,
            height: props.height,

            newWidth: obj.ref(props.width),
            newHeight: obj.ref(props.height),

            changeType: obj.ref('center-middle')
        },
        methods: {

            calcHeight() {
                if (this.title == '图像大小') {
                    this.newHeight = +(this.newWidth * this.height / this.width).toFixed(0);
                }
            },

            calcWidth() {
                if (this.title == '图像大小') {
                    this.newWidth = +(this.newHeight * this.width / this.height).toFixed(0);
                }
            },

            doChangeType: function (event) {
                this.changeType = event.target.getAttribute('val');
            },

            // 确定
            doSubmit: function () {
                this.$closeDialog({
                    width: +this.newWidth,
                    height: +this.newHeight,
                    changeType: this.changeType
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
// Original file:./src/pages/image-editor/dialogs/size/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['167']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,2]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":"","ui-bind":"title"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right-btn"},"childNodes":[3,45]},{"type":"tag","name":"div","attrs":{},"childNodes":[4,18]},{"type":"tag","name":"fieldset","attrs":{},"childNodes":[5,7]},{"type":"tag","name":"legend","attrs":{},"childNodes":[6]},{"type":"text","content":"当前大小","childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:lock":"title=='图像大小'?'yes':'no'"},"childNodes":[8,13]},{"type":"tag","name":"li","attrs":{},"childNodes":[9,11,12]},{"type":"tag","name":"label","attrs":{},"childNodes":[10]},{"type":"text","content":"宽度：","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-bind":"width"},"childNodes":[]},{"type":"text","content":"px","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[14,16,17]},{"type":"tag","name":"label","attrs":{},"childNodes":[15]},{"type":"text","content":"宽度：","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-bind":"height"},"childNodes":[]},{"type":"text","content":"px","childNodes":[]},{"type":"tag","name":"fieldset","attrs":{},"childNodes":[19,21]},{"type":"tag","name":"legend","attrs":{},"childNodes":[20]},{"type":"text","content":"新建大小","childNodes":[]},{"type":"tag","name":"ul","attrs":{"ui-bind:lock":"title=='图像大小'?'yes':'no'"},"childNodes":[22,27,32]},{"type":"tag","name":"li","attrs":{},"childNodes":[23,25,26]},{"type":"tag","name":"label","attrs":{},"childNodes":[24]},{"type":"text","content":"宽度(W)：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"newWidth","ui-on:input":"calcHeight"},"childNodes":[]},{"type":"text","content":"px","childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[28,30,31]},{"type":"tag","name":"label","attrs":{},"childNodes":[29]},{"type":"text","content":"高度(H)：","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"newHeight","ui-on:input":"calcWidth"},"childNodes":[]},{"type":"text","content":"px","childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:active":"title=='画布大小'?'yes':'no'"},"childNodes":[33,35]},{"type":"tag","name":"label","attrs":{},"childNodes":[34]},{"type":"text","content":"定位：","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"change-type","ui-bind:type":"changeType"},"childNodes":[36,37,38,39,40,41,42,43,44]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"left-top"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"center-top"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"right-top"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"left-middle"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"center-middle"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"right-middle"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"left-bottom"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"center-bottom"},"childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"doChangeType","val":"right-bottom"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[46,48]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doSubmit"},"childNodes":[47]},{"type":"text","content":"确定","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doClose"},"childNodes":[49]},{"type":"text","content":"取消","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/image-editor/dialogs/size/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['168']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='size']{\n\nposition: fixed;\n\nleft: calc(50vw - 150px);\n\ntop: 100px;\n\nborder: 1px solid gray;\n\nmin-height: 300px;\n\nwidth: 300px;\n\nbackground-color: white;\n\n}\n\n [dialog-view='size']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./image-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nborder-bottom: 1px solid gray;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\n}\n\n [dialog-view='size']>div.right-btn{\n\ndisplay: flex;\n\n}\n\n [dialog-view='size']>div.right-btn>div:first-child{\n\nflex-grow: 1;\n\npadding: 10px 0 10px 10px;\n\n}\n\n [dialog-view='size']>div.right-btn>div:last-child{\n\ntext-align: center;\n\nflex-grow: 0;\n\nflex-shrink: 0;\n\nflex-basis: 70px;\n\n}\n\n [dialog-view='size']>div.right-btn>div:last-child>button{\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\nmargin-top: 10px;\n\n}\n\n [dialog-view='size']>div.right-btn>div:last-child>button:hover{\n\nbackground-color: rgb(127, 131, 131);\n\ncursor: pointer;\n\n}\n\n [dialog-view='size'] fieldset{\n\nmargin-top: 10px;\n\nfont-size: 12px;\n\n}\n\n [dialog-view='size'] ul[lock='yes']{\n\nbackground-image: url('./lock.png');\n\nbackground-repeat: no-repeat;\n\nbackground-position: right;\n\n}\n\n [dialog-view='size'] ul>li{\n\nline-height: 2em;\n\nmargin-top: 5px;\n\n}\n\n [dialog-view='size'] ul>li[active='no']{\n\ndisplay: none;\n\n}\n\n [dialog-view='size'] ul>li>label{\n\nwidth: 70px;\n\ndisplay: inline-block;\n\ntext-align: right;\n\n}\n\n [dialog-view='size'] ul>li>input{\n\nwidth: 50px;\n\nmargin-right: 5px;\n\n}\n\n [dialog-view='size'] ul>li .change-type{\n\nfont-size: 0;\n\nwidth: 90px;\n\ndisplay: inline-block;\n\nline-height: 0;\n\nvertical-align: top;\n\nbackground-image: url('./size.png');\n\nbackground-size: 100% auto;\n\nbackground-repeat: no-repeat;\n\n}\n\n [dialog-view='size'] ul>li .change-type>span{\n\ndisplay: inline-block;\n\nwidth: 30px;\n\nheight: 30px;\n\ncursor: pointer;\n\noutline: 1px solid #dedede;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='left-top']{\n\nbackground-position: -29px -32px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='center-top']{\n\nbackground-position: 1px -32px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='right-top']{\n\nbackground-position: 30px -32px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='left-middle']{\n\nbackground-position: -29px -1px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='center-middle']{\n\nbackground-position: 1px -1px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='right-middle']{\n\nbackground-position: 30px -1px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='left-bottom']{\n\nbackground-position: -29px 30px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='center-bottom']{\n\nbackground-position: 1px 30px;\n\n}\n\n [dialog-view='size'] ul>li .change-type[type='right-bottom']{\n\nbackground-position: 30px 30px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
