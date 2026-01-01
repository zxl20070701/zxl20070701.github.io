
/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/app/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['29']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('58');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('59');


__pkg__scope_args__=window.__pkg__getBundle('60');
var copy =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "app",
        render: template,
        data: {

            // app类型
            type: props.exp || "view",

            // 发起来源
            from: props.instance._name
        },
        methods: {

            // 打开
            openApp: function () {

                // 应用
                if (this.type == 'view') {
                    props.instance.$openView(props.target.getAttribute('tag'));
                }

                // 弹框
                else if (this.type == 'dialog') {
                    props.instance.$openDialog(props.target.getAttribute('tag'));
                }
            },

            // 复制应用url
            copyURL: function () {
                if (this.type == 'view') {
                    copy(window.location.origin + "" + window.location.pathname + "#/" + props.target.getAttribute('tag'), function () {
                        alert('复制应用URL成功！');
                    }, function (e) {
                        console.error(e);
                        alert('复制应用URL失败！');
                    });
                }
            }

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/app/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['58']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1]},{"type":"tag","name":"ul","attrs":{},"childNodes":[2,4,5,7,8,10,12,14,15,17,19,21,22]},{"type":"tag","name":"li","attrs":{"class":"btn","ui-on:click":"openApp"},"childNodes":[3]},{"type":"text","content":"打开","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:class":"'btn '+(type=='view'?'':'gray')","ui-on:click":"copyURL"},"childNodes":[6]},{"type":"text","content":"以URL方式分享","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:notshow":"from=='desktop'?'yes':'no'","class":"btn gray"},"childNodes":[9]},{"type":"text","content":"创建桌面快捷方式","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[11]},{"type":"text","content":"锁定到任务栏","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[13]},{"type":"text","content":"从「开始 」菜单解锁","childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:notshow":"from=='application'?'yes':'no'","class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:notshow":"from=='application'?'yes':'no'","class":"btn gray"},"childNodes":[16]},{"type":"text","content":"复制","childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:notshow":"from=='application'?'yes':'no'","class":"btn gray"},"childNodes":[18]},{"type":"text","content":"剪切","childNodes":[]},{"type":"tag","name":"li","attrs":{"ui-bind:notshow":"from=='application'?'yes':'no'","class":"btn gray"},"childNodes":[20]},{"type":"text","content":"重命名","childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"line"},"childNodes":[]},{"type":"tag","name":"li","attrs":{"class":"btn gray"},"childNodes":[23]},{"type":"text","content":"属性","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/contextmenus/app/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['59']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/copy
/*****************************************************************/
window.__pkg__bundleSrc__['60']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('46');
var appendTo =__pkg__scope_args__.default;


// 复制到剪切板
__pkg__scope_bundle__.default= function (text, callback, errorback) {

    var el = appendTo(document.body, '<textarea>' + text + '</textarea>');

    // 执行复制
    el.select();
    try {
        var result = window.document.execCommand("copy", false, null);

        if (result) {
            if (isFunction(callback)) callback();
        } else {
            if (isFunction(errorback)) errorback();
        }
    } catch (e) {
        if (isFunction(errorback)) errorback(e);
    }

    document.body.removeChild(el);

};

    return __pkg__scope_bundle__;
}
