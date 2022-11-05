
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['37']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('143');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('144');


__pkg__scope_args__=window.__pkg__getBundle('145');
var lazyExamples =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('1');
var useTemplate =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "labory",
        render: template,
        methods: {

            // 打开例子或实验代码
            openExample: function (event) {
                var laboryRootEl = document.getElementById('labory-root');

                var exampleEl = document.createElement('div');
                laboryRootEl.appendChild(exampleEl);

                var pagename = event.target.getAttribute('tag');

                var _this = this;
                exampleEl.setAttribute('example-view', '');
                lazyExamples[pagename]().then(function (viewData) {

                    // 挂载页面
                    var exampleInstance = useTemplate(exampleEl, viewData.default);

                    if ('_name' in exampleInstance) {
                        exampleEl.setAttribute('example-view', exampleInstance._name);
                    }

                    // 注册打开弹框方法
                    exampleInstance.$openDialog = _this.$openDialog;

                    // 注册关闭例子方法
                    exampleInstance.$closeExample = function () {
                        laboryRootEl.removeChild(exampleEl);
                    };

                });

            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            },
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['143']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3,5,7]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click":"doClose"},"childNodes":[2]},{"type":"text","content":"X","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"labory-root"},"childNodes":[4]},{"type":"tag","name":"div","attrs":{"class":"mask"},"childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[6]},{"type":"text","content":"算法","childNodes":[]},{"type":"tag","name":"ul","attrs":{},"childNodes":[8]},{"type":"tag","name":"li","attrs":{},"childNodes":[9,11,12,14,16]},{"type":"tag","name":"h4","attrs":{"tag":"tree","ui-on:click":"openExample"},"childNodes":[10]},{"type":"text","content":"基础树图位置计算","childNodes":[]},{"type":"tag","name":"hr","attrs":{},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[13]},{"type":"text","content":"首先，根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算，这样的好处是可以兼容所有的数据结构。","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[15]},{"type":"text","content":"其次，无论绘制的树结构是什么样子的，计算时都假想目标树的样子如下：1.根结点在最左边，且上下居中；2.树是从左往右生长的结构；3.每个结点都是一块1*1的正方形，top和left分别表示正方形中心的位置。","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[17]},{"type":"text","content":"后续基于此就可以很容易地把任意的数据内容，计算得到复杂的树图结构。","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='labory']{\n\nposition: fixed;\n\nwidth: calc(100vw - 300px);\n\nheight: 100vh;\n\nleft: 150px;\n\nbottom: 0;\n\nbackground-color: white;\n\npadding: 30px;\n\n}\n\n [dialog-view='labory']>button.close{\n\nposition: absolute;\n\nright: 10px;\n\ntop: 10px;\n\nbackground-color: red;\n\noutline: none;\n\nborder: none;\n\ncolor: white;\n\ncursor: pointer;\n\nwidth: 30px;\n\nheight: 30px;\n\nline-height: 30px;\n\ntext-align: center;\n\n}\n\n [dialog-view='labory']>div#labory-root>div.mask{\n\nposition: fixed;\n\nleft: 0;\n\ntop: 0;\n\nwidth: 100vw;\n\nheight: 100vh;\n\nbackground-color: #7b787840;\n\ndisplay: none;\n\n}\n\n [dialog-view='labory']>div#labory-root>div.mask:not(:last-child){\n\ndisplay: block;\n\n}\n\n [dialog-view='labory']>h3{\n\nborder-left: 3px solid red;\n\npadding: 5px 10px;\n\n}\n\n [dialog-view='labory']>ul{\n\nmargin-top: 20px;\n\n}\n\n [dialog-view='labory']>ul>li{\n\nmargin-top: 15px;\n\n}\n\n [dialog-view='labory']>ul>li>h4{\n\ntext-decoration: underline;\n\ncursor: pointer;\n\n}\n\n [dialog-view='labory']>ul>li>hr{\n\nfont-size: 0;\n\nmargin: 5px 0;\n\n}\n\n [dialog-view='labory']>ul>li>div{\n\nfont-size: 12px;\n\ncolor: #607d8b;\n\nline-height: 1.6em;\n\ntext-indent: 2em;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/examples/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 基础树图位置计算
    tree: function () {
        return window.__pkg__getLazyBundle('./dist/main-v0.1.4-bundle22.js','146')
    }

};

    return __pkg__scope_bundle__;
}
