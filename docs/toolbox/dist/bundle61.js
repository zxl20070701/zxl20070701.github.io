
/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/wins/modify/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['253']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('370');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('371');


var cacheData = {}, handler;
__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "modify",
        render: template,
        data: {
            dragdropPadding: [0, 0, 0, 0],
            isEmpty: obj.ref(true),
            name: obj.ref("")
        },
        methods: {
            initData: function (data, _handler) {
                if (data) {
                    cacheData = data;
                    this.setData();
                } else {
                    cacheData = {};
                }
                handler = _handler;
                this.isEmpty = !data;
            },
            setData: function () {
                for (var key in cacheData) {
                    this[key] = cacheData[key];
                }
            },
            doSave: function () {
                handler.save({
                    name: this.name
                });
            },
            doReset: function () {
                this.setData();
            },
            doDelete: function () {
                if (confirm("确定删除【" + this.name + "】吗？")) {
                    handler.delete();
                    this.initData();
                }
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/wins/modify/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['370']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3,20]},{"type":"tag","name":"h2","attrs":{"ui-dragdrop":"dragdropPadding"},"childNodes":[2]},{"type":"text","content":"修改器","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"right-btn","ui-bind:active":"!isEmpty?'yes':'no'"},"childNodes":[4,13]},{"type":"tag","name":"div","attrs":{},"childNodes":[5]},{"type":"tag","name":"fieldset","attrs":{},"childNodes":[6,8]},{"type":"tag","name":"legend","attrs":{},"childNodes":[7]},{"type":"text","content":"基础","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[9]},{"type":"tag","name":"li","attrs":{},"childNodes":[10,12]},{"type":"tag","name":"label","attrs":{},"childNodes":[11]},{"type":"text","content":"名称：","childNodes":[]},{"type":"tag","name":"input","attrs":{"ui-model":"name"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[14,16,18]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doSave"},"childNodes":[15]},{"type":"text","content":"保存","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doReset"},"childNodes":[17]},{"type":"text","content":"重置","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"delete","ui-on:click":"doDelete"},"childNodes":[19]},{"type":"text","content":"删除","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"empty","ui-bind:active":"isEmpty?'yes':'no'"},"childNodes":[21]},{"type":"text","content":"未选中物体","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/wins/modify/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['371']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [win-view='modify']{\n\nright: 30px;\n\ntop: 140px;\n\nheight: 400px;\n\nwidth: 300px;\n\nbackground-color: white;\n\n}\n\n [win-view='modify']>h2{\n\nfont-size: 12px;\n\npadding-left: 30px;\n\nbackground-image: url('./model-editor.png');\n\nbackground-size: auto 80%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 3px center;\n\nline-height: 30px;\n\nheight: 30px;\n\nuser-select: none;\n\nbackground-color: #cad6db;\n\n}\n\n [win-view='modify']>div.right-btn{\n\ndisplay: flex;\n\n}\n\n [win-view='modify']>div.right-btn>div:first-child{\n\nflex-grow: 1;\n\npadding: 10px 0 10px 10px;\n\n}\n\n [win-view='modify']>div.right-btn>div:last-child{\n\ntext-align: center;\n\nflex-grow: 0;\n\nflex-shrink: 0;\n\nflex-basis: 70px;\n\n}\n\n [win-view='modify']>div.right-btn>div:last-child>button{\n\nheight: 30px;\n\nborder-radius: 15px;\n\nwidth: 50px;\n\nmargin-top: 10px;\n\n}\n\n [win-view='modify']>div.right-btn>div:last-child>button:hover{\n\nbackground-color: rgb(127, 131, 131);\n\ncursor: pointer;\n\n}\n\n [win-view='modify']>div.right-btn>div:last-child>button.delete{\n\nbackground-color: red;\n\ncolor: white;\n\nborder: none;\n\n}\n\n [win-view='modify']>div.right-btn>div:last-child>button.delete:hover{\n\nbackground-color: #c72115;\n\n}\n\n [win-view='modify'] fieldset{\n\nmargin-top: 10px;\n\nfont-size: 12px;\n\n}\n\n [win-view='modify'] ul>li{\n\nline-height: 2em;\n\nmargin-top: 5px;\n\nwhite-space: nowrap;\n\n}\n\n [win-view='modify'] ul>li>label{\n\nwidth: 40px;\n\ndisplay: inline-block;\n\ntext-align: right;\n\n}\n\n [win-view='modify'] ul>li>input, [win-view='modify'] ul>li select{\n\nwidth: 150px;\n\nmargin-right: 5px;\n\n}\n\n [win-view='modify']>div.empty{\n\npadding-top: 100px;\n\ntext-align: center;\n\nfont-size: 20px;\n\nfont-family: cursive;\n\ncolor: #9E9E9E;\n\n}\n\n [win-view='modify']>div[active='no']{\n\ndisplay: none;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}
