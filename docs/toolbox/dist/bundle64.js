
/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/dialogs/geometry/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['255']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('389');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('390');


__pkg__scope_bundle__.default= function (obj, props) {

    var kindName = {
        sphere: "球体",
        prism: "棱柱体",
        cylinder: "圆柱体"
    }[props.kind];

    return {
        name: "geometry",
        render: template,
        data: {
            kind: props.kind,
            kindName: kindName,
            name: props.name,
            x: props.x,
            y: props.y,
            z: props.z,
            radius: 0.2,
            x2: props.x,
            y2: props.y + 0.5,
            z2: props.z,
            count: 7
        },
        methods: {

            // 确定
            doSubmit: function () {
                this.$closeDialog({
                    name: this.name,
                    geometry: {
                        sphere: [+this.x, +this.y, +this.z, +this.radius],
                        prism: [+this.x, +this.y, +this.z, +this.radius, +this.x2, +this.y2, +this.z2, +this.count],
                        cylinder: [+this.x, +this.y, +this.z, +this.radius, +this.x2, +this.y2, +this.z2]
                    }[props.kind]
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
// Original file:./src/pages/model-editor/dialogs/geometry/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['389']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,4]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":""},"childNodes":[2,3]},{"type":"text","content":"添加","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-bind":"kindName"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right-btn"},"childNodes":[5,36]},{"type":"tag","name":"div","attrs":{},"childNodes":[6]},{"type":"tag","name":"fieldset","attrs":{},"childNodes":[7,9]},{"type":"tag","name":"legend","attrs":{},"childNodes":[8]},{"type":"text","content":"基础","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[10,14,22,28,32]},{"type":"tag","name":"li","attrs":{},"childNodes":[11,13]},{"type":"tag","name":"label","attrs":{},"childNodes":[12]},{"type":"text","content":"名称：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"name"},"childNodes":[]},{"type":"tag","name":"li","attrs":{},"childNodes":[15,17,19,20,21]},{"type":"tag","name":"label","attrs":{"ui-bind:active":"kind=='sphere'?'yes':'no'"},"childNodes":[16]},{"type":"text","content":"球心：","childNodes":[]},{"type":"tag","name":"label","attrs":{"ui-bind:active":"kind=='prism'||kind=='cylinder'?'yes':'no'"},"childNodes":[18]},{"type":"text","content":"起点：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"x","class":"slice"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"y","class":"slice"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"z","class":"slice"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:active":"kind=='prism'||kind=='cylinder'?'yes':'no'"},"childNodes":[23,25,26,27]},{"type":"tag","name":"label","attrs":{},"childNodes":[24]},{"type":"text","content":"终点：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"x2","class":"slice"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"y2","class":"slice"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"z2","class":"slice"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:active":"kind=='sphere'||kind=='prism'||kind=='cylinder'?'yes':'no'"},"childNodes":[29,31]},{"type":"tag","name":"label","attrs":{},"childNodes":[30]},{"type":"text","content":"半径：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"radius","class":"slice"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:active":"kind=='prism'?'yes':'no'"},"childNodes":[33,35]},{"type":"tag","name":"label","attrs":{},"childNodes":[34]},{"type":"text","content":"棱数：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"count","class":"slice"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[37,39]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doSubmit"},"childNodes":[38]},{"type":"text","content":"确定","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doClose"},"childNodes":[40]},{"type":"text","content":"取消","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/dialogs/geometry/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['390']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='geometry']{\n\nleft: calc(50vw - 150px);\n\ntop: 100px;\n\nmin-height: 300px;\n\nwidth: 300px;\n\nbackground-color: white;\n\n}\n\n [dialog-view='geometry'] [active=\"no\"]{\n\ndisplay: none;\n\n}\n\n [dialog-view='geometry']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./model-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\nbackground-color: #cad6db;\n\n}\n\n [dialog-view='geometry']>div.right-btn{\n\ndisplay: flex;\n\n}\n\n [dialog-view='geometry']>div.right-btn>div:first-child{\n\nflex-grow: 1;\n\npadding: 10px 0 10px 10px;\n\n}\n\n [dialog-view='geometry']>div.right-btn>div:last-child{\n\ntext-align: center;\n\nflex-grow: 0;\n\nflex-shrink: 0;\n\nflex-basis: 70px;\n\n}\n\n [dialog-view='geometry']>div.right-btn>div:last-child>button{\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\nmargin-top: 10px;\n\n}\n\n [dialog-view='geometry']>div.right-btn>div:last-child>button:hover{\n\nbackground-color: rgb(127, 131, 131);\n\ncursor: pointer;\n\n}\n\n [dialog-view='geometry'] fieldset{\n\nmargin-top: 10px;\n\nfont-size: 12px;\n\n}\n\n [dialog-view='geometry'] ul>li{\n\nline-height: 2em;\n\nmargin-top: 5px;\n\nwhite-space: nowrap;\n\n}\n\n [dialog-view='geometry'] ul>li>label{\n\nwidth: 40px;\n\ndisplay: inline-block;\n\ntext-align: right;\n\n}\n\n [dialog-view='geometry'] ul>li>input, [dialog-view='geometry'] ul>li select{\n\nwidth: 150px;\n\nmargin-right: 5px;\n\n}\n\n [dialog-view='geometry'] ul>li>input.slice, [dialog-view='geometry'] ul>li select.slice{\n\nwidth: 47px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
