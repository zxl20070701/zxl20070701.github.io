export default {

    // 快速开始
    begin: function () {
        return import('./begin/index.js')
    },

    // 右侧工具
    tools: function () {
        return import('./tools/index.js')
    }
};