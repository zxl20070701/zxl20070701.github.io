export default {

    // 工具箱
    tool: function () {
        return import('./tool/index.js')
    },

    // 图层
    layer: function () {
        return import('./layer/index.js')
    }

};