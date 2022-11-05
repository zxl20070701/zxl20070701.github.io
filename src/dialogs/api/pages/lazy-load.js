export default {

    // 内置框架
    framework: function () {
        return import('./framework/index.js')
    },

    // 代码编辑器
    editor: function () {
        return import('./editor/index.js')
    },

    // WebGL
    webgl: function () {
        return import('./webgl/index.js')
    }

};