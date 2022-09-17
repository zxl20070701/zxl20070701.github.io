
/*************************** [bundle] ****************************/
// Original file:./src/pages/home/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['21']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('24');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('25');


__pkg__scope_bundle__.default= function (obj) {
    return {

        // 模板
        render: template,

        // 数据
        data: {
            searchInput: obj.ref("")
        },

        // 方法
        methods: {
            doSearch: function (event) {
                if (event.keyCode == 13) {
                    alert('当前内容较少，查询功能未支持！');
                    this.searchInput = "";
                }
            }
        },

        // 挂载前
        beforeMount: function () {

        },

        // 挂载后
        mounted: function () {

        },

        // 数据改变前
        beforeUpdate: function () {
            console.log(this.searchInput)
        },

        // 数据改变后
        updated: function () {

        }

    };
};
    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/home/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['24']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"header","attrs":{},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"清单&列表","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","placeholder":"输入内容后回车查询","ui-on:keydown":"doSearch","ui-model":"searchInput"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/home/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['25']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nwidth: 700px;\n\nbackground-color: white;\n\nmin-height: 100vh;\n\nmargin: auto;\n\nbox-shadow: 0 0 7px 0px #9e9e9e;\n\n}\n\n [page-view]>header{\n\nposition: relative;\n\nline-height: 50px;\n\nbackground-color: #000000;\n\n}\n\n [page-view]>header>h2{\n\ncolor: white;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(./logo.png);\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\n}\n\n [page-view]>header>input{\n\nposition: absolute;\n\ntop: 10px;\n\nright: 10px;\n\nheight: 30px;\n\nborder: none;\n\noutline: none;\n\npadding: 0 10px;\n\npadding-right: 35px;\n\nbackground-image: url(./search.svg);\n\nbackground-position: center right;\n\nbackground-repeat: no-repeat;\n\nborder-radius: 3px;\n\nbackground-color: #f3f0f0;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
    return __pkg__scope_bundle__;
}
