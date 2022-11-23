export default {

    // 调试
    debugger: function () {
        return import('./debugger/index.js')
    },

    // 颜色选择
    "color-picker": function () {
        return import('./color-picker/index.js')
    },

    // 接口文档
    api: function () {
        return import('./api/index.js')
    }

};