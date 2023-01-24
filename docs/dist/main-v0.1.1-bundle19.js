
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/pages/framework/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['158']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('175');
var template =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/pages/framework/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['175']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3,5,7,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50]},{"type":"tag","name":"header","attrs":{},"childNodes":[2]},{"type":"text","content":"内置框架","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[4]},{"type":"text","content":"为了更好的维护本网站，我们提供了一个极小的“框架”用于协调资源和代码，主要包括两个方面：打包工具 + 前端框架。","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[6]},{"type":"text","content":"打包工具","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[8,9,11,12,14,15,17]},{"type":"text","content":"工具的入口分为开发dev和生产build，分别位于：","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"important"},"childNodes":[10]},{"type":"text","content":"./bin/pkg/server","childNodes":[]},{"type":"text","content":"和","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"important"},"childNodes":[13]},{"type":"text","content":"./bin/pkg/builder","childNodes":[]},{"type":"text","content":"处。\n    此外，用于解析各种类型的文件的代码存放在：","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"important"},"childNodes":[16]},{"type":"text","content":"./bin/loader","childNodes":[]},{"type":"text","content":"下。","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[19]},{"type":"text","content":"前端框架","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[21]},{"type":"text","content":"其实就是一些零碎的方法，用于给html页面赋予有用的功能。","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[23]},{"type":"text","content":"useTemplate","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[25]},{"type":"text","content":"import useTemplate from \"./src/framework/useTemplate\";\nvar instance = useTemplate(el, pageFunction, props);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[27]},{"type":"text","content":"返回的实例instance表示新的内容对象，而传递的pageFunction是一个函数，包含了意图。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[29]},{"type":"text","content":"pageFunction","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[31]},{"type":"text","content":"function (obj, props) {\n    return {\n\n        render: template,// 模板\n        data: {}, // 数据\n\n        beforeMount: function () {}, // 挂载前\n        mounted: function () {}, // 挂载后\n        beforeUpdate: function () {},// 数据改变前\n        updated: function () {}, // 数据改变后\n\n        methods: {}// 方法\n    };\n};","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[33]},{"type":"text","content":"可以看出来，这个函数有一个形参数obj，其中有一些有用的方法。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[35]},{"type":"text","content":"obj.ref","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[37]},{"type":"text","content":"data:{\n        param:obj.ref(initValue)\n    }","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[39]},{"type":"text","content":"如此定义的数据，就可以在方法、钩子等中通过 this.param 使用了，而通过指令等，也可以在页面使用，可以实现视图和数据等绑定。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[41]},{"type":"text","content":"obj.reactive","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[43]},{"type":"text","content":"data:{\n        param:obj.reactive(initValue)\n    }","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[45]},{"type":"text","content":"和 ref 类似，唯一不同的是，前者不支持数据改变的深度监听。","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[47]},{"type":"text","content":"指令","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[49]},{"type":"text","content":"全局指令都存放在 ./src/directives 中，定义一个指令的语法非常简单：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[51]},{"type":"text","content":"export default {\n    inserted: function (el, binding) { \n        // 初始化插入页面触发\n    },\n    update: function (el, binding) { \n        // 数据改变触发\n    }\n};","childNodes":[]}]

    return __pkg__scope_bundle__;
}
